// @ts-nocheck
import axios from "axios";
import { goto } from "$app/navigation";
import { user } from "../stores";

export const poiService = {
	baseUrl: "http://localhost:3000",

	async login(email, password) {
		try {
			const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
			axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
			if (response.data.success) {
				user.set({
					email: email,
					token: response.data.token
				});
				localStorage.poi_tracker = JSON.stringify({ email: email, token: response.data.token });
				return true;
			}
			return false;
		} catch (error) {
			console.log(error);
			return false;
		}
	},

	async logout() {
		user.set({
			email: "",
			token: ""
		});
		axios.defaults.headers.common["Authorization"] = "";
		localStorage.removeItem("poi_tracker");
	},

	async signup(firstName, lastName, email, password) {
		try {
			const userDetails = {
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password
			};
			await axios.post(this.baseUrl + "/api/users", userDetails);
			return true;
		} catch (error) {
			return false;
		}
	},

	reload() {
		const poi_trackerCredentials = localStorage.poi_tracker;
		if (poi_trackerCredentials) {
			const savedUser = JSON.parse(poi_trackerCredentials);
			user.set({
				email: savedUser.email,
				token: savedUser.token
			});
			axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
		}
	},

	async addCountry(country) {
		try {
			const response = await axios.post(this.baseUrl + "/api/countries", country);
			return response.status == 201;
		} catch (error) {
			return false;
		}
	},

	async deleteCountry(country) {
		try {
			const response = await axios.delete(this.baseUrl + "/api/countries/" + country._id);
			return response.status == 204;
		} catch (error) {
			return false;
		}
	},

	async addPOI(country,point) {
		try {
			const response = await axios.post(this.baseUrl + "/api/countries/" + country._id + "/points", point);
			return response.status == 201;
		} catch (error) {
			return false;
		}
	},

	async getAllCountries() {
		try {
			const response = await axios.get(this.baseUrl + "/api/countries");
			return response.data;
		} catch (error) {
			return [];
		}
	},

	async getPOIs() {
		try {
			const response = await axios.get(this.baseUrl + "/api/points");
			return response.data;
		} catch (error) {
			return [];
		}
	},

	async deletePoint(point) {
		try {
			const response = await axios.delete(this.baseUrl + "/api/points/" + point._id);
			return response.status == 204;
		} catch (error) {
			return false;
		}
	},

	async getWeather(point){
		const apiKey = "6a821b80bc1876f12341f9c439a7e2e9";
		const lat = point.latitude;
		const lon = point.longitude;
		try {
			const response = await fetch("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey)
			return response.json();
		}
		catch (error) {
			return [];
		}
	}

};
