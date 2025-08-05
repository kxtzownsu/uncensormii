import { render } from "preact";
import { WiiChannel_Example } from "./channels/example.jsx";
import { WiiChannel_Proxy } from "./channels/proxy.jsx";
import { wiiPlayAudio } from "../menuAPI/WiiAudio";

const channelComponents = {
	example: WiiChannel_Example,
	proxy: WiiChannel_Proxy,
	// add more channels here
};

export function AppLauncher(id) {
	if (id === "SPCL.returnToMenu") {
		location.reload();
		return;
	}

	wiiPlayAudio({ audioFile: "/assets/nintendo/audio/NoA_ding.mp3", id: "wiiMenuDing" });

	const Component = channelComponents[id.toLowerCase()];
	const appRoot = document.querySelector("wiiapp");

	if (!appRoot) {
		console.error("WE ARE SO COOKED");
		return;
	}

	const parent = appRoot.closest(".font-wiimain");
	if (parent) {
		parent.classList.remove("hidden");
		parent.classList.add("startFadeOut");
		setTimeout(() => {
			parent.classList.remove("startFadeOut");
			parent.classList.add("fade-out");
		}, 10);
	}

	if (!Component) {
		console.error(`Channel '${id}' not found.`);
		return;
	}

	setTimeout(() => {
		appRoot.innerHTML = "";
		const bannerMusic = document.getElementById("bannerMusic");
		const menuMusic = document.getElementById("wiiMenuMusic");
		const menuStart = document.getElementById("wiiMenuStartup");
		const menuDing = document.getElementById("wiiMenuDing");
		if (bannerMusic) {
			bannerMusic.pause();
			bannerMusic.currentTime = 0;
		}
		if (menuMusic && localStorage.getItem("returnToMenu") === "true") {
			menuMusic.pause();
			menuMusic.currentTime = 0;
		}
		if (menuStart) {
			menuStart.pause();
			menuStart.remove();
		}
		if (menuDing) {
			menuDing.pause();
			menuDing.remove();
		}
		render(<Component />, appRoot);
	}, 610);
}
