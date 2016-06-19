var assert = require('chai').assert,
  	Utils = require('../../dist/utils'),
	StatusCodes = require('../../dist/constants/statusCodes');

var yes = [
	[0x00, 0x00, 0x00],
	[0xff, 0xff, 0xff],
	[0xff, 0x00, 0x00],
	[0x00, 0xff, 0x00],
	[0x00, 0x00, 0xff],
	[0x00, 0xff, 0xff],
	[0xff, 0x00, 0xff],
	[0xff, 0xff, 0x00]
];

var not = [
	[-1, 0, 0],
	[false, 0, 0],
	['', 0, 0],
	[256, 0, 0],
	[undefined, 0, 0],
	false,
	0,
	[],
	[0, 0],
	null,
	'',
	undefined
];

describe('isMIDIByteArray', function() {
	it('should return true', function() {
		yes.forEach(function(byteArray) {
			assert.equal(Utils.isMIDIByteArray(byteArray), true);
		});
	});
	it('should return false', function() {
		not.forEach(function(byteArray) {
			assert.equal(Utils.isMIDIByteArray(byteArray), false);
		});
	});
});
