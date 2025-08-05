import { useEffect, useState, useRef } from "preact/hooks";

export function TestingMenu({ visible, onClose }) {
	const [done, setDone] = useState(false);
	const [stage, setStage] = useState("initial");
	const windowRef = useRef(null);
	const pos = useRef({ dragging: false, offsetX: 0, offsetY: 0 });

	useEffect(() => {
		setDone(localStorage.getItem("oobeCompleted") === "true");
		setStage(localStorage.getItem("oobeStage") || "initial");
	}, []);

	const toggleDone = () => {
		const newVal = !done;
		localStorage.setItem("oobeCompleted", newVal.toString());
		setDone(newVal);
		window.location.reload();
	};

	const changeStage = (e) => {
		const val = e.target.value;
		localStorage.setItem("oobeStage", val);
		setStage(val);
		window.location.reload();
	};

	const resetChannels = () => {
		localStorage.removeItem("channels");
		window.location.reload();
	};

	const onMouseDown = (e) => {
		pos.current.dragging = true;
		const rect = windowRef.current.getBoundingClientRect();
		pos.current.offsetX = e.clientX - rect.left;
		pos.current.offsetY = e.clientY - rect.top;
		e.preventDefault();
	};

	const onMouseMove = (e) => {
		if (!pos.current.dragging) return;
		const x = e.clientX - pos.current.offsetX;
		const y = e.clientY - pos.current.offsetY;
		windowRef.current.style.left = x + "px";
		windowRef.current.style.top = y + "px";
	};

	const onMouseUp = () => {
		pos.current.dragging = false;
	};

	useEffect(() => {
		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("mouseup", onMouseUp);
		return () => {
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseup", onMouseUp);
		};
	}, []);

	if (!visible) return null;

	return (
		<div
			ref={windowRef}
			class="fixed top-[20vh] left-[20vw] w-80 rounded-lg border border-blue-300/25 bg-white/10 backdrop-blur-[15px] shadow-md text-white select-none z-100 transition-opacity duration-300 opacity-100"
		>
			<div
				onMouseDown={onMouseDown}
				class="cursor-move px-4 py-2 font-bold text-lg border-b border-blue-300/25 flex justify-between items-center rounded-t-lg bg-blue-400/40"
			>
				<span>UncensorMii DEBUG</span>
				<button
					onClick={onClose}
					class="bg-transparent border-none text-white font-bold text-xl cursor-pointer leading-none"
					aria-label="close menu"
				>
					×
				</button>
			</div>

			<div class="bg-background text-primary p-4">
				<label class="flex items-center mb-4 cursor-pointer">
					<input
						type="checkbox"
						checked={done}
						onChange={toggleDone}
						class="mr-2"
					/>
					oobe completed
				</label>

				<div class="mb-4">
					<p class="font-semibold mb-2">oobe stage:</p>
					{["initial", "sysBkndSplash", "sysBknd"].map((stageOption) => (
						<label key={stageOption} class="block cursor-pointer mb-1">
							<input
								type="radio"
								name="oobeStage"
								value={stageOption}
								checked={stage === stageOption}
								onChange={changeStage}
								class="mr-2"
							/>
							{stageOption}
						</label>
					))}
				</div>

				<button
					onClick={resetChannels}
					class="mt-2 px-4 py-1 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition"
				>
					Reset Channels
				</button>
			</div>
		</div>
	);
}
