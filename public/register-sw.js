"use strict";
/**
 * Distributed with Ultraviolet and compatible with most configurations.
 */
const stockSW = "/uv/sw.js";

/**
 * List of hostnames that are allowed to run serviceworkers on http://
 */

const swAllowedHostnames = ["localhost", "127.0.0.1"];

async function registerSW() {
	if (!navigator.serviceWorker) {
		if (
			location.protocol !== "https:" &&
			!swAllowedHostnames.includes(location.hostname)
		)
			throw new Error("Service workers cannot be registered without https.");
		throw new Error("Your browser doesn't support service workers.");
	}

	await navigator.serviceWorker.register(stockSW);
	console.log("uncensormii sw");

	if (!localStorage.getItem("wispUrl")) {
		localStorage.setItem("wispUrl", "wss://uncensormii.kxtz.dev/wisp/");
		console.log(
			"No Wisp URL set, defaulting to wss://uncensormii.kxtz.dev/wisp/. Modify localStorage.wispUrl to change this.",
		);
	}

	await BareMux.SetTransport(localStorage.getItem("transport"), {
		wisp: localStorage.getItem("wispUrl"),
	});
}
