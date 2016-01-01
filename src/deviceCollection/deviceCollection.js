var Utils = require('../utils');

/**
 * Constructor for the device collection class.
 *
 * @param {array} devices    Array of midi devices
 *
 * @returns {void}
 */
function DeviceCollection(devices) {
	this.initialize(devices);
}

/**
 * Initiializes the device collection object.
 *
 * @param {array} devices    Array of midi devices
 *
 * @returns {void}
 */
DeviceCollection.prototype.initialize = function(devices) {
	for (var i = 0; i < devices.length; i++) {
		this.add(devices[i]);
	}
};

/**
 * Adds MIDI device to the collection.
 *
 * @param {object} device    MIDI device
 *
 * @returns {object} Reference of this for method chaining.
 */
DeviceCollection.prototype.add = function(device) {
	if (Utils.isUndefined(this.devices)) {
		this.devices = [];
	}

	device.onstatechange = this._onStateChange.bind(this);
	device.onmidimessage = this._onMIDIMessage.bind(this);
	this.devices.push(device);

	return this;
};

/**
 * Removes the references from the selected MIDI devices.
 *
 * @returns {void}
 */
DeviceCollection.prototype.removeReferences = function() {
	this.each(function(device) {
		device.onmidimessage = null;
		device.onstatechange = null;
	});
};

/**
 * Iterates through the devices in the collection.
 *
 * @param {function} callback   Callback function.
 *
 * @returns {object} Reference of this for method chaining.
 */
DeviceCollection.prototype.each = function(callback) {
	for (var i = 0; i < this.devices.length; i++) {
		callback(this.devices[i]);
	}

	return this;
};

/**
 * State change event handler.
 *
 * @param {object} event    State change event data.
 *
 * @returns {void}
 */
DeviceCollection.prototype._onStateChange = function(event) {
	console.log('state', event);
};

module.exports = DeviceCollection;
