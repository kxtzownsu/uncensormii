import { useEffect, useState, useRef } from "preact/hooks";
import { EnterKeyIcon_svg } from "../assets/enter.jsx";
import { SysBkndSelect_ContSetup } from "./sysBkndSelect.jsx";
import { WispServerSelect } from "./wispServer.jsx";
import { wiiPlayAudio } from "../menuAPI/WiiAudio.jsx";

export function Setup() {
	const [phase, setPhase] = useState(
		localStorage.getItem("oobeStage") || "initial",
	);
	const [isFading, setIsFading] = useState(false);
	const dingAudioFile = "/assets/nintendo/audio/NoA_ding.mp3";

	// handle a keypress (ENTER or SPACE)
	useEffect(() => {
		const handleKey = (e) => {
			if (
				(e.key === "Enter" || e.key === " ") &&
				phase === "initial" &&
				!isFading
			) {
				wiiPlayAudio({ audioFile: dingAudioFile });
				setIsFading(true);
				setTimeout(() => {
					setPhase("sysBkndSplash");
					setIsFading(false);
				}, 2000);
			}
		};

		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, [phase, isFading]);

	// render either the PressEnterToContinue menu
	// or the SelectSystemBackend splash
	useEffect(() => {
		// im testing switch cases ignore this :D
		switch (phase) {
			case "initial":
				console.log("initial");
				break;
			case "sysBkndSplash":
				console.log("sysBkndSplash");
				break;
			case "wispServer":
				console.log("wispServer");
				break;
		}
		if (phase === "initial") {
			document.body.style.backgroundImage =
				"url('/assets/setup/PressEnterToContinue.png')";
			localStorage.setItem("oobeStage", "initial");
		}

		if (phase === "sysBkndSplash") {
			localStorage.setItem("oobeStage", "sysBkndSplash");
			document.body.style.backgroundImage =
				"url('/assets/nintendo/NoA_whiteBackgroundLines.png')";
			const timer = setTimeout(() => {
				setIsFading(true);
				setTimeout(() => {
					// pass setup flow to sysbkndselect
					setPhase("SysBkndSelect_ContSetup");
					setIsFading(false);
				}, 500);
			}, 3000);
			return () => clearTimeout(timer);
		}

		if (phase === "wispServer") {
			localStorage.setItem("oobeStage", "wispServer");
			document.body.style.backgroundImage =
				"url('/assets/setup/wispServerSplash.png')";
			const timer = setTimeout(() => {
				setIsFading(true);
				setTimeout(() => {
					setPhase("wispServer");
					setIsFading(false);
				}, 500);
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [phase]);

	// text that'll be rendered,
	// name of array is the stage it'll
	// be rendered on
	const texts = {
		initial: [
			"Press [ENTER] to continue.", // ts would be "Press [ENTER] to continue."
			"Appuyez sur [ENTRÉE] pour continuer.",
			"Presione [ENTER] para continuar.",
		],
		sysBkndSplash: [
			"Select the system backend.",
			"Sélectionnez le backend du système.",
			"Seleccione el backend del sistema.",
		],
	};

	// the goods
	return (
		<setup>
			<div className="relative h-screen w-full overflow-hidden">
				{(phase === "initial" || phase === "SysBkndSelect_ContSetup") && (
					<div
						className="absolute left-1/2 top-1/2 w-screen h-[70vh] px-8 flex text-gray-500 text-lg bg-repeat-x bg-top transition-transform duration-300"
						style={{
							transform: `translateX(${phase === "SysBkndSelect_ContSetup" ? "-50%" : "-80%"}) translateY(-50%)`,
						}}
					>
						<div className="relative w-full h-full flex items-center pl-46 space-x-6">
							<div
								className="flex flex-wrap flex-row items-center gap-8 transition-opacity duration-[2000ms] ease-in-out overflow-x-auto px-8"
								style={{ opacity: phase !== "initial" || isFading ? 0 : 1 }}
							>
								{texts.initial.map((line, i) => (
									<p
										key={i}
										className="text-xs sm:text-sm lg:text-base xl:text-base flex-shrink-0"
									>
										{line}
									</p>
								))}
							</div>

							{phase === "SysBkndSelect_ContSetup" && !isFading && (
								<SysBkndSelect_ContSetup />
							)}
						</div>
					</div>
				)}

				{phase === "sysBkndSplash" && (
					<div
						className="absolute left-1/2 top-1/2 w-screen h-[70vh] px-8 flex text-gray-500 text-lg bg-repeat-x bg-top transition-opacity duration-300"
						style={{
							transform: "translateX(-50%) translateY(-50%)",
							opacity: isFading ? 0 : 1,
						}}
					>
						<div className="flex flex-col justify-center space-y-4 w-full h-full">
							{texts.sysBkndSplash.map((line, i) => (
								<p
									key={i}
									className="text-xs sm:text-sm lg:text-base xl:text-base flex-shrink-0 text-center"
								>
									{line}
								</p>
							))}
						</div>
					</div>
				)}

				{phase === "wispServer" && (
					<div
						className="absolute left-1/2 top-1/2 w-screen h-[70vh] px-8 flex text-gray-500 text-lg bg-repeat-x bg-top transition-opacity duration-300"
						style={{
							transform: "translateX(-50%) translateY(-50%)",
							opacity: isFading ? 0 : 1,
						}}
					>
						<WispServerSelect />
					</div>
				)}

				<div className="absolute left-1/2 top-1/2 -translate-x-[25%] -translate-y-[50%] px-8 scale-20 text-gray-500 text-lg bg-repeat-x bg-top">
					{!isFading && phase === "initial" && (
						<EnterKeyIcon_svg className="w-150 h-150" />
					)}
				</div>
			</div>
		</setup>
	);
}
