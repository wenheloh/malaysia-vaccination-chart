import {
	AgeGroupLabels,
	MalaysiaState,
	PopulationChartVariants,
	PopulationType,
} from "~/common/customTypings";
import { ChartData } from "chart.js";

export const transformPopulationRawData = (
	rawData: PopulationType[]
): Map<string, ChartData> => {
	// TODO: probably can refactor to be inline?
	const data = Object.values(MalaysiaState).map(state => {
		const stateData = rawData.find(data => data.state === state);
		const above_18 = parseInt(stateData?.pop_18 ?? "0");
		const above_60 = parseInt(stateData?.pop_60 ?? "0");
		const under_18 = parseInt(stateData?.pop ?? "0") - above_18 - above_60;

		return {
			under_18,
			above_18,
			above_60,
		};
	});

	return new Map<string, ChartData>([
		[
			PopulationChartVariants.STATES_AND_AGE_GROUP,
			{
				labels: Object.values(MalaysiaState),
				datasets: [
					{
						label: AgeGroupLabels.UNDER_18,
						data: data.map(d => d.under_18),
						backgroundColor: "#dcedc8",
						borderWidth: 1,
						borderColor: "#4caf50",
					},
					{
						label: AgeGroupLabels.ABOVE_18,
						data: data.map(d => d.above_18),
						backgroundColor: "#90caf9",
						borderWidth: 1,
						borderColor: "#5c6bc0",
					},
					{
						label: AgeGroupLabels.ABOVE_60,
						data: data.map(d => d.above_60),
						backgroundColor: "#ef9a9a",
						borderWidth: 1,
						borderColor: "#f06292",
					},
				],
			} as ChartData<"bar">,
		],
		[
			PopulationChartVariants.STATES,
			{
				labels: Object.values(MalaysiaState),
				datasets: [
					{
						data: data.map(
							d => d.under_18 + d.above_18 + d.above_60
						),
						backgroundColor: [
							"#dcedc8",
							"#90caf9",
							"#ef9a9a",
							"#dcedc8",
							"#90caf9",
							"#ef9a9a",
							"#dcedc8",
							"#90caf9",
							"#ef9a9a",
							"#dcedc8",
							"#90caf9",
							"#ef9a9a",
							"#dcedc8",
							"#90caf9",
							"#ef9a9a",
							"#dcedc8",
						],
					},
				],
			} as ChartData<"pie">,
		],
		[
			PopulationChartVariants.AGE_GROUP,
			{
				labels: Object.values(AgeGroupLabels),
				datasets: [
					{
						data: [
							data.reduce(
								(cumul, current) => cumul + current.under_18,
								0
							),
							data.reduce(
								(cumul, current) => cumul + current.above_18,
								0
							),
							data.reduce(
								(cumul, current) => cumul + current.above_60,
								0
							),
						],
						backgroundColor: ["#dcedc8", "#90caf9", "#ef9a9a"],
					},
				],
			} as ChartData<"pie">,
		],
	]);
};
