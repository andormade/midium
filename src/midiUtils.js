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
		return event + channel - 1;
	},

	getChannelFromStatus : function(status) {
		return (status % 0x10) + 1;
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

	noteStringToMIDICode : function(note) {
		if (typeof note === 'string') {
			return Utils.defaultValue(Note[note], 0);
		}
		else if (typeof note === 'number') {
			return note;
		}
		return 0;
	}
};
