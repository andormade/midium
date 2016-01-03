var MIDIUtils = require('./midiUtils'),
	Nota = require('./nota'),
	Utils = require('./utils');

/**
 * Binds an event listener to the device collection.
 *
 * @param {string} event         Event name
 * @param {function} callback    Callback function
 *
 * @returns {object} Reference of this for method chaining.
 */
Nota.prototype.on = function(event, callback) {
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
Nota.prototype.off = function(event, callback) {
	for (var i = 0; i < this.eventListeners.length; i++) {
		if (
			this.eventListeners[i].event === event &&
			this.eventListeners[i].callback === callback
		) {
			this.eventListeners.splice(i, 1);
		}
	}
};

Nota.prototype.trigger = function(event, data) {
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
Nota.prototype._onMIDIMessage = function(event) {
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
	else if (MIDIUtils.isPolyphonicAftertouch(event.data)) {
		this._onPolyphonicAftertouch(event);
	}
	else if (MIDIUtils.isProgramChange(event.data)) {
		this._onProgramChange(event);
	}
	else if (MIDIUtils.isChannelAftertouch(event.data)) {
		this._onChannelAftertouch(event);
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
Nota.prototype._onNoteOn = function(event) {
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
Nota.prototype._onNoteOff = function(event) {
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
Nota.prototype._onControlChange = function(event) {
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
Nota.prototype._onPitchWheel = function(event) {
	event.channel = MIDIUtils.getChannelFromStatus(event.data[0]);
	event.event = 'pitchwheel';
	event.value = event.data[2];
	this.trigger('pitchwheel', event);
};

Nota.prototype._onPolyphonicAftertouch = function(event) {
	event.channel = MIDIUtils.getChannelFromStatus(event.data[0]);
	event.event = 'polyphonicaftertouch';
	event.note = event.data[1];
	event.pressure = event.data[2];
	this.trigger('polyphonicaftertouch', event);
};

Nota.prototype._onProgramChange = function(event) {
	event.channel = MIDIUtils.getChannelFromStatus(event.data[0]);
	event.event = 'programchange';
	event.program = event.data[1];
	this.trigger('programchange', event);
};

Nota.prototype._onChannelAftertouch = function() {
	event.channel = MIDIUtils.getChannelFromStatus(event.data[0]);
	event.event = 'channelaftertouch';
	event.pressure = event.data[1];
	this.trigger('channelaftertouch', event);
};
