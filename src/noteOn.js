import Utils from './utils';
import {NOTE_ON} from './constants/statusCodes';
import {ALL_CHANNELS, ALL_NOTES} from './constants/defaults';
import Midium from './midium';

const STATUS_STRING = 'noteon';
const DEFAULT_VELOCITY = 127;

export default class NoteOn extends Midium {
	/**
	 * Sets the specified note on.
	 *
	 * @param {string|number|array} notes    MIDI note 0-127
	 * @param {number} [velocity]            Velocity 0-127
	 * @param {number} [channel]             Channel 1-16
	 *
	 * @returns {object}
	 */
	noteOn(notes, velocity = DEFAULT_VELOCITY, channel = this.defaultChannel) {
		Array.prototype.concat(notes).forEach((note) => {
			note = Utils.noteStringToMIDICode(note);
			this.send(Utils.constructMIDIMessage(
				NOTE_ON, channel, note, velocity
			));
		});

		return this;
	}

	/**
	 * Registers an event listener for the note on events.
	 *
	 * @param {function} callback
	 * @param {number} [channel]
	 *
	 * @returns {object} Reference of the event listener for unbinding.
	 */
	onNoteOn(callback, note = ALL_NOTES, channel = ALL_CHANNELS) {
		note = Utils.noteStringToMIDICode(note);
		let mask = Utils.eventMask(true, channel !== ALL_CHANNELS,
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
	}
}
