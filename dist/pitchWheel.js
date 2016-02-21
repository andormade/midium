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

	this.send(_midiumCore2.default.constuctMIDIMessageArray(PITCH_WHEEL, channel, 0, value));

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