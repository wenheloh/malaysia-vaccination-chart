import colors from "vuetify/es5/util/colors";

export default {
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		// titleTemplate: '%s - malaysia-vaccination-graph',
		title: process.env.PROJECT_NAME || "Malaysia Vaccination Graph",
		htmlAttrs: {
			lang: "en",
		},
		meta: [
			{ charset: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				hid: "description",
				name: "description",
				content: "Visualizing data from CITF open data",
			},
			{ name: "format-detection", content: "telephone=no" },
		],
		link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
	},

	serverMiddleware: [
		{ path: "/api", handler: "~/server-middleware/server.ts" },
	],

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ["@/assets/common.scss"],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		{ src: "~/plugins/chartjs.js", ssr: false },
		{ src: "~/plugins/GChart.js", ssr: false },
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/typescript
		"@nuxt/typescript-build",
		// https://go.nuxtjs.dev/vuetify
		"@nuxtjs/vuetify",
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [],

	// Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
	vuetify: {
		customVariables: ["~/assets/variables.scss"],
		theme: {
			dark: true,
			themes: {
				dark: {
					primary: colors.blue.darken2,
					accent: colors.grey.darken3,
					secondary: colors.amber.darken3,
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green.accent3,
				},
			},
		},
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {},
	env: {
		projectName: process.env.PROJECT_NAME || "Malaysia Vaccination Graph",
		apiBaseUrl: process.env.API_BASE_URL || "http://localhost:3000/api",
		googleMapKey: process.env.GOOGLE_MAP_API_KEY || "",
	},
};
