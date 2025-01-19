<script>
	import '../app.css';

	let title = 'Personal Diary';
</script>

<div class="flex flex-col min-h-screen">
	<!-- Header -->
	<header class="bg-green-600 text-white p-4 z-50">
		<div class="container mx-auto flex justify-between items-center">
			<h1 class="text-xl font-bold">{title}</h1>
		</div>
	</header>

	<!-- Main Content -->
	<main class="flex-grow container mx-auto p-4">
		<slot></slot>
	</main>

	<!-- Footer -->
	<footer class="bg-gray-800 text-gray-300 py-4 z-50">
		<div class="container mx-auto text-center">
			<p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
			<ul class="flex justify-center space-x-4 mt-2">
				<li><a href="/privacy" class="hover:underline">Privacy Policy</a></li>
				<li><a href="/terms" class="hover:underline">Terms of Service</a></li>
				<li><a href="/contact" class="hover:underline">Contact Us</a></li>
			</ul>
		</div>
	</footer>
</div>

<style>
	/* Makes sure the footer doesn't overlap content and stays at the bottom */
	.flex {
		display: flex;
	}
	.flex-col {
		flex-direction: column;
	}
	.flex-grow {
		flex: 1;
	}
	.min-h-screen {
		min-height: 100vh; /* Makes the container fill the viewport */
	}
</style>
