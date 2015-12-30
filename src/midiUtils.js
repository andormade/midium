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
		return status % 0xf0;
	},

	isNoteOn : function(status) {
		return status >= Status.NOTE_ON_CH1 &&
			status <= Status.NOTE_ON_CH16;
	},

	isNoteOff : function(status) {
		return status >= Status.NOTE_OFF_CH1 &&
			status <= Status.NOTE_OFF_CH16;
	},

	noteStringToMIDICode : function(note) {
		return Utils.defaultValue(Note[note], 0);
	}
};
