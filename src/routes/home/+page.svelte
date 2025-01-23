<script>
	let diary = false;
	let note = "";
	let notes = [];
	import { onMount } from "svelte";
	let stats = {
		diariesWritten: 0,
		favoriteTopic: "",
	};

	function shownDiary() {
		diary = true;
	}

	function hiddenDiary() {
		diary = false;
	}

	async function saveNote() {
		if (note) {
			try {
				const response = await fetch("http://localhost:3019/api/notes", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ note }),
				});
				if (response.ok) {
					const data = await response.json();
					notes = [...notes, note];
					stats.diariesWritten++;
					stats.favoriteTopic = "Life";
					hiddenDiary();
					note = "";
				} else {
					alert(`Error saving note`);
				}
			} catch (err) {
				alert("Failed to save the note. Please try again.");
			}
		} else {
			alert("There is no note to save.");
		}
	}

	async function loadNotes() {
		try {
			const response = await fetch("http://localhost:3019/api/notes");
			if (response.ok) {
				const data = await response.json();
				notes = data.notes;
			} else {
				alert("Error loading notes.");
			}
		} catch (err) {
			alert("Failed to load notes.");
		}
	}

	onMount(loadNotes);
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
		<h2 class="text-xl font-bold text-green-700 mb-4">Written Diaries</h2>
		<ul>
			{#each notes as note, index}
			<li class="bg-gray-100 p-4 rounded-lg shadow mb-4">
				<p>{note}</p>
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
