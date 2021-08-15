<template>
	<v-dialog
		ref="modalRef"
		:return-value.sync="selectedDate"
		@click:outside="$refs.modalRef.save(selectedDate); $emit(`${camelCaseName}Changed`, selectedDate)"
		width="290px"
	>
		<template v-slot:activator="{ on, attrs }">
			<v-text-field
				height="36"
				v-model="selectedDate"
				:label="label"
				prepend-icon="mdi-calendar"
				readonly
				v-bind="attrs"
				v-on="on"
			></v-text-field>
		</template>
		<v-date-picker
			v-model="selectedDate"
			light
			:allowed-dates="getAllowedDates"
		>
		</v-date-picker>
	</v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component({})
export default class DatePicker extends Vue {
	@Prop({ required: true })
	private readonly label!: string;
	@Prop({ required: true })
	private readonly getAllowedDates!: () => string[];
	@Prop({ required: true })
	private readonly initialDate!: string;

	private readonly camelCaseName = this.label.split(" ")[0].toLowerCase() + this.label.split(" ").slice(1).join("");
	private selectedDate = this.initialDate;
}
</script>
