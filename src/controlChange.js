import Utils from './utils';
import {CONTROL_CHANGE} from './constants/statusCodes';
import {ALL_CHANNELS, ALL_CONTROLLERS, DATA_CONTROLLER_VALUE,
	DATA_CONTROLLER, DATA_STATUS} from './constants/defaults';
import Midium from './midium';

const STATUS_STRING = 'controlchange';

/**
 * @extends Midium
 */
export default class ControlChange extends Midium {
	/**
	 * Sets the value of the specified controller
	 *
	 * @param {number} controller    Controller number 0-127
	 * @param {number} value         Controller value 0-127
	 * @param {number} [channel]     MIDI channel 1-16
	 *
	 * @returns {object}
	 */
	controlChange(controller, value, channel = this.defaultChannel) {
		this.send(Utils.constructMIDIMessage(
			CONTROL_CHANGE, channel, controller, value
		));

		return this;
	}

	/**
	 * Returns with the value of the sepcified controller.
	 *
	 * @param {number} controller    Controller number
	 *
	 * @returns {number}
	 */
	getControlValue(controller) {
		if (typeof this.controllers[controller] !== 'undefined') {
			return this.controllers[controller];
		}
		return 0;
	}

	/**
	 * Registers an event listener for the control change events.
	 *
	 * @param {function} callback      Callback function
	 * @param {number} [controller]    Controller number 0-127
	 * @param {number} [channel]       MIDI channel 1-16
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

		return this.addEventListener(message, mask, (event) => {
			/* Extending the MIDI event with useful infos. */
			event.status = STATUS_STRING;
			event.channel = Utils.getChannelFromStatus(event.data[DATA_STATUS]);
			event.controller = event.data[DATA_CONTROLLER];
			event.controllerValue = event.data[DATA_CONTROLLER_VALUE];

			this.controllers[event.controller] = event.controllerValue;

			callback(event);
		});
	}
}
