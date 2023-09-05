<script>
	// Import the new component
	import Avatar from "$lib/components/Avatar.svelte";

	export let profileForm;
	export let avatarUrl;
</script>

<div class="form-widget">
	<form
		class="form-widget"
		method="post"
		action="?/update"
		use:enhance={handleSubmit}
		bind:this={profileForm}
	>
		<!-- Add to body -->
		<Avatar
			{supabase}
			bind:url={avatarUrl}
			size={10}
			on:upload={() => {
				profileForm.requestSubmit();
			}}
		/>

		<!-- Other form elements -->
	</form>
</div>
