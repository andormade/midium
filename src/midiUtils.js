var Note = require('./noteEnum.js'),
	Status = require('./midiStatusEnum.js'),
	Utils = require('./utils.js');

module.exports = {
	/**
	 * Generates status byte from the specified MIDI event and channel.
	 *
	 * @param {number} event      MIDI event enum.
	 * @param {number} channel    MIDI channel number. (1-16)
	 *
	 * @returns {number}    Status byte.
	 */
	getStatusByte : function(event, channel) {
		if (channel > 16 || channel < 1) {
			channel = 1;
		}

		return ({
			noteoff           : 0x80,
			noteon            : 0x90,
			polyaftertouch    : 0xa0,
			controlchange     : 0xb0,
			programchange     : 0xc0,
			channelaftertouch : 0xd0,
			pitchwheel        : 0xe0
		})[event] + channel - 1;
	},

	getChannelFromStatus : function(status) {
		return (status % 0x10) + 1;
	},

	/**
	 * Returns with the type of the given MIDI status byte.
	 *
	 * @param {number} status    MIDI status byte
	 *
	 * @returns {string} Event type
	 */
	getEventType : function(status) {
		return ({
			0x8 : 'noteoff',
			0x9 : 'noteon',
			0xa : 'polyaftertouch',
			0xb : 'controlchange',
			0xc : 'programchange',
			0xd : 'channelaftertouch',
			0xe : 'pitchwheel'
		})[Utils.getHighNibble(status)];
	},

	/**
	 * Checks if the given midi message is a note on message.
	 *
	 * @param {array}    MIDI message data array.
	 *
	 * @returns {boolean}
	 */
	isNoteOn : function(data) {
		return (
			data[0] >= Status.NOTE_ON_CH1 &&
			data[0] <= Status.NOTE_ON_CH16 &&
			data[2] !== 0
		);
	},

	/**
	 * Checks if the given midi message is a note off message.
	 *
	 * @param {array}    MIDI message data array.
	 *
	 * @returns {boolean}
	 */
	isNoteOff : function(data) {
		return (
			data[0] >= Status.NOTE_OFF_CH1 &&
			data[0] <= Status.NOTE_OFF_CH16
		) || (
			data[0] >= Status.NOTE_ON_CH1 &&
			data[0] <= Status.NOTE_ON_CH16 &&
			data[2] === 0
		);
	},

	isControlChange : function(data) {
		return (
			data[0] >= Status.CONTROL_CHANGE_CH1 &&
			data[0] <= Status.CONTROL_CHANGE_CH16
		);
	},

	isPitchWheel : function(data) {
		return (
			data[0] >= Status.PITCH_WHEEL_CH1 &&
			data[0] <= Status.PITCH_WHEEL_CH16
		);
	},

	isPolyphonicAftertouch : function(data) {
		return (
			data[0] >= Status.POLYPHONIC_AFTERTOUCH_CH1 &&
			data[0] <= Status.POLYPHONIC_AFTERTOUCH_CH16
		);
	},

	isProgramChange : function(data) {
		return (
			data[0] >= Status.PROGRAM_CHANGE_CH1 &&
			data[0] <= Status.PROGRAM_CHANGE_CH16
		);
	},

	isChannelAftertouch : function(data) {
		return (
			data[0] >= Status.CHANNEL_AFTERTOUCH_CH1 &&
			data[0] <= Status.CHANNEL_AFTERTOUCH_CH16
		);
	},

	noteStringToMIDICode : function(note) {
		if (typeof note === 'string') {
			return Utils.defaultValue(Note[note], 0);
		}
		else if (typeof note === 'number') {
			return note;
		}
		return 0;
	},

	/**
	 *
	 *
	 * @returns {void}
	 */
	constuctMIDIMessage : function() {
		return Nota.byteArrayToInt(
			this.constuctMIDIMessageArray.apply(this, arguments)
		);
	},

	/**
	 *
	 *
	 *
	 * @returns {void}
	 */
	constuctMIDIMessageArray : function(event, channel, data1, data2) {
		channel = Utils.defaultValue(channel, 1);
		data1 = Utils.defaultValue(data1, 0);
		data2 = Utils.defaultValue(data2, 0);
		return [(event & 0xf0) + (channel - 1), data1, data2];
	}
};
