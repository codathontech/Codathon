<nav>
	<div class="links">
		<a href="/host">Host</a>
		<a href="/host">Calendar</a>
	</div>
	<a href="/" class="codathon">Codathon</a>
	<a class="account" href="/account"><img src="/profile.jpg" alt="👤" /></a>
</nav>

<style>
	nav {
		background-color: var(--text);
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		align-items: center;
		padding: 0.5rem 1rem;
	}

	a {
		color: var(--background);
		text-decoration: none;
		font-family: "Lemon";
		outline: none;
	}

	a:hover,
	a:focus {
		color: var(--accent);
	}

	.links {
		text-align: left;
		display: flex;
		gap: 0.5rem;
	}

	.codathon {
		font-size: 1.5rem;
		font-weight: bold;
		text-align: center;
	}

	.account {
		text-align: right;
		color: aqua;
	}

	img {
		height: 2.5rem;
		border-radius: 100%;
		margin-top: 0.3rem;
		border: 2px solid var(--text);
	}

	img:hover,
	img:focus,
	a:focus img {
		border-color: var(--accent);
	}
</style>
