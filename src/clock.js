const START = 0xfa;
const CLOCK = 0xf8;
const STOP = 0xfc;
const SIXTEENTH_NOTE = 6;
const EIGHT_NOTE = 12;
const QUARTER_NOTE = 24;
const HALF_NOTE = 48;
const WHOLE_NOTE = 96;

export function startClock(bpm) {
	if (this.clock) {
		return this;
	}

	this.send([START]);

	this.clock = setInterval(() => {
		this.send([CLOCK]);
	}, Math.floor((1000 / (bpm / 60)) / QUARTER_NOTE));

	return this;
}

export function stopClock() {
	clearInterval(this.clock);
	this.send([STOP]);
	return this;
}

export function sendClock() {
	this.send([CLOCK]);
	return this;
}

export function onStart(callback) {
	return this.addEventListener(START * 0x10000, 0xff0000, callback);
}

export function onStop(callback) {
	return this.addEventListener(STOP * 0x10000, 0xff0000, callback);
}

export function onClock(callback, divider = 1) {
	var counter = 0;
	return this.addEventListener(CLOCK * 0x10000, 0xff0000, function() {
		counter++;
		if (counter === divider) {
			counter = 0;
			callback();
		}
	});
}

export function onBeat(callback) {
	return this.onClock(callback, QUARTER_NOTE);
}

export function onWhole(callback) {
	return this.onClock(callback, WHOLE_NOTE);
}

export function onHalf(callback) {
	return this.onClock(callback, HALF_NOTE);
}

export function onQuarter(callback) {
	return this.onClock(callback, QUARTER_NOTE);
}

export function onEight(callback) {
	return this.onClock(callback, EIGHT_NOTE);
}

export function onSixteenth(callback) {
	return this.onClock(callback, SIXTEENTH_NOTE);
}
