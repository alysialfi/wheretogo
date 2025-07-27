export type Cafe = {
	cafe_name: string;
	address: string;
	rating: number;
	google_maps_url: string;
	photo: {
		url: string;
		author_name: string;
		author_url: string;
	}
	price_range: string;
	atmosphere: {
		indoor: boolean;
		outdoor: boolean;
	}
	menu: {
		coffee: boolean;
		non_coffee: boolean;
		snack: boolean;
		rice: boolean;
	}
	facility: {
		wifi: boolean;
		electricity: boolean;
		mushala: boolean;
		accessibility: boolean;
		kids_friendly: boolean;
	}
	payment: {
		cash: boolean;
		non_cash: boolean;
	}
	landmark: {
		atm: boolean;
		rumah_sakit: boolean;
		masjid: boolean;
		mall: boolean;
		minimarket: boolean;
	},
	recommended_menu: string[];
	conclusion: string;
}

export type Filter = {
	Indoor: boolean;
	Outdoor: boolean;
	Coffee: boolean;
	NonCoffee: boolean;
	Rice: boolean;
	Snack: boolean;
	Wifi: boolean;
	Electricity: boolean;
	Mushala: boolean;
	KidsFriendly: boolean;
	Accessible: boolean;
	Cash: boolean;
	NonCash: boolean;
}

export type Cafes = Cafe[];