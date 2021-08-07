import {
	CompositeRawDataType,
	DataSourceType,
	IPopulationType,
	ITotalVaccinatedType,
	IVaccinatedByStateType,
} from "~/common/customTypings";
import { transformTotalVaccinatedRawData } from "~/common/transformers/TotalVaccinatedDataTransformer";
import { transformPopulationRawData } from "~/common/transformers/PopulationDataTransformer";
import { transformVaccinatedByStateRawData } from "~/common/transformers/VaccinatedByStateDataTransformer";

export const transformRawData = (
	type: DataSourceType,
	rawData: CompositeRawDataType[],
	payload?: any
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
