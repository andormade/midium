import Utils from 'midinette';
import MusicTheory from 'musictheory';

const DIRECTION_UP = 'up';
const DIRECTION_DOWN = 'down';
const DEFUALT_LENGTH = 3;
const DEFAULT_SPEED = 100;
const NOTE_ON = 0x90;
const NOTE_OFF = 0x80;
const DEFAULT_VELOCITY = 127;
const DEFAULT_SUSTAIN = 100;

export function strum(
	chord,
	speed = DEFAULT_SPEED,
	sustain = DEFAULT_SUSTAIN,
	length = DEFUALT_LENGTH,
	velocity = DEFAULT_VELOCITY,
	direction = DIRECTION_DOWN,
	channel = this.defaultChannel
) {
	chord.forEach((note, index) => {
		this.send(Utils.constructMIDIMessage(
			NOTE_ON, channel, note, velocity
		), speed * index);
		
		this.send(Utils.constructMIDIMessage(
			NOTE_OFF, channel, note, velocity
		), speed * index + sustain);
	});
}
