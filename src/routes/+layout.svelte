<script>
	import Nav from "$lib/components/Nav.svelte";
</script>

<body>
	<Nav />
	<div class="content"><slot /></div>
</body>

<style>
	@font-face {
		font-family: "Lemon";
		src: url("/fonts/Lemon.ttf") format("truetype");
		font-display: swap;
	}

	:global(:root) {
		--background: #fff;
		--text: #000;
		--gray: #f0f0f0;
		--accent: #ffc800;
	}

	:global(*) {
		text-align: left;
		color: var(--text);
		font-family: Verdana, Geneva, Tahoma, sans-serif;
	}

	body {
		margin: 0;
		background-color: var(--background);
	}

	.content {
		padding-inline: 1rem;
	}

	:global(h1, h2, h3) {
		font-family: "Lemon";
	}
</style>
