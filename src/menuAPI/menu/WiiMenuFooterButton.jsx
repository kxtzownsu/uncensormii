import { wiiPlayAudio } from "../WiiAudio";

export function WiiMenuFooterButton({
	icon,
	children,
	onClick,
	mode = "widescreen",
}) {
	const iconSize = mode === "standard" ? "w-7 h-7" : "w-7 h-7";
	const buttonSize = mode === "standard" ? "w-15 h-15" : "w-14 h-14";

	return (
		<button
			className={`${buttonSize} rounded-full cursor-pointer bg-white border-2 border-[#34BEED] shadow-lg flex items-center justify-center hover:bg-[#eaf6fb] transition-all`}
			style={{ boxShadow: "0 0 16px 2px #34BEED88" }}
			onClick={() => {
				wiiPlayAudio({ audioFile: "/assets/nintendo/audio/NoA_ding.mp3" });
				if (onClick) onClick();
			}}
		>
			{icon ? <img src={icon} className={iconSize} /> : children}
		</button>
	);
}
