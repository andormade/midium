import Midinette from 'midinette';
import Midium from 'midium-core';
import channel from './channel';
import {channelAftertouch, onChannelAftertouch} from './channelAftertouch';
import {controlChange, onControlChange} from './controlChange';
import {noteOff, onNoteOff} from './noteOff';
import {noteOn, onNoteOn} from './noteOn';
import {pitchWheel, onPitchWheel} from './pitchWheel';
import {polyAftertouch, onPolyAftertouch} from './polyAftertouch';
import {programChange, onProgramChange} from './programChange';

Object.assign(Midium, Midinette);

Object.assign(Midium.prototype, {
	onChannelAftertouch : onChannelAftertouch,
	onControlChange     : onControlChange,
	onNoteOff           : onNoteOff,
	onNoteOn            : onNoteOn,
	onPitchWheel        : onPitchWheel,
	onPolyAftertouch    : onPolyAftertouch,
	onProgramChange     : onProgramChange,
	channelAftertouch   : channelAftertouch,
	controlChange       : controlChange,
	noteOff             : noteOff,
	noteOn              : noteOn,
	pitchWheel          : pitchWheel,
	polyAftertouch      : polyAftertouch,
	programChange       : programChange
});

global.Midium = Midium;
export default Midium;
