import Midinette from 'midinette';
import Midium from './midium';
import {setDefaultChannel} from './channel';
import {channelAftertouch, onChannelAftertouch} from './channelAftertouch';
import {controlChange, onControlChange} from './controlChange';
import {noteOff, onNoteOff} from './noteOff';
import {noteOn, onNoteOn} from './noteOn';
import {notePress} from './notePress';
import {pitchWheel, onPitchWheel} from './pitchWheel';
import {polyAftertouch, onPolyAftertouch} from './polyAftertouch';
import {programChange, onProgramChange} from './programChange';
import {startBuffer, stopBuffer, sendBuffer, clearBuffer, wait} from './buffer';
import {strum} from './strum';
import {startClock, stopClock} from './clock';

Object.assign(Midium, Midinette);

Object.assign(Midium.prototype, {
	onChannelAftertouch : onChannelAftertouch,
	onControlChange     : onControlChange,
	onNoteOff           : onNoteOff,
	onNoteOn            : onNoteOn,
	notePress           : notePress,
	onPitchWheel        : onPitchWheel,
	onPolyAftertouch    : onPolyAftertouch,
	onProgramChange     : onProgramChange,
	channelAftertouch   : channelAftertouch,
	controlChange       : controlChange,
	noteOff             : noteOff,
	noteOn              : noteOn,
	pitchWheel          : pitchWheel,
	polyAftertouch      : polyAftertouch,
	programChange       : programChange,
	setDefaultChannel   : setDefaultChannel,
	startBuffer         : startBuffer,
	stopBuffer          : stopBuffer,
	sendBuffer          : sendBuffer,
	clearBuffer         : clearBuffer,
	wait                : wait,
	strum               : strum,
	startClock          : startClock,
	stopClock           : stopClock
});

export default Midium;
