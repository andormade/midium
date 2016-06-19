var assert = require('chai').assert,
  	Utils = require('../../dist/utils'),
	StatusCodes = require('../../dist/constants/statusCodes');

var noteOffs = [
	StatusCodes.NOTE_OFF_CH1,
	StatusCodes.NOTE_OFF_CH2,
	StatusCodes.NOTE_OFF_CH3,
	StatusCodes.NOTE_OFF_CH4,
	StatusCodes.NOTE_OFF_CH5,
	StatusCodes.NOTE_OFF_CH6,
	StatusCodes.NOTE_OFF_CH7,
	StatusCodes.NOTE_OFF_CH8,
	StatusCodes.NOTE_OFF_CH9,
	StatusCodes.NOTE_OFF_CH10,
	StatusCodes.NOTE_OFF_CH11,
	StatusCodes.NOTE_OFF_CH12,
	StatusCodes.NOTE_OFF_CH13,
	StatusCodes.NOTE_OFF_CH14,
	StatusCodes.NOTE_OFF_CH15,
	StatusCodes.NOTE_OFF_CH16
];

var notNoteOffs = [
	StatusCodes.NOTE_ON_CH1,
	StatusCodes.POLYPHONIC_AFTERTOUCH_CH1,
	StatusCodes.CONTROL_CHANGE_CH1,
	StatusCodes.PROGRAM_CHANGE_CH1,
	StatusCodes.CHANNEL_AFTERTOUCH_CH1,
	StatusCodes.PITCH_WHEEL_CH1
];

describe('isNoteOff', function() {
	it('should be true', function() {
		noteOffs.forEach(function(statusCode) {
			assert.equal(Utils.isNoteOff(statusCode), true);
		});
	});
	it('should be false', function() {
		notNoteOffs.forEach(function(statusCode) {
			assert.equal(Utils.isNoteOff(statusCode), false);
		});
	});
});
