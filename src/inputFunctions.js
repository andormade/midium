var Nota = require('./nota'),
	Utils = require('./utils');

Nota.listenerCounter = 0;

/**
 * Register an event listener.
 *
 * @param {object} options
 *
 * @returns {object} Returns with the reference of the event listener.
 */
Nota.prototype.addEventListener = function(options) {
	options.highNibble = Utils.getHighNibble(options.matchIf);
	options.lowNibble = Utils.getLowNibble(options.matchIf);
	options.reference = Nota.listenerCounter++;

	this.eventListeners.push(options);

	return options.reference;
};

/**
 * Removes the given event listener or event listeners.
 *
 * @param {number|array}    Event listener references.
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
					Utils.getHighNibble(event.data[listener.listenTo])
			)
		) {
			listener.callback(event);
		}
	}, this);
};
