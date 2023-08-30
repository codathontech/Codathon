<script>
	import { applyAction, enhance } from "$app/forms";
	import { invalidate } from "$app/navigation";

	let loading = false;

	const handleLogout = () => {
		loading = true;
		return async ({ result }) => {
			if (result.type === "redirect") {
				await invalidate("supabase:auth");
			} else {
				await applyAction(result);
			}
			loading = false;
		};
	};
</script>

<main>
	<h1>Your account</h1>

	<form action="/logout" method="post" use:enhance={handleLogout}>
		<button disabled={loading} type="submit">Sign out</button>
	</form>
</main>
