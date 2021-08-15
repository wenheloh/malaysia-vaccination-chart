import {
	CompositeRawDataType,
	DataSourceType,
	IPopulationType,
	ITotalVaccinatedType,
	IVaccinatedByStateType,
} from "~/common/custom-typings";
import { transformPopulationRawData } from "~/common/data-transformers/population-data-transformer";
import { transformTotalVaccinatedRawData } from "~/common/data-transformers/total-vaccinated-data-transformer";
import { transformVaccinatedByStateRawData } from "~/common/data-transformers/vaccinated-by-state-data-transformer";

export interface IPayload {
	populationData: IPopulationType[],
	startDate?: string;
	endDate?: string;
}

export const transformRawData = (
	type: DataSourceType,
	rawData: CompositeRawDataType[],
	payload: IPayload = { populationData: [] }
) => {
	switch (type) {
		case DataSourceType.TOTAL_VACCINATED:
			return transformTotalVaccinatedRawData(
				rawData as ITotalVaccinatedType[],
				payload
			);

		case DataSourceType.VACCINATED_BY_STATE:
			return transformVaccinatedByStateRawData(
				rawData as IVaccinatedByStateType[],
				payload
			);

		case DataSourceType.POPULATION:
			return transformPopulationRawData(rawData as IPopulationType[]);
	}
};
