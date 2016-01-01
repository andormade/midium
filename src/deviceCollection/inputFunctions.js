var DeviceCollection = require('./deviceCollection'),
	MIDIUtils = require('../midiUtils'),
	Utils = require('../utils');

/**
 * Binds an event listener to the device collection.
 *
 * @param {string} event         Event name
 * @param {function} callback    Callback function
 *
 * @returns {object} Reference of this for method chaining.
 */
DeviceCollection.prototype.on = function(event, callback) {
	if (Utils.isUndefined(this.eventListeners)) {
		this.eventListeners = [];
	}

	this.eventListeners.push({
		event    : event,
		callback : callback
	});

	return this;
};

/**
 * Unbinds the specified event listener.
 *
 * @param {string} event         Event name
 * @param {function} callback    Callback function
 *
 * @returns {object} Reference of this for method chaining.
 */
DeviceCollection.prototype.off = function(event, callback) {
	for (var i = 0; i < this.eventListeners.length; i++) {
		if (
			this.eventListeners[i].event === event &&
			this.eventListeners[i].callback === callback
		) {
			this.eventListeners.splice(i, 1);
		}
	}
};

DeviceCollection.prototype.trigger = function(event, data) {
	if (Utils.isUndefined(this.eventListeners)) {
		this.eventListeners = [];
	}

	for (var i = 0; i < this.eventListeners.length; i++) {
		if (this.eventListeners[i].event === event) {
			this.eventListeners[i].callback(data);
		}
	}
};

/**
 * MIDI message event handler.
 *
 * @param {object} event    MIDI event data.
 *
 * @returns {void}
 */
DeviceCollection.prototype._onMIDIMessage = function(event) {
	if (MIDIUtils.isNoteOn(event.data)) {
		this._onNoteOn(event);
	}
	else if (MIDIUtils.isNoteOff(event.data)) {
		this._onNoteOff(event);
	}
	else if (MIDIUtils.isControlChange(event.data)) {
		this._onControlChange(event);
	}
	else if (MIDIUtils.isPitchWheel(event.data)) {
		this._onPitchWheel(event);
	}
};

/**
 * Handles note on events. Extends the MIDI message event object.
 *
 * @param {object} event    MIDI event data.
 *
 * @private
 * @returns {void}
 */
DeviceCollection.prototype._onNoteOn = function(event) {
	event.channel = MIDIUtils.getChannelFromStatus(event.data[0]);
	event.note = event.data[1];
	event.velocity = event.data[2];
	event.event = 'noteon';
	this.trigger('noteon', event);
};

/**
 * Handles note off events. Extends the MIDI message event object.
 *
 * @param {object} event    MIDI event data.
 *
 * @private
 * @returns {void}
 */
DeviceCollection.prototype._onNoteOff = function(event) {
	event.channel = MIDIUtils.getChannelFromStatus(event.data[0]);
	event.note = event.data[1];
	event.velocity = event.data[2];
	event.event = 'noteoff';
	this.trigger('noteoff', event);
};

/**
 * Handles control change events. Extends the MIDI message event object.
 *
 * @param {object} event    MIDI event data.
 *
 * @private
 * @returns {void}
 */
DeviceCollection.prototype._onControlChange = function(event) {
	event.channel = MIDIUtils.getChannelFromStatus(event.data[0]);
	event.event = 'controlchange';
	event.controller = event.data[1];
	event.controllerValue = event.data[2];
	this.trigger('controlchange', event);
};

/**
 * Handles pitch wheel events. Extends the MIDI message event object.
 *
 * @param {object} event    MIDI event data.
 *
 * @private
 * @returns {void}
 */
DeviceCollection.prototype._onPitchWheel = function(event) {
	event.channel = MIDIUtils.getChannelFromStatus(event.data[0]);
	event.event = 'pitchwheel';
	event.value = event.data[2];
	this.trigger('pitchwheel', event);
};
