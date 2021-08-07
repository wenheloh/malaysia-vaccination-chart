import neatCsv from "neat-csv";
import axios from "axios";
import { DataSourceType } from "../../common/custom-typings/enums";

const dataSourceUrl = {
	[DataSourceType.POPULATION]:
		"https://raw.githubusercontent.com/CITF-Malaysia/citf-public/main/static/population.csv",
	[DataSourceType.TOTAL_VACCINATED]:
		"https://raw.githubusercontent.com/CITF-Malaysia/citf-public/main/vaccination/vax_malaysia.csv",
	[DataSourceType.VACCINATED_BY_STATE]:
		"https://raw.githubusercontent.com/CITF-Malaysia/citf-public/main/vaccination/vax_state.csv",
	// [DataSourceType.TOTAL_REGISTERED]:
	// 	"https://raw.githubusercontent.com/CITF-Malaysia/citf-public/main/registration/vaxreg_malaysia.csv",
	// [DataSourceType.REGISTERED_BY_STATE]:
	// 	"https://raw.githubusercontent.com/CITF-Malaysia/citf-public/main/registration/vaxreg_state.csv",
};

export default class DataService {
	public async getData(type: DataSourceType) {
		try {
			const url = dataSourceUrl[type];
			const { data } = await axios({
				method: "GET",
				url,
				responseType: "text",
			});
			return await neatCsv(data);
		} catch (error) {
			console.error("API server error: ", error);
			return "";
		}
	}
}
