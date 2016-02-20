var Midinette = require('midinette'),
	Midium = require('midium-core'),
	assignIn = require('lodash.assignin');

assignIn(Midium, Midinette);

require('./input');
require('./output');
require('./channel');

module.exports = Midium;
global.Midium = Midium;
