var Nota = require('./nota');

/**
 * Initiializes the device collection object.
 *
 * @param {array} devices    Array of midi devices
 *
 * @returns {void}
 */
Nota.prototype.initialize = function(devices) {
	this.eventListeners = [];
	this.devices = [];

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
Nota.prototype.add = function(device) {
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
Nota.prototype.removeReferences = function() {
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
Nota.prototype.each = function(callback) {
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
Nota.prototype._onStateChange = function(event) {
	console.log('state', event);
};