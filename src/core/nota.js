/**
 * Shorthand for nota static functions.
 *
 * @param {array} devices
 *
 * @returns {*}
 */
function Nota(devices) {
	this.initialize(devices);
}

/** @type {object} Midi access object. */
Nota.midiAccess = null;

Nota.isReady = false;

/**
 * Calls back when the MIDI driver is ready.
 *
 * @param {function} callback    Calls when the MIDI connection is ready.
 *
 * @returns {void}
 */
Nota.ready = function(callback) {
	if (global.Nota.isReady) {
		callback();
	}

	navigator.requestMIDIAccess({
		sysex : false
	}).then(

		/* MIDI access granted */
		function(midiAccess) {
			global.Nota.isReady = true;
			global.Nota.midiAccess = midiAccess;
			callback();
		},

		/* MIDI access denied */
		function(error) {
			global.Nota.isReady = false;
			console.log(error);
		}
	);
};

/**
 * Returns with an array of MIDI inputs and outputs.
 *
 * @param {object|number|string|array} selector    Selector
 *
 * @returns {array}
 */
Nota.select = function(selector) {
	if (!global.Nota.isReady) {
		return [];
	}

	var devices = [];

	/* If the query is a MIDIInput or output. */
	if (
		selector instanceof window.MIDIOutput ||
		selector instanceof window.MIDIInput
	) {
		devices[0] = selector;
	}

	else if (
		typeof selector === 'number' &&
		global.Nota.midiAccess.inputs.has(query)
	) {
		devices[0] = global.Nota.midiAccess.inputs.get(query);
	}

	else if (
		typeof query === 'number' &&
		global.Nota.midiAccess.outputs.has(query)
	) {
		devices[0] = global.Nota.midiAccess.outputs.get(query);
	}

	else if (selector instanceof Array) {
		selector.forEach(function(item) {
			devices.push(Nota.select(item)[0]);
		});
	}

	else if (
		typeof selector === 'string' ||
		selector instanceof window.RegExp
	) {
		var name = '';

		global.Nota.midiAccess.inputs.forEach(function each(device) {
			name = device.name + ' ' + device.manufacturer;
			if (new RegExp(selector, 'i').test(name)) {
				devices.push(device);
			}
		});

		global.Nota.midiAccess.outputs.forEach(function each(device) {
			name = device.name + ' ' + device.manufacturer;
			if (new RegExp(selector, 'i').test(name)) {
				devices.push(device);
			}
		});
	}

	return new Nota(devices);
};

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

/**
 * Sends raw MIDI data
 *
 * @param {array} midiData    Array of MIDI data
 *
 * @returns {object} Reference of this for method chaining.
 */
Nota.prototype.send = function(midiData) {
	this.each(function(device) {
		if (device.type === 'output') {
			device.send(midiData);
		}
	});

	return this;
};

Nota.listenerCounter = 0;

/**
 * Register an event listener.
 *
 * @param {object} options    Event listener options.
 *
 * @returns {object} Returns with the reference of the event listener.
 */
Nota.prototype.addEventListener = function(options) {
	options.highNibble = (options.matchIf >> 4) & 0x0f;
	options.lowNibble = options.matchIf & 0x0F;
	options.reference = Nota.listenerCounter++;

	this.eventListeners.push(options);

	return options.reference;
};

/**
 * Removes the given event listener or event listeners.
 *
 * @param {number|array} references    Event listener references.
 *
 * @returns {void}
 */
Nota.prototype.removeEventListener = function(references) {
	[].concat(references).forEach(function(reference) {
		this.eventListeners.forEach(function(listener, index) {
			if (listener.reference === reference) {
				this.eventListeners.splice(index, 1);
			}
		}, this);
	}, this);
};

/**
 * MIDI message event handler.
 *
 * @param {object} event    MIDI event data.
 *
 * @returns {void}
 */
Nota.prototype._onMIDIMessage = function(event) {
	this.eventListeners.forEach(function(listener) {
		if (
			(
				listener.matchLowNibble === true &&
				listener.matchIf === event.data[listener.listenTo]
			) ||
			(
				listener.matchLowNibble === false &&
				listener.highNibble ===
					(event.data[listener.listenTo] >> 4) & 0x0f
			)
		) {
			listener.callback(event);
		}
	}, this);
};


module.exports = Nota;
