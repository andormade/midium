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