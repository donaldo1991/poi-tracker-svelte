<script>
    import { goto } from "$app/navigation";
    import { redirect } from '@sveltejs/kit';
    import { onMount } from "svelte";
    import { poiService } from "../services/poi-service";

    let country = {};

    let pointList = [];
    onMount(async () => {
        pointList = await poiService.getPOIs();
    });

    async function openPOI(point) {
        localStorage.currentPoint = JSON.stringify(point);
        goto("/pointImages");
    }

    async function deletePoint(point) {
        const success = await poiService.deletePoint(point);
        if (!success) {
            console.log("Delete Failure");
        } else {
            window.location.href = '/point';
        }
    }

</script>

<table class="table is-fullwidth">
    <thead>
    <th>Name</th>
    <th>Identifier</th>
    <th>Longitude</th>
    <th>Latitude</th>
    <th>Description</th>
    <th>Images</th>
    <th>Delete Point</th>
    </thead>
    <tbody>
    {#each pointList as point}
        <tr>
            <td>
                {point.name}
            </td>
            <td>
                {point._id}
            </td>
            <td>
                {point.longitude}
            </td>
            <td>
                {point.latitude}
            </td>
            <td>
                {point.description}
            </td>
            <td>
                <button on:click={() => { openPOI(point) }}><i class="fas fa-image" style="color:rgb(63, 122, 139)" /></button>
            </td>
            <td>
                <button on:click={() => { deletePoint(point) }}><i class="fas fa-trash" style="color:rgb(255, 0, 0)" /></button>
            </td>
        </tr>
    {/each}
    </tbody>
</table>


