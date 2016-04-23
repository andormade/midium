import Utils from 'midinette';

const NOTE_ON = 0x90;
const NOTE_OFF = 0x80;
const DEFAULT_VELOCITY = 127;
const DEFAULT_TIME = 100;

/**
 * Simulates a note pressing an a keyborard by sending a note on event and then
 * after a specified time it will immediatly sends a note off event.
 *
 * @param {number|string} note    A note to press.
 * @param {number} [time]         Time to wait for the release.
 * @param {number} [velocity]     Velocity.
 * @param {number} [channel]      MIDI Channel.
 *
 * @returns {object}
 */
export function notePress(
	note,
	time = DEFAULT_TIME,
	velocity = DEFAULT_VELOCITY,
	channel = this.defaultChannel
) {
	note = Utils.noteStringToMIDICode(note);

	this.send(Utils.constructMIDIMessage(
		NOTE_ON, channel, note, velocity
	));

	this.send(Utils.constructMIDIMessage(
		NOTE_OFF, channel, note, 0
	), time);

	return this;
}
