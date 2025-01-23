<script>
    let email = '';
    let password = '';
    let confirmPassword = '';
    let showPassword = false;
	function navigateToHome() {
		window.location.href = "/home"; 
	}
</script>
<div class="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-500 to-green-500 text-white px-4">
	<h1 class="text-4xl sm:text-6xl font-bold mb-6">Login</h1>
    <form class="space-y-5 bg-white rounded-lg shadow-md p-8 w-full max-w-md text-gray-800">
        <div>
          <label for="email" class="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            bind:value={email}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label for="password" class="block mb-2 text-sm font-medium">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            bind:value={password}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
            required
          />
        </div>
        <div class="flex items-center space-x-2">
          <input
            id="show-password"
            type="checkbox"
            bind:checked={showPassword}
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-green-300"
          />
          <label for="show-password" class="text-sm font-medium">Show password</label>
        </div>
        <div>
          <button
            type="button"
            class="bg-green-500 text-white font-bold px-6 py-3 rounded shadow-lg hover:bg-green-600 hover:scale-105 transition-transform transform w-full"
            on:click={navigateToHome}
          >
            Login
          </button>
        </div>
      </form>
</div>