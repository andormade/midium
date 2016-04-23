const START = 0xfa;
const CLOCK = 0xf8;
const STOP = 0xfc;

export function startClock(bpm) {
	if (this.clock) {
		return;
	}
	this.send([START]);
	this.clock = setInterval(() => {
		this.send([CLOCK]);
	}, Math.floor((1000 / (bpm / 60)) / 24));
}

export function stopClock() {
	clearInterval(this.clock);
	this.send([STOP]);
}
