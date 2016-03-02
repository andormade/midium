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