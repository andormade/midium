var assert = require('chai').assert,
	Utils = require('../../dist/utils'),
	StatusCodes = require('../../dist/constants/statusCodes');

describe('eventMask', function() {
	it('0x000000', function() {
		assert.equal(Utils.eventMask(false, false, false, false), 0x000000);
	});
	it('0xf00000', function() {
		assert.equal(Utils.eventMask(true, false, false, false), 0xf00000);
	});
	it('0xff0000', function() {
		assert.equal(Utils.eventMask(true, true, false, false), 0xff0000);
	});
	it('0xffff00', function() {
		assert.equal(Utils.eventMask(true, true, true, false), 0xffff00);
	});
	it('0xffffff', function() {
		assert.equal(Utils.eventMask(true, true, true, true), 0xffffff);
	});
});
