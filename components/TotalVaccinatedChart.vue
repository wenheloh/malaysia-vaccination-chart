<template>
	<div>
		<v-row style="margin-bottom: 15px">
			<v-col
				cols="12"
				:lg="showBar ? 12 : 6"
			>
				<v-select height="36" :items="variants" :value="variants[0]" v-on:change="updateChartVariant"></v-select>
			</v-col>
			<v-col>
				<DatePicker
					label="Start Date"
					:initial-date="startDate"
					:get-allowed-dates="getStartDateAllowedDates"
					@startDateChanged="onStartDateChanged"
					v-if="!showBar"
				/>
			</v-col>
			<v-col>
				<DatePicker
					label="End Date"
					:initial-date="endDate"
					:get-allowed-dates="getEndDateAllowedDates"
					@endDateChanged="onEndDateChanged"
					v-if="!showBar"
				/>
			</v-col>
		</v-row>
		<LineChart v-if="!showBar && isLoaded" :chartData="currentDataset()" :options="options"
				   style="height: calc(100vh - 200px)"/>
		<BarChart v-if="showBar && isLoaded" :chartData="currentDataset()" :options="barChartOptions"
				  style="height: calc(100vh - 200px)"/>
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
import dayjs from "dayjs";
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { BarChart, LineChart } from "vue-chart-3";
import { fetchData } from "~/common/api-client";
import {
	DataSourceType,
	IPopulationType,
	ITotalVaccinatedType,
	TotalVaccinatedChartVariants
} from "~/common/custom-typings";
import { transformRawData } from "~/common/data-transformers";

@Component({
	components: {
		LineChart,
		BarChart
	}
})
export default class LineChartComponent extends Vue {
	// Raw data
	@Prop()
	private populationData!: IPopulationType[];
	private rawData: ITotalVaccinatedType[] = [];

	// Dropdown options and date filters
	private variants: string[] = Object.values(TotalVaccinatedChartVariants);
	private selectedVariant: TotalVaccinatedChartVariants = TotalVaccinatedChartVariants.DAILY_VACCINATED;
	private startDate: string = dayjs().add(-10, "day").format("YYYY-MM-DD");
	private endDate: string = dayjs().add(-1, "day").format("YYYY-MM-DD");

	// Flags
	private showBar: boolean = false;
	private isLoaded: boolean = false;

	// Transformed data (declared to be computed property to react to variable changes)
	private transformedData(): Map<string, ChartData> {
		return transformRawData(
			DataSourceType.TOTAL_VACCINATED,
			this.rawData,
			{
				populationData: this.populationData,
				startDate: this.startDate,
				endDate: this.endDate
			}
		);
	}
	private currentDataset(): ChartData {
		return this.transformedData().get(this.selectedVariant) ?? null as unknown as ChartData;
	}

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

	// Lifecycle method
	mounted() {
		(async () => {
			this.rawData = await fetchData(DataSourceType.TOTAL_VACCINATED) as ITotalVaccinatedType[];
			this.isLoaded = true;
		})()
	}

	// Custom methods
	private getStartDateAllowedDates(val: string) {
		return val >= "2021-02-24" && val <= this.endDate;
	}

	private getEndDateAllowedDates(val: string) {
		return val >= this.startDate && val <= new Date().toISOString().substr(0, 10);
	}

	private onStartDateChanged(value: string) {
		this.startDate = value;
	}

	private onEndDateChanged(value: string) {
		this.endDate = value;
	}

	private updateChartVariant(value: string) {
		this.showBar = value === TotalVaccinatedChartVariants.VACCINATED_POPULATION;
		this.selectedVariant = value as TotalVaccinatedChartVariants;
	}
}
</script>
