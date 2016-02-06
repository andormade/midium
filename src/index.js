var Nota = require('nota');

require('./input');
require('./output');
require('./channel');

Nota.Utils = require('./midiUtils');
Nota.MIDIStatus = require('./midiStatusEnum');

module.exports = Nota;
global.Nota = Nota;
