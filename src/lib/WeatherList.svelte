<script>

    import { onMount } from "svelte";
    import { poiService } from "../services/poi-service";

    let pointList = [];

    onMount(async () => {
        pointList = await poiService.getPOIs();
        await addWeatherData(pointList);
        pointList = pointList
        console.log(pointList)
    });

    async function addWeatherData(pointList) {
        for(const point of pointList) {
            const response = await poiService.getWeather(point);
            point.temperature = JSON.parse(response.main.temp) - 273.15;
            point.humidity = JSON.parse(response.main.humidity);
            point.pressure = JSON.parse(response.main.pressure);
        }
    }

</script>

<table class="table is-fullwidth">
    <thead>
    <th>Name</th>
    <th>Description</th>
    <th>Longitude</th>
    <th>Latitude</th>
    <th>Temperature</th>
    <th>Humidity</th>
    <th>Pressure</th>
    </thead>
    <tbody>
    {#each pointList as point}
        <tr>
            <td>
                {point.name}
            </td>
            <td>
                {point.description}
            </td>
            <td>
                {point.longitude}
            </td>
            <td>
                {point.latitude}
            </td>
            <td>
                {point.temperature}
            </td>
            <td>
                {point.humidity}
            </td>
            <td>
                {point.pressure}
            </td>
        </tr>
    {/each}
    </tbody>
</table>


