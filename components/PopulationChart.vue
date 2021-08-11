<template>
	<div>
		<v-select height="36" :items="items" :value="items[0]" v-on:change="updateChart"></v-select>
		<BarChart v-if="showBar" :chartData="currentDataset" :options="barChartOptions"
				  style="height: calc(100vh - 160px)"/>
		<PieChart v-if="!showBar" :chartData="currentDataset" :options="options" style="height: calc(100vh - 160px)"/>
	</div>
</template>

<script lang="ts">
import { ChartData } from "chart.js";
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { BarChart, PieChart } from "vue-chart-3";
import { DataSourceType, IPopulationType, PopulationChartVariants } from "~/common/custom-typings";
import { transformRawData } from "~/common/data-transformers";

@Component({
	components: {
		BarChart,
		PieChart
	}
})
export default class PopulationChart extends Vue {
	@Prop()
	private rawData!: IPopulationType[];
	private transformedData: Map<string, ChartData> = transformRawData(DataSourceType.POPULATION, this.rawData);
	private currentDataset = this.transformedData.get(PopulationChartVariants.STATES_AND_AGE_GROUP);
	private showBar: boolean = true;
	private items: string[] = Object.values(PopulationChartVariants);

	private options = {
		maintainAspectRatio: false,
	};

	private barChartOptions = {
		...this.options,
		scales: {
			x: {
				stacked: true
			},
			y: {
				stacked: true
			}
		}
	}

	private updateChart(value: string) {
		this.showBar = value === this.items[0];
		this.currentDataset = this.transformedData.get(value);
	}
}
</script>
