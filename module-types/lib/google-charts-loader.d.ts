declare module "google-charts-loader" {
	export function getChartsLoader(): any;
	export default function loadGoogleCharts(
		version?: string,
		settings?: {}
	): any;
}
