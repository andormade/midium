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