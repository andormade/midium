import Utils from './utils';
import {PROGRAM_CHANGE} from './constants/statusCodes';
import {ALL_CHANNELS} from './constants/defaults';
import Midium from './midium';

const STATUS_STRING = 'programchange';

export default class ProgramChange extends Midium {
	/**
	 * Sets the specified program.
	 *
	 * @param {note} program         Program number 0-127
	 * @param {number} [channel]     Channel 1-16
	 *
	 * @returns {object}
	 */
	programChange(program, channel = this.defaultChannel) {
		this.send(Utils.constructMIDIMessage(
			PROGRAM_CHANGE, channel, program, 0
		));

		return this;
	}

	/**
	 * Registers an event listener for the program change events.
	 *
	 * @param {function} callback
	 * @param {number} [channel]
	 *
	 * @returns {object} Reference of the event listener for unbinding.
	 */
	onProgramChange(callback, channel = ALL_CHANNELS) {
		let mask = Utils.eventMask(true, channel !== ALL_CHANNELS);
		let message = Utils.constructMIDIMessage(
			PROGRAM_CHANGE, channel, 0, 0
		);

		return this.addEventListener(message, mask, function(event) {
			/* Extending the MIDI event with useful infos. */
			event.status = STATUS_STRING;
			event.channel = Utils.getChannelFromStatus(event.data[0]);
			event.program = event.data[1];
			callback(event);
		});
	}
}
