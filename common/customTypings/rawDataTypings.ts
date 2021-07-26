export enum DataSourceType {
	POPULATION = "POPULATION",
	TOTAL_VACCINATED = "TOTAL_VACCINATED",
	VACCINATED_BY_STATE = "VACCINATED_BY_STATE",
	TOTAL_REGISTERED = "TOTAL_REGISTERED",
	REGISTERED_BY_STATE = "REGISTERED_BY_STATE",
}

export enum MalaysiaState {
	JOHOR = "Johor",
	KEDAH = "Kedah",
	KELANTAN = "Kelantan",
	MELAKA = "Melaka",
	NEGERI_SEMBILAN = "Negeri Sembilan",
	PAHANG = "Pahang",
	PERAK = "Perak",
	PERLIS = "Perlis",
	PULAU_PINANG = "Pulau Pinang",
	SABAH = "Sabah",
	SARAWAK = "Sarawak",
	SELANGOR = "Selangor",
	TERENGGANU = "Terengganu",
	WP_KUALA_LUMPUR = "W.P. Kuala Lumpur",
	WP_LABUAN = "W.P. Labuan",
	WP_PUTRAJAYA = "W.P. Putrajaya",
}

export interface PopulationType {
	idxs: string;
	state: string;
	pop: string;
	pop_18: string;
	pop_60: string;
}

export interface TotalVaccinatedType {
	date: string;
	dose1_daily: string;
	dose2_daily: string;
	total_daily: string;
	dose1_cumul: string;
	dose2_cumul: string;
	total_cumul: string;
}

export interface VaccinatedByState extends TotalVaccinatedType {
	state: MalaysiaState;
}

/*
 *  mysj: Number of individuals registered via MySejahtera
 *  call: Number of individuals registered via the call centre, who do not have an existing registration via MySejahtera
 *  web: Number of individuals registered via the website (including on-behalf-of registrations done during outreach) who do not have an existing registration via MySejahtera or the call centre
 * */
export interface TotalRegisteredType {
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

export interface RegisteredByState extends TotalRegisteredType {
	state: MalaysiaState;
}

export type CompositeRawDataType =
	| PopulationType
	| TotalVaccinatedType
	| VaccinatedByState
	| TotalRegisteredType
	| RegisteredByState;
