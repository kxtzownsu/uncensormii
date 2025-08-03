export const defaultChannels = [
	{
		id: "disc",
		name: "Disc Channel",
		icon: "/assets/nintendo/chn/disc/icon.svg", // if the icon works in both SD and WS, use icon instead of WSicon/SDicon
		musicFile: "",
		WSbanner: "/assets/nintendo/chn/disc/bannerWS.png",
		SDbanner: "/assets/nintendo/chn/disc/bannerSD.png",
		rotating: true,
	},
	{
		id: "example",
		name: "Example Channel",
		WSicon: "/assets/nintendo/chn/example/iconWS.png",
		SDicon: "/assets/nintendo/chn/example/iconSD.png",
		musicFile: "/assets/nintendo/audio/NoA_ding.mp3",
		WSbanner: "/assets/nintendo/chn/example/bannerWS.png",
		SDbanner: "/assets/nintendo/chn/example/bannerSD.png",
		fsimg: true, // take up entire channel space for image, excluding border
	},
	{
		id: "proxy",
		name: "Proxy Channel",
		WSicon: "/assets/nintendo/chn/proxy/iconWS.png",
		SDicon: "/assets/nintendo/chn/proxy/iconSD.png",
		musicFile: "/assets/nintendo/chn/proxy/banner.mp3",
		WSbanner: "/assets/nintendo/chn/proxy/bannerWS.png",
		SDbanner: "/assets/nintendo/chn/proxy/bannerSD.png",
		fsimg: true,
	},
];
