var Nota = {

	/** @type {object} Midi access object. */
	MidiAccess : null,

	/**
	 * Lists the open MIDI ports from the Web MIDI API.
	 *
	 * @param {function} callback
	 *
	 * @returns {object}
	 */
	getPorts : function(callback, sysex) {
		if (typeof sysex === 'undefined') {
			sysex = false;
		}

		navigator.requestMIDIAccess({
			sysex : sysex
		}).then(

			/* MIDI access granted */
			function(midiAccess) {
				var outputs = {},
					inputs = {};

				Nota.MidiAccess = midiAccess;

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
Nota.Status = require('./midiStatusEnum.js');
Nota.Utils = require('./utils.js');

module.exports = Nota;
