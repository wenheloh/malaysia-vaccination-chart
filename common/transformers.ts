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
	rawData: CompositeRawDataType[],
	payload?: any
) => {
	switch (type) {
		case DataSourceType.TOTAL_VACCINATED:
			return transformTotalVaccinatedRawData(
				rawData as TotalVaccinatedType[],
				payload
			);
		case DataSourceType.POPULATION:
			return transformPopulationRawData(rawData as PopulationType[]);
	}
};

const transformTotalVaccinatedRawData = (
	rawData: TotalVaccinatedType[],
	{ populationData }: { populationData: PopulationType[] }
): Map<string, ChartData> => {
	const getVaccinatedPercentage = (numerator: string) => {
		const cumulativeVaccinated = parseInt(numerator);
		const totalPopulation = parseInt(
			populationData.find(data => data.idxs === "0")?.pop ?? "0"
		);

		// impossible to happen but Typescript is complaining 🤷
		if (totalPopulation === 0) {
			return 0.0;
		}

		return parseFloat(
			((cumulativeVaccinated / totalPopulation) * 100).toFixed(2)
		);
	};

	return new Map<string, ChartData>([
		[
			TotalVaccinatedChartVariants.CUMULATIVE_VACCINATED,
			{
				labels: rawData.map(data => data.date),
				datasets: [
					{
						label: "Dose 1 Cumulative",
						data: rawData.map(data => parseInt(data.dose1_cumul)),
						backgroundColor: "#90caf9",
						borderColor: "#5c6bc0",
						tension: 0.1,
					},
					{
						label: "Dose 2 Cumulative",
						data: rawData.map(data => parseInt(data.dose2_cumul)),
						backgroundColor: "#dcedc8",
						borderColor: "#dcedc8",
						tension: 0.1,
					},
				],
			} as ChartData<"line">,
		],
		[
			TotalVaccinatedChartVariants.DAILY_VACCINATED,
			{
				labels: rawData.map(data => data.date),
				datasets: [
					{
						label: "Dose 1 Daily",
						data: rawData.map(data => parseInt(data.dose1_daily)),
						backgroundColor: "#90caf9",
						borderColor: "#5c6bc0",
						tension: 0.1,
					},
					{
						label: "Dose 2 Daily",
						data: rawData.map(data => parseInt(data.dose2_daily)),
						backgroundColor: "#dcedc8",
						borderColor: "#dcedc8",
						tension: 0.1,
					},
				],
			} as ChartData<"line">,
		],
		[
			TotalVaccinatedChartVariants.VACCINATED_POPULATION,
			{
				labels: [
					"Population with at least 1 dose",
					"Fully vaccinated population",
				],
				datasets: [
					{
						data: [
							getVaccinatedPercentage(
								rawData[rawData.length - 1].dose1_cumul
							),
							getVaccinatedPercentage(
								rawData[rawData.length - 1].dose2_cumul
							),
						],
						backgroundColor: ["#90caf9", "#dcedc8"],
						borderColor: ["#5c6bc0", "#dcedc8"],
					},
				],
			} as ChartData<"bar">,
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
