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
import {startClock, stopClock, onClock, onWhole, onHalf, onQuarter, onEight,
	onSixteenth, onBeat, onSelfClock, onSelfWhole, onSelfHalf, onSelfQuarter,
	onSelfEight, onSelfSixteenth, onSelfBeat} from './clock';
import {getMirror} from './mirror';

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
	strum               : strum,
	startClock          : startClock,
	stopClock           : stopClock,
	onClock             : onClock,
	onWhole             : onWhole,
	onHalf              : onHalf,
	onQuarter           : onQuarter,
	onEight             : onEight,
	onSixteenth         : onSixteenth,
	onSelfClock         : onSelfClock,
	onSelfWhole         : onSelfWhole,
	onSelfHalf          : onSelfHalf,
	onSelfQuarter       : onSelfQuarter,
	onSelfEight         : onSelfEight,
	onSelfSixteenth     : onSelfSixteenth,
	getMirror           : getMirror
});

export default Midium;
