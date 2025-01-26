<script>
	import '../app.css';
	import { page } from "$app/stores";

	let title = 'Personal Diary';
	$: isLandingPage = $page.url.pathname === "/";
	$: isLoginPage = $page.url.pathname === "/login";
	$: isSignupPage = $page.url.pathname === "/signup";
</script>

<div class="flex flex-col min-h-screen">
	{#if !isLandingPage && !isLoginPage && !isSignupPage}
		<!-- Header -->
		<header class="bg-green-600 text-white p-4 z-50">
			<div>
				<h2 class="sm:text-l text-white">Version 2.0</h2>
			</div>
			<div class="relative bg-cover bg-center h-20">
				<div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
					<h1 class="text-2xl sm:text-5xl font-bold text-white drop-shadow-lg">Your Diary</h1>
				</div>
			</div>
		</header>
	{/if}

	<!-- Main Content -->
	<main class="flex-grow">
		<slot></slot>
	</main>
</div>

<style>
	/* Layout for smaller screens */
	@media (max-width: 640px) {
		header h1 {
			font-size: 1.5rem; /* Smaller font for the header */
		}

		.container {
			padding: 1rem; /* Reduce padding for smaller screens */
		}

		footer p, footer ul {
			font-size: 0.875rem; /* Smaller text in footer */
		}
	}
</style>
 