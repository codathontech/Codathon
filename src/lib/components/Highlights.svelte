<main>
	<h1>Highlights</h1>
	<div class="highlights">
		<div class="highlight">
			<h3>Highlight 1</h3>
			<p>First Highlight</p>
		</div>
		<div class="highlight">
			<h3>Highlight 2</h3>
			<p>Second Highlight</p>
		</div>
		<div class="highlight">
			<h3>Highlight 3</h3>
			<p>Third Highlight</p>
		</div>
	</div>
</main>

<style>
	.highlight {
		background-color: var(--gray);
		display: inline-block;
		margin-right: 1rem;
		margin-bottom: 1rem;
		padding: 0.5rem;
		border-radius: 0.5rem;
		width: 300px;
		box-shadow: 7px 7px 10px 1px var(--accent);
		transition: box-shadow 0.3s ease-in-out;
	}

	.highlight:hover {
		box-shadow: 7px 7px 5px 1px var(--accent);
	}
</style>
