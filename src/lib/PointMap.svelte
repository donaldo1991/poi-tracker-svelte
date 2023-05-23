<script>
    // @ts-nocheck

    import "leaflet/dist/leaflet.css";
    import {LeafletMap} from "../services/leaflet-map";
    import {onMount} from "svelte";
    import {poiService} from "../services/poi-service";

    const mapConfig = {
        location: {lat: 52.160858, lng: -7.15242},
        zoom: 6,
        minZoom: 1
    };


    onMount(async () => {
        const map = new LeafletMap("poi-map", mapConfig);
        map.showZoomControl();
        map.addLayerGroup('Southern Hemisphere Points');
        map.addLayerGroup('Northern Hemisphere Points');
        map.showLayerControl();
        const points = await poiService.getPOIs();
        points.forEach((poi) => {
            addPointMarker(map, poi);
        });
    });

    function addPointMarker(map, point) {
        const pointStr = `Name: ${point.name} - Description: ${point.description}`;
        if(point.latitude > 0){
        map.addMarker({ lat: point.latitude, lng: point.longitude }, pointStr, 'Northern Hemisphere Points');
        } else {
        map.addMarker({ lat: point.latitude, lng: point.longitude }, pointStr, 'Southern Hemisphere Points');
        }
    }

</script>

<div class="box" id="poi-map" style="height:60vh" />
