export function startBuffer() {
	if (!this.buffer) {
		this.buffer = [];
	}
	this.isBuffering = true;
	return this;
}

export function stopBuffer() {
	this.isBuffering = false;
	return this;
}

export function wait(delay) {
	if (!this.isBuffering) {
		return this;
	}

	this.buffer.push({
		message : null,
		delay   : delay
	})
	return this;
}

export function clearBuffer() {
	this.buffer = [];
	return this;
}

export function sendBuffer() {
	var timestamp = 0;

	this.buffer.forEach((message) => {
		if (typeof message.delay === "number") {
			timestamp += message.delay;
		}
		if (Array.isArray(message.message)) {
			this.send(message.message, timestamp);
		}
	}, this);

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, timestamp);
	});
}
