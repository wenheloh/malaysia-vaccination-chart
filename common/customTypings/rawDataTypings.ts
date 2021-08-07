import { MalaysiaState } from "~/common/customTypings/enums";

export interface IPopulationType {
	idxs: string;
	state: string;
	pop: string;
	pop_18: string;
	pop_60: string;
}

export interface ITotalVaccinatedType {
	date: string;
	dose1_daily: string;
	dose2_daily: string;
	total_daily: string;
	dose1_cumul: string;
	dose2_cumul: string;
	total_cumul: string;
}

export interface IVaccinatedByStateType extends ITotalVaccinatedType {
	state: MalaysiaState;
}

/*
 *  mysj: Number of individuals registered via MySejahtera
 *  call: Number of individuals registered via the call centre, who do not have an existing registration via MySejahtera
 *  web: Number of individuals registered via the website (including on-behalf-of registrations done during outreach) who do not have an existing registration via MySejahtera or the call centre
 * */
export interface ITotalRegisteredType {
	date: string;
	state: string;
	total: string;
	phase2: string;
	mysj: string;
	call: string;
	web: string;
	children: string;
	elderly: string;
	comorb: string;
	oku: string;
}

export interface IRegisteredByStateType extends ITotalRegisteredType {
	state: MalaysiaState;
}

export type CompositeRawDataType =
	| IPopulationType
	| ITotalVaccinatedType
	| IVaccinatedByStateType
	| ITotalRegisteredType
	| IRegisteredByStateType;
