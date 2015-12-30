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
