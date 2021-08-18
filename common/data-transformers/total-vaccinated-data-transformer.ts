import dayjs from "dayjs";
import {
	IPopulationType,
	TotalVaccinatedChartVariants,
	ITotalVaccinatedType,
} from "~/common/custom-typings";
import { ChartData } from "chart.js";
import { IPayload } from "~/common/data-transformers/index";

export const transformTotalVaccinatedRawData = (
	rawData: ITotalVaccinatedType[],
	payload: IPayload
): Map<string, ChartData> => {
	const { populationData, startDate, endDate } = payload;

	const dayJsStartDate = dayjs(startDate);
	const dayJsEndDate = dayjs(endDate);

	const filteredRawData = rawData.filter(data => {
		const currentDateDate = dayjs(data.date);
		return currentDateDate >= dayJsStartDate && currentDateDate <= dayJsEndDate;
	} );

	return new Map<string, ChartData>([
		[
			TotalVaccinatedChartVariants.CUMULATIVE_VACCINATED,
			{
				labels: filteredRawData.map(data => data.date),
				datasets: [
					{
						label: "Dose 1 Cumulative",
						data: filteredRawData.map(data => parseInt(data.cumul_partial)),
						backgroundColor: "#90caf9",
						borderColor: "#5c6bc0",
						tension: 0.1,
					},
					{
						label: "Dose 2 Cumulative",
						data: filteredRawData.map(data => parseInt(data.cumul_full)),
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
				labels: filteredRawData.map(data => data.date),
				datasets: [
					{
						label: "Dose 1 Daily",
						data: filteredRawData.map(data => parseInt(data.daily_partial)),
						backgroundColor: "#90caf9",
						borderColor: "#5c6bc0",
						tension: 0.1,
					},
					{
						label: "Dose 2 Daily",
						data: filteredRawData.map(data => parseInt(data.daily_full)),
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
								rawData[rawData.length - 1].cumul_partial
							),
							getVaccinatedPercentage(
								populationData,
								rawData[rawData.length - 1].cumul_full
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
