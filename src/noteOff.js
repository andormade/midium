import Utils from './utils';
import {NOTE_ON, NOTE_OFF} from './constants/statusCodes';
import {ALL_CHANNELS, ALL_NOTES} from './constants/defaults';
import Midium from './midium';

const STATUS_STRING = 'noteoff';
const DEFAULT_VELOCITY = 0;

export default class NoteOff extends Midium {
	/**
	 * Sets the specified note off.
	 *
	 * @param {string|number|array} notes    MIDI note 0-127
	 * @param {number} [velocity]            Velocity 0-127
	 * @param {number} [channel]             Channel 1-16
	 *
	 * @returns {object}
	 */
	noteOff(
		notes, velocity = DEFAULT_VELOCITY, channel = this.defaultChannel
	) {
		Array.prototype.concat(notes).forEach((note) => {
			note = Utils.noteStringToMIDICode(note);
			this.send(Utils.constructMIDIMessage(
				NOTE_OFF, channel, note, velocity
			));
		});

		return this;
	}

	/**
	 * Registers an event listener for the note off events.
	 *
	 * @param {function} callback
	 * @param {number} [channel]
	 *
	 * @returns {object} Reference of the event listener for unbinding.
	 */
	onNoteOff(callback, note = ALL_NOTES, channel = ALL_CHANNELS) {
		note = Utils.noteStringToMIDICode(note);
		let mask = Utils.eventMask(true, channel !== ALL_CHANNELS,
			note !== ALL_NOTES);
		let message1 = Utils.constructMIDIMessage(NOTE_OFF, channel, note, 0);
		let message2 = Utils.constructMIDIMessage(NOTE_ON, channel, note, 0);

		return [
			this.addEventListener(message1, mask, function(event) {
				/* Extending the MIDI event with useful infos. */
				event.status = STATUS_STRING;
				event.channel = Utils.getChannelFromStatus(event.data[0]);
				event.note = event.data[1];
				event.velocity = event.data[2];
				callback(event);
			}),
			this.addEventListener(message2, mask, function(event) {
				/* By note on event, velocity 0 means note off. */
				if (event.data[2] !== 0) {
					return;
				}
				/* Extending the MIDI event with useful infos. */
				event.status = STATUS_STRING;
				event.channel = Utils.getChannelFromStatus(event.data[0]);
				event.note = event.data[1];
				event.velocity = 0;
				callback(event);
			})
		];
	}
}
