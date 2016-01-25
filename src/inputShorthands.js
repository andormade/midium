var MIDIUtils = require('./midiUtils'),
	Nota = require('./nota'),
	Status = require('./midiStatusEnum');

var MIDIEvent = {
	STATUS_BYTE : 0
};

/**
 * Registers an event listener for the note off events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of the event listener for unbinding.
 */
Nota.prototype.onNoteOff = function(callback, channel) {
	return [
		this.addEventListener({
			listenTo       : MIDIEvent.STATUS_BYTE,
			matchIf        : MIDIUtils.getStatusByte('noteoff', channel),
			matchLowNibble : channel !== 0,

			/* Extending the MIDI event with useful infos. */
			callback : function(event) {
				event.status = 'noteoff';
				event.channel = MIDIUtils.getChannelFromStatus(event.data[0]);
				event.note = event.data[1];
				event.velocity = event.data[2];
				callback(event);
			}
		}),
		this.addEventListener({
			listenTo       : MIDIEvent.STATUS_BYTE,
			matchIf        : MIDIUtils.getStatusByte('noteon', channel),
			matchLowNibble : channel !== 0,

			/* Extending the MIDI event with useful infos. */
			callback : function(event) {
				/* By note on event, velocity 0 means note off. */
				if (event.data[2] !== 0) {
					return;
				}

				event.status = 'noteoff';
				event.channel = MIDIUtils.getChannelFromStatus(event.data[0]);
				event.note = event.data[1];
				event.velocity = 0;
				callback(event);
			}
		})
	];
};

/**
 * Registers an event listener for the note on events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of the event listener for unbinding.
 */
Nota.prototype.onNoteOn = function(callback, channel) {
	return this.addEventListener({
		listenTo       : MIDIEvent.STATUS_BYTE,
		matchIf        : MIDIUtils.getStatusByte('noteon', channel),
		matchLowNibble : channel !== 0,

		/* Extending the MIDI event with useful infos. */
		callback : function(event) {
			if (event.data[2] === 0) {
				return;
			}

			event.status = 'noteon';
			event.channel = MIDIUtils.getChannelFromStatus(event.data[0]);
			event.note = event.data[1];
			event.velocity = event.data[2];
			callback(event);
		}
	});
};

/**
 * Registers an event listener for the polyphonic aftertouch events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of the event listener for unbinding.
 */
Nota.prototype.onPolyAftertouch = function(callback, channel) {
	return this.addEventListener({
		listenTo       : MIDIEvent.STATUS_BYTE,
		matchIf        : MIDIUtils.getStatusByte('polyaftertouch', channel),
		matchLowNibble : channel !== 0,

		/* Extending the MIDI event with useful infos. */
		callback : function(event) {
			event.status = 'polyaftertouch';
			event.channel = MIDIUtils.getChannelFromStatus(event.data[0]);
			event.note = event.data[1];
			event.pressure = event.data[2];
			callback(event);
		}
	});
};

/**
 * Registers an event listener for the control change events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of the event listener for unbinding.
 */
Nota.prototype.onControlChange = function(callback, channel) {
	return this.addEventListener({
		listenTo       : MIDIEvent.STATUS_BYTE,
		matchIf        : MIDIUtils.getStatusByte('controlchange', channel),
		matchLowNibble : channel !== 0,

		/* Extending the MIDI event with useful infos. */
		callback : function(event) {
			event.status = 'controlchange';
			event.channel = MIDIUtils.getChannelFromStatus(event.data[0]);
			event.controller = event.data[1];
			event.controllerValue = event.data[2];
			callback(event);
		}
	});
};

/**
 * Registers an event listener for the program change events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of the event listener for unbinding.
 */
Nota.prototype.onProgramChange = function(callback, channel) {
	return this.addEventListener({
		listenTo       : MIDIEvent.STATUS_BYTE,
		matchIf        : MIDIUtils.getStatusByte('programchange', channel),
		matchLowNibble : channel !== 0,

		/* Extending the MIDI event with useful infos. */
		callback : function(event) {
			event.status = 'programchange';
			event.channel = MIDIUtils.getChannelFromStatus(event.data[0]);
			event.program = event.data[1];
			callback(event);
		}
	});
};

/**
 * Registers an event listener for the channel aftertouch events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of the event listener for unbinding.
 */
Nota.prototype.onChannelAftertouch = function(callback, channel) {
	return this.addEventListener({
		listenTo       : MIDIEvent.STATUS_BYTE,
		matchIf        : MIDIUtils.getStatusByte('channelaftertouch', channel),
		matchLowNibble : channel !== 0,

		/* Extending the MIDI event with useful infos. */
		callback : function(event) {
			event.status = 'channelaftertouch';
			event.channel = MIDIUtils.getChannelFromStatus(event.data[0]);
			event.pressure = event.data[1];
			callback(event);
		}
	});
};

/**
 * Registers an event listener for the pitch wheel events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of the event listener for unbinding.
 */
Nota.prototype.onPitchWheel = function(callback, channel) {
	return this.addEventListener({
		listenTo       : MIDIEvent.STATUS_BYTE,
		matchIf        : MIDIUtils.getStatusByte('pitchwheel', channel),
		matchLowNibble : channel !== 0,

		/* Extending the MIDI event with useful infos. */
		callback : function(event) {
			event.status = 'pitchwheel';
			event.channel = MIDIUtils.getChannelFromStatus(event.data[0]);
			event.pitchWheel = event.data[2];
			callback(event);
		}
	});
};
