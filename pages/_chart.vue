<template>
	<div>
		<TotalVaccinatedChart v-if="showTotalVaccinatedChart" :populationData="populationData"/>
		<VaccinatedByStateChart v-if="showVaccinatedByStateChart" :populationData="populationData"/>
		<PopulationChart v-if="showPopulationChart" :rawData="populationData"/>
	</div>
</template>

<script lang="ts">
import { IContentDocument } from "@nuxt/content/types/content";
import { Context } from "@nuxt/types";
import { Component, Vue } from "nuxt-property-decorator";
import { DataSourceType } from "~/common/custom-typings/enums";
import { IPopulationType } from "~/common/custom-typings/rawDataTypings";

@Component({
	async asyncData({ error, params, $content }: Context) {
		if (!!params.chart && !Object.values(DataSourceType).includes(params.chart as DataSourceType) && params.chart !== "error") {
			error({
				statusCode: 404
			})
			return {};
		}

		if (params.chart === "error") {
			error({
				statusCode: 500
			})
			return {};
		}

		const type = (params.chart ?? "total-vaccinated") as DataSourceType;
		const { body: populationData } = await $content("population").fetch() as IContentDocument;

		// Show/hide by type
		const showTotalVaccinatedChart = type === DataSourceType.TOTAL_VACCINATED;
		const showVaccinatedByStateChart = type === DataSourceType.VACCINATED_BY_STATE;
		const showPopulationChart = type === DataSourceType.POPULATION;

		return {
			populationData,
			showTotalVaccinatedChart,
			showVaccinatedByStateChart,
			showPopulationChart,
		}
	}
})
export default class Home extends Vue {
	private populationData!: IPopulationType[];
	private showTotalVaccinatedChart = false;
	private showVaccinatedByStateChart = false;
	private showPopulationChart = false;
}
</script>
