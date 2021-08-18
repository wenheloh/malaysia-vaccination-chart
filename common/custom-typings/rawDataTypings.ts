import { MalaysiaState } from "~/common/custom-typings/enums";

export interface IPopulationType {
	idxs: string;
	state: string;
	pop: string;
	pop_18: string;
	pop_60: string;
}

export interface ITotalVaccinatedType {
	date: string;
	daily_partial: string;
	daily_full: string;
	daily: string;
	cumul_partial: string;
	cumul_full: string;
	cumul: string;
	pfizer1: string
	pfizer2: string
	sinovac1: string
	sinovac2: string
	astra1: string;
	astra2: string;
	pending: string;
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
