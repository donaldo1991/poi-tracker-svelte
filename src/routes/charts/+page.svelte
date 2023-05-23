<script>
	import Header from "$lib/Header.svelte";
	import MainNavigator from "$lib/MainNavigator.svelte";
	import Chart from "svelte-frappe-charts";
	import { onMount } from "svelte";
	import { poiService } from "../../services/poi-service";

	let iterator = 0;

	let locations = {
		labels: ["Southern Hemisphere", "Northern Hemisphere"],
		datasets: [
			{
				values: [0, 0],
			}
		]
	};

	let temp = {
		labels: ["","","",""],
		datasets: [
			{
				values: [0, 0, 0, 0],
			}
		]
	};

	let pressure = {
		labels: ["","","",""],
		datasets: [
			{
				values: [0, 0, 0, 0],
			}
		]
	};

	let humidity = {
		labels: ["","","",""],
		datasets: [
			{
				values: [0, 0, 0, 0],
			}
		]
	};


	onMount(async () => {
		let pointList = await poiService.getPOIs();
		await addWeatherData(pointList);
		pointList = pointList
		pointList.forEach((point) => {
			if (point.longitude > 0) {
				locations.datasets[0].values[0] += 1;
			} else {
				locations.datasets[0].values[1] += 1;
			}
		});

		pointList.forEach((point) => {
			temp.labels[iterator] = point.name;
			humidity.labels[iterator] = point.name;
			pressure.labels[iterator] = point.name;
			temp.datasets[0].values[iterator] = point.temperature;
			humidity.datasets[0].values[iterator] = point.humidity;
			pressure.datasets[0].values[iterator] = point.pressure;
			iterator += 1;
		});
	});

	async function addWeatherData(pointList) {
		for(const point of pointList) {
			const response = await poiService.getWeather(point);
			point.temperature = JSON.parse(response.main.temp) - 273.15;
			point.humidity = JSON.parse(response.main.humidity);
			point.pressure = JSON.parse(response.main.pressure);
		}
	}

	const onDataSelect = (event) => {
		console.log("Data select event fired!", event);
		selected = event;
	};
	let selected;

</script>

<Header>
	<MainNavigator />
</Header>


<div class="columns">
	<div class="column has-text-centered">
		<h1 class="title is-4">POI locations</h1>
		<Chart data={locations}/>
	</div>
	<div class="column has-text-centered">
		<h1 class="title is-4">POI locations</h1>
		<Chart data={locations} on:data-select={onDataSelect} type = "pie" isNavigable: true/>
	</div>
</div>
<br>

<div class="columns">
	<div class="column has-text-centered">
		<h1 class="title is-4">POI Temperatures: Bar Chart</h1>
		<Chart data={temp} isNavigable: true/>
	</div>
</div>
<br>

<div class="columns">
	<div class="column has-text-centered">
		<h1 class="title is-4">POI Humidity's: Bar Chart</h1>
		<Chart data={humidity} type = "percentage" isNavigable: true/>
	</div>
</div>
<br>

<div class="columns">
	<div class="column has-text-centered">
		<h1 class="title is-4">POI Pressures: Bar Chart</h1>
		<Chart data={pressure} type = "bar" isNavigable: true/>
	</div>
</div>
<br>


