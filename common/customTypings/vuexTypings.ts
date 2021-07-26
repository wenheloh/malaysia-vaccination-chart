import { DataSourceType } from "~/common/customTypings/rawDataTypings";

export interface VuexState {
	type: DataSourceType;
	filterOptions: object;
}
