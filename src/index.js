var Midinette = require('midinette'),
	Midium = require('midium-core'),
	_ = require('lodash');

_.assignIn(Midium, Midinette);

require('./input');
require('./output');
require('./channel');

module.exports = Midium;
global.Midium = Midium;
