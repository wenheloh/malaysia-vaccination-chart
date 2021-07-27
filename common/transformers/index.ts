import {
	CompositeRawDataType,
	DataSourceType,
	PopulationType,
	TotalVaccinatedType,
} from "~/common/customTypings";
import { transformTotalVaccinatedRawData } from "~/common/transformers/TotalVaccinatedDataTransformer";
import { transformPopulationRawData } from "~/common/transformers/PopulationDataTransformer";

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
