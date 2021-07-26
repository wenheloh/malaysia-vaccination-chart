<template>
	<LineChart :chartData="testData" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { LineChart } from "vue-chart-3";
import { ChartData } from "chart.js";

@Component({
	components: {
		LineChart
	}
})
export default class LineChartComponent extends Vue {

	private testData = {
		labels: ["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"],
		datasets: [
			{
				data: [30, 40, 60, 70, 5],
				backgroundColor: ["#77CEFF", "#0079AF", "#123E6B", "#97B0C4", "#A5C8ED"]
			}
		]
	};

	@Prop()
	private data!: Map<string, ChartData>;

	mounted() {
		console.log("data in linechart component: ", this.data);
	}
}
</script>
