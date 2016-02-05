var MIDIUtils = require('./midiUtils'),
	Nota = require('nota'),
	Utils = require('./utils');

const NOTE_OFF = 0x80;
const NOTE_ON  = 0x90;
const POLYPHONIC_AFTERTOUCH = 0xa0;
const CONTROL_CHANGE = 0xb0;
const PROGRAM_CHANGE = 0xc0;
const CHANNEL_AFTERTOUCH = 0xd0;
const PITCH_WHEEL = 0xe0;

const EVENT_ONLY = 0xf00000;
const EVENT_AND_CHANNEL = 0xff0000;

/**
 * Registers an event listener for the note off events.
 *
 * @param {function} callback
 * @param {number} [channel]
 * @returns {object} Reference of the event listener for unbinding.
 */
Nota.prototype.onNoteOff = function(callback, channel) {
	var mask = Utils.isDefined(channel) ? EVENT_AND_CHANNEL : EVENT_ONLY,
		message1 = MIDIUtils.constuctMIDIMessage(NOTE_OFF, channel),
		message2 = MIDIUtils.constuctMIDIMessage(NOTE_ON, channel);

	return [
		this.addEventListener(message1, mask, function(event) {
			/* Extending the MIDI event with useful infos. */
			event.status = 'noteoff';
			event.channel = MIDIUtils.getChannelFromStatus(event.data[0]);
			event.note = event.data[1];
			event.velocity = event.data[2];
			callback(event);
		}),
		this.addEventListener(message2, mask, function(event) {
			/* By note on event, velocity 0 means note off. */
			if (event.data[2] !== 0) {
				return;
			}
			/* Extending the MIDI event with useful infos. */
			event.status = 'noteoff';
			event.channel = MIDIUtils.getChannelFromStatus(event.data[0]);
			event.note = event.data[1];
			event.velocity = 0;
			callback(event);
		})
	];
};

/**
 * Registers an event listener for the note on events.
 *
 * @param {function} callback
 * @param {number} [channel]
 * @returns {object} Reference of the event listener for unbinding.
 */
Nota.prototype.onNoteOn = function(callback, channel) {
	var mask = Utils.isDefined(channel) ? EVENT_AND_CHANNEL : EVENT_ONLY,
		message = MIDIUtils.constuctMIDIMessage(NOTE_ON, channel);

	return this.addEventListener(message, mask, function(event) {
		if (event.data[2] === 0) {
			return;
		}
		/* Extending the MIDI event with useful infos. */
		event.status = 'noteon';
		event.channel = MIDIUtils.getChannelFromStatus(event.data[0]);
		event.note = event.data[1];
		event.velocity = event.data[2];
		callback(event);
	});
};

/**
 * Registers an event listener for the polyphonic aftertouch events.
 *
 * @param {function} callback
 * @param {number} [channel]
 * @returns {object} Reference of the event listener for unbinding.
 */
Nota.prototype.onPolyAftertouch = function(callback, channel) {
	var mask = Utils.isDefined(channel) ? EVENT_AND_CHANNEL : EVENT_ONLY,
		message = MIDIUtils.constuctMIDIMessage(POLYPHONIC_AFTERTOUCH, channel);

	return this.addEventListener(message, mask, function(event) {
		/* Extending the MIDI event with useful infos. */
		event.status = 'polyaftertouch';
		event.channel = MIDIUtils.getChannelFromStatus(event.data[0]);
		event.note = event.data[1];
		event.pressure = event.data[2];
		callback(event);
	});
};

/**
 * Registers an event listener for the control change events.
 *
 * @param {function} callback
 * @param {number} [channel]
 * @returns {object} Reference of the event listener for unbinding.
 */
Nota.prototype.onControlChange = function(callback, channel) {
	var mask = Utils.isDefined(channel) ? EVENT_AND_CHANNEL : EVENT_ONLY,
		message = MIDIUtils.constuctMIDIMessage(CONTROL_CHANGE, channel);

	return this.addEventListener(message, mask, function(event) {
		/* Extending the MIDI event with useful infos. */
		event.status = 'controlchange';
		event.channel = MIDIUtils.getChannelFromStatus(event.data[0]);
		event.controller = event.data[1];
		event.controllerValue = event.data[2];
		callback(event);
	});
};

/**
 * Registers an event listener for the program change events.
 *
 * @param {function} callback
 * @param {number} [channel]
 * @returns {object} Reference of the event listener for unbinding.
 */
Nota.prototype.onProgramChange = function(callback, channel) {
	var mask = Utils.isDefined(channel) ? EVENT_AND_CHANNEL : EVENT_ONLY,
		message = MIDIUtils.constuctMIDIMessage(PROGRAM_CHANGE, channel);

	return this.addEventListener(message, mask, function(event) {
		/* Extending the MIDI event with useful infos. */
		event.status = 'programchange';
		event.channel = MIDIUtils.getChannelFromStatus(event.data[0]);
		event.program = event.data[1];
		callback(event);
	});
};

/**
 * Registers an event listener for the channel aftertouch events.
 *
 * @param {function} callback
 * @param {number} [channel]
 * @returns {object} Reference of the event listener for unbinding.
 */
Nota.prototype.onChannelAftertouch = function(callback, channel) {
	var mask = Utils.isDefined(channel) ? EVENT_AND_CHANNEL : EVENT_ONLY,
		message = MIDIUtils.constuctMIDIMessage(CHANNEL_AFTERTOUCH, channel);

	return this.addEventListener(message, mask, function(event) {
		/* Extending the MIDI event with useful infos. */
		event.status = 'channelaftertouch';
		event.channel = MIDIUtils.getChannelFromStatus(event.data[0]);
		event.pressure = event.data[1];
		callback(event);
	});
};

/**
 * Registers an event listener for the pitch wheel events.
 *
 * @param {function} callback
 * @param {number} [channel]
 * @returns {object} Reference of the event listener for unbinding.
 */
Nota.prototype.onPitchWheel = function(callback, channel) {
	var mask = Utils.isDefined(channel) ? EVENT_AND_CHANNEL : EVENT_ONLY,
		message = MIDIUtils.constuctMIDIMessage(PITCH_WHEEL, channel);

	return this.addEventListener(message, mask, function(event) {
		/* Extending the MIDI event with useful infos. */
		event.status = 'pitchwheel';
		event.channel = MIDIUtils.getChannelFromStatus(event.data[0]);
		event.pitchWheel = event.data[2];
		callback(event);
	});
};
