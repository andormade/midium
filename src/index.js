var Midium = require('midium-core');

require('./input');
require('./output');
require('./channel');

Midium.Utils = require('./midiUtils');
Midium.MIDIStatus = require('./midiStatusEnum');

module.exports = Midium;
global.Midium = Midium;
