var Nota = require('./nota');

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
