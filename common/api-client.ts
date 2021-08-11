import axios from "axios";
import csv from "csvtojson";
import { CompositeRawDataType, DataSourceType } from "~/common/custom-typings";
import { dataSourceUrl } from "~/common/custom-typings/enums";

export const fetchData = async (type: DataSourceType): Promise<CompositeRawDataType[]> => {
	const url = dataSourceUrl[type];
	const { data } = await axios({
		method: "GET",
		url,
		responseType: "text",
	});
	return csv().fromString(data);
}
