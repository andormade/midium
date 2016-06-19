var assert = require('chai').assert,
  	Utils = require('../../dist/utils'),
	StatusCodes = require('../../dist/constants/statusCodes');

describe('constructMIDIMessage', function() {
	it('channel 1', function() {
		assert.deepEqual(Utils.constructMIDIMessage(
			StatusCodes.NOTE_ON_CH1,
			1,
			0xff,
			0xff
		), [StatusCodes.NOTE_ON_CH1, 0xff, 0xff]);
	});
	it('channel 2', function() {
		assert.deepEqual(Utils.constructMIDIMessage(
			StatusCodes.NOTE_ON_CH1,
			2,
			0xff,
			0xff
		), [StatusCodes.NOTE_ON_CH2, 0xff, 0xff]);
	});
	it('channel underflow', function() {
		assert.deepEqual(Utils.constructMIDIMessage(
			StatusCodes.NOTE_ON_CH1,
			0,
			0xff,
			0xff
		), [StatusCodes.NOTE_ON_CH1, 0xff, 0xff]);
	});
	it('channel overflow', function() {
		assert.deepEqual(Utils.constructMIDIMessage(
			StatusCodes.NOTE_ON_CH1,
			17,
			0xff,
			0xff
		), [StatusCodes.NOTE_ON_CH16, 0xff, 0xff]);
	});
	it('data underflow', function() {
		assert.deepEqual(Utils.constructMIDIMessage(
			StatusCodes.NOTE_ON_CH1,
			17,
			-1,
			0xff
		), [StatusCodes.NOTE_ON_CH16, 0x00, 0xff]);
	});
	it('data overflow', function() {
		assert.deepEqual(Utils.constructMIDIMessage(
			StatusCodes.NOTE_ON_CH1,
			1,
			0,
			261
		), [StatusCodes.NOTE_ON_CH1, 0x00, 0xff]);
	});
});
