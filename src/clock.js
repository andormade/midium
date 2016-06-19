import Midium from './midium';

const START = 0xfa;
const CLOCK = 0xf8;
const STOP = 0xfc;
const SIXTEENTH_NOTE = 6;
const EIGHT_NOTE = 12;
const QUARTER_NOTE = 24;
const HALF_NOTE = 48;
const WHOLE_NOTE = 96;

export default class Clock extends Midium {
	startClock(bpm) {
		if (this.clock) {
			return this;
		}

		this.send([START]);
		this.setClockBpm(bpm);

		return this;
	}

	setClockBpm(bpm) {
		if (this.clock) {
			clearInterval(this.clock);
		}

		let interval = (1000 / (bpm / 60)) / 4;
		let clockTimes = [];

		for (let i = 0; i < 6; i++) {
			clockTimes[i] = (interval / 6) * i;
		}

		this.clock = setInterval(() => {
			this.send([CLOCK], clockTimes[0]);
			this.send([CLOCK], clockTimes[1]);
			this.send([CLOCK], clockTimes[2]);
			this.send([CLOCK], clockTimes[3]);
			this.send([CLOCK], clockTimes[4]);
			this.send([CLOCK], clockTimes[5]);
		}, Math.floor(interval));

		return this;
	}

	stopClock() {
		clearInterval(this.clock);
		this.send([STOP]);
		return this;
	}

	sendClock() {
		this.send([CLOCK]);
		return this;
	}

	onStart(callback) {
		return this.addEventListener(START * 0x10000, 0xff0000, callback);
	}

	onStop(callback) {
		return this.addEventListener(STOP * 0x10000, 0xff0000, callback);
	}

	onClock(callback, divider = 1) {
		var counter = 0;
		return this.addEventListener(CLOCK * 0x10000, 0xff0000, function() {
			counter++;
			if (counter === divider) {
				counter = 0;
				callback();
			}
		});
	}

	onBeat(callback) {
		return this.onClock(callback, QUARTER_NOTE);
	}

	onWhole(callback) {
		return this.onClock(callback, WHOLE_NOTE);
	}

	onHalf(callback) {
		return this.onClock(callback, HALF_NOTE);
	}

	onQuarter(callback) {
		return this.onClock(callback, QUARTER_NOTE);
	}

	onEight(callback) {
		return this.onClock(callback, EIGHT_NOTE);
	}

	onSixteenth(callback) {
		return this.onClock(callback, SIXTEENTH_NOTE);
	}

	onSelfClock(callback, divider = 1) {
		return this.getMirror().onClock(callback, divider);
	}

	onSelfBeat(callback) {
		return this.getMirror().onClock(callback, QUARTER_NOTE);
	}

	onSelfWhole(callback) {
		return this.getMirror().onClock(callback, WHOLE_NOTE);
	}

	onSelfHalf(callback) {
		return this.getMirror().onClock(callback, HALF_NOTE);
	}

	onSelfQuarter(callback) {
		return this.getMirror().onClock(callback, QUARTER_NOTE);
	}

	onSelfEight(callback) {
		return this.getMirror().onClock(callback, EIGHT_NOTE);
	}

	onSelfSixteenth(callback) {
		return this.getMirror().onClock(callback, SIXTEENTH_NOTE);
	}
}
