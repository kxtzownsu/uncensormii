import { useEffect, useState } from "preact/hooks"
import { WiiButton } from "../menuAPI/WiiButton.jsx"

export function HomeMenu() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const handler = (e) => {
            if (e.metaKey && e.key === "Escape") {
                setVisible((v) => !v)
            }
        }

        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [])

    if (!visible) return null

    const close = () => setVisible(false)

    const returnToMenu = () => {
        location.reload()
    }

    return (
    <div class="fixed inset-0 z-999 w-screen h-screen bg-[#1e1e2e80] text-white flex flex-col font-wiimain">
        <div class="absolute h-16 flex justify-between items-center px-6 bg-black w-full rounded">
            <h1 class="text-xl font-bold">HOME Menu</h1>
            <WiiButton rounded onClick={close} class="px-4 py-2 text-white text-sm font-semibold">
                Close
            </WiiButton>
        </div>

        <div class="flex-grow flex items-center justify-center">
            <div class="flex flex-col gap-4 text-center">
                <WiiButton rounded onClick={returnToMenu} class="px-6 py-3 text-lg font-semibold">
                    Wii Menu
                </WiiButton>
            </div>
        </div>
    </div>
)
}
