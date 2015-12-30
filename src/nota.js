var DeviceCollection = require('./deviceCollection');

var Nota = {

	/** @type {object} Midi access object. */
	midiAccess : null,

	isReady : false,

	/**
	 * Calls back when the MIDI driver is ready.
	 *
	 * @param {function} callback    Calls when the MIDI connection is ready.
	 *
	 * @returns {void}
	 */
	ready : function(callback) {
		if (global.Nota.isReady) {
			callback();
		}

		navigator.requestMIDIAccess({
			sysex : false
		}).then(

			/* MIDI access granted */
			function(midiAccess) {
				global.Nota.isReady = true;
				global.Nota.midiAccess = midiAccess;
				callback();
			},

			/* MIDI access denied */
			function(error) {
				global.Nota.isReady = false;
				console.log(error);
			}
		);
	},

	/**
	 * Returns with an array of MIDI inputs and outputs.
	 *
	 * @param {object|number|string|array} selector    Selector
	 *
	 * @returns {array}
	 */
	select : function(selector) {
		if (!global.Nota.isReady) {
			return [];
		}

		var devices = [];

		/* If the query is a MIDIInput or output. */
		if (
			selector instanceof window.MIDIOutput ||
			selector instanceof window.MIDIInput
		) {
			devices[0] = selector;
		}

		else if (
			typeof selector === 'number' &&
			global.Nota.midiAccess.inputs.has(query)
		) {
			devices[0] = global.Nota.midiAccess.inputs.get(query);
		}

		else if (
			typeof query === 'number' &&
			global.Nota.midiAccess.outputs.has(query)
		) {
			devices[0] = global.Nota.midiAccess.outputs.get(query);
		}

		else if (selector instanceof Array) {
			selector.forEach(function(item) {
				devices.push(Nota.select(item)[0]);
			});
		}

		else if (
			typeof selector === 'string' ||
			selector instanceof window.RegExp
		) {
			var name = '';

			global.Nota.midiAccess.inputs.forEach(function each(device) {
				name = device.name + ' ' + device.manufacturer;
				if (new RegExp(selector, 'i').test(name)) {
					devices.push(device);
				}
			});

			global.Nota.midiAccess.outputs.forEach(function each(device) {
				name = device.name + ' ' + device.manufacturer;
				if (new RegExp(selector, 'i').test(name)) {
					devices.push(device);
				}
			});
		}

		return new DeviceCollection(devices);
	}
};

Nota.MidiOutput = require('./midiOutput.js')(Nota);
Nota.MidiInput = require('./midiInput.js')(Nota);
Nota.Status = require('./midiStatusEnum.js');
Nota.Utils = require('./utils.js');

global.Nota = Nota;
module.exports = Nota;
