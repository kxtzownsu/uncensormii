import { useEffect } from "preact/hooks";

export function wiiPlayAudio({ audioFile, volume = 0.5, loop = false, id, preload = true }) {
	if (!audioFile) return;

	let audio;

	if (id) {
		const existing = document.getElementById(id);
		if (existing && existing.tagName === "AUDIO") {
			audio = existing;
			audio.pause();
		}
	}

	if (!audio) {
		audio = document.createElement("audio");
		if (id) audio.id = id;
		document.body.appendChild(audio);
	}

	audio.src = audioFile;
	audio.volume = volume;
	audio.loop = loop;
	audio.preload = preload;
	audio.autoplay = true;
	audio.play();

	if (!loop) {
		audio.onended = () => {
			audio.remove();
		};
	} else {
		audio.onended = null;
	}
}

export function wiiStopAudio({ id, audioFile }) {
	if (id) {
		const el = document.getElementById(id);
		if (el && el.tagName === "AUDIO") {
			el.pause();
			el.remove();
		}
	}

	if (audioFile) {
		const audios = document.querySelectorAll(`audio[src="${audioFile}"]`);
		audios.forEach((audio) => {
			audio.pause();
			audio.remove();
		});
	}
}

export function WiiPlayAudio(props) {
	useEffect(() => {
		wiiPlayAudio(props);
	}, [props.audioFile, props.volume, props.loop, props.id, props.preload]);
	return null;
}

export function WiiStopAudio(props) {
	useEffect(() => {
		wiiStopAudio(props);
	}, [props.id, props.audioFile]);
	return null;
}
