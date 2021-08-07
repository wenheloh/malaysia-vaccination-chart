import {
	IPopulationType,
	TotalVaccinatedChartVariants,
	ITotalVaccinatedType,
} from "~/common/custom-typings";
import { ChartData } from "chart.js";

export const transformTotalVaccinatedRawData = (
	rawData: ITotalVaccinatedType[],
	{ populationData }: { populationData: IPopulationType[] }
): Map<string, ChartData> => {
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
								populationData,
								rawData[rawData.length - 1].dose1_cumul
							),
							getVaccinatedPercentage(
								populationData,
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

const getVaccinatedPercentage = (
	populationData: IPopulationType[],
	numerator: string
) => {
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
