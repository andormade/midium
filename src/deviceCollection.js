var MIDIUtils = require('./midiUtils.js'),
	Status = require('./midiStatusEnum.js'),
	Utils = require('./utils.js');

/**
 * Constructor.
 *
 * @param {array} devices    Array of midi devices
 *
 * @returns {void}
 */
function DeviceCollection(devices) {
	this.initialize(devices);
}

DeviceCollection.prototype = {
	/**
	 * Initiializes the device collection object.
	 *
	 * @param {array} devices    Array of midi devices
	 *
	 * @returns {void}
	 */
	initialize : function(devices) {
		this.devices = devices;
	},

	/**
	 * Sets the specified note on.
	 *
	 * @param {note} note          MIDI note 0-127
	 * @param {number} channel     Channel 1-16
	 * @param {number} velocity    Velocity 0-127
	 *
	 * @returns {object}
	 */
	noteOn : function(note, channel, velocity) {
		velocity = Utils.defaultValue(velocity, 127);
		channel = Utils.defaultValue(channel, 1);

		this.send([
			MIDIUtils.getStatusByte(Status.NOTE_ON, channel),
			note,
			velocity
		]);

		return this;
	},

	/**
	 * Sets the specified note off.
	 *
	 * @param {note} note            MIDI note 0-127
	 * @param {number} [channel]     Channel 1-16
	 * @param {number} [velocity]    Velocity 0-127
	 *
	 * @returns {object}
	 */
	noteOff : function(note, channel, velocity) {
		velocity = Utils.defaultValue(velocity, 127);
		channel = Utils.defaultValue(channel, 1);

		this.send([
			MIDIUtils.getStatusByte(Status.NOTE_OFF, channel),
			note,
			velocity
		]);

		return this;
	},

	/**
	 * Sends raw MIDI data
	 *
	 * @param {array} midiData    Array of MIDI data
	 *
	 * @returns {object}
	 */
	send : function(midiData) {
		this.each(function(device) {
			if (device.type === 'output') {
				device.send(midiData);
			}
		});

		return this;
	},

	/**
	 * Iterates through the devices in the collection.
	 *
	 * @param {function} callback   Callback function.
	 *
	 * @returns {object}
	 */
	each : function(callback) {
		for (var i = 0; i < this.devices.length; i++) {
			callback(this.devices[i]);
		}

		return this;
	}
};

module.exports = DeviceCollection;
