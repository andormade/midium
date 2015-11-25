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

				midiAccess.inputs.forEach(function(input) {
					inputs[input.id] = input;
				});

				midiAccess.outputs.forEach(function(output) {
					outputs[output.id] = output;
				});

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
