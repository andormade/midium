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

global.Midium = _midiumCore2.default;
exports.default = _midiumCore2.default;