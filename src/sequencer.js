export function startLoop(notes, tempo, channel, rhythm) {
	var counter = 0;
	rhythm = rhythm.split('');
	var reference = setInterval(function() {
		if (rhythm[counter % rhythm.length] === '.') {
			this.notePress(notes[counter % notes.length], 300, 127, channel);
		}
		counter++;
	}.bind(this), Math.floor((60 / tempo) * 1000));

	return reference;
}

export function stopLoop(reference) {
	clearInterval(reference);
}
