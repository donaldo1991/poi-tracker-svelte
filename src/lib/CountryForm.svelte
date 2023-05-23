<script>
  // @ts-nocheck

  import { onMount } from "svelte";
  import { poiService } from "../services/poi-service";
  import sanitizeHtml from "sanitize-html";

  let name = "";

  let continents = ["North America", "South America", "Europe", "Africa", "Asia", "Australasia"];
  let selectedContinent = "";

  let message = "Start by entering a country name and continent";

  onMount(async () => {
    // DO SOMETHING
  });

  async function enterCountry() {
    const clean_name = sanitizeHtml(name,{
      allowedTags:[''],
      allowedAttributes:{}
    })
    const clean_selectedContinent = sanitizeHtml(selectedContinent,{
      allowedTags:[''],
      allowedAttributes:{}
    })

    if (clean_name && clean_selectedContinent) {
      const country = {
        name: clean_name,
        continent: clean_selectedContinent
      };
      const success = await poiService.addCountry(country);
      console.log(success)
      if (!success) {
        message = "Country not added - some error occurred";
        return;
      }
      message = `Thanks! You added ${country.name} to your destination list!`;
    } else {
      message = "Please enter Country name and continent";
    }
  }
</script>

<form on:submit|preventDefault={enterCountry}>
  <div class="field">
    <label class="label" for="name">Country Name</label>
    <input bind:value={name} class="input" id="name" name="name" type="text" />
  </div>
  <div class="field">
    <div class="control">
      {#each continents as method}
        <input bind:group={selectedContinent} class="radio" type="radio" value={method} /> {method}
      {/each}
    </div>
  </div>
  <div class="field">
    <div class="control">
      <button class="button is-link is-light">Enter Country</button>
    </div>
  </div>
  <div class="box">
    {message}
  </div>
</form>