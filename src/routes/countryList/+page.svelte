<script>
	import Header from '$lib/Header.svelte';
	import MainNavigator from '$lib/MainNavigator.svelte';
	import CountryList from '$lib/CountryList.svelte';
</script>

<Header>
	<MainNavigator />
</Header>

<div class="columns">
	<div class="column has-text-centered">
		<img alt="poi" src="/poi4.jpg" width="1000" />
	</div>
	<div class="column box has-text-centered">
		<h1 class="title is-4">Country List to date:</h1>
		<CountryList />
	</div>
</div>
