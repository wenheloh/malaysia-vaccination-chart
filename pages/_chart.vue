<template>
	<div>
		<TotalVaccinatedChart v-if="showTotalVaccinatedChart" :data="transformedData"/>
		<VaccinatedByStateChart v-if="showVaccinatedByStateChart" :data="transformedData"/>
		<PopulationChart v-if="showPopulationChart" :data="transformedData"/>
		<v-overlay :value="isLoading">
			<v-progress-circular
				indeterminate
				size="64"
			>
			</v-progress-circular>
		</v-overlay>
	</div>
</template>

<script lang="ts">
import { IContentDocument } from "@nuxt/content/types/content";
import { Context } from "@nuxt/types";
import axios from "axios";
import { ChartData } from "chart.js";
import csv from "csvtojson";
import { Component, Vue } from "nuxt-property-decorator";
import { DataSourceType, dataSourceUrl } from "~/common/custom-typings/enums";
import { CompositeRawDataType, IPopulationType } from "~/common/custom-typings/rawDataTypings";
import { transformRawData } from "~/common/data-transformers";

const fetchData = async (type: DataSourceType): Promise<CompositeRawDataType[]> => {
	const url = dataSourceUrl[type];
	const { data } = await axios({
		method: "GET",
		url,
		responseType: "text",
	});
	return csv().fromString(data);
}

@Component({
	async asyncData({ params, redirect, $content }: Context) {
		if (!!params.chart && !Object.values(DataSourceType).includes(params.chart as DataSourceType) && params.chart !== "error") {
			redirect("/error");
			return;
		}

		if(params.chart === "error") {
			return;
		}

		const type = (params.chart ?? "total-vaccinated") as DataSourceType;
		const { body: populationData } = await $content("population").fetch() as IContentDocument;

		return { type, populationData }
	}
})
export default class Home extends Vue {
	private type!: DataSourceType;
	private populationData!: IPopulationType[];
	private transformedData!: Map<string, ChartData>;
	private isLoading: boolean = true;

	// Initiate show/hide states
	private showTotalVaccinatedChart = false;
	private showVaccinatedByStateChart = false;
	private showPopulationChart = false;

	mounted() {
		(async (type) => {
			// Transform
			if(type === DataSourceType.POPULATION) {
				this.transformedData = transformRawData(type, this.populationData);
			} else {
				const rawData = await fetchData(type);
				this.transformedData = transformRawData(type, rawData, { populationData: this.populationData });
			}

			this.showTotalVaccinatedChart = type === DataSourceType.TOTAL_VACCINATED;
			this.showVaccinatedByStateChart = type === DataSourceType.VACCINATED_BY_STATE;
			this.showPopulationChart = type === DataSourceType.POPULATION;

			this.isLoading = false;
		})(this.type)
	}
}
</script>
