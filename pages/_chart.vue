<template>
	<div>
		<LineChartComponent v-if="showLineGraph" :data="data"/>
		<PopulationChart v-if="!showLineGraph" :data="data"/>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CompositeRawDataType, DataSourceType } from "~/common/customTypings/rawDataTypings";
import { transformRawData } from "~/common/transformers";
import { ChartData } from "chart.js";

@Component({
	async asyncData({ params, redirect, $content }) {
		try {
			const type = (params?.chart?.toUpperCase().split("-").join("_") ?? "TOTAL_VACCINATED") as DataSourceType;
			const { body: rawData }: { body: CompositeRawDataType[] } = await $content(type).fetch();
			const transformedData = transformRawData(type, rawData);

			return { type, data: transformedData };
		} catch (error) {
			console.log("error: ", error);
			redirect("/error");
		}
	}
})
export default class Home extends Vue {
	private type!: DataSourceType;
	private data!: Map<string, ChartData>;
	private showLineGraph: boolean = true;

	mounted() {
		if (this.type === DataSourceType.POPULATION) {
			this.showLineGraph = false;
		}
	}
}
</script>
