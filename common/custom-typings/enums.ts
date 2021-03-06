export enum DataSourceType {
	TOTAL_VACCINATED = "total-vaccinated",
	VACCINATED_BY_STATE = "vaccinated-by-state",
	POPULATION = "population",
	// TOTAL_REGISTERED = "total-registered",
	// REGISTERED_BY_STATE = "registered-by-state",
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

export const MalaysiaStateIsoCode = {
	[MalaysiaState.JOHOR]: "MY-01",
	[MalaysiaState.KEDAH]: "MY-02",
	[MalaysiaState.KELANTAN]: "MY-03",
	[MalaysiaState.MELAKA]: "MY-04",
	[MalaysiaState.NEGERI_SEMBILAN]: "MY-05",
	[MalaysiaState.PAHANG]: "MY-06",
	[MalaysiaState.PERAK]: "MY-08",
	[MalaysiaState.PERLIS]: "MY-09",
	[MalaysiaState.PULAU_PINANG]: "MY-07",
	[MalaysiaState.SABAH]: "MY-12",
	[MalaysiaState.SARAWAK]: "MY-13",
	[MalaysiaState.SELANGOR]: "MY-10",
	[MalaysiaState.TERENGGANU]: "MY-11",
	[MalaysiaState.WP_KUALA_LUMPUR]: "MY-14",
	[MalaysiaState.WP_LABUAN]: "MY-15",
	[MalaysiaState.WP_PUTRAJAYA]: "MY-16",
};

export const dataSourceUrl = {
	[DataSourceType.POPULATION]:
		"https://raw.githubusercontent.com/CITF-Malaysia/citf-public/main/static/population.csv",
	[DataSourceType.TOTAL_VACCINATED]:
		"https://raw.githubusercontent.com/CITF-Malaysia/citf-public/main/vaccination/vax_malaysia.csv",
	[DataSourceType.VACCINATED_BY_STATE]:
		"https://raw.githubusercontent.com/CITF-Malaysia/citf-public/main/vaccination/vax_state.csv",
	// [DataSourceType.TOTAL_REGISTERED]:
	// 	"https://raw.githubusercontent.com/CITF-Malaysia/citf-public/main/registration/vaxreg_malaysia.csv",
	// [DataSourceType.REGISTERED_BY_STATE]:
	// 	"https://raw.githubusercontent.com/CITF-Malaysia/citf-public/main/registration/vaxreg_state.csv",
};
