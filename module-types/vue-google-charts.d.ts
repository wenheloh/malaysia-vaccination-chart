declare module "google-charts-loader" {
	export function getChartsLoader(): any;
	export default function loadGoogleCharts(
		version?: string,
		settings?: {}
	): any;
}

declare module "GChart" {
	namespace _default {
		const name: string;
		namespace props {
			namespace type {
				const type_1: StringConstructor;
				export { type_1 as type };
			}
			namespace data {
				const type_2: (ObjectConstructor | ArrayConstructor)[];
				export { type_2 as type };
				function _default(): any[];
				export { _default as default };
			}
			namespace options {
				const type_3: ObjectConstructor;
				export { type_3 as type };
				function _default_1(): {};
				export { _default_1 as default };
			}
			namespace version {
				const type_4: StringConstructor;
				export { type_4 as type };
				const _default_2: string;
				export { _default_2 as default };
			}
			namespace settings {
				const type_5: ObjectConstructor;
				export { type_5 as type };
				function _default_3(): {
					packages: string[];
				};
				export { _default_3 as default };
			}
			namespace events {
				const type_6: ObjectConstructor;
				export { type_6 as type };
			}
			namespace createChart {
				const type_7: FunctionConstructor;
				export { type_7 as type };
			}
			namespace resizeDebounce {
				const type_8: NumberConstructor;
				export { type_8 as type };
				const _default_4: number;
				export { _default_4 as default };
			}
		}
		function data(): {
			chartObject: any;
		};
		function data(): {
			chartObject: any;
		};
		namespace watch {
			export namespace data_1 {
				const deep: boolean;
				function handler(): void;
				function handler(): void;
			}
			export { data_1 as data };
			export namespace options_1 {
				const deep_1: boolean;
				export { deep_1 as deep };
				export function handler(): void;
				export function handler(): void;
			}
			export { options_1 as options };
			export function type(value: any): void;
			export function type(value: any): void;
		}
		function mounted(): void;
		function mounted(): void;
		function beforeDestroy(): void;
		function beforeDestroy(): void;
		namespace methods {
			function drawChart(): void;
			function drawChart(): void;
			function getValidChartData(): any;
			function getValidChartData(): any;
			function createChartObject(): any;
			function createChartObject(): any;
			function attachListeners(): void;
			function attachListeners(): void;
		}
	}
	export default _default;
}

declare module "vue-google-charts" {
	export function install(Vue: any): void;
	export default plugin;
	import loadGoogleCharts from "google-charts-loader";
	import GChart from "GChart";

	namespace plugin {
		export const version: any;
		export { install };
	}
	export { loadGoogleCharts, GChart };
}
