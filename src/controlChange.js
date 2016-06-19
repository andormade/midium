import Utils from './utils';
import {CONTROL_CHANGE} from './constants/statusCodes';
import {ALL_CHANNELS, ALL_CONTROLLERS} from './constants/defaults';
import Midium from './midium';

const STATUS_STRING = 'controlchange';

export default class ControlChange extends Midium {
	/**
	 * Sets the value of the specified controller
	 *
	 * @param {note} controller      Controller number 0-127
	 * @param {number} pressure      Pressure 0-127
	 * @param {number} [channel]     Channel 1-16
	 *
	 * @returns {object}
	 */
	controlChange(
		controller, value, channel = this.defaultChannel
	) {
		this.send(Utils.constructMIDIMessage(
			CONTROL_CHANGE, channel, controller, value
		));

		return this;
	}

	/**
	 * Registers an event listener for the control change events.
	 *
	 * @param {function} callback
	 * @param {number} [channel]
	 *
	 * @returns {object} Reference of the event listener for unbinding.
	 */
	onControlChange(
		callback, controller = ALL_CONTROLLERS, channel = ALL_CHANNELS
	) {
		let mask = Utils.eventMask(true, channel !== ALL_CHANNELS,
			controller !== ALL_CONTROLLERS);
		let message = Utils.constructMIDIMessage(CONTROL_CHANGE, channel,
			controller, 0);

		return this.addEventListener(message, mask, function(event) {
			/* Extending the MIDI event with useful infos. */
			event.status = STATUS_STRING;
			event.channel = Utils.getChannelFromStatus(event.data[0]);
			event.controller = event.data[1];
			event.controllerValue = event.data[2];
			callback(event);
		});
	}
}
