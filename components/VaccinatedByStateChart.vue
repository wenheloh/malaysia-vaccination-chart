<template>
	<div>
		<v-select height="36" :items="variants" :value="variants[0]" v-on:change="updateChart"></v-select>
		<GChart type="GeoChart" :data="geoChartData" :options="geoChartOptions"  :settings="{ packages: ['geochart'], mapsApiKey }" />
	</div>
</template>

<script lang="ts">
import { ChartData } from "chart.js";
import { GChart } from "vue-google-charts";
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { VaccinatedByStateChartVariants } from "~/common/custom-typings";

@Component({
	components: {
		GChart
	}
})
export default class LineChartComponent extends Vue {
	private mapsApiKey: string = process.env.googleMapKey || "";

	@Prop()
	private data!: Map<string, ChartData>;
	private geoChartData: any = this.data.get(VaccinatedByStateChartVariants.CUMULATIVE_AND_DAILY_VACCINATED);

	// Filters
	private variants: string[] = Object.values(VaccinatedByStateChartVariants);
	private selectedVariantFilter: VaccinatedByStateChartVariants = VaccinatedByStateChartVariants.CUMULATIVE_AND_DAILY_VACCINATED;

	private geoChartOptions = {
		backgroundColor: "none",
		region: "MY",
		resolution: "provinces",
		displayMode: "regions",
		colorAxis: { colors: ["#90caf9", "#0d47a1"]}
	}

	private updateChart(value: string) {
		this.selectedVariantFilter = value as VaccinatedByStateChartVariants;
		this.geoChartData = this.data.get(value);
	}
}

</script>
