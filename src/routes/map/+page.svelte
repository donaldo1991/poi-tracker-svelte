<script>
	import { beforeUpdate } from "svelte";
	import Header from "$lib/Header.svelte";
	import MainNavigator from "$lib/MainNavigator.svelte";
	import PointMap from "$lib/PointMap.svelte";
	import { poiService } from "../../services/poi-service";
	import WeatherList from "$lib/WeatherList.svelte";

	beforeUpdate(() => {
		poiService.reload();
	});
</script>

<Header>
	<MainNavigator />
</Header>

<WeatherList />
<PointMap />
