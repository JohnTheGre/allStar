<script>
	let name = ''; // Username field to match backend requirements
	let password = '';
	let showPassword = false;
	let errorMessage = ''; // To display any login errors
	let accessToken = ''; // Store the access token upon successful login

	async function handleLogin() {
		if (!name || !password) {
			errorMessage = 'Username and password are required.';
			return;
		}

    try {
        const response = await fetch('https://allstarbackend.onrender.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('accessToken', data.accessToken); // Save token in localStorage
            localStorage.setItem('username', data.username); // Save username in localStorage
            window.location.href = '/home'; // Redirect to home page
        } else {
            const errorData = await response.json();
            alert(errorData.message || 'Login failed.');
        }
    } catch (err) {
        alert('Failed to connect to the server. Please try again.');
    }
	}
</script>

<div class="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-indigo-200 to-indigo-500 text-gray-800">
	<h1 class="text-4xl sm:text-6xl font-bold mb-6">Login</h1>
	<p class="text-lg sm:text-xl mb-8 text-center">Welcome back lil bro 😭</p>
	<form class="space-y-5 bg-white rounded-lg shadow-md p-8 w-full max-w-md text-gray-800" on:submit|preventDefault={handleLogin}>
		<div>
			<label for="username" class="block mb-2 text-sm font-medium">Username</label>
			<input
				type="text"
				id="username"
				bind:value={name}
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
				placeholder="Your username"
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
		{#if errorMessage}
			<p class="text-red-500 text-sm mt-2">{errorMessage}</p>
		{/if}
		<div>
			<button
				type="submit"
				class="bg-green-500 text-white font-bold px-6 py-3 rounded shadow-lg hover:bg-green-600 hover:scale-105 transition-transform transform w-full"
			>
				Login
			</button>
		</div>
	</form>
</div>
