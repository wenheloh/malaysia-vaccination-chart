import {
	IPopulationType,
	IVaccinatedByStateType,
	MalaysiaState,
	VaccinatedByStateChartVariants,
} from "~/common/custom-typings";
import { MalaysiaStateIsoCode } from "~/common/custom-typings/enums";

export const transformVaccinatedByStateRawData = (
	rawData: IVaccinatedByStateType[],
	{ populationData }: { populationData: IPopulationType[] }
): Map<string, any> => {
	return new Map<string, any>([
		[
			VaccinatedByStateChartVariants.CUMULATIVE_AND_DAILY_VACCINATED,
			generateCumulativeAndDailyData(rawData),
		],
		[
			VaccinatedByStateChartVariants.VACCINATED_POPULATION,
			generateVaccinatedPopulationData(rawData, populationData),
		],
	]);
};

const generateCumulativeAndDailyData = (rawData: IVaccinatedByStateType[]) => {
	const transformedData = [["State", "Daily Dose", "Cumulative Dose"]];

	Object.values(MalaysiaState).forEach(state => {
		const filteredRawData = rawData.filter(data => data.state === state);
		transformedData.push([
			generateGChartStateObject(filteredRawData[0].state) as any,
			parseFloat(filteredRawData[filteredRawData.length - 1].cumul_partial),
			parseFloat(filteredRawData[filteredRawData.length - 1].cumul_full),
		]);
	});

	return transformedData;
};

const generateVaccinatedPopulationData = (
	rawData: IVaccinatedByStateType[],
	populationData: IPopulationType[]
) => {
	const transformedData = [["State", "Fully Vaccinated Population"]];

	Object.values(MalaysiaState).forEach(state => {
		const filteredRawData = rawData.filter(data => data.state === state);
		transformedData.push([
			generateGChartStateObject(filteredRawData[0].state) as any,
			generateVaccinatedPopulationByState(
				filteredRawData,
				populationData
			),
		]);
	});

	return transformedData;
};

const generateVaccinatedPopulationByState = (
	filteredRawData: IVaccinatedByStateType[],
	populationData: IPopulationType[]
) => {
	const totalFullyVaccinated = parseFloat(
		filteredRawData[filteredRawData.length - 1].cumul_full
	);

	const populationByState = parseFloat(
		populationData.filter(
			data => data.state === filteredRawData[0].state
		)[0].pop
	);

	return parseFloat(
		((totalFullyVaccinated / populationByState) * 100).toFixed(2)
	);
};

const generateGChartStateObject = (state: MalaysiaState) => {
	return {
		v: MalaysiaStateIsoCode[state],
		f: state,
	};
};
