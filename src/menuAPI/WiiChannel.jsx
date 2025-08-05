import { useEffect, useRef, useState } from "react";
import { WiiChannelHandler } from "./WiiChannelHandler";
import { WiiChannelLookup } from "./WiiChannelLookup";
import "./css/channel.css";
import "./css/animations.css";

export function WiiChannel({ id, enabled = false, mode = "widescreen", fsimg = false }) {
	const audioRef = useRef(null);
	const hoverTimeoutRef = useRef(null);
	const chn = WiiChannelLookup(id);

	const icon =
		mode === "widescreen"
			? chn?.WSicon || chn?.icon || ""
			: chn?.SDicon || chn?.icon || "";

	const name = chn?.name || "";
	const spin = chn?.rotating === true;

	const aspectClass =
		mode === "standard"
			? "aspect-[4/3] channel-scale-standard"
			: "aspect-[16/9] channel-scale-widescreen";

	function handleMouseEnter() {
		if (!enabled) return;

		hoverTimeoutRef.current = setTimeout(() => {
			const audio = audioRef.current;
			if (audio) {
				audio.currentTime = 0;
				audio.play().catch((err) => {
					console.warn("Audio play failed:", err);
				});
			}
		}, 500);
	}

	function handleMouseLeave() {
		if (hoverTimeoutRef.current) {
			clearTimeout(hoverTimeoutRef.current);
			hoverTimeoutRef.current = null;
		}
	}

	useEffect(() => {
		return () => {
			if (hoverTimeoutRef.current) {
				clearTimeout(hoverTimeoutRef.current);
			}
		};
	}, []);

	return (
		<div className="relative flex flex-col items-center group">
			<audio ref={audioRef} src="/assets/nintendo/audio/wiimenu/NoA_HoverChannel.wav" preload="auto" />

			<div
				className={`relative bg-white border-[#aaa] border-4 rounded-2xl transition-colors ${aspectClass} ${
					enabled ? "group-hover:border-blue-400 cursor-pointer" : "border-[#aaa]"
				}`}
				onClick={enabled ? () => WiiChannelHandler(id) : undefined}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				{icon && (
					<img
						src={icon}
						alt={id}
						className={`absolute inset-0 w-full h-full rounded-xl object-contain pointer-events-none ${
							spin ? "spin3d" : ""
						} ${fsimg ? "" : "p-1"}`}
					/>
				)}
			</div>

			{name && (
				<div
					className="absolute mt-5 top-full border-[#ccc] border-2 text-center bg-[#f0f0f0] rounded-full text-md text-[#444] shadow-sm z-10 chnHoverName whitespace-nowrap px-4"
				>
					{name}
				</div>
			)}
		</div>
	);
}
