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

	{#if !isLandingPage && !isLoginPage && !isSignupPage}
		<!-- Footer -->
		<footer class="bg-gray-800 text-gray-300 py-4 z-50">
			<div class="container mx-auto text-center">
				<p class="text-sm">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
				<ul class="flex justify-center space-x-4 mt-2 text-xs sm:text-sm">
					<li><a href="/privacy" class="hover:underline">Privacy Policy</a></li>
					<li><a href="/terms" class="hover:underline">Terms of Service</a></li>
					<li><a href="/contact" class="hover:underline">Contact Us</a></li>
				</ul>
			</div>
		</footer>
	{/if}
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
 