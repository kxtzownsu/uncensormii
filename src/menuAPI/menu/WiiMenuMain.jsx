import { useEffect, useRef, useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { WiiChannel } from "../WiiChannel";
import { WiiMenuFooterButton } from "./WiiMenuFooterButton";
import { WiiMenuFooter } from "./WiiMenuFooter";
import { WiiPlayAudio } from "../WiiAudio";
import { wiiPlayAudio } from "../WiiAudio";
import { WiiClock } from "./WiiMenuClock";
import { defaultChannels } from "../../global/defaultChannels";

export function WiiMenuMain({ mode }) {
	const [started, setStarted] = useState(() => {
    	return localStorage.getItem("returnToMenu") === "true";
  	});
	const [fadingOut, setFadingOut] = useState(false);
	const [fadeIn, setFadeIn] = useState(false);
	const audioRef = useRef(null);

	useEffect(() => {
		if (!localStorage.getItem("channels")) {
			localStorage.setItem("channels", JSON.stringify(defaultChannels));
		}

		function handleKeyPress(e) {
			if (e.key === "Enter") {
				setFadingOut(true);

				if (audioRef.current) {
					audioRef.current.play().catch((err) => console.warn(err));
				}
				
				setTimeout(() => {
					setStarted(true);
					localStorage.setItem("returnToMenu", "false");
				}, 1000);
			}
		}

		window.addEventListener("keydown", handleKeyPress);
		return () => window.removeEventListener("keydown", handleKeyPress);
	}, []);

	useEffect(() => {
		if (started) {
			const timer = setTimeout(() => setFadeIn(true), 50);
			return () => clearTimeout(timer);
		}
	}, [started]);

	const channels = JSON.parse(localStorage.getItem("channels") || "[]");
	const aspect = mode === "standard" ? "4 / 3" : "16 / 9";

	function settings() {
		console.log("Settings clicked");
	}

	function mail() {
		console.log("Mail clicked");
	}

	if (!started) {
		return (
			<div
				className={`grid content-center text-center bg-black text-white transition-opacity duration-1000 ${
					fadingOut ? "opacity-0" : "opacity-100"
				}`}
				style={{ height: "100vh", width: "100vw" }}
			>
				<p style={{ fontFamily: "'Wii H&S', sans-serif" }} className="text-xl">
					⚠ WARNING - HEALTH AND SAFETY
					<br></br><br></br>
				</p>

				<p style={{ lineHeight: "1.75" }} className="text-sm">
BY USING UNCENSORMII, YOU AGREE TO THE TERMS<br></br>
OF THE GNU AFFERO GENERAL PUBLIC LICENSE v3.<br></br>
THIS SOFTWARE IS PROVIDED AS-IS, WITH ABSOLUTELY<br></br>
ZERO WARRANTY. USE AT YOUR OWN RISK.<br></br>
<br></br>
				</p>

				<p className="text-xs">
					More info at
				</p>

				<p style={{ lineHeight: "1.75" }} className="text-sm">
					https://gnu.org/licenses/agpl-3.0.html<br></br>
					https://github.com/kxtzownsu/UncensorMii/
				</p>

				<p className="text-xl">
					<br></br>Press [ENTER] to Continue
				</p>
				<audio ref={audioRef} src="/assets/nintendo/audio/wiimenu/NoA_OpenChannel.wav" preload="auto" />
			</div>
		);
	}

	if (localStorage.getItem("homeMenuOpen") === "false") {
		wiiPlayAudio({ audioFile: "/assets/nintendo/audio/wiimenu/NoA_startup.mp3", id: "wiiMenuStartup", preload: "true" });
		wiiPlayAudio({ audioFile: "/assets/nintendo/audio/wiimenu/NoA_music.ogg", id: "wiiMenuMusic", loop: "true", preload: "true" });
	}

	return (
		<>
			<wiichannelfswindow></wiichannelfswindow>
			{localStorage.setItem("returnToMenu", "false")}
			{started && (
				<div
				className={`flex flex-col bg-gradient-to-b from-[#f6f6f6] to-[#e1e2e6] transition-opacity duration-1000 ${
			fadeIn ? "opacity-100" : "opacity-0"}`}
				style={{
					height: "100vh",
					width: `calc(100vw * ${aspect})`,
					maxWidth: "100vw",
					maxHeight: "100vh",
					overflow: "hidden",
					margin: "0 auto",
				}}
				>
				<div className="flex-1 basis-[80%] bg-[#e1e2e6] border-b-2 border-[#b3e3fa] flex flex-col items-center justify-center">
					<div
						className="grid grid-cols-4 grid-rows-3 gap-3"
						style={{
							width: "fit-content",
							height: "80%",
							margin: "0 auto",
						}}
					>
						{[...Array(12)].map((_, i) => {
							const ch = channels[i];
							return ch ? (
								<WiiChannel id={ch.id} enabled mode={mode} fsimg={ch.fsimg} />
							) : (
								<WiiChannel key={`placeholder-${i}`} mode={mode} />
							);
						})}
					</div>
				</div>

				<WiiMenuFooter>
					<WiiMenuFooterButton
						icon="/Favicon.png"
						clickID="settings"
						onClick={settings}
						mode={mode}
					/>
					<WiiClock />
					<WiiMenuFooterButton clickID="mail" mode={mode} onClick={mail}>
						<FaEnvelope size={32} color="#34BEED" />
					</WiiMenuFooterButton>
				</WiiMenuFooter>
			</div>
			)}
		</>
	);
}
