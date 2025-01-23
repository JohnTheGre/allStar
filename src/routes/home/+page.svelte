<script>
	let diary = false;
	let note = "";
	let notes = [];
	let username = ""; // Initialize username
	import { onMount } from "svelte";

	let stats = {
		diariesWritten: 0,
		favoriteTopic: "",
	};
	let hiddenNotes = []; // To store hidden notes

	// Retrieve the username from localStorage on the client side
	onMount(() => {
		if (typeof localStorage !== "undefined") {
			username = localStorage.getItem("username") || ""; // Fallback to an empty string if not found
		} else {
			console.warn("localStorage is not available.");
		}
		loadNotes(); // Call loadNotes after username is set
	});

	function shownDiary() {
		diary = true;
	}

	function hiddenDiary() {
		diary = false;
	}

	// Save a new note for the current user
	async function saveNote() {
    if (note) {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`http://localhost:3019/api/note/${username}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Add token here
                },
                body: JSON.stringify({ user: username, note }),
            });
            if (response.ok) {
                const data = await response.json();
                notes = [...notes, { note }];
                stats.diariesWritten++;
                stats.favoriteTopic = "Life";
                hiddenDiary();
                note = "";
            } else {
                const errorData = await response.json();
                alert(`Error saving note: ${errorData.message}`);
            }
        } catch (err) {
            alert("Failed to save the note. Please try again.");
        }
    } else {
        alert("There is no note to save.");
    }
}

	// Load notes for the current user
	async function loadNotes() {
    if (!username) {
        console.warn("Username is not set. Cannot load notes.");
        return;
    }

    try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`http://localhost:3019/api/notes/${username}`, {
            headers: {
                "Authorization": `Bearer ${token}`, // Add token here
            },
        });
        if (response.ok) {
            const data = await response.json();
            notes = data.notes;
        } else {
            const errorData = await response.json();
            alert(`Error loading notes: ${errorData.message}`);
        }
    } catch (err) {
        alert("Failed to load notes.");
    }
}

	// Function to hide all notes
	function hideAllNotes() {
		hiddenNotes = [...notes]; // Save all notes in the hiddenNotes array
		notes = [];
	}

	// Function to unhide all notes
	function unhideAllNotes() {
		notes = [...hiddenNotes]; // Restore the notes from the hiddenNotes array
		hiddenNotes = [];
	}
</script>

<div class="container mx-auto p-4">
	<!-- Introduction -->
	<div class="text-center">
		<h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Start Your Journey Today</h2>
		<p class="text-gray-600 text-sm sm:text-base">Write your thoughts, reflect on your day, and grow personally.</p>
	</div>

	<!-- Diary Interaction -->
	<div class="text-center mt-8">
		<button
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto transform transition-transform hover:scale-105"
			on:click={shownDiary}>
			Write a Diary Entry
		</button>
	</div>

	<!-- Notes Section -->
    {#if diary}
    <div class="mt-8 flex flex-col items-center">
      <div class="relative bg-white p-9 rounded-lg shadow-lg w-full max-w-xl">
        <div class="absolute top-0 bottom-0 left-5 w-1 bg-green-500 rounded-full"></div>
        <h2 class="text-xl font-bold text-green-700 mb-4">Write Your Diary</h2>
        <textarea
          placeholder="Write your thoughts here..."
          class="relative w-full h-40 p-4 bg-transparent border border-gray-300 rounded-lg resize-none focus:ring focus:ring-green-300 font-mono text-sm"
          bind:value={note}>
        </textarea>
      </div>
      <div class="flex space-x-4 mt-4">
        <button
          class="bg-red-500 hover:bg-red-700 text-white font-bold px-4 py-2 rounded transform transition-transform hover:scale-105"
          on:click={hiddenDiary}>
          Remove
        </button>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded transform transition-transform hover:scale-105"
          on:click={saveNote}>
          Save
        </button>
      </div>
    </div>
    {/if}

	<!-- Display Notes -->
	<div class="mt-8">
		<h2 class="text-xl font-bold text-red-700 mb-4">Written Diaries</h2>
		{#if notes.length > 0}
		<button
			class="hover:text-blue-900 text-blue-500 font-bold"
			on:click={hideAllNotes}>
			Hide All Entries
		</button>
		{:else}
		<button
			class="hover:text-blue-900 text-blue-500 font-bold"
			on:click={unhideAllNotes}>
			Unhide All Entries
		</button>
		{/if}
		<ul>
			{#each notes as note, index}
			<li class="bg-gray-100 p-4 rounded-lg shadow mb-4">
				<p>{note.note}</p> <!-- Updated to access the note text -->
			</li>
			{/each}
		</ul>
	</div>

	<!-- Progress Section -->
	<div class="mt-16 bg-gray-100 p-8 rounded-lg text-center">
		<h2 class="text-2xl font-bold text-gray-800 mb-4">Your Progress</h2>
		<div class="flex justify-around">
			<div>
				<p class="text-3xl font-bold text-blue-500">{stats.diariesWritten}</p>
				<p class="text-gray-600 text-sm">Diaries Written</p>
			</div>
			<div>
				<p class="text-3xl font-bold text-green-500">{stats.favoriteTopic}</p>
				<p class="text-gray-600 text-sm">Favorite Topic</p>
			</div>
		</div>
	</div>
</div>
