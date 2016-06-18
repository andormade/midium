import Utils from 'midinette';

const NOTE_ON = 0x90;
const STATUS_STRING = 'noteon';
const DEFAULT_VELOCITY = 127;
const ALL_CHANNEL = -1;
const ALL_NOTES = -1;

/**
 * Sets the specified note on.
 *
 * @param {string|number} note    MIDI note 0-127
 * @param {number} [velocity]     Velocity 0-127
 * @param {number} [channel]      Channel 1-16
 *
 * @returns {object}
 */
export function noteOn(
	note,
	velocity = DEFAULT_VELOCITY,
	channel = this.defaultChannel
) {
	note = Utils.noteStringToMIDICode(note);

	this.send(Utils.constructMIDIMessage(
		NOTE_ON, channel, note, velocity
	));

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
export function onNoteOn(callback, note = ALL_NOTES, channel = ALL_CHANNEL) {
	let mask = Utils.eventMask(true, channel !== ALL_CHANNEL,
		note !== ALL_NOTES);
	let message = Utils.constructMIDIMessage(NOTE_ON, channel, note, 0);

	return this.addEventListener(message, mask, function(event) {
		if (event.data[2] === 0) {
			return;
		}
		/* Extending the MIDI event with useful infos. */
		event.status = STATUS_STRING;
		event.channel = Utils.getChannelFromStatus(event.data[0]);
		event.note = event.data[1];
		event.velocity = event.data[2];
		callback(event);
	});
};
