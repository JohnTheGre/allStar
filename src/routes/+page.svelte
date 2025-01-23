<script>
	function navigateToLogin() {
		window.location.href = "/login"; 
	}
	function navigateToSignUp() {
		window.location.href = "/signup"; 
	}
</script>

<div class="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-500 to-green-500 text-white">
	<h1 class="text-4xl sm:text-6xl font-bold mb-6 hover:font-mono hover:scale-105 transition-transform transform">Welcome to Your Diary App</h1>
	<p class="text-lg sm:text-xl text-center mb-8 hover:font-serif hover:scale-105 transition-transform transform">
		A safe haven where you can record your thoughts, and track your progress all in one place.
	</p>
	<div class = "flex space-x-4">
	<button
		class="bg-white text-blue-500 font-bold px-6 py-3 rounded shadow-lg hover:bg-blue-100 hover:scale-105 transition-transform transform"
		on:click={navigateToLogin}
	>
		Login
	</button>
	<button
	class="bg-white text-blue-500 font-bold px-6 py-3 rounded shadow-lg hover:bg-blue-100 hover:scale-105 transition-transform transform"
	on:click={navigateToSignUp}
    >
	Sign up
</button>
</div>
</div>