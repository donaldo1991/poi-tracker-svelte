<script>
    // @ts-nocheck

    import { onMount } from "svelte";
    import { poiService } from "../services/poi-service";
    import sanitizeHtml from "sanitize-html";

    let name = "";
    let longitude = 0;
    let latitude = 0;
    let description = "";

    let message = "Enter your point of interest details";

    onMount(async () => {
        // DO SOMETHING
    });

    async function enterPOI() {
        const clean_name = sanitizeHtml(name,{
            allowedTags:[''],
            allowedAttributes:{}
        })
        const clean_description = sanitizeHtml(description,{
            allowedTags:[''],
            allowedAttributes:{}
        })

        if (clean_name && longitude && latitude && clean_description) {
            const country = JSON.parse(localStorage.currentCountry)
            const point = {
                name: name,
                longitude: longitude,
                latitude: latitude,
                description: clean_description
            };
            const success = await poiService.addPOI(country,point);
            console.log(success)
            if (!success) {
                message = "Attraction not added - some error occurred";
                return;
            }
            window.location.href = '/point';
            message = `Thanks! You added ${point.name} to your destination list!`;
        } else {
            message = "Please enter a name, longitude, latitude and description";
        }
    }
</script>

<form on:submit|preventDefault={enterPOI}>
    <div class="box has-text-centered columns m-2">
        <div class="column is-third">
            <label>Enter Attraction Name:</label>
        </div>
        <div class="column is-third">
            <label>Enter Attraction Longitude:</label>
        </div>
        <div class="column is-third">
            <label>Enter Attraction Latitude:</label>
        </div>
    </div>
    <div class="field is-horizontal">
        <div class="field-body">
            <div class="field">
                <input bind:value={name} class="input" id="name" type="text" placeholder="Enter Name" name="name">
            </div>
            <div class="field">
                <input bind:value={longitude} class="input" id="longitude" type="number" step="any" placeholder="Enter Longitude" name="longitude">
            </div>
            <div class="field">
                <input bind:value={latitude} class="input" id="latitude" type="number" step="any" placeholder="Enter Latitude" name="latitude">
            </div>
        </div>
    </div>
    <label>Enter Tourist Attraction Description:</label>
    <div class="field is-horizontal">
        <div class="field-body">
            <div class="field">
                <input bind:value={description} class="input" id="description" type="text" placeholder="Enter Description" name="description">
            </div>
        </div>
    </div>
    <div class="field">
        <div class="control">
            <button class="button is-link is-light">Enter Attraction</button>
        </div>
    </div>
    <div class="box">
        {message}
    </div>
</form>
