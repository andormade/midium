(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
	NOTE_OFF              : 0x80,
	NOTE_ON               : 0x90,
	POLYPHONIC_AFTERTOUCH : 0xa0,
	CONTROL_CHANGE        : 0xb0,
	PROGRAM_CHANGE        : 0xc0,
	CHANNEL_AFTERTOUCH    : 0xd0,
	PITCH_WHEEL           : 0xe0,

	/* Note Off event.
	 * This message is sent when a note is released (ended). */
	NOTE_OFF_CH1  : 0x80,
	NOTE_OFF_CH2  : 0x81,
	NOTE_OFF_CH3  : 0x82,
	NOTE_OFF_CH4  : 0x83,
	NOTE_OFF_CH5  : 0x84,
	NOTE_OFF_CH6  : 0x85,
	NOTE_OFF_CH7  : 0x86,
	NOTE_OFF_CH8  : 0x87,
	NOTE_OFF_CH9  : 0x88,
	NOTE_OFF_CH10 : 0x89,
	NOTE_OFF_CH11 : 0x8a,
	NOTE_OFF_CH12 : 0x8b,
	NOTE_OFF_CH13 : 0x8c,
	NOTE_OFF_CH14 : 0x8d,
	NOTE_OFF_CH15 : 0x8e,
	NOTE_OFF_CH16 : 0x8f,

	/* Note On event.
	 * This message is sent when a note is depressed (start). */
	NOTE_ON_CH1  : 0x90,
	NOTE_ON_CH2  : 0x91,
	NOTE_ON_CH3  : 0x92,
	NOTE_ON_CH4  : 0x93,
	NOTE_ON_CH5  : 0x94,
	NOTE_ON_CH6  : 0x95,
	NOTE_ON_CH7  : 0x96,
	NOTE_ON_CH8  : 0x97,
	NOTE_ON_CH9  : 0x98,
	NOTE_ON_CH10 : 0x99,
	NOTE_ON_CH11 : 0x9a,
	NOTE_ON_CH12 : 0x9b,
	NOTE_ON_CH13 : 0x9c,
	NOTE_ON_CH14 : 0x9d,
	NOTE_ON_CH15 : 0x9e,
	NOTE_ON_CH16 : 0x9f,

	/* Polyphonic Key Pressure (Aftertouch).
	 * This message is most often sent by pressing down on the key after it
	 * "bottoms out". */
	POLYPHONIC_AFTERTOUCH_CH1  : 0xa0,
	POLYPHONIC_AFTERTOUCH_CH2  : 0xa1,
	POLYPHONIC_AFTERTOUCH_CH3  : 0xa2,
	POLYPHONIC_AFTERTOUCH_CH4  : 0xa3,
	POLYPHONIC_AFTERTOUCH_CH5  : 0xa4,
	POLYPHONIC_AFTERTOUCH_CH6  : 0xa5,
	POLYPHONIC_AFTERTOUCH_CH7  : 0xa6,
	POLYPHONIC_AFTERTOUCH_CH8  : 0xa7,
	POLYPHONIC_AFTERTOUCH_CH9  : 0xa8,
	POLYPHONIC_AFTERTOUCH_CH10 : 0xa9,
	POLYPHONIC_AFTERTOUCH_CH11 : 0xaa,
	POLYPHONIC_AFTERTOUCH_CH12 : 0xab,
	POLYPHONIC_AFTERTOUCH_CH13 : 0xac,
	POLYPHONIC_AFTERTOUCH_CH14 : 0xad,
	POLYPHONIC_AFTERTOUCH_CH15 : 0xae,
	POLYPHONIC_AFTERTOUCH_CH16 : 0xaf,

	CONTROL_CHANGE_CH1  : 0xb0,
	CONTROL_CHANGE_CH2  : 0xb1,
	CONTROL_CHANGE_CH3  : 0xb2,
	CONTROL_CHANGE_CH4  : 0xb3,
	CONTROL_CHANGE_CH5  : 0xb4,
	CONTROL_CHANGE_CH6  : 0xb5,
	CONTROL_CHANGE_CH7  : 0xb6,
	CONTROL_CHANGE_CH8  : 0xb7,
	CONTROL_CHANGE_CH9  : 0xb8,
	CONTROL_CHANGE_CH10 : 0xb9,
	CONTROL_CHANGE_CH11 : 0xba,
	CONTROL_CHANGE_CH12 : 0xbb,
	CONTROL_CHANGE_CH13 : 0xbc,
	CONTROL_CHANGE_CH14 : 0xbd,
	CONTROL_CHANGE_CH15 : 0xbe,
	CONTROL_CHANGE_CH16 : 0xbf,

	PROGRAM_CHANGE_CH1  : 0xc0,
	PROGRAM_CHANGE_CH2  : 0xc1,
	PROGRAM_CHANGE_CH3  : 0xc2,
	PROGRAM_CHANGE_CH4  : 0xc3,
	PROGRAM_CHANGE_CH5  : 0xc4,
	PROGRAM_CHANGE_CH6  : 0xc5,
	PROGRAM_CHANGE_CH7  : 0xc6,
	PROGRAM_CHANGE_CH8  : 0xc7,
	PROGRAM_CHANGE_CH9  : 0xc8,
	PROGRAM_CHANGE_CH10 : 0xc9,
	PROGRAM_CHANGE_CH11 : 0xca,
	PROGRAM_CHANGE_CH12 : 0xcb,
	PROGRAM_CHANGE_CH13 : 0xcc,
	PROGRAM_CHANGE_CH14 : 0xcd,
	PROGRAM_CHANGE_CH15 : 0xce,
	PROGRAM_CHANGE_CH16 : 0xcf,

	CHANNEL_AFTERTOUCH_CH1  : 0xd0,
	CHANNEL_AFTERTOUCH_CH2  : 0xd1,
	CHANNEL_AFTERTOUCH_CH3  : 0xd2,
	CHANNEL_AFTERTOUCH_CH4  : 0xd3,
	CHANNEL_AFTERTOUCH_CH5  : 0xd4,
	CHANNEL_AFTERTOUCH_CH6  : 0xd5,
	CHANNEL_AFTERTOUCH_CH7  : 0xd6,
	CHANNEL_AFTERTOUCH_CH8  : 0xd7,
	CHANNEL_AFTERTOUCH_CH9  : 0xd8,
	CHANNEL_AFTERTOUCH_CH10 : 0xd9,
	CHANNEL_AFTERTOUCH_CH11 : 0xda,
	CHANNEL_AFTERTOUCH_CH12 : 0xdb,
	CHANNEL_AFTERTOUCH_CH13 : 0xdc,
	CHANNEL_AFTERTOUCH_CH14 : 0xdd,
	CHANNEL_AFTERTOUCH_CH15 : 0xde,
	CHANNEL_AFTERTOUCH_CH16 : 0xdf,

	PITCH_WHEEL_CH1  : 0xe0,
	PITCH_WHEEL_CH2  : 0xe1,
	PITCH_WHEEL_CH3  : 0xe2,
	PITCH_WHEEL_CH4  : 0xe3,
	PITCH_WHEEL_CH5  : 0xe4,
	PITCH_WHEEL_CH6  : 0xe5,
	PITCH_WHEEL_CH7  : 0xe6,
	PITCH_WHEEL_CH8  : 0xe7,
	PITCH_WHEEL_CH9  : 0xe8,
	PITCH_WHEEL_CH10 : 0xe9,
	PITCH_WHEEL_CH11 : 0xea,
	PITCH_WHEEL_CH12 : 0xeb,
	PITCH_WHEEL_CH13 : 0xec,
	PITCH_WHEEL_CH14 : 0xed,
	PITCH_WHEEL_CH15 : 0xee,
	PITCH_WHEEL_CH16 : 0xef
};

},{}],2:[function(require,module,exports){
module.exports = function(Nota) {
	/**
	 * MIDI input handler.
	 *
	 * @param {number} port
	 * @param {number} channel
	 *
	 * @returns {void}
	 */
	var MidiInput = function(port, channel) {
		this.port = port;
		this.channel = channel;
		this.input = Nota.MidiAccess.inputs.get(port);
	};

	MidiInput.prototype = {
		/**
		 * Sets the MIDI channel.
		 *
		 * @param {number} channel
		 *
		 * @returns {object}    MidiInput instance for method chaining.
		 */
		setChannel: function(channel) {
			this.channel = channel;
			return this;
		},

		/**
		 * Listens to MIDI messages.
		 *
		 * @param {function} callback
		 *
		 * @returns {object}    MidiInput instance for method chaining.
		 */
		on: function(callback) {
			this.input.onmidimessage = function(message) {
				callback(message);
			};
			return this;
		},

		/**
		 * Removes listeners from the MIDI input.
		 *
		 * @returns {object}    MidiInput instance for method chaining.
		 */
		off: function() {
			this.input.onmidimessage = null;
			return this;
		}
	};

	return MidiInput;
};

},{}],3:[function(require,module,exports){
module.exports = function(Nota) {
	/**
	 * MIDI output handler.
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
		 * Sends a MIDI message.
		 *
		 * @param {array} dataArray    An array with three items, representing the bytes in a MIDI message.
		 *
		 * @returns {object}    MidiOutput instance for method chaining.
		 */
		sendRawMessage: function(dataArray) {
			this.output.send(dataArray);
			return this;
		},

		/**
		 * Sets the MIDI channel.
		 *
		 * @param {number} channel
		 *
		 * @returns {object}    MidiOutput instance for method chaining.
		 */
		setChannel: function(channel) {
			this.channel = channel;
			return this;
		},

		/**
		 * Sets the specified note on.
		 *
		 * @param {number} note
		 * @param {number} velocity
		 * @param {number} [channel]
		 *
		 * @returns {object}
		 */
		noteOn: function(note, velocity, channel) {
			if (Nota.Utils.isUndefined(channel)) {
				var channel = this.channel;
			}

			var status = Nota.Utils.getStatusByte(Nota.Enum.NOTE_ON, channel);

			this.sendRawMessage([status, note, velocity]);

			return this;
		},

		/**
		 * Sets the specified note off.
		 *
		 * @param {number} note
		 * @param {number} velocity
		 * @param {number} [channel]
		 *
		 * @returns {object}
		 */
		noteOff: function(note, velocity, channel) {
			if (Nota.Utils.isUndefined(channel)) {
				var channel = this.channel;
			}

			var status = Nota.Utils.getStatusByte(Nota.Enum.NOTE_OFF, channel);

			this.sendRawMessage([status, note, velocity]);

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
	 * Lists the open MIDI ports from the Web MIDI API.
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

},{"./enum.js":1,"./midiInput.js":2,"./midiOutput.js":3,"./utils.js":5}],5:[function(require,module,exports){
module.exports = {
	/**
	 * Returns true if the specified object is undefined.
	 *
	 * @param {*} object
	 *
	 * @returns {boolean}
	 */
	isUndefined: function(object) {
		return (typeof object === 'undefined');
	},

	/**
	 * Returns true if the specified object is defined.
	 *
	 * @param {*} object
	 *
	 * @returns {boolean}
	 */
	isDefined: function(object) {
		return !this.isUndefined(object);
	},

	/**
	 * Generates status byte from the specified MIDI event and channel.
	 *
	 * @param {number} event      MIDI event enum.
	 * @param {number} channel    MIDI channel number. (1-16)
	 *
	 * @returns {number}    Status byte.
	 */
	getStatusByte: function(event, channel) {
		return event + channel - 1;
	}
};

},{}]},{},[1,2,3,4,5]);
