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
            const response = await fetch(`https://allstarbackend.onrender.com/api/note/${username}`, {
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
        const response = await fetch(`https://allstarbackend.onrender.com/api/notes/${username}`, {
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

async function deleteNote(index) {
		try {
			const noteToDelete = notes[index].note;
			const token = localStorage.getItem("accessToken");
			const response = await fetch(`https://allstarbackend.onrender.com/api/note/${username}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ user: username, note: noteToDelete }),
			});
			if (response.ok) {
				notes = notes.filter((_, i) => i !== index); // Remove the note from the array
			} else {
				alert("Failed to delete the note.");
			}
		} catch (err) {
			alert("Error while deleting the note.");
		}
	}

	async function editNote(index) {
		const newContent = prompt("Edit your note:", notes[index].note);
		if (newContent) {
			try {
				const token = localStorage.getItem("accessToken");
				const response = await fetch(`https://allstarbackend.onrender.com/api/note/${username}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ user: username, oldNote: notes[index].note, newNote: newContent }),
				});
				if (response.ok) {
					notes[index].note = newContent; // Update the note in the array
				} else {
					alert("Failed to edit the note.");
				}
			} catch (err) {
				alert("Error while editing the note.");
			}
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
			<a
			href="/noteEntry"
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto transform transition-transform hover:scale-105">
			Write a Diary Entry
		</a>
		</button>
	</div>

	<!-- Notes Section -->
	<div class="container mx-auto p-4">
		<!-- Notes Section -->
		<div class="mt-8">
			<h2 class="text-xl font-bold text-red-700 mb-4">Written Diaries</h2>
			{#if notes.length > 0}
				<button
					class="hover:text-blue-900 text-blue-500 font-bold mb-4"
					on:click={hideAllNotes}>
					Hide All Entries
				</button>
			{:else}
				<button
					class="hover:text-blue-900 text-blue-500 font-bold mb-4"
					on:click={unhideAllNotes}>
					Unhide All Entries
				</button>
			{/if}
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
				{#each notes as note, index}
				<div class="bg-white rounded-lg shadow-md p-6 relative flex flex-col justify-between">
					<!-- Note Content -->
					<div class="mb-4">
						<h2 class="text-xl font-semibold break-words">{note.note}</h2>
					</div>
			
					<!-- Buttons at the bottom -->
					<div class="flex justify-between mt-4">
						<!-- Edit Button -->
						<button
							class="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm flex-1 mr-2"
							on:click={() => editNote(index)}>
							Edit
						</button>
						<!-- Delete Button -->
						<button
							class="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex-1"
							on:click={() => deleteNote(index)}>
							Delete
						</button>
					</div>
				</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Progress Section -->
	<div class="mt-16 bg-gray-100 p-8 rounded-lg text-center">
		<h2 class="text-2xl font-bold text-gray-800 mb-4">Your Progress</h2>
		<div class="flex justify-around">
			<div>
				<p class="text-3xl font-bold text-blue-500">{notes.length}</p>
				<p class="text-gray-600 text-sm">Diaries Written</p>
			</div>
			<div>
				<p class="text-3xl font-bold text-green-500">{stats.favoriteTopic}</p>
				<p class="text-gray-600 text-sm">Favorite Topic</p>
			</div>
		</div>
	</div>
</div>
