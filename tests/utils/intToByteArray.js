var assert = require('chai').assert,
  	Utils = require('../../dist/utils');

describe('intToByteArray', function() {
	it ('0xffffff', function() {
		assert.deepEqual(
			Utils.intToByteArray(0xffffff),
			[0xff, 0xff, 0xff]
		);
	});
	it ('0xffff00', function() {
		assert.deepEqual(
			Utils.intToByteArray(0xffff00),
			[0xff, 0xff, 0x00]
		);
	});
	it ('0x00ffff', function() {
		assert.deepEqual(
			Utils.intToByteArray(0x00ffff),
			[0x00, 0xff, 0xff]
		);
	});
});
