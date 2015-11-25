var Nota = {
	/** @type {object} Midi access object. */
	MidiAccess : null,

	/**
	 * Retrieves the open MIDI ports from the Web MIDI API.
	 *
	 * @param {function} callback
	 *
	 * @returns {object}
	 */
	getPorts: function(callback, sysex) {
		if (typeof sysex === 'undefined') {
			var sysex = false;
		}

		navigator.requestMIDIAccess({
			sysex: sysex
		}).then(
			/* MIDI access granted */
			function(midiAccess) {
				Nota.MidiAccess = midiAccess;
				var outputs = {},
					inputs = {};

				for (var output of midiAccess.outputs) {
					outputs[output[0]] = output[1];
				}
				for (var input of midiAccess.inputs) {
					inputs[input[0]] = input[1];
				}

				callback({
					outputs : outputs,
					inputs  : inputs
				});
			},
			/* MIDI access denied */
			function(error) {
				console.log(error);
			}
		);
	}
};

Nota.MidiOutput = require('./midiOutput.js')(Nota);
Nota.MidiInput = require('./midiInput.js')(Nota);
Nota.Enum = require('./enum.js');
Nota.Utils = require('./utils.js');

module.exports = Nota;
