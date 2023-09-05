<script>
	export let data;
	export let form;

	let { session, profile } = data;

	let profileForm;
	let loading = false;
	let username = data.profile.username ?? "";
	let firstName = data.profile.first_name ?? "";
	let lastName = data.profile.last_name ?? "";
	let avatarUrl = profile?.avatar_url ?? "";
	let website = profile?.website ?? "";

	const handleSubmit = () => {
		loading = true;
		return async () => {
			loading = false;
		};
	};

	import { applyAction, enhance } from "$app/forms";
	import { invalidate } from "$app/navigation";

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

	<form
		class="form-widget"
		method="post"
		action="?/update"
		use:enhance={handleSubmit}
		bind:this={profileForm}
	>
		<div>
			<label for="email">Email</label>
			<input id="email" type="text" value={session.user.email} disabled />
		</div>

		<div>
			<label for="firstName">First Name</label>
			<input
				id="firstName"
				name="firstName"
				type="text"
				value={form?.firstName ?? firstName}
				required
			/>
		</div>

		<div>
			<label for="lastName">Last Name</label>
			<input
				id="lastName"
				name="lastName"
				type="text"
				value={form?.lastName ?? lastName}
				required
			/>
		</div>

		<div>
			<label for="username">Username</label>
			<input
				id="username"
				name="username"
				type="text"
				value={form?.username ?? username}
				required
			/>
		</div>

		<div>
			<label for="website">Website</label>
			<input id="website" name="website" type="url" value={form?.website ?? website} />
		</div>

		<div>
			<input type="submit" value={loading ? "Loading..." : "Update"} disabled={loading} />
		</div>
	</form>

	<form action="/logout" method="post" use:enhance={handleLogout}>
		<button disabled={loading} type="submit">Sign out</button>
	</form>
</main>
