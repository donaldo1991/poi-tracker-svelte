<script>
	import { beforeUpdate } from "svelte";
	import { poiService } from "../services/poi-service.js";

	beforeUpdate(() => {
		poiService.reload();
	});
</script>

<div class="container">
	<slot />
</div>
