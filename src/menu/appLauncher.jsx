import { render } from "preact";
import { WiiChannel_Example } from "./channels/example.jsx";
import { WiiChannel_Proxy } from "./channels/proxy.jsx";

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

	const Component = channelComponents[id.toLowerCase()];
	const appRoot = document.querySelector("wiiapp");

	if (!appRoot) {
		console.error("WE ARE SO COOKED");
		return;
	}

	const parent = appRoot.closest(".font-wiimain");
	if (parent) {
		parent.classList.remove("hidden");
	}

	if (!Component) {
		console.error(`Channel '${id}' not found.`);
		return;
	}

	appRoot.innerHTML = "";
	const bannerMusic = document.getElementById("bannerMusic");
	const menuMusic = document.getElementById("wiiMenuMusic");
	if (bannerMusic) {
		bannerMusic.pause();
		bannerMusic.currentTime = 0;
	}
	if (menuMusic && localStorage.getItem("returnToMenu") === "true") {
		menuMusic.pause();
		menuMusic.currentTime = 0;
	}
	render(<Component />, appRoot);
}
