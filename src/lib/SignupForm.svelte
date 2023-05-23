<script lang="ts">
	import { goto } from "$app/navigation";
	import { poiService } from "../services/poi-service";
	import sanitizeHtml from "sanitize-html";

	let firstName = "";
	let lastName = "";
	let email = "";
	let password = "";
	let errorMessage = "";

	async function signup() {
		const clean_email = sanitizeHtml(email,{
			allowedTags:[''],
			allowedAttributes:{}
		})
		const clean_password = sanitizeHtml(password,{
			allowedTags:[''],
			allowedAttributes:{}
		})
		const clean_fName = sanitizeHtml(firstName,{
			allowedTags:[''],
			allowedAttributes:{}
		})
		const clean_lName = sanitizeHtml(lastName,{
			allowedTags:[''],
			allowedAttributes:{}
		})

		console.log(`attemting to sign up email: ${clean_email}`);
		let success = await poiService.signup(clean_fName, clean_lName, clean_email, clean_password);
		if (success) {
			goto("/");
		} else {
			errorMessage = "Error Trying to sign up";
		}
	}




</script>

<form on:submit|preventDefault={signup}>
	<div class="field is-horizontal">
		<div class="field-body">
			<div class="field">
				<label for="firstname" class="label">First Name</label>
				<input bind:value={firstName} id="firstname" class="input" type="text" placeholder="Enter first name" name="firstName" />
			</div>
			<div class="field">
				<label for="lastname" class="label">Last Name </label>
				<input bind:value={lastName} id="lastname" class="input" type="text" placeholder="Enter last name" name="lastName" />
			</div>
		</div>
	</div>
	<div class="field">
		<label for="email" class="label">Email</label>
		<input bind:value={email} id="email" class="input" type="text" placeholder="Enter email" name="email" />
	</div>
	<div class="field">
		<label for="password" class="label">Password</label>
		<input bind:value={password} id="password" class="input" type="password" placeholder="Enter Password" name="password" />
	</div>
	<div class="field is-grouped">
		<button class="button is-link">Sign Up</button>
	</div>
</form>
{#if errorMessage}
	<div class="section">
		{errorMessage}
	</div>
{/if}
