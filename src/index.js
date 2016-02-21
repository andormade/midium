import Midinette from 'midinette';
import Midium from 'midium-core';
import channel from './channel';
import onNoteOff from './onNoteOff';
import onNoteOn from './onNoteOn';
import onChannelAftertouch from './onChannelAftertouch';
import onControlChange from './onControlChange';
import onPitchWheel from './onPitchWheel';
import onPolyAftertouch from './onPolyAftertouch';
import onProgramChange from './onProgramChange';
import channelAftertouch from './channelAftertouch';
import controlChange from './controlChange';
import noteOff from './noteOff';
import noteOn from './noteOn';
import pitchWheel from './pitchWheel';
import polyAftertouch from './polyAftertouch';
import programChange from './programChange';

Object.assign(
	Midium, Midinette
);

Object.assign(Midium.prototype, {
	onChannelAftertouch : onChannelAftertouch,
	onControlChange : onControlChange,
	onNoteOff : onNoteOff,
	onNoteOn : onNoteOn,
	onPitchWheel : onPitchWheel,
	onPolyAftertouch : onPolyAftertouch,
	onProgramChange : onProgramChange,
	channelAftertouch : channelAftertouch,
	controlChange : controlChange,
	noteOff : noteOff,
	noteOn : noteOn,
	pitchWheel : pitchWheel,
	polyAftertouch : polyAftertouch,
	programChange : programChange
});

global.Midium = Midium;
export default Midium;
