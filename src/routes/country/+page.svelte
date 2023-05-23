<script>
	import Header from '$lib/Header.svelte';
	import CountryForm from '$lib/CountryForm.svelte';
	import MainNavigator from '$lib/MainNavigator.svelte';
</script>

<Header>
	<MainNavigator />
</Header>

<div class="columns is-vcentered">
	<div class="column has-text-centered">
		<img alt="poi" src="/poi.webp" width="300" />
	</div>
	<div class="column box has-text-centered">
		<h1 class="title is-4">Please enter your country below:</h1>
		<CountryForm />
	</div>
</div>
