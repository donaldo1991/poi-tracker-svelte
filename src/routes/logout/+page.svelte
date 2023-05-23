<script>
	import { goto } from "$app/navigation";
	import { poiService } from "../../services/poi-service.js";

	poiService.logout();
	goto("/");
</script>
