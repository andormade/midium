var assert = require('chai').assert,
  	Utils = require('../../dist/utils'),
	StatusCodes = require('../../dist/constants/statusCodes');

describe('noteStringToMIDICode', function() {
	var notes = ['C0', 'D1', 'E2', 'F3', 'G4', 'A5', 'B6'];
	var codes = [0, 14, 28, 41, 55, 69, 83];

	notes.forEach(function(note, index) {
		it(note, function() {
			assert.equal(Utils.noteStringToMIDICode(note), codes[index]);
		})
	}, this);
});
