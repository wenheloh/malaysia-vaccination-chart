<template>
	<div>
		<v-select height="36" :items="items" :value="items[0]" v-on:change="updateChart"></v-select>
		<LineChart v-if="!showBar && isLoaded" :chartData="currentDataset" :options="options"
				   style="height: calc(100vh - 160px)"/>
		<BarChart v-if="showBar && isLoaded" :chartData="currentDataset" :options="barChartOptions"
				  style="height: calc(100vh - 160px)"/>
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
import { BarChart, LineChart } from "vue-chart-3";
import { fetchData } from "~/common/api-client";
import { DataSourceType, IPopulationType, TotalVaccinatedChartVariants } from "~/common/custom-typings";
import { transformRawData } from "~/common/data-transformers";

@Component({
	components: {
		LineChart,
		BarChart
	}
})
export default class LineChartComponent extends Vue {
	@Prop()
	private populationData!: IPopulationType[];
	private transformedData: Map<string, ChartData> = new Map<string, ChartData>();
	private currentDataset!: ChartData;
	private items: string[] = Object.values(TotalVaccinatedChartVariants);
	private showBar: boolean = false;
	private isLoaded: boolean = false;

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

	mounted() {
		(async () => {
			const rawData = await fetchData(DataSourceType.TOTAL_VACCINATED);
			this.transformedData = transformRawData(DataSourceType.TOTAL_VACCINATED, rawData, { populationData: this.populationData });
			this.currentDataset = this.transformedData.get(TotalVaccinatedChartVariants.DAILY_VACCINATED) as ChartData;

			this.isLoaded = true;
		})()
	}

	private updateChart(value: string) {
		this.showBar = value === TotalVaccinatedChartVariants.VACCINATED_POPULATION;
		this.currentDataset = this.transformedData.get(value) as ChartData;
	}
}
</script>
