import Midium from './midium';

export function getMirror() {
	if (this.mirror) {
		return this.mirror;
	}

	let output = new Midium.FakeOutput();
	this.add(output);
	let input = output.getInput();
	this.mirror = new Midium(input);
	return this.mirror;
}
