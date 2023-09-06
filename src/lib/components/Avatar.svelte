<script>
	import { createEventDispatcher } from "svelte";

	export let size = 10;
	export let url;
	export let supabase;
	export let userID;

	let avatarUrl = null;
	let uploading = false;
	let files;

	const dispatch = createEventDispatcher();

	const downloadImage = async (path) => {
		try {
			const { data, error } = await supabase.storage.from("avatars").download(path);

			if (error) {
				throw error;
			}

			const url = URL.createObjectURL(data);
			avatarUrl = url;
		} catch (error) {
			if (error instanceof Error) {
				console.log("Error downloading image: ", error.message);
			}
		}
	};

	const uploadAvatar = async () => {
		try {
			uploading = true;

			if (!files || files.length === 0) {
				throw new Error("You must select an image to upload.");
			}

			const file = files[0];
			const fileExt = file.name.split(".").pop();
			const filePath = `${userID}.${fileExt}`;

			let { error } = await supabase.storage.from("avatars").upload(filePath, file);

			if (error) {
				throw error;
			}

			url = filePath;
			setTimeout(() => {
				dispatch("upload");
			}, 100);
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			uploading = false;
		}
	};

	$: if (url) downloadImage(url);
</script>

<div>
	{#if avatarUrl}
		<img
			src={avatarUrl}
			alt={avatarUrl ? "Avatar" : "No image"}
			class="avatar image"
			style="height: {size}em; width: {size}em;"
		/>
	{:else}
		<img
			src="/user.svg"
			alt="placeholder"
			style="height: {size}em; width: {size}em; background-color: #000;"
		/>
	{/if}
	<input type="hidden" name="avatarUrl" value={url} />

	<div style="width: {size}em;">
		<label for="single">
			{uploading ? "Uploading ..." : "Upload"}
		</label>
		<input
			style="visibility: hidden; position:absolute;"
			type="file"
			id="single"
			accept="image/*"
			bind:files
			on:change={uploadAvatar}
			disabled={uploading}
		/>
	</div>
</div>
