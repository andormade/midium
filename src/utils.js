import Notes from './constants/notes';
import {NOTE_OFF_CH1, NOTE_OFF_CH16, NOTE_ON_CH1,
	NOTE_ON_CH16, CONTROL_CHANGE_CH1, CONTROL_CHANGE_CH16, PITCH_WHEEL_CH1,
	PITCH_WHEEL_CH16, POLYPHONIC_AFTERTOUCH_CH1, POLYPHONIC_AFTERTOUCH_CH16,
	PROGRAM_CHANGE_CH1, PROGRAM_CHANGE_CH16, CHANNEL_AFTERTOUCH_CH1,
	CHANNEL_AFTERTOUCH_CH16} from './constants/statusCodes';

const MASK_EVENT = 0xf00000;
const MASK_CHANNEL = 0x0f0000;
const MASK_DATA_1 = 0x00ff00;
const MASK_DATA_2 = 0x0000ff;

class Utils {
	static isMIDIStatus(code) {
		if (typeof code !== 'number') {
			return false;
		}

		return (
			code >= NOTE_OFF_CH1 &&
			code <= PITCH_WHEEL_CH16
		);
	}

	static isMIDIMessage(code) {
		return (
			typeof code === 'number' &&
			Number.isInteger(code) &&
			code >= 0x000000 &&
			code <= 0xffffff
		);
	}

	static isMIDIByteArray(byteArray) {
		return (
			Array.isArray(byteArray) &&
			byteArray.length === 3 &&
			Number.isInteger(byteArray[0]) &&
			Number.isInteger(byteArray[1]) &&
			Number.isInteger(byteArray[2]) &&
			byteArray[0] >= 0x00 && byteArray[0] <= 0xff &&
			byteArray[1] >= 0x00 && byteArray[1] <= 0xff &&
			byteArray[2] >= 0x00 && byteArray[2] <= 0xff
		);
	}

	static intToByteArray(int) {
		if (Utils.isMIDIByteArray(int)) {
			return int;
		}
		return [int >> 16, (int >> 8) & 0x00ff,	int & 0x0000ff];
	}

	static getMIDIStatus(code) {
		if (Utils.isMIDIStatus(code)) {
			return code;
		}
		else if (Utils.isMIDIByteArray(code)) {
			return code[0];
		}
		else if (Utils.isMIDIMessage(code)) {
			return getMIDIEvent(Utils.intToByteArray(code));
		}

		return 0;
	}

	static isNoteOn(code) {
		return (
			Utils.isMIDIStatus(code) &&
			code >= NOTE_ON_CH1 &&
			code <= NOTE_ON_CH16
		);
	}

	static isNoteOff(code) {
		return (
			Utils.isMIDIStatus(code) &&
			code >= NOTE_OFF_CH1 &&
			code <= NOTE_OFF_CH16
		);
	}

	static isControlChange(code) {
		return (
			Utils.isMIDIStatus(code) &&
			code >= CONTROL_CHANGE_CH1 &&
			code <= CONTROL_CHANGE_CH16
		);
	}

	static isPitchWheel(code) {
		return (
			Utils.isMIDIStatus(code) &&
			code >= PITCH_WHEEL_CH1 &&
			code <= PITCH_WHEEL_CH16
		);
	}

	static isPolyphonicAftertouch(data) {
		return (
			Utils.isMIDIStatus(code) &&
			code >= POLYPHONIC_AFTERTOUCH_CH1 &&
			code <= POLYPHONIC_AFTERTOUCH_CH16
		);
	}

	static isProgramChange(data) {
		return (
			Utils.isMIDIStatus(code) &&
			code >= PROGRAM_CHANGE_CH1 &&
			code <= PROGRAM_CHANGE_CH16
		);
	}

	static isChannelAftertouch(data) {
		return (
			Utils.isMIDIStatus(code) &&
			code >= CHANNEL_AFTERTOUCH_CH1 &&
			code <= CHANNEL_AFTERTOUCH_CH16
		);
	}

	static constructMIDIMessage(event, channel, data1, data2) {
		event = Math.min(Math.max(event, 0x80), 0xef);
		channel = Math.min(Math.max(channel, 1), 16);
		data1 = Math.min(Math.max(data1, 0x00), 0xff);
		data2 = Math.min(Math.max(data2, 0x00), 0xff);
		return [(event & 0xf0) + (channel - 1), data1, data2];
	}

	static noteStringToMIDICode(note) {
		if (
			typeof note === 'string' &&
			typeof Notes[note] === 'number'
		) {
			return Notes[note];
		}
		else if (typeof note === 'number') {
			return note;
		}
		return 0;
	}

	static getChannelFromStatus(status) {
		return (status % 0x10) + 1;
	}

	static eventMask(status, channel, data1, data2) {
		let mask = 0x000000;

		mask |= status ? MASK_EVENT : 0x000000;
		mask |= channel ? MASK_CHANNEL : 0x000000;
		mask |= data1 ? MASK_DATA_1 : 0x000000;
		mask |= data2 ? MASK_DATA_2 : 0x000000;
		return mask;
	}
}

export default Utils;
