var assert = require('chai').assert,
  	Utils = require('../../dist/utils'),
	StatusCodes = require('../../dist/constants/statusCodes');

describe('isMIDIStatus', function() {
	it('should return true', function() {
		for (var status in StatusCodes) {
			if (StatusCodes.hasOwnProperty(status)) {
				assert.equal(Utils.isMIDIStatus(StatusCodes[status]), true);
			}
		}
	});
});
