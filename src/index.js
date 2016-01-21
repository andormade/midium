var Nota = require('./nota');

require('./portCollection');
require('./inputFunctions');
require('./inputShorthands');
require('./outputFunctions');
require('./outputShorthands');

Nota.Utils = require('./midiUtils');
Nota.MIDIStatus = require('./midiStatusEnum');

module.exports = Nota;
global.Nota = Nota;
