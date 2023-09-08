<script>
	import Avatar from "$lib/components/Avatar.svelte";
	import toast from "svelte-french-toast";

	import { enhance } from "$app/forms";

	export let data;
	export let form;

	let { session, supabase, profile } = data;

	let username = data.profile.username ?? "";
	let firstName = data.profile.first_name ?? "";
	let lastName = data.profile.last_name ?? "";
	let avatarUrl = profile?.avatar_url ?? "";
	let website = profile?.website ?? "";

	function handleSubmit() {
		return async ({ result }) => {
			switch (result.type) {
				case "success":
					toast.success("Profile updated");
					break;
				case "failure":
					toast.error(result.data.error);
					break;
				default:
					toast.error("Something went wrong.");
					break;
			}
		};
	}
</script>

<main>
	<h1>Your account</h1>

	<form class="form-widget" method="post" action="?/update" use:enhance={handleSubmit}>
		<div>
			<label for="email">Email</label>
			<input id="email" type="text" value={session.user.email} disabled />
		</div>

		<div>
			<label for="username">Username</label>
			<input
				id="username"
				name="username"
				type="text"
				value={form?.username ?? username}
				minlength="3"
			/>
		</div>

		<div>
			<label for="firstName">First Name</label>
			<input id="firstName" name="firstName" type="text" value={firstName} />
		</div>

		<div>
			<label for="lastName">Last Name</label>
			<input id="lastName" name="lastName" type="text" value={lastName} />
		</div>

		<div>
			<label for="website">Website</label>
			<input id="website" name="website" type="url" value={website} />
		</div>

		<Avatar bind:url={avatarUrl} {supabase} userID={data.profile.id} />

		<div>
			<input type="submit" value={"Update"} />
		</div>
	</form>

	<form action="/logout" method="post">
		<button type="submit">Sign out</button>
	</form>
</main>
