var MIDIUtils = require('./midiUtils'),
	Nota = require('./nota'),
	Utils = require('./utils');

/**
 * Binds an event listener to the device collection.
 *
 * @param {string} event         MIDI Status
 * @param {function} callback    Callback function
 *
 * @returns {object} Reference of this for method chaining.
 */
Nota.prototype.on = function(event, callback) {
	var match = event.match(/^(\w+)(?::ch([1-9][0-6]?)|)/);
	var eventType = match[1];
	var channel = parseInt(Utils.defaultValue(match[2], 1), 10);
	var status = MIDIUtils.getStatusByte(eventType, channel);

	this.addEventListener({
		event        : event,
		eventType    : eventType,
		status       : status,
		channel      : channel,
		matchChannel : Utils.isDefined(match[2]),
		highNibble   : Utils.getHighNibble(status),
		lowNibble    : channel,
		callback     : callback
	});

	return this;
};

/**
 * Register an event listener.
 *
 * @param {object} options
 *
 * @returns {object} Reference of this for method chaining.
 */
Nota.prototype.addEventListener = function(options) {
	this.eventListeners.push(options);
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
	this.eventListeners.forEach(function(eventListener) {
		if (
			eventListener[i].event === event &&
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
	if (listener.matchChannel) {
		return listener.status === event.data[0];
	}

	return listener.highNibble === Utils.getHighNibble(event.data[0]);
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

	if (
		MIDIUtils.isNoteOn(event.data) ||
		MIDIUtils.isNoteOff(event.data)
	) {
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
