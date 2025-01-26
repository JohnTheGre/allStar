<script>
	let name = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let showPassword = false;
	let errorMessage = '';
	let successMessage = '';

	// Function to handle signup
	async function handleSignup() {
		// Basic client-side validation
		if (!name || !email || !password || !confirmPassword) {
			errorMessage = 'All fields are required.';
			successMessage = '';
			return;
		}

		if (password !== confirmPassword) {
			errorMessage = 'Passwords do not match.';
			successMessage = '';
			return;
		}

		try {
			const response = await fetch('http://localhost:3019/auth/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name, email, password }),
			});

			if (response.ok) {
				const data = await response.json();
				errorMessage = '';
				successMessage = 'Signup successful! You can now log in.';
				// Optionally redirect to login page
				window.location.href = "/login";
			} else {
				const errorData = await response.json();
				errorMessage = errorData.message || 'Signup failed. Please try again.';
				successMessage = '';
			}
		} catch (err) {
			errorMessage = 'Failed to connect to the server. Please try again later.';
			successMessage = '';
		}
	}
</script>

<div class="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-indigo-200 to-indigo-500 text-gray-800">
	<h1 class="text-4xl sm:text-5xl font-bold mb-6">Create Your Account</h1>
	<p class="text-lg sm:text-xl mb-8 text-center">Sign up to start your journey and access your personal diary!</p>

	<form class="space-y-5 bg-white rounded-lg shadow-md p-8 w-full max-w-md text-gray-800" on:submit|preventDefault={handleSignup}>
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
			<label for="username" class="block mb-2 text-sm font-medium">Username</label>
			<input
				type="text"
				id="username"
				bind:value={name}
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
				placeholder="Choose a username"
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
		<div>
			<label for="confirm-password" class="block mb-2 text-sm font-medium">Confirm Password</label>
			<input
				type={showPassword ? "text" : "password"}
				id="confirm-password"
				bind:value={confirmPassword}
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
		{#if errorMessage}
			<p class="text-red-500 text-sm mt-2">{errorMessage}</p>
		{/if}
		{#if successMessage}
			<p class="text-green-500 text-sm mt-2">{successMessage}</p>
		{/if}
		<div>
			<button
				type="submit"
				class="bg-green-500 text-white font-bold px-6 py-3 rounded shadow-lg hover:bg-green-600 hover:scale-105 transition-transform transform w-full"
			>
				Sign Up
			</button>
		</div>
	</form>

	<div class="mt-4 text-sm">
		Already have an account? <a href="/login" class="text-white underline">Log in</a>
	</div>
</div>
