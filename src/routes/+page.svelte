<script>
	function navigateToLogin() {
		window.location.href = "/login";
	}
	function navigateToSignUp() {
		window.location.href = "/signup";
	}
</script>

<div class="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-indigo-200 to-indigo-500 text-gray-800">
	<!-- Header Section -->
	<h1 class="text-5xl sm:text-7xl font-extrabold mb-4 text-center tracking-wide drop-shadow-lg">
		📔 Your Diary
	</h1>
	<p class="text-lg sm:text-2xl text-center mb-8 text-gray-700 italic max-w-xl">
		"A private space to reflect, grow, and cherish your journey."
	</p>

	<!-- Call to Action Buttons -->
	<div class="flex space-x-4">
		<button
			class="bg-indigo-600 text-white font-bold px-6 py-3 rounded-full shadow-md hover:bg-indigo-500 hover:scale-105 transition-transform transform"
			on:click={navigateToLogin}>
			Login
		</button>
		<button
			class="bg-green-500 text-white font-bold px-6 py-3 rounded-full shadow-md hover:bg-green-400 hover:scale-105 transition-transform transform"
			on:click={navigateToSignUp}>
			Sign Up
		</button>
	</div>

	<!-- Illustration -->
	<div class="mt-12">
		<img src="diary.png" alt="Diary Illustration" class="w-64 sm:w-96 drop-shadow-md animate-float">
	</div>
</div>

<style>
	.animate-float {
		animation: float 3s ease-in-out infinite;
	}
	@keyframes float {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}
</style>
