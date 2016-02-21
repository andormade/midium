import Midium from 'midium-core';

const EVENT_ONLY = 0xf00000;
const EVENT_AND_CHANNEL = 0xff0000;
const PROGRAM_CHANGE = 0xc0;
const STATUS_STRING = 'programchange';
const ALL_CHANNEL = 0;

/**
 * Sets the specified program.
 *
 * @param {note} program         Program number 0-127
 * @param {number} [channel]     Channel 1-16
 *
 * @returns {object}
 */
export function programChange(program, channel = this.defaultChannel) {
	this.send(Midium.constuctMIDIMessageArray(
		PROGRAM_CHANGE, channel, program, 0
	));

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
export function onProgramChange(callback, channel = ALL_CHANNEL) {
	var mask = channel === ALL_CHANNEL ? EVENT_ONLY : EVENT_AND_CHANNEL,
		channel = channel === ALL_CHANNEL ? 1 : channel,
		message = Midium.constructMIDIMessage(
			PROGRAM_CHANGE, channel, 0, 0
		);

	return this.addEventListener(message, mask, function(event) {
		/* Extending the MIDI event with useful infos. */
		event.status = STATUS_STRING;
		event.channel = Midium.getChannelFromStatus(event.data[0]);
		event.program = event.data[1];
		callback(event);
	});
};
