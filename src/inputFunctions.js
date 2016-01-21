var MIDIUtils = require('./midiUtils'),
	Nota = require('./nota'),
	Utils = require('./utils');

/**
 * Binds an event listener to the device collection.
 *
 * @param {number} status        MIDI Status
 * @param {function} callback    Callback function
 *
 * @returns {object} Reference of this for method chaining.
 */
Nota.prototype.on = function(status, callback, options) {
	if (Utils.isDefined(options)) {
		Utils.defaultValue(options.matchHighNibble, true);
		Utils.defaultValue(options.matchLowNibble, true);
	}
	else {
		options = {
			matchHighNibble : true,
			matchLowNibble  : true
		};
	}

	var listener = {
		midiStatus      : status,
		matchHighNibble : options.matchHighNibble,
		matchLowNibble  : options.matchLowNibble,
		highNibble      : Utils.getHighNibble(status),
		lowNibble       : Utils.getLowNibble(status),
		callback        : callback
	};

	this.eventListeners.push(listener);

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
Nota.prototype.off = function(status, callback) {
	this.eventListeners.forEach(function(eventListener) {
		if (
			eventListener[i].status === status &&
			eventListener[i].callback === callback
		) {
			eventListener.splice(i, 1);
		}
	});

	return this;
};

/**
 * MIDI message event handler.
 *
 * @param {object} event    MIDI event data.
 *
 * @returns {void}
 */
Nota.prototype._onMIDIMessage = function(event) {
	this.eventListeners.forEach(function(eventListener) {
		if (this._isThisTheEventWeAreLookingFor(eventListener, event)) {
			event = this._extendEventObject(event);
			eventListener.callback(event);
		}
	}, this);
};

/**
 * Checks if the specified listener is listening to the specified MIDI event.
 *
 * @param {object} listener
 * @param {object} event
 *
 * @returns {bool}
 */
Nota.prototype._isThisTheEventWeAreLookingFor = function(listener, event) {
	if (
		listener.matchHighNibble === true &&
		listener.matchLowNibble === true &&
		listener.midiStatus === event.data[0]
	) {
		return true;
	}

	else if (
		listener.matchHighNibble === true &&
		listener.matchLowNibble === false &&
		listener.highNibble === Utils.getHighNibble(event.data[0])
	) {
		return true;
	}

	else if (
		listener.matchHighNibble === false &&
		listener.matchLowNibble === true &&
		listener.lowNibble === Utils.getLowNibble(event.data[0])
	) {
		return true;
	}

	return false;
};

/**
 * Extends the MIDI event object with shorthads to the most useful informations.
 *
 * @param {object} event
 *
 * @returns {object}
 */
Nota.prototype._extendEventObject = function(event) {
	event.channel = MIDIUtils.getChannelFromStatus(event.data[0]);

	if (MIDIUtils.isNoteOn(event.data)) {
		event.note = event.data[1];
		event.velocity = event.data[2];
	}
	else if (MIDIUtils.isNoteOff(event.data)) {
		event.note = event.data[1];
		event.velocity = event.data[2];
	}
	else if (MIDIUtils.isControlChange(event.data)) {
		event.controller = event.data[1];
		event.controllerValue = event.data[2];
	}
	else if (MIDIUtils.isPitchWheel(event.data)) {
		event.pitchWheel = event.data[2];
	}
	else if (MIDIUtils.isPolyphonicAftertouch(event.data)) {
		event.note = event.data[1];
		event.pressure = event.data[2];
	}
	else if (MIDIUtils.isProgramChange(event.data)) {
		event.program = event.data[1];
	}
	else if (MIDIUtils.isChannelAftertouch(event.data)) {
		event.pressure = event.data[1];
	}

	return event;
};
