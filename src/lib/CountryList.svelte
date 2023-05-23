<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { poiService } from "../services/poi-service";


  let country = {};

  let countryList = [];
  onMount(async () => {
    countryList = await poiService.getAllCountries();
  });

  async function openPoint(country) {
    localStorage.currentCountry = JSON.stringify(country);
    goto("/point");
  }

  async function deleteCountry(country) {
      const success = await poiService.deleteCountry(country);
      if (!success) {
        console.log("Delete Failure");
      } else {
        window.location.href = '/countryList';
      }
  }

</script>

<table class="table is-fullwidth">
  <thead>
  <th>Country</th>
  <th>Continent</th>
  <th>Open locations</th>
  <th>Delete country</th>
  </thead>
  <tbody>
  {#each countryList as country}
    <tr>
      <td>
        {country.name}
      </td>
      <td>
        {country.continent}
      </td>
      <td>
        <button on:click={() => { openPoint(country) }}><i class="fas fa-folder-open fa-2x" style="color:rgb(156, 70, 128)" /></button>
      </td>
      <td>
        <button on:click={() => { deleteCountry(country) }}><i class="fas fa-trash fa-2x" style="color:rgb(255, 0, 0)" /></button>
      </td>
    </tr>
  {/each}
  </tbody>
</table>
