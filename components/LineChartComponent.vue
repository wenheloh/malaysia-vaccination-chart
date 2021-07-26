<template>
	<div>
		<v-select height="36" :items="items" :value="items[0]" v-on:change="updateChart"></v-select>
		<LineChart :chartData="currentDataset" :options="options" style="height: calc(100vh - 160px)" />
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { LineChart } from "vue-chart-3";
import { ChartData } from "chart.js";
import { TotalVaccinatedChartVariants } from "~/common/customTypings";

@Component({
	components: {
		LineChart
	}
})
export default class LineChartComponent extends Vue {
	@Prop()
	private data!: Map<string, ChartData>;
	private currentDataset = this.data.get(TotalVaccinatedChartVariants.CUMULATIVE_VACCINATED);
	private items: string[] = Object.values(TotalVaccinatedChartVariants);

	private options = {
		maintainAspectRatio: false,
	}

	private updateChart(value: string) {
		this.currentDataset = this.data.get(value);
	}
}
</script>
