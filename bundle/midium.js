(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Midium = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDefaultChannel = setDefaultChannel;

var _midiumCore = require('midium-core');

var _midiumCore2 = _interopRequireDefault(_midiumCore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Setter function for the default channel.
 *
 * @param {number} channel    MIDI channel 1-16.
 *
 * @returns {object}
 */
function setDefaultChannel(channel) {
  this.defaultChannel = channel;
  return this;
};
},{"midium-core":15}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.channelAftertouch = channelAftertouch;
exports.onChannelAftertouch = onChannelAftertouch;

var _midiumCore = require('midium-core');

var _midiumCore2 = _interopRequireDefault(_midiumCore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EVENT_ONLY = 0xf00000;
var EVENT_AND_CHANNEL = 0xff0000;
var CHANNEL_AFTERTOUCH = 0xd0;
var STATUS_STRING = 'channelaftertouch';
var ALL_CHANNEL = 0;

/**
 * Send a channel aftertouch message.
 *
 * @param {number} pressure      Pressure 0-127
 * @param {number} [channel]     Channel 1-16
 *
 * @returns {object}
 */
function channelAftertouch(pressure) {
	var channel = arguments.length <= 1 || arguments[1] === undefined ? this.defaultChannel : arguments[1];

	this.send(_midiumCore2.default.constructMIDIMessage(CHANNEL_AFTERTOUCH, channel, pressure, 0));

	return this;
};

/**
 * Registers an event listener for the channel aftertouch events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of the event listener for unbinding.
 */
function onChannelAftertouch(callback) {
	var channel = arguments.length <= 1 || arguments[1] === undefined ? ALL_CHANNEL : arguments[1];

	var mask = channel === ALL_CHANNEL ? EVENT_ONLY : EVENT_AND_CHANNEL,
	    channel = channel === ALL_CHANNEL ? 1 : channel,
	    message = _midiumCore2.default.constructMIDIMessage(CHANNEL_AFTERTOUCH, channel, 0, 0);

	return this.addEventListener(message, mask, function (event) {
		/* Extending the MIDI event with useful infos. */
		event.status = STATUS_STRING;
		event.channel = _midiumCore2.default.getChannelFromStatus(event.data[0]);
		event.pressure = event.data[1];
		callback(event);
	});
};
},{"midium-core":15}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.controlChange = controlChange;
exports.onControlChange = onControlChange;

var _midiumCore = require('midium-core');

var _midiumCore2 = _interopRequireDefault(_midiumCore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EVENT_ONLY = 0xf00000;
var EVENT_AND_CHANNEL = 0xff0000;
var CONTROL_CHANGE = 0xb0;
var STATUS_STRING = 'controlchange';
var ALL_CHANNEL = 0;

/**
 * Sets the value of the specified controller
 *
 * @param {note} controller      Controller number 0-127
 * @param {number} pressure      Pressure 0-127
 * @param {number} [channel]     Channel 1-16
 *
 * @returns {object}
 */
function controlChange(controller, value) {
	var channel = arguments.length <= 2 || arguments[2] === undefined ? this.defaultChannel : arguments[2];

	this.send(_midiumCore2.default.constructMIDIMessage(CONTROL_CHANGE, channel, controller, value));

	return this;
};

/**
 * Registers an event listener for the control change events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of the event listener for unbinding.
 */
function onControlChange(callback) {
	var channel = arguments.length <= 1 || arguments[1] === undefined ? ALL_CHANNEL : arguments[1];

	var mask = channel === ALL_CHANNEL ? EVENT_ONLY : EVENT_AND_CHANNEL,
	    channel = channel === ALL_CHANNEL ? 1 : channel,
	    message = _midiumCore2.default.constructMIDIMessage(CONTROL_CHANGE, channel, 0, 0);

	return this.addEventListener(message, mask, function (event) {
		/* Extending the MIDI event with useful infos. */
		event.status = STATUS_STRING;
		event.channel = _midiumCore2.default.getChannelFromStatus(event.data[0]);
		event.controller = event.data[1];
		event.controllerValue = event.data[2];
		callback(event);
	});
};
},{"midium-core":15}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _midinette = require('midinette');

var _midinette2 = _interopRequireDefault(_midinette);

var _midiumCore = require('midium-core');

var _midiumCore2 = _interopRequireDefault(_midiumCore);

var _channel = require('./channel');

var _channelAftertouch = require('./channelAftertouch');

var _controlChange = require('./controlChange');

var _noteOff = require('./noteOff');

var _noteOn = require('./noteOn');

var _pitchWheel = require('./pitchWheel');

var _polyAftertouch = require('./polyAftertouch');

var _programChange = require('./programChange');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.assign(_midiumCore2.default, _midinette2.default);

Object.assign(_midiumCore2.default.prototype, {
	onChannelAftertouch: _channelAftertouch.onChannelAftertouch,
	onControlChange: _controlChange.onControlChange,
	onNoteOff: _noteOff.onNoteOff,
	onNoteOn: _noteOn.onNoteOn,
	onPitchWheel: _pitchWheel.onPitchWheel,
	onPolyAftertouch: _polyAftertouch.onPolyAftertouch,
	onProgramChange: _programChange.onProgramChange,
	channelAftertouch: _channelAftertouch.channelAftertouch,
	controlChange: _controlChange.controlChange,
	noteOff: _noteOff.noteOff,
	noteOn: _noteOn.noteOn,
	pitchWheel: _pitchWheel.pitchWheel,
	polyAftertouch: _polyAftertouch.polyAftertouch,
	programChange: _programChange.programChange,
	setDefaultChannel: _channel.setDefaultChannel
});

exports.default = _midiumCore2.default;
module.exports = exports['default'];
},{"./channel":1,"./channelAftertouch":2,"./controlChange":3,"./noteOff":5,"./noteOn":6,"./pitchWheel":7,"./polyAftertouch":8,"./programChange":9,"midinette":12,"midium-core":15}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.noteOff = noteOff;
exports.onNoteOff = onNoteOff;

var _midiumCore = require('midium-core');

var _midiumCore2 = _interopRequireDefault(_midiumCore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EVENT_ONLY = 0xf00000;
var EVENT_AND_CHANNEL = 0xff0000;
var NOTE_ON = 0x90;
var NOTE_OFF = 0x80;
var STATUS_STRING = 'noteoff';
var DEFAULT_VELOCITY = 0;
var ALL_CHANNEL = 0;

/**
 * Sets the specified note off.
 *
 * @param {string|number} note    MIDI note 0-127
 * @param {number} [velocity]     Velocity 0-127
 * @param {number} [channel]      Channel 1-16
 *
 * @returns {object}
 */
function noteOff(note) {
	var velocity = arguments.length <= 1 || arguments[1] === undefined ? DEFAULT_VELOCITY : arguments[1];
	var channel = arguments.length <= 2 || arguments[2] === undefined ? this.defaultChannel : arguments[2];

	note = _midiumCore2.default.noteStringToMIDICode(note);

	this.send(_midiumCore2.default.constructMIDIMessage(NOTE_OFF, channel, note, velocity));

	return this;
};

/**
 * Registers an event listener for the note off events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of the event listener for unbinding.
 */
function onNoteOff(callback) {
	var channel = arguments.length <= 1 || arguments[1] === undefined ? ALL_CHANNEL : arguments[1];

	var mask = channel === ALL_CHANNEL ? EVENT_ONLY : EVENT_AND_CHANNEL,
	    channel = channel === ALL_CHANNEL ? 1 : channel,
	    message1 = _midiumCore2.default.constructMIDIMessage(NOTE_OFF, channel, 0, 0),
	    message2 = _midiumCore2.default.constructMIDIMessage(NOTE_ON, channel, 0, 0);

	return [this.addEventListener(message1, mask, function (event) {
		/* Extending the MIDI event with useful infos. */
		event.status = STATUS_STRING;
		event.channel = _midiumCore2.default.getChannelFromStatus(event.data[0]);
		event.note = event.data[1];
		event.velocity = event.data[2];
		callback(event);
	}), this.addEventListener(message2, mask, function (event) {
		/* By note on event, velocity 0 means note off. */
		if (event.data[2] !== 0) {
			return;
		}
		/* Extending the MIDI event with useful infos. */
		event.status = STATUS_STRING;
		event.channel = _midiumCore2.default.getChannelFromStatus(event.data[0]);
		event.note = event.data[1];
		event.velocity = 0;
		callback(event);
	})];
};
},{"midium-core":15}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.noteOn = noteOn;
exports.onNoteOn = onNoteOn;

var _midiumCore = require('midium-core');

var _midiumCore2 = _interopRequireDefault(_midiumCore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EVENT_ONLY = 0xf00000;
var EVENT_AND_CHANNEL = 0xff0000;
var NOTE_ON = 0x90;
var STATUS_STRING = 'noteon';
var DEFAULT_VELOCITY = 127;
var ALL_CHANNEL = 0;

/**
 * Sets the specified note on.
 *
 * @param {string|number} note    MIDI note 0-127
 * @param {number} [velocity]     Velocity 0-127
 * @param {number} [channel]      Channel 1-16
 *
 * @returns {object}
 */
function noteOn(note) {
	var velocity = arguments.length <= 1 || arguments[1] === undefined ? DEFAULT_VELOCITY : arguments[1];
	var channel = arguments.length <= 2 || arguments[2] === undefined ? this.defaultChannel : arguments[2];

	note = _midiumCore2.default.noteStringToMIDICode(note);

	this.send(_midiumCore2.default.constructMIDIMessage(NOTE_ON, channel, note, velocity));

	return this;
};

/**
 * Registers an event listener for the note on events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of the event listener for unbinding.
 */
function onNoteOn(callback) {
	var channel = arguments.length <= 1 || arguments[1] === undefined ? ALL_CHANNEL : arguments[1];

	var mask = channel === ALL_CHANNEL ? EVENT_ONLY : EVENT_AND_CHANNEL,
	    channel = channel === ALL_CHANNEL ? 1 : channel,
	    message = _midiumCore2.default.constructMIDIMessage(NOTE_ON, channel, 0, 0);

	return this.addEventListener(message, mask, function (event) {
		if (event.data[2] === 0) {
			return;
		}
		/* Extending the MIDI event with useful infos. */
		event.status = STATUS_STRING;
		event.channel = _midiumCore2.default.getChannelFromStatus(event.data[0]);
		event.note = event.data[1];
		event.velocity = event.data[2];
		callback(event);
	});
};
},{"midium-core":15}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.pitchWheel = pitchWheel;
exports.onPitchWheel = onPitchWheel;

var _midiumCore = require('midium-core');

var _midiumCore2 = _interopRequireDefault(_midiumCore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EVENT_ONLY = 0xf00000;
var EVENT_AND_CHANNEL = 0xff0000;
var PITCH_WHEEL = 0xe0;
var STATUS_STRING = 'pitchwheel';
var ALL_CHANNEL = 0;

/**
 * Sets the value of the pitch wheel.
 *
 * @param {number} value         Value 0-127
 * @param {number} [channel]     Channel 1-16
 *
 * @returns {object}
 */
function pitchWheel(value) {
	var channel = arguments.length <= 1 || arguments[1] === undefined ? this.defaultChannel : arguments[1];

	this.send(_midiumCore2.default.constructMIDIMessage(PITCH_WHEEL, channel, 0, value));

	return this;
};

/**
 * Registers an event listener for the pitch wheel events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of the event listener for unbinding.
 */
function onPitchWheel(callback) {
	var channel = arguments.length <= 1 || arguments[1] === undefined ? ALL_CHANNEL : arguments[1];

	var mask = channel === ALL_CHANNEL ? EVENT_ONLY : EVENT_AND_CHANNEL,
	    channel = channel === ALL_CHANNEL ? 1 : channel,
	    message = _midiumCore2.default.constructMIDIMessage(PITCH_WHEEL, channel, 0, 0);

	return this.addEventListener(message, mask, function (event) {
		/* Extending the MIDI event with useful infos. */
		event.status = STATUS_STRING;
		event.channel = _midiumCore2.default.getChannelFromStatus(event.data[0]);
		event.pitchWheel = event.data[2];
		callback(event);
	});
};
},{"midium-core":15}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.polyAftertouch = polyAftertouch;
exports.onPolyAftertouch = onPolyAftertouch;

var _midiumCore = require('midium-core');

var _midiumCore2 = _interopRequireDefault(_midiumCore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EVENT_ONLY = 0xf00000;
var EVENT_AND_CHANNEL = 0xff0000;
var POLYPHONIC_AFTERTOUCH = 0xa0;
var STATUS_STRING = 'polyaftertouch';
var ALL_CHANNEL = 0;

/**
 * Sends a polyphonic aftertouch message.
 *
 * @param {string|number} note    MIDI note 0-127
 * @param {number} pressure       Pressure 0-127
 * @param {number} [channel]      Channel 1-16
 *
 * @returns {object}
 */
function polyAftertouch(note, pressure) {
	var channel = arguments.length <= 2 || arguments[2] === undefined ? this.defaultChannel : arguments[2];

	note = _midiumCore2.default.noteStringToMIDICode(note);

	this.send(_midiumCore2.default.constructMIDIMessage(POLYPHONIC_AFTERTOUCH, channel, note, pressure));

	return this;
};

/**
 * Registers an event listener for the polyphonic aftertouch events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of the event listener for unbinding.
 */
function onPolyAftertouch(callback) {
	var channel = arguments.length <= 1 || arguments[1] === undefined ? ALL_CHANNEL : arguments[1];

	var mask = channel === ALL_CHANNEL ? EVENT_ONLY : EVENT_AND_CHANNEL,
	    channel = channel === ALL_CHANNEL ? 1 : channel,
	    message = _midiumCore2.default.constructMIDIMessage(POLYPHONIC_AFTERTOUCH, channel, 0, 0);

	return this.addEventListener(message, mask, function (event) {
		/* Extending the MIDI event with useful infos. */
		event.status = STATUS_STRING;
		event.channel = _midiumCore2.default.getChannelFromStatus(event.data[0]);
		event.note = event.data[1];
		event.pressure = event.data[2];
		callback(event);
	});
};
},{"midium-core":15}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.programChange = programChange;
exports.onProgramChange = onProgramChange;

var _midiumCore = require('midium-core');

var _midiumCore2 = _interopRequireDefault(_midiumCore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EVENT_ONLY = 0xf00000;
var EVENT_AND_CHANNEL = 0xff0000;
var PROGRAM_CHANGE = 0xc0;
var STATUS_STRING = 'programchange';
var ALL_CHANNEL = 0;

/**
 * Sets the specified program.
 *
 * @param {note} program         Program number 0-127
 * @param {number} [channel]     Channel 1-16
 *
 * @returns {object}
 */
function programChange(program) {
	var channel = arguments.length <= 1 || arguments[1] === undefined ? this.defaultChannel : arguments[1];

	this.send(_midiumCore2.default.constructMIDIMessage(PROGRAM_CHANGE, channel, program, 0));

	return this;
};

/**
 * Registers an event listener for the program change events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of the event listener for unbinding.
 */
function onProgramChange(callback) {
	var channel = arguments.length <= 1 || arguments[1] === undefined ? ALL_CHANNEL : arguments[1];

	var mask = channel === ALL_CHANNEL ? EVENT_ONLY : EVENT_AND_CHANNEL,
	    channel = channel === ALL_CHANNEL ? 1 : channel,
	    message = _midiumCore2.default.constructMIDIMessage(PROGRAM_CHANGE, channel, 0, 0);

	return this.addEventListener(message, mask, function (event) {
		/* Extending the MIDI event with useful infos. */
		event.status = STATUS_STRING;
		event.channel = _midiumCore2.default.getChannelFromStatus(event.data[0]);
		event.program = event.data[1];
		callback(event);
	});
};
},{"midium-core":15}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	/*
  * Control change
  */
	BANK_SELECT: 0x00,
	MODULATION_WHEEL: 0x01,
	BREATH_CONTROLLER: 0x02,
	FOOT_CONTROLLER: 0x04,
	PORTAMENTO_TIME: 0x05,
	DATA_ENTRY_MSB: 0x06,
	CHANNEL_VOLUME: 0x07,
	BALANCE: 0x08,
	PAN: 0x0a,
	EXPRESSION_CONTROLLER: 0x0b,
	EFFECT_CONTROL_1: 0x0c,
	EFFECT_CONTROL_2: 0x0d,
	GENERAL_PURPOSE_CONTROLLER_1: 0x10,
	GENERAL_PURPOSE_CONTROLLER_2: 0x11,
	GENERAL_PURPOSE_CONTROLLER_3: 0x12,
	GENERAL_PURPOSE_CONTROLLER_4: 0x13,
	BANK_SELECT_LSB: 0x20,
	MODULATION_WHEEL_LSB: 0x21,
	BREATH_CONTROLLER_LSB: 0x22,
	FOOT_CONTROLLER_LSB: 0x24,
	PORTAMENTO_TIME_LSB: 0x25,
	DATA_ENTRY_LSB: 0x26,
	CHANNEL_VOLUME_LSB: 0x27,
	BALANCE_LSB: 0x28,
	PAN_LSB: 0x2a,
	EXPRESSION_CONTROLLER_LSB: 0x2b,
	EFFECT_CONTROL_1_LSB: 0x2c,
	EFFECT_CONTROL_2_LSB: 0x2d,
	GENERAL_PURPOSE_CONTROLLER_1_LSB: 0x30,
	GENERAL_PURPOSE_CONTROLLER_2_LSB: 0x31,
	GENERAL_PURPOSE_CONTROLLER_3_LSB: 0x32,
	GENERAL_PURPOSE_CONTROLLER_4_LSB: 0x33,
	PORTAMENTO_ON_OFF: 0x41,
	SOSTENUTO_ON_OFF: 0x42,
	SOFT_PEDAL_ON_OFF: 0x43,
	LEGATO_FOOTSWITCH: 0x44,
	HOLD: 0x45,
	SOUND_CONTROLLER_1: 0x46,
	SOUND_CONTROLLER_2: 0x47,
	SOUND_CONTROLLER_3: 0x48,
	SOUND_CONTROLLER_4: 0x49,
	SOUND_CONTROLLER_5: 0x4a,
	SOUND_CONTROLLER_6: 0x4b,
	SOUND_CONTROLLER_7: 0x4c,
	SOUND_CONTROLLER_8: 0x4d,
	SOUND_CONTROLLER_9: 0x4e,
	SOUND_CONTROLLER_10: 0x4f,
	GENERAL_PURPOSE_CONTROLLER_5: 0x50,
	GENERAL_PURPOSE_CONTROLLER_6: 0x51,
	GENERAL_PURPOSE_CONTROLLER_7: 0x52,
	GENERAL_PURPOSE_CONTROLLER_8: 0x53,
	PORTAMENTO_CONTROL: 0x54,
	HIGH_RESOLUTION_VELOCITY_PREFIX: 0x58
};
},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isMIDIStatus = isMIDIStatus;
exports.isMIDIMessage = isMIDIMessage;
exports.isMIDIByteArray = isMIDIByteArray;
exports.intToByteArray = intToByteArray;
exports.getMIDIStatus = getMIDIStatus;
exports.isNoteOn = isNoteOn;
exports.isNoteOff = isNoteOff;
exports.isControlChange = isControlChange;
exports.isPitchWheel = isPitchWheel;
exports.isPolyphonicAftertouch = isPolyphonicAftertouch;
exports.isProgramChange = isProgramChange;
exports.isChannelAftertouch = isChannelAftertouch;
exports.constructMIDIMessage = constructMIDIMessage;
exports.noteStringToMIDICode = noteStringToMIDICode;
exports.getChannelFromStatus = getChannelFromStatus;
function isMIDIStatus(code) {
	if (typeof code !== 'number') {
		return false;
	}

	return code >= Midinette.NOTE_OFF_CH1 && code <= Midinette.PITCH_WHEEL_CH16;
};

function isMIDIMessage(code) {
	return typeof code === 'number' && Number.isInteger(code) && code >= 0x000000 && code <= 0xffffff;
};

function isMIDIByteArray(byteArray) {
	return Array.isArray(byteArray) && byteArray.length === 3 && Number.isInteger(byteArray[0]) && Number.isInteger(byteArray[1]) && Number.isInteger(byteArray[2]) && byteArray[0] >= 0x00 && byteArray[0] <= 0xff && byteArray[1] >= 0x00 && byteArray[1] <= 0xff && byteArray[2] >= 0x00 && byteArray[2] <= 0xff;
};

function intToByteArray(int) {
	if (Midinette.isMIDIByteArray(int)) {
		return int;
	}
	return [int >> 16, int >> 8 & 0x00ff, int & 0x0000ff];
};

function getMIDIStatus(code) {
	if (Midinette.isMIDIStatus(code)) {
		return code;
	} else if (Midinette.isMIDIByteArray(code)) {
		return code[0];
	} else if (Midinette.isMIDIMessage(code)) {
		return Midinette.getMIDIEvent(Midinette.intToByteArray(code));
	}

	return 0;
};

function isNoteOn(code) {
	return Midinette.isMIDIStatus(code) && code >= Midinette.NOTE_ON_CH1 && code <= Midinette.NOTE_ON_CH16;
};

function isNoteOff(code) {
	return Midinette.isMIDIStatus(code) && code >= Midinette.NOTE_OFF_CH1 && code <= Midinette.NOTE_OFF_CH16;
};

function isControlChange(code) {
	return Midinette.isMIDIStatus(code) && code >= Midinette.CONTROL_CHANGE_CH1 && code <= Midinette.CONTROL_CHANGE_CH16;
};

function isPitchWheel(code) {
	return Midinette.isMIDIStatus(code) && code >= Midinette.PITCH_WHEEL_CH1 && code <= Midinette.PITCH_WHEEL_CH16;
};

function isPolyphonicAftertouch(data) {
	return Midinette.isMIDIStatus(code) && code >= Midinette.POLYPHONIC_AFTERTOUCH_CH1 && code <= Midinette.POLYPHONIC_AFTERTOUCH_CH16;
};

function isProgramChange(data) {
	return Midinette.isMIDIStatus(code) && code >= Midinette.PROGRAM_CHANGE_CH1 && code <= Midinette.PROGRAM_CHANGE_CH16;
};

function isChannelAftertouch(data) {
	return Midinette.isMIDIStatus(code) && code >= Midinette.CHANNEL_AFTERTOUCH_CH1 && code <= Midinette.CHANNEL_AFTERTOUCH_CH16;
};

function constructMIDIMessage(event, channel, data1, data2) {
	return [(event & 0xf0) + (channel - 1), data1, data2];
};

function noteStringToMIDICode(note) {
	if (typeof note === 'string' && typeof Midinette[note] === 'number') {
		return Midinette[note];
	} else if (typeof note === 'number') {
		return note;
	}
	return 0;
};

function getChannelFromStatus(status) {
	return status % 0x10 + 1;
};
},{}],12:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _functions = require('./functions');

var Functions = _interopRequireWildcard(_functions);

var _midiNotes = require('./midiNotes');

var _midiNotes2 = _interopRequireDefault(_midiNotes);

var _statusCodes = require('./statusCodes');

var _statusCodes2 = _interopRequireDefault(_statusCodes);

var _controlChange = require('./controlChange');

var _controlChange2 = _interopRequireDefault(_controlChange);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var Midinette = Object.assign({}, _controlChange2.default, _midiNotes2.default, _statusCodes2.default, Functions);

global.Midinette = Midinette;

exports.default = Midinette;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./controlChange":10,"./functions":11,"./midiNotes":13,"./statusCodes":14}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	/*
  * MIDI notes
  */
	'C0': 0, 'C#0': 1, 'D0': 2, 'D#0': 3, 'E0': 4, 'F0': 5, 'F#0': 6,
	'G0': 7, 'G#0': 8, 'A0': 9, 'A#0': 10, 'B0': 11, 'C1': 12, 'C#1': 13,
	'D1': 14, 'D#1': 15, 'E1': 16, 'F1': 17, 'F#1': 18, 'G1': 19,
	'G#1': 20, 'A1': 21, 'A#1': 22, 'B1': 23, 'C2': 24, 'C#2': 25,
	'D2': 26, 'D#2': 27, 'E2': 28, 'F2': 29, 'F#2': 30, 'G2': 31,
	'G#2': 32, 'A2': 33, 'A#2': 34, 'B2': 35, 'C3': 36, 'C#3': 37,
	'D3': 38, 'D#3': 39, 'E3': 40, 'F3': 41, 'F#3': 42, 'G3': 43,
	'G#3': 44, 'A3': 45, 'A#3': 46, 'B3': 47, 'C4': 48, 'C#4': 49,
	'D4': 50, 'D#4': 51, 'E4': 52, 'F4': 53, 'F#4': 54, 'G4': 55,
	'G#4': 56, 'A4': 57, 'A#4': 58, 'B4': 59, 'C5': 60, 'C#5': 61,
	'D5': 62, 'D#5': 63, 'E5': 64, 'F5': 65, 'F#5': 66, 'G5': 67,
	'G#5': 68, 'A5': 69, 'A#5': 70, 'B5': 71, 'C6': 72, 'C#6': 73,
	'D6': 74, 'D#6': 75, 'E6': 76, 'F6': 77, 'F#6': 78, 'G6': 79,
	'G#6': 80, 'A6': 81, 'A#6': 82, 'B6': 83, 'C7': 84, 'C#7': 85,
	'D7': 86, 'D#7': 87, 'E7': 88, 'F7': 89, 'F#7': 90, 'G7': 91,
	'G#7': 92, 'A7': 93, 'A#7': 94, 'B7': 95, 'C8': 96, 'C#8': 97,
	'D8': 98, 'D#8': 99, 'E8': 100, 'F8': 101, 'F#8': 102, 'G8': 103,
	'G#8': 104, 'A8': 105, 'A#8': 106, 'B8': 107, 'C9': 108, 'C#9': 109,
	'D9': 110, 'D#9': 111, 'E9': 112, 'F9': 113, 'F#9': 114, 'G9': 115,
	'G#9': 116, 'A9': 117, 'A#9': 118, 'B9': 119, 'C10': 120, 'C#10': 121,
	'D10': 122, 'D#10': 123, 'E10': 124, 'F10': 125, 'F#10': 126,
	'G10': 127
};
},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	NOTE_OFF: 0x80,
	NOTE_ON: 0x90,
	POLYPHONIC_AFTERTOUCH: 0xa0,
	CONTROL_CHANGE: 0xb0,
	PROGRAM_CHANGE: 0xc0,
	CHANNEL_AFTERTOUCH: 0xd0,
	PITCH_WHEEL: 0xe0,

	/*
  * Note Off event.
  * This message is sent when a note is released (ended).
  */
	NOTE_OFF_CH1: 0x80,
	NOTE_OFF_CH2: 0x81,
	NOTE_OFF_CH3: 0x82,
	NOTE_OFF_CH4: 0x83,
	NOTE_OFF_CH5: 0x84,
	NOTE_OFF_CH6: 0x85,
	NOTE_OFF_CH7: 0x86,
	NOTE_OFF_CH8: 0x87,
	NOTE_OFF_CH9: 0x88,
	NOTE_OFF_CH10: 0x89,
	NOTE_OFF_CH11: 0x8a,
	NOTE_OFF_CH12: 0x8b,
	NOTE_OFF_CH13: 0x8c,
	NOTE_OFF_CH14: 0x8d,
	NOTE_OFF_CH15: 0x8e,
	NOTE_OFF_CH16: 0x8f,

	/*
  * Note On event.
  * This message is sent when a note is depressed (start).
  */
	NOTE_ON_CH1: 0x90,
	NOTE_ON_CH2: 0x91,
	NOTE_ON_CH3: 0x92,
	NOTE_ON_CH4: 0x93,
	NOTE_ON_CH5: 0x94,
	NOTE_ON_CH6: 0x95,
	NOTE_ON_CH7: 0x96,
	NOTE_ON_CH8: 0x97,
	NOTE_ON_CH9: 0x98,
	NOTE_ON_CH10: 0x99,
	NOTE_ON_CH11: 0x9a,
	NOTE_ON_CH12: 0x9b,
	NOTE_ON_CH13: 0x9c,
	NOTE_ON_CH14: 0x9d,
	NOTE_ON_CH15: 0x9e,
	NOTE_ON_CH16: 0x9f,

	/*
  * Polyphonic Key Pressure (Aftertouch).
  * This message is most often sent by pressing down on the key after it
  * "bottoms out".
  */
	POLYPHONIC_AFTERTOUCH_CH1: 0xa0,
	POLYPHONIC_AFTERTOUCH_CH2: 0xa1,
	POLYPHONIC_AFTERTOUCH_CH3: 0xa2,
	POLYPHONIC_AFTERTOUCH_CH4: 0xa3,
	POLYPHONIC_AFTERTOUCH_CH5: 0xa4,
	POLYPHONIC_AFTERTOUCH_CH6: 0xa5,
	POLYPHONIC_AFTERTOUCH_CH7: 0xa6,
	POLYPHONIC_AFTERTOUCH_CH8: 0xa7,
	POLYPHONIC_AFTERTOUCH_CH9: 0xa8,
	POLYPHONIC_AFTERTOUCH_CH10: 0xa9,
	POLYPHONIC_AFTERTOUCH_CH11: 0xaa,
	POLYPHONIC_AFTERTOUCH_CH12: 0xab,
	POLYPHONIC_AFTERTOUCH_CH13: 0xac,
	POLYPHONIC_AFTERTOUCH_CH14: 0xad,
	POLYPHONIC_AFTERTOUCH_CH15: 0xae,
	POLYPHONIC_AFTERTOUCH_CH16: 0xaf,

	/*
  * Control Change.
  * This message is sent when a controller value changes. Controllers include
  * devices such as pedals and levers. Controller numbers 120-127 are
  * reserved as "Channel Mode Messages".
  */
	CONTROL_CHANGE_CH1: 0xb0,
	CONTROL_CHANGE_CH2: 0xb1,
	CONTROL_CHANGE_CH3: 0xb2,
	CONTROL_CHANGE_CH4: 0xb3,
	CONTROL_CHANGE_CH5: 0xb4,
	CONTROL_CHANGE_CH6: 0xb5,
	CONTROL_CHANGE_CH7: 0xb6,
	CONTROL_CHANGE_CH8: 0xb7,
	CONTROL_CHANGE_CH9: 0xb8,
	CONTROL_CHANGE_CH10: 0xb9,
	CONTROL_CHANGE_CH11: 0xba,
	CONTROL_CHANGE_CH12: 0xbb,
	CONTROL_CHANGE_CH13: 0xbc,
	CONTROL_CHANGE_CH14: 0xbd,
	CONTROL_CHANGE_CH15: 0xbe,
	CONTROL_CHANGE_CH16: 0xbf,

	/*
  * Program Change.
  * This message sent when the patch number changes.
  */
	PROGRAM_CHANGE_CH1: 0xc0,
	PROGRAM_CHANGE_CH2: 0xc1,
	PROGRAM_CHANGE_CH3: 0xc2,
	PROGRAM_CHANGE_CH4: 0xc3,
	PROGRAM_CHANGE_CH5: 0xc4,
	PROGRAM_CHANGE_CH6: 0xc5,
	PROGRAM_CHANGE_CH7: 0xc6,
	PROGRAM_CHANGE_CH8: 0xc7,
	PROGRAM_CHANGE_CH9: 0xc8,
	PROGRAM_CHANGE_CH10: 0xc9,
	PROGRAM_CHANGE_CH11: 0xca,
	PROGRAM_CHANGE_CH12: 0xcb,
	PROGRAM_CHANGE_CH13: 0xcc,
	PROGRAM_CHANGE_CH14: 0xcd,
	PROGRAM_CHANGE_CH15: 0xce,
	PROGRAM_CHANGE_CH16: 0xcf,

	/*
  * Channel Pressure (After-touch).
  * This message is most often sent by pressing down on the key after it
  * "bottoms out". This message is different from polyphonic after-touch. Use
  * this message to send the single greatest pressure value (of all the
  * current depressed keys).
  */
	CHANNEL_AFTERTOUCH_CH1: 0xd0,
	CHANNEL_AFTERTOUCH_CH2: 0xd1,
	CHANNEL_AFTERTOUCH_CH3: 0xd2,
	CHANNEL_AFTERTOUCH_CH4: 0xd3,
	CHANNEL_AFTERTOUCH_CH5: 0xd4,
	CHANNEL_AFTERTOUCH_CH6: 0xd5,
	CHANNEL_AFTERTOUCH_CH7: 0xd6,
	CHANNEL_AFTERTOUCH_CH8: 0xd7,
	CHANNEL_AFTERTOUCH_CH9: 0xd8,
	CHANNEL_AFTERTOUCH_CH10: 0xd9,
	CHANNEL_AFTERTOUCH_CH11: 0xda,
	CHANNEL_AFTERTOUCH_CH12: 0xdb,
	CHANNEL_AFTERTOUCH_CH13: 0xdc,
	CHANNEL_AFTERTOUCH_CH14: 0xdd,
	CHANNEL_AFTERTOUCH_CH15: 0xde,
	CHANNEL_AFTERTOUCH_CH16: 0xdf,

	/*
  * Pitch Bend Change.
  * This message is sent to indicate a change in the pitch bender (wheel or
  * lever, typically). The pitch bender is measured by a fourteen bit value.
  * Center (no pitch change) is 2000H.
  */
	PITCH_WHEEL_CH1: 0xe0,
	PITCH_WHEEL_CH2: 0xe1,
	PITCH_WHEEL_CH3: 0xe2,
	PITCH_WHEEL_CH4: 0xe3,
	PITCH_WHEEL_CH5: 0xe4,
	PITCH_WHEEL_CH6: 0xe5,
	PITCH_WHEEL_CH7: 0xe6,
	PITCH_WHEEL_CH8: 0xe7,
	PITCH_WHEEL_CH9: 0xe8,
	PITCH_WHEEL_CH10: 0xe9,
	PITCH_WHEEL_CH11: 0xea,
	PITCH_WHEEL_CH12: 0xeb,
	PITCH_WHEEL_CH13: 0xec,
	PITCH_WHEEL_CH14: 0xed,
	PITCH_WHEEL_CH15: 0xee,
	PITCH_WHEEL_CH16: 0xef
};
},{}],15:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _midium = require('./midium');

var _midium2 = _interopRequireDefault(_midium);

var _utils = require('./utils');

var Utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.assign(_midium2.default, Utils);

global.Midium = _midium2.default;
exports.default = _midium2.default;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./midium":16,"./utils":17}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Midium = function () {
	/**
  * Constructor for a port colletion.
  *
  * @param {array} ports
  *
  * @returns {*}
  */

	function Midium(ports) {
		_classCallCheck(this, Midium);

		this.eventListeners = [];
		this.ports = [];

		for (var i = 0; i < ports.length; i++) {
			this.add(ports[i]);
		}
	}

	/**
  * Calls back when the MIDI driver is ready.
  *
  * @param {function} callback    Calls when the MIDI connection is ready.
  * @param {function} errorCallback
  *
  * @returns {void}
  */


	_createClass(Midium, [{
		key: 'add',


		/**
   * Adds MIDI port to the collection.
   *
   * @param {object} port    MIDI port
   *
   * @returns {object} Reference of this for method chaining.
   */
		value: function add(port) {
			port.onstatechange = this._onStateChange.bind(this);
			port.onmidimessage = this._onMIDIMessage.bind(this);
			this.ports.push(port);

			return this;
		}

		/**
   * Removes the references from the selected MIDI ports.
   *
   * @returns {void}
   */

	}, {
		key: 'removeReferences',
		value: function removeReferences() {
			this.ports.forEach(function (port) {
				port.onmidimessage = null;
				port.onstatechange = null;
			});
		}

		/**
   * Sends raw MIDI data.
   *
   * @param {number|array} message    24 bit byte array or integer
   *
   * @returns {object} Reference of this for method chaining.
   */

	}, {
		key: 'send',
		value: function send(message) {
			message = Midium.intToByteArray(message);

			this.ports.forEach(function (port) {
				if (port.type === 'output') {
					console.log('send', message);
					port.send(message);
				}
			});

			return this;
		}

		/**
   * Register an event listener.
   *
   * @param {number|array} event    24 bit byte array or integer
   * @param {number|array} mask     24 bit byte array or integer
   * @param {function} callback
   *
   * @returns {object} Returns with the reference of the event listener.
   */

	}, {
		key: 'addEventListener',
		value: function addEventListener(event, mask, callback) {
			this.eventListeners.push({
				event: Midium.byteArrayToInt(event),
				mask: Midium.byteArrayToInt(mask),
				reference: Midium.listenerCounter,
				callback: callback
			});

			return Midium.listenerCounter++;
		}

		/**
   * Removes the given event listener or event listeners.
   *
   * @param {number|array} references    Event listener references.
   *
   * @returns {void}
   */

	}, {
		key: 'removeEventListener',
		value: function removeEventListener(references) {
			Array.prototype.concat(references).forEach(function (reference) {
				this.eventListeners.forEach(function (listener, index) {
					if (listener.reference === reference) {
						this.eventListeners.splice(index, 1);
					}
				}, this);
			}, this);
		}

		/**
   * MIDI message event handler.
   *
   * @param {object} event    MIDI event data.
   *
   * @returns {void}
   */

	}, {
		key: '_onMIDIMessage',
		value: function _onMIDIMessage(event) {
			var data = Midium.byteArrayToInt(event.data);
			this.eventListeners.forEach(function (listener) {
				if ((data & listener.mask) === listener.event) {
					listener.callback(event);
				}
			}, this);
		}

		/**
   * State change event handler.
   *
   * @param {object} event    State change event data.
   *
   * @returns {void}
   */

	}, {
		key: '_onStateChange',
		value: function _onStateChange(event) {
			console.log('state', event);
		}
	}], [{
		key: 'ready',
		value: function ready(callback, errorCallback) {
			if (Midium.isReady) {
				callback();
			}

			navigator.requestMIDIAccess({
				sysex: false
			}).then(

			/* MIDI access granted */
			function (midiAccess) {
				Midium.isReady = true;
				Midium.midiAccess = midiAccess;
				callback();
			},

			/* MIDI access denied */
			function (error) {
				Midium.isReady = false;
				if (errorCallback) {
					errorCallback(error);
				}
			});
		}
	}, {
		key: 'select',
		value: function select(selector) {
			if (!Midium.isReady) {
				return [];
			}

			var ports = [];

			/* If the query is a MIDIInput or output. */
			if (selector instanceof window.MIDIOutput || selector instanceof window.MIDIInput) {
				ports[0] = selector;
			} else if (typeof selector === 'number' && Midium.midiAccess.inputs.has(query)) {
				ports[0] = Midium.midiAccess.inputs.get(query);
			} else if (typeof query === 'number' && Midium.midiAccess.outputs.has(query)) {
				ports[0] = Midium.midiAccess.outputs.get(query);
			} else if (selector instanceof Array) {
				selector.forEach(function (item) {
					ports.push(Midium.select(item)[0]);
				});
			} else if (typeof selector === 'string' || selector instanceof window.RegExp) {
				var name = '';

				Midium.midiAccess.inputs.forEach(function each(port) {
					name = port.name + ' ' + port.manufacturer;
					if (new RegExp(selector, 'i').test(name)) {
						ports.push(port);
					}
				});

				Midium.midiAccess.outputs.forEach(function each(port) {
					name = port.name + ' ' + port.manufacturer;
					if (new RegExp(selector, 'i').test(name)) {
						ports.push(port);
					}
				});
			}

			return new Midium(ports);
		}
	}]);

	return Midium;
}();

Midium.midiAccess = null;
Midium.isReady = false;
Midium.listenerCounter = 0;

exports.default = Midium;

},{}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.byteArrayToInt = byteArrayToInt;
exports.intToByteArray = intToByteArray;
/**
 * Converts byte array to 24 bit integer.
 *
 * @param {number|array} byteArray    Byte array
 *
 * @returns {void}
 */
function byteArrayToInt(byteArray) {
  if (typeof byteArray === 'number') {
    return byteArray;
  }

  return byteArray[0] * 0x10000 + byteArray[1] * 0x100 + byteArray[2];
};

/**
 * Converts 24 bit integer to byte array.
 *
 * @param {number|array} int    24 bit integer
 *
 * @returns {void}
 */
function intToByteArray(int) {
  if (typeof int === 'array') {
    return int;
  }

  return [int >> 16, int >> 8 & 0x00ff, int & 0x0000ff];
};
},{}]},{},[4])(4)
});