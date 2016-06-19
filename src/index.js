import Midium from './midium';
import Utils from './utils';
import {setDefaultChannel} from './channel';
import {prototype as ChannelAftertouch} from './channelAftertouch';
import {prototype as ControlChange} from './controlChange';
import {prototype as NoteOff} from './noteOff';
import {prototype as NoteOn} from './noteOn';
import {prototype as PitchWheel} from './pitchWheel';
import {prototype as PolyAftertouch} from './polyAftertouch';
import {prototype as ProgramChange} from './programChange';
import {prototype as Clock} from './clock';
import {getMirror} from './mirror';

Object.assign(Midium, Utils);

Object.assign(Midium.prototype, {
	channelAftertouch   : ChannelAftertouch.channelAftertouch,
	controlChange       : ControlChange.controlChange,
	noteOff             : NoteOff.noteOff,
	noteOn              : NoteOn.noteOn,
	pitchWheel          : PitchWheel.pitchWheel,
	polyAftertouch      : PolyAftertouch.polyAftertouch,
	programChange       : ProgramChange.programChange,
	onChannelAftertouch : ChannelAftertouch.onChannelAftertouch,
	onControlChange     : ControlChange.onControlChange,
	onNoteOff           : NoteOff.onNoteOff,
	onNoteOn            : NoteOn.onNoteOn,
	onPitchWheel        : PitchWheel.onPitchWheel,
	onPolyAftertouch    : PolyAftertouch.onPolyAftertouch,
	onProgramChange     : ProgramChange.onProgramChange,
	setDefaultChannel   : setDefaultChannel,
	startClock          : Clock.startClock,
	stopClock           : Clock.stopClock,
	setClockBpm         : Clock.setClockBpm,
	onClock             : Clock.onClock,
	onWhole             : Clock.onWhole,
	onHalf              : Clock.onHalf,
	onQuarter           : Clock.onQuarter,
	onEight             : Clock.onEight,
	onSixteenth         : Clock.onSixteenth,
	onSelfClock         : Clock.onSelfClock,
	onSelfWhole         : Clock.onSelfWhole,
	onSelfHalf          : Clock.onSelfHalf,
	onSelfQuarter       : Clock.onSelfQuarter,
	onSelfEight         : Clock.onSelfEight,
	onSelfSixteenth     : Clock.onSelfSixteenth,
	getMirror           : getMirror
});

export default Midium;
