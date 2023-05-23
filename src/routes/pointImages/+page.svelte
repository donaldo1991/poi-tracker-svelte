<script>
	import Header from '$lib/Header.svelte';
	import TitleBar from "$lib/TitleBar.svelte";
	import MainNavigator from "$lib/MainNavigator.svelte";
	import UploadWidget from '$lib/UploadWidget.svelte'
	import ImageCarosel from '$lib/ImageCarosel.svelte'

	const point = JSON.parse(localStorage.currentPoint)

	let  avatar, fileinput;

	const onFileSelected =(e)=>{
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = e => {
			avatar = e.target.result
		};
	}
</script>

<Header>
	<MainNavigator />
</Header>

<div class="columns is-vcentered">
	<div class="column box has-text-centered">
		<h1 class="title is-4">Images</h1>
	</div>
</div>
<br>

<div class>
	<div>
		<ImageCarosel /> <!-- reference: https://cloudinary.com/blog/guest_post/implement-an-image-carousel-in-svelte -->
	</div>
</div>
<br>

<div id="app" class="column box has-text-centered">
	{#if avatar}
		<img class="avatar" src="{avatar}" alt="d" />
	{:else}
		<img class="avatar" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" alt="" />
	{/if}
	<img class="upload" src="https://static.thenounproject.com/png/625182-200.png" alt="" on:click={()=>{fileinput.click();}} />
	<div class="chan" on:click={()=>{fileinput.click();}}>Choose Image</div>
	<input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
</div>
<br>


<div class="columns is-vcentered">
	<div class="column box has-text-centered">
		<UploadWidget /> <!-- reference: https://cloudinary.com/blog/guest_post/implement-an-image-carousel-in-svelte -->
	</div>
</div>





