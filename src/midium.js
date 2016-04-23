import MidiumCore from 'midium-core';

const DEFAULT_CHANNEL = 1;

export default class Midium extends MidiumCore {
	constructor(query) {
		super(query);
		this.defaultChannel = DEFAULT_CHANNEL;
	}

	send(message, delay) {
		if (this.isBuffering) {
			this.buffer.push({
				message : message,
				delay   : delay
			});
		}
		else if (typeof delay === "number") {
			super.send(message, delay + window.performance.now());
		}
		else {
			super.send(message);
		}

		return this;
	}
}
