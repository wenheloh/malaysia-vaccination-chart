import {
	CompositeRawDataType,
	DataSourceType,
	MalaysiaState,
	PopulationType,
	TotalVaccinatedType,
} from "~/common/customTypings/rawDataTypings";
import { ChartData } from "chart.js";
import {
	AgeGroupLabels,
	PopulationChartVariants,
	TotalVaccinatedChartVariants,
} from "~/common/customTypings";

export const transformRawData = (
	type: DataSourceType,
	rawData: CompositeRawDataType[]
) => {
	switch (type) {
		case DataSourceType.TOTAL_VACCINATED:
			return transformTotalVaccinatedRawData(
				rawData as TotalVaccinatedType[]
			);
		case DataSourceType.POPULATION:
			return transformPopulationRawData(rawData as PopulationType[]);
	}
};

const transformTotalVaccinatedRawData = (
	rawData: TotalVaccinatedType[]
): Map<string, ChartData> => {
	return new Map<string, ChartData>([
		[
			TotalVaccinatedChartVariants.CUMULATIVE_VACCINATED,
			{
				labels: rawData.map(data => data.date),
				datasets: [
					{
						label: "Dose 1 Cumulative",
						data: rawData.map(data => data.dose1_cumul),
						backgroundColor: "#90caf9",
						borderColor: "#5c6bc0",
						tension: 0.1,
					},
					{
						label: "Dose 2 Cumulative",
						data: rawData.map(data => data.dose2_cumul),
						backgroundColor: "#dcedc8",
						borderColor: "#dcedc8",
						tension: 0.1,
					},
				],
			},
		],
		[
			TotalVaccinatedChartVariants.DAILY_VACCINATED,
			{
				labels: rawData.map(data => data.date),
				datasets: [
					{
						label: "Dose 1 Daily",
						data: rawData.map(data => data.dose1_daily),
						backgroundColor: "#90caf9",
						borderColor: "#5c6bc0",
						tension: 0.1,
					},
					{
						label: "Dose 2 Daily",
						data: rawData.map(data => data.dose2_daily),
						backgroundColor: "#dcedc8",
						borderColor: "#dcedc8",
						tension: 0.1,
					},
				],
			},
		],
	]);
};

const transformPopulationRawData = (
	rawData: PopulationType[]
): Map<string, ChartData> => {
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
			},
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
			},
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
			},
		],
	]);
};
