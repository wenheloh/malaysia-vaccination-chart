declare module "vue-google-charts" {
	export function install(Vue: any): void;
	export default plugin;
	import loadGoogleCharts from "./lib/google-charts-loader";
	import GChart from "./components/GChart";

	namespace plugin {
		export const version: any;
		export { install };
	}
	export { loadGoogleCharts, GChart };
}
