(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
	/* Note Off event.
	 * This message is sent when a note is released (ended). */
	NOTE_OFF_CH1:  0x80,
	NOTE_OFF_CH2:  0x81,
	NOTE_OFF_CH3:  0x82,
	NOTE_OFF_CH4:  0x83,
	NOTE_OFF_CH5:  0x84,
	NOTE_OFF_CH6:  0x85,
	NOTE_OFF_CH7:  0x86,
	NOTE_OFF_CH8:  0x87,
	NOTE_OFF_CH9:  0x88,
	NOTE_OFF_CH10: 0x89,
	NOTE_OFF_CH11: 0x8a,
	NOTE_OFF_CH12: 0x8b,
	NOTE_OFF_CH13: 0x8c,
	NOTE_OFF_CH14: 0x8d,
	NOTE_OFF_CH15: 0x8e,
	NOTE_OFF_CH16: 0x8f,

	/* Note On event.
	 * This message is sent when a note is depressed (start). */
	NOTE_ON_CH1:  0x90,
	NOTE_ON_CH2:  0x91,
	NOTE_ON_CH3:  0x92,
	NOTE_ON_CH4:  0x93,
	NOTE_ON_CH5:  0x94,
	NOTE_ON_CH6:  0x95,
	NOTE_ON_CH7:  0x96,
	NOTE_ON_CH8:  0x97,
	NOTE_ON_CH9:  0x98,
	NOTE_ON_CH10: 0x99,
	NOTE_ON_CH11: 0x9a,
	NOTE_ON_CH12: 0x9b,
	NOTE_ON_CH13: 0x9c,
	NOTE_ON_CH14: 0x9d,
	NOTE_ON_CH15: 0x9e,
	NOTE_ON_CH16: 0x9f,

	/* Polyphonic Key Pressure (Aftertouch).
	 * This message is most often sent by pressing down on the key after it
	 * "bottoms out". */
	POLYPHONIC_AFTERTOUCH_CH1:  0xa0,
	POLYPHONIC_AFTERTOUCH_CH2:  0xa1,
	POLYPHONIC_AFTERTOUCH_CH3:  0xa2,
	POLYPHONIC_AFTERTOUCH_CH4:  0xa3,
	POLYPHONIC_AFTERTOUCH_CH5:  0xa4,
	POLYPHONIC_AFTERTOUCH_CH6:  0xa5,
	POLYPHONIC_AFTERTOUCH_CH7:  0xa6,
	POLYPHONIC_AFTERTOUCH_CH8:  0xa7,
	POLYPHONIC_AFTERTOUCH_CH9:  0xa8,
	POLYPHONIC_AFTERTOUCH_CH10: 0xa9,
	POLYPHONIC_AFTERTOUCH_CH11: 0xaa,
	POLYPHONIC_AFTERTOUCH_CH12: 0xab,
	POLYPHONIC_AFTERTOUCH_CH13: 0xac,
	POLYPHONIC_AFTERTOUCH_CH14: 0xad,
	POLYPHONIC_AFTERTOUCH_CH15: 0xae,
	POLYPHONIC_AFTERTOUCH_CH16: 0xaf
};

},{}],2:[function(require,module,exports){
module.exports = function(Nota) {
	/**
	 *
	 *
	 * @param {number} port
	 * @param {number} channel
	 *
	 * @returns {void}
	 */
	var MidiInput = function(port, channel) {
		this.port = port;
		this.channel = channel;
	};

	MidiInput.prototype = {
		/**
		 *
		 *
		 * @param {number} channel
		 *
		 * @returns {object}
		 */
		setChannel: function(channel) {
			this.channel = channel;
			return this;
		},

		/**
		 *
		 *
		 * @param {string} event
		 * @param {number} channel
		 * @param {function} callback
		 *
		 * @returns {object}
		 */
		on: function(event, channel, callback) {
			/* @TODO */
			return this;
		}
	};

	return MidiInput;
};

},{}],3:[function(require,module,exports){
module.exports = function(Nota) {
	/**
	 *
	 *
	 * @param {number} port
	 * @param {number} channel
	 *
	 * @returns {void}
	 */
	var MidiOutput = function(port, channel) {
		this.port = port;
		this.channel = channel;
		this.output = Nota.MidiAccess.outputs.get(port);
	};

	MidiOutput.prototype = {
		/**
		 *
		 *
		 * @param {number} note
		 * @param {number} [channel]
		 * @param {number} [data1]
		 * @param {number} [data2]
		 *
		 * @returns {object}
		 */
		sendNote: function(note, channel, data1, data2) {
			// @TODO
			this.output.send([0x90, 60, 0x7f]);
			this.output.send([0x80, 60, 0x40], window.performance.now() + 100.0);
			return this;
		},

		/**
		 *
		 *
		 * @param {number} channel
		 *
		 * @return {object}
		 */
		setChannel: function(channel) {
			this.channel = channel;
			return this;
		}
	};

	return MidiOutput;
};

},{}],4:[function(require,module,exports){
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

},{"./enum.js":1,"./midiInput.js":2,"./midiOutput.js":3,"./utils.js":5}],5:[function(require,module,exports){
module.exports = {
	/**
	 *
	 *
	 * @param {number} channel
	 * @param {number} note
	 * @param {number} velocity
	 *
	 * @returns {number}
	 */
	 noteOn: function(channel, note, velocity) {
		return [
			0x90 + (channel - 1),
			note,
			velocity
		];
	},

	/**
	 *
	 *
	 * @param {number} channel
	 * @param {number} note
	 *
	 * @returns {number}
	 */
	noteOff: function(channel, note) {
		return [
			0x80 + (channel - 1),
			note,
			velocity
		]
	},

	isDefined: function(object) {
		if (typeof object === 'undefined') {
			return true;
		}

		return false;
	}
};

},{}]},{},[1,2,3,4,5]);
