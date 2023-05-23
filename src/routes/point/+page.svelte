<script>
	import Header from '$lib/Header.svelte';
	import PointForm from '$lib/PointForm.svelte';
	import PointList from '$lib/PointList.svelte';
	import MainNavigator from '$lib/MainNavigator.svelte';
	import PointMap from "$lib/PointMap.svelte";

	const country = JSON.parse(localStorage.currentCountry)

</script>

<Header>
	<MainNavigator />
</Header>

<div class="columns is-vcentered">
	<div class="column box has-text-centered">
		<h1 class="title is-4">Please enter your POI's for {country.name}:</h1>
		<PointForm />
	</div>
</div>
<div class="columns is-vcentered">
	<div class="column box has-text-centered">
		<h1 class="title is-4">Current list of {country.name} POI entries:</h1>
		<PointList />
	</div>
</div>
<div class="columns is-vcentered">
	<div class="column box has-text-centered">
		<h1 class="title is-4">Current Map of POI's</h1>
		<PointMap />
	</div>
</div>
