<template>
	<div>
		<div>
			<v-select height="36" :items="variants" :value="variants[0]" v-on:change="updateChart"></v-select>

		</div>
		<GChart type="GeoChart" v-if="isLoaded" :data="geoChartData" :options="geoChartOptions"
				:settings="{ packages: ['geochart'], mapsApiKey }"/>
		<v-overlay :value="!isLoaded">
			<v-progress-circular
				indeterminate
				size="64"
			>
			</v-progress-circular>
		</v-overlay>
	</div>
</template>

<script lang="ts">
import { ChartData } from "chart.js";
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { GChart } from "vue-google-charts";
import { fetchData } from "~/common/api-client";
import { DataSourceType, IPopulationType, VaccinatedByStateChartVariants } from "~/common/custom-typings";
import { transformRawData } from "~/common/data-transformers";

@Component({
	components: {
		GChart
	}
})
export default class LineChartComponent extends Vue {
	private mapsApiKey: string = process.env.googleMapKey || "";

	@Prop()
	private populationData!: IPopulationType[];
	private transformedData!: Map<string, ChartData>;
	private geoChartData: any = [];
	private isLoaded: boolean = false;

	// Filters
	private variants: string[] = Object.values(VaccinatedByStateChartVariants);
	private selectedVariantFilter: VaccinatedByStateChartVariants = VaccinatedByStateChartVariants.CUMULATIVE_AND_DAILY_VACCINATED;

	private geoChartOptions = {
		backgroundColor: "none",
		region: "MY",
		resolution: "provinces",
		displayMode: "regions",
		colorAxis: { colors: ["#90caf9", "#0d47a1"] },
		geochartVersion: 11
	}

	mounted() {
		(async () => {
			const rawData = await fetchData(DataSourceType.VACCINATED_BY_STATE);
			this.transformedData = transformRawData(DataSourceType.VACCINATED_BY_STATE, rawData, { populationData: this.populationData });
			this.geoChartData = this.transformedData.get(VaccinatedByStateChartVariants.CUMULATIVE_AND_DAILY_VACCINATED);

			this.isLoaded = true;
		})()
	}

	private updateChart(value: string) {
		this.selectedVariantFilter = value as VaccinatedByStateChartVariants;
		this.geoChartData = this.transformedData.get(value);
	}
}

</script>
