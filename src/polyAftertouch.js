import Midium from 'midium-core';
import isUndefined from 'lodash.isUndefined';

const EVENT_ONLY = 0xf00000;
const EVENT_AND_CHANNEL = 0xff0000;
const POLYPHONIC_AFTERTOUCH = 0xa0;
const STATUS_STRING = 'polyaftertouch';
const ALL_CHANNEL = 0;

/**
 * Sends a polyphonic aftertouch message.
 *
 * @param {string|number} note    MIDI note 0-127
 * @param {number} pressure       Pressure 0-127
 * @param {number} [channel]      Channel 1-16
 *
 * @returns {object}
 */
export function polyAftertouch(note, pressure, channel = this.defaultChannel) {
	note = Midium.noteStringToMIDICode(note);

	this.send(Midium.constuctMIDIMessageArray(
		POLYPHONIC_AFTERTOUCH, channel, note, pressure
	));

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
export function onPolyAftertouch(callback, channel = ALL_CHANNEL) {
	var mask = channel === ALL_CHANNEL ? EVENT_ONLY : EVENT_AND_CHANNEL,
		channel = channel === ALL_CHANNEL ? 1 : channel,
		message = Midium.constructMIDIMessage(
			POLYPHONIC_AFTERTOUCH, channel, 0, 0
		);

	return this.addEventListener(message, mask, function(event) {
		/* Extending the MIDI event with useful infos. */
		event.status = STATUS_STRING;
		event.channel = Midium.getChannelFromStatus(event.data[0]);
		event.note = event.data[1];
		event.pressure = event.data[2];
		callback(event);
	});
};
