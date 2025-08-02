import { createRoot } from "preact/compat/client";
import { WiiChannelLookup } from "./WiiChannelLookup";
import { WiiChannelFull } from "./WiiChannelFull";
import { wiiPlayAudio } from "./WiiAudio.jsx";

let root = null;
let container = null;

// god i hate this so much
const resetStyles = {
    position: "",
    top: "",
    left: "",
    width: "",
    height: "",
    zIndex: "",
    willChange: "",
    transformOrigin: "",
    transition: "",
    transform: "",
};

const shrinkStyles = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    zIndex: "9999",
    willChange: "transform",
    transformOrigin: "top left",
    transition: "transform 0.2s ease-in-out",
    transform: "scale(1)",
};

const growStartStyles = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "1px",
    height: "1px",
    zIndex: "101",
    willChange: "width, height",
    transition: "width 0.2s ease-in-out, height 0.2s ease-in-out",
};

const growEndStyles = {
    width: "",
    height: "",
    transition: "",
    willChange: "",
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "101",
};
//////////////////

function getInitialMode() {
    return window.parent.__WiiCTX__?.mode || "standard";
}

export function WiiChannelHandler(id) {
    container = container || document.querySelector("wiichannelfswindow");
    if (!container) return;

    if (id === "SPCL.returnToMenu") {
        window.parent.__WiiCTX__.channel = "none";
        if (!root) return;
		wiiPlayAudio({ audioFile: "/assets/nintendo/audio/wiimenu/NoA_CloseChannel.wav" });

        Object.assign(container.style, shrinkStyles);
        container.getBoundingClientRect();
        container.style.transform = "scale(0.01)";

        const onTransitionEnd = (e) => {
            if (e.target === container && e.propertyName === "transform") {
                container.removeEventListener("transitionend", onTransitionEnd);
                root.unmount();
                root = null;
                Object.assign(container.style, resetStyles);
                container.classList.remove("w-screen", "h-screen");
            }
        };

        container.addEventListener("transitionend", onTransitionEnd);
        return;
    }

    const chn = WiiChannelLookup(id);
    if (!chn) return;

    window.parent.__WiiCTX__.channel = id;
    const mode = getInitialMode();

    if (!root) root = createRoot(container);

    container.classList.remove("w-screen", "h-screen");
    Object.assign(container.style, growStartStyles);

    wiiPlayAudio({ audioFile: "/assets/nintendo/audio/wiimenu/NoA_OpenChannel.wav" });
    root.render(<WiiChannelFull chn={chn} mode={mode} />);

    requestAnimationFrame(() => {
        Object.assign(container.style, { width: "100vw", height: "100vh" });
    });

    const onGrowEnd = (e) => {
        if (
            e.target === container &&
            (e.propertyName === "width" || e.propertyName === "height")
        ) {
            container.removeEventListener("transitionend", onGrowEnd);
            Object.assign(container.style, growEndStyles);
            container.classList.add("w-screen", "h-screen");
        }
    };

    container.addEventListener("transitionend", onGrowEnd);
}
