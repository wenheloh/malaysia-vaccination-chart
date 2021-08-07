<template>
	<div>
		<TotalVaccinatedChart v-if="showTotalVaccinatedChart" :data="data"/>
		<VaccinatedByStateChart v-if="showVaccinatedByStateChart" :data="data"/>
		<PopulationChart v-if="showPopulationChart" :data="data"/>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CompositeRawDataType} from "~/common/custom-typings/rawDataTypings";
import { transformRawData } from "~/common/data-transformers";
import { ChartData } from "chart.js";
import axios from "axios";
import { DataSourceType } from "~/common/custom-typings/enums";

const fetchData = async (type: DataSourceType): Promise<CompositeRawDataType[]> => {
	const { data: { data: rawData } }: { data: { data: CompositeRawDataType[] } } = await axios({
		baseURL: process.env.apiBaseUrl,
		url: `/data/${type}`,
		method: "GET"
	})

	return rawData;
}

@Component({
	async asyncData({ params, redirect }) {
		try {
			if (!!params.chart && !Object.values(DataSourceType).includes(params.chart as DataSourceType) && params.chart !== "error") {
				redirect("/error");
				return {};
			}

			if(params.chart === "error") {
				return {};
			}

			const type = (params.chart ?? "total-vaccinated") as DataSourceType;
			const rawData = await fetchData(type);

			if (rawData.length === 0) {
				console.error("rawData is empty, type: ", type);
				redirect("/error");
				return {};
			}

			// Always get total population data as it is being used in different charts
			const populationData = await fetchData(DataSourceType.POPULATION);
			const transformedData = transformRawData(type, rawData, { populationData });

			return { type, data: transformedData };
		} catch (error) {
			console.error("asyncData error: ", error);
			redirect("/error");
		}
	}
})
export default class Home extends Vue {
	private type!: DataSourceType;
	private data!: Map<string, ChartData>;
	private showTotalVaccinatedChart = false;
	private showVaccinatedByStateChart = false;
	private showPopulationChart = false;
	// private showTotalRegisteredChart = false;
	// private showRegisteredByStateChart = false;

	mounted() {
		this.showTotalVaccinatedChart = this.type === DataSourceType.TOTAL_VACCINATED;
		this.showVaccinatedByStateChart = this.type === DataSourceType.VACCINATED_BY_STATE;
		this.showPopulationChart = this.type === DataSourceType.POPULATION;
		// this.showTotalRegisteredChart = this.type === DataSourceType.TOTAL_REGISTERED;
		// this.showRegisteredByStateChart = this.type === DataSourceType.REGISTERED_BY_STATE;
	}
}
</script>
