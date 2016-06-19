import MidiumCore from 'midium-core';

const DEFAULT_CHANNEL = 1;

export default class Midium extends MidiumCore {
	constructor(query) {
		super(query);
		this.defaultChannel = DEFAULT_CHANNEL;
		this.controllers = [];
	}
}
