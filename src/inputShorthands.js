var MIDIUtils = require('./midiUtils'),
	Nota = require('nota'),
	Utils = require('./utils');

const NOTE_OFF = 0x800000;
const NOTE_ON  = 0x900000;
const POLYPHONIC_AFTERTOUCH = 0xa00000;
const CONTROL_CHANGE = 0xb00000;
const PROGRAM_CHANGE = 0xc00000;
const CHANNEL_AFTERTOUCH = 0xd00000;
const PITCH_WHEEL = 0xe00000;

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
	var mask = Utils.isDefined(channel) ? EVENT_AND_CHANNEL : EVENT_ONLY;

	return [
		this.addEventListener(NOTE_OFF, mask, function(event) {
			/* Extending the MIDI event with useful infos. */
			event.status = 'noteoff';
			event.channel = MIDIUtils.getChannelFromStatus(event.data[0]);
			event.note = event.data[1];
			event.velocity = event.data[2];
			callback(event);
		}),
		this.addEventListener(NOTE_ON, mask, function(event) {
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
	var mask = Utils.isDefined(channel) ? EVENT_AND_CHANNEL : EVENT_ONLY;

	return this.addEventListener(NOTE_ON, mask, function(event) {
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
	var mask = Utils.isDefined(channel) ? EVENT_AND_CHANNEL : EVENT_ONLY;

	return this.addEventListener(POLYPHONIC_AFTERTOUCH, mask, function(event) {
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
	var mask = Utils.isDefined(channel) ? EVENT_AND_CHANNEL : EVENT_ONLY;

	return this.addEventListener(CONTROL_CHANGE, mask, function(event) {
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
	var mask = Utils.isDefined(channel) ? EVENT_AND_CHANNEL : EVENT_ONLY;

	return this.addEventListener(PROGRAM_CHANGE, mask, function(event) {
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
	var mask = Utils.isDefined(channel) ? EVENT_AND_CHANNEL : EVENT_ONLY;

	return this.addEventListener(CHANNEL_AFTERTOUCH, mask, function(event) {
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
	var mask = Utils.isDefined(channel) ? EVENT_AND_CHANNEL : EVENT_ONLY;

	return this.addEventListener(PITCH_WHEEL, mask, function(event) {
		/* Extending the MIDI event with useful infos. */
		event.status = 'pitchwheel';
		event.channel = MIDIUtils.getChannelFromStatus(event.data[0]);
		event.pitchWheel = event.data[2];
		callback(event);
	});
};
