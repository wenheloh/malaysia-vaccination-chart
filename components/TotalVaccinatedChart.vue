<template>
	<div>
		<v-select height="36" :items="items" :value="items[0]" v-on:change="updateChart"></v-select>
		<LineChart v-if="!showBar" :chartData="currentDataset" :options="options" style="height: calc(100vh - 160px)" />
		<BarChart v-if="showBar" :chartData="currentDataset" :options="barChartOptions" style="height: calc(100vh - 160px)" />
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { BarChart, LineChart } from "vue-chart-3";
import { ChartData } from "chart.js";
import { TotalVaccinatedChartVariants } from "~/common/customTypings";

@Component({
	components: {
		LineChart,
		BarChart
	}
})
export default class LineChartComponent extends Vue {
	@Prop()
	private data!: Map<string, ChartData>;
	private currentDataset = this.data.get(TotalVaccinatedChartVariants.CUMULATIVE_VACCINATED);
	private items: string[] = Object.values(TotalVaccinatedChartVariants);
	private showBar: boolean = false;

	private options = {
		maintainAspectRatio: false,
	}

	private barChartOptions = {
		...this.options,
		maxBarThickness: 100,
		plugins: {
			legend: {
				display: false
			}
		},
		scales: {
			y: {
				suggestedMax: 100
			}
		}
	}

	private updateChart(value: string) {
		this.showBar = value === TotalVaccinatedChartVariants.VACCINATED_POPULATION;
		this.currentDataset = this.data.get(value);
	}
}
</script>
