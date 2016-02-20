var Midium = require('midium-core'),
	_ = require('lodash');

const NOTE_OFF = 0x80;
const NOTE_ON  = 0x90;
const POLYPHONIC_AFTERTOUCH = 0xa0;
const CONTROL_CHANGE = 0xb0;
const PROGRAM_CHANGE = 0xc0;
const CHANNEL_AFTERTOUCH = 0xd0;
const PITCH_WHEEL = 0xe0;
const EVENT_ONLY = 0xf00000;
const EVENT_AND_CHANNEL = 0xff0000;

_.assignIn(Midium.prototype, {
	/**
	 * Registers an event listener for the note off events.
	 *
	 * @param {function} callback
	 * @param {number} [channel]
	 * @returns {object} Reference of the event listener for unbinding.
	 */
	onNoteOff : function(callback, channel) {
		var channel = _.isUndefined(channel) ? 1 : channel,
			mask = _.isUndefined(channel) ? EVENT_ONLY : EVENT_AND_CHANNEL,
			message1 = Midium.constructMIDIMessage(NOTE_OFF, channel, 0, 0),
			message2 = Midium.constructMIDIMessage(NOTE_ON, channel, 0, 0);

		return [
			this.addEventListener(message1, mask, function(event) {
				/* Extending the MIDI event with useful infos. */
				event.status = 'noteoff';
				event.channel = Midium.getChannelFromStatus(event.data[0]);
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
				event.channel = Midium.getChannelFromStatus(event.data[0]);
				event.note = event.data[1];
				event.velocity = 0;
				callback(event);
			})
		];
	},

	/**
	 * Registers an event listener for the note on events.
	 *
	 * @param {function} callback
	 * @param {number} [channel]
	 * @returns {object} Reference of the event listener for unbinding.
	 */
	onNoteOn : function(callback, channel) {
		var channel = _.isUndefined(channel) ? 1 : channel,
			mask = _.isUndefined(channel) ? EVENT_ONLY : EVENT_AND_CHANNEL,
			message = Midium.constructMIDIMessage(NOTE_ON, channel, 0, 0);

		return this.addEventListener(message, mask, function(event) {
			if (event.data[2] === 0) {
				return;
			}
			/* Extending the MIDI event with useful infos. */
			event.status = 'noteon';
			event.channel = Midium.getChannelFromStatus(event.data[0]);
			event.note = event.data[1];
			event.velocity = event.data[2];
			callback(event);
		});
	},

	/**
	 * Registers an event listener for the polyphonic aftertouch events.
	 *
	 * @param {function} callback
	 * @param {number} [channel]
	 * @returns {object} Reference of the event listener for unbinding.
	 */
	onPolyAftertouch : function(callback, channel) {
		var channel = _.isUndefined(channel) ? 1 : channel,
			mask = _.isUndefined(channel) ? EVENT_ONLY : EVENT_AND_CHANNEL,
			message = Midium.constructMIDIMessage(
				POLYPHONIC_AFTERTOUCH, channel, 0, 0
			);

		return this.addEventListener(message, mask, function(event) {
			/* Extending the MIDI event with useful infos. */
			event.status = 'polyaftertouch';
			event.channel = Midium.getChannelFromStatus(event.data[0]);
			event.note = event.data[1];
			event.pressure = event.data[2];
			callback(event);
		});
	},

	/**
	 * Registers an event listener for the control change events.
	 *
	 * @param {function} callback
	 * @param {number} [channel]
	 * @returns {object} Reference of the event listener for unbinding.
	 */
	onControlChange : function(callback, channel) {
		var channel = _.isUndefined(channel) ? 1 : channel,
			mask = _.isUndefined(channel) ? EVENT_ONLY : EVENT_AND_CHANNEL,
			message = Midium.constructMIDIMessage(
				CONTROL_CHANGE, channel, 0, 0
			);

		return this.addEventListener(message, mask, function(event) {
			/* Extending the MIDI event with useful infos. */
			event.status = 'controlchange';
			event.channel = Midium.getChannelFromStatus(event.data[0]);
			event.controller = event.data[1];
			event.controllerValue = event.data[2];
			callback(event);
		});
	},

	/**
	 * Registers an event listener for the program change events.
	 *
	 * @param {function} callback
	 * @param {number} [channel]
	 * @returns {object} Reference of the event listener for unbinding.
	 */
	onProgramChange : function(callback, channel) {
		var channel = _.isUndefined(channel) ? 1 : channel,
			mask = _.isUndefined(channel) ? EVENT_ONLY : EVENT_AND_CHANNEL,
			message = Midium.constructMIDIMessage(PROGRAM_CHANGE, channel, 0, 0);

		return this.addEventListener(message, mask, function(event) {
			/* Extending the MIDI event with useful infos. */
			event.status = 'programchange';
			event.channel = Midium.getChannelFromStatus(event.data[0]);
			event.program = event.data[1];
			callback(event);
		});
	},

	/**
	 * Registers an event listener for the channel aftertouch events.
	 *
	 * @param {function} callback
	 * @param {number} [channel]
	 * @returns {object} Reference of the event listener for unbinding.
	 */
	onChannelAftertouch : function(callback, channel) {
		var channel = _.isUndefined(channel) ? 1 : channel,
			mask = _.isUndefined(channel) ? EVENT_ONLY : EVENT_AND_CHANNEL,
			message = Midium.constructMIDIMessage(
				CHANNEL_AFTERTOUCH, channel, 0, 0
			);

		return this.addEventListener(message, mask, function(event) {
			/* Extending the MIDI event with useful infos. */
			event.status = 'channelaftertouch';
			event.channel = Midium.getChannelFromStatus(event.data[0]);
			event.pressure = event.data[1];
			callback(event);
		});
	},

	/**
	 * Registers an event listener for the pitch wheel events.
	 *
	 * @param {function} callback
	 * @param {number} [channel]
	 * @returns {object} Reference of the event listener for unbinding.
	 */
	onPitchWheel : function(callback, channel) {
		var channel = _.isUndefined(channel) ? 1 : channel,
			mask = _.isUndefined(channel) ? EVENT_ONLY : EVENT_AND_CHANNEL,
			message = Midium.constructMIDIMessage(PITCH_WHEEL, channel, 0, 0);

		return this.addEventListener(message, mask, function(event) {
			/* Extending the MIDI event with useful infos. */
			event.status = 'pitchwheel';
			event.channel = Midium.getChannelFromStatus(event.data[0]);
			event.pitchWheel = event.data[2];
			callback(event);
		});
	}
});
