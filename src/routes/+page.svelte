<script>
    let diary = false;

    function shownDiary() {
        diary = true;
        console.log(diary);
    }

    function hiddenDiary() {
        diary = false;
        console.log(diary);
    }

    let stats = {
        diariesWritten: 0,
        favoriteTopic: "",
    };
    function updateStats() {
        stats.diariesWritten++;
        stats.favoriteTopic = "Life";
    }
</script>

<!-- Hero Section -->
<div class="relative bg-cover bg-center h-64">
    <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h1 class="text-5xl font-bold text-white drop-shadow-lg">Welcome to Your Diary</h1>
    </div>
</div>

<!-- Main Content -->
<div class="container mx-auto p-6">
    <!-- Introduction -->
    <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">Start Your Journey Today</h2>
        <p class="text-gray-600">Write down your thoughts, reflect on your day, and achieve personal growth. This is your safe space to express yourself.</p>
    </div>

    <!-- Diary Interaction -->
    <div class="text-center mt-8">
        <button 
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transform transition-transform hover:scale-105" 
            on:click={shownDiary}>
            Write a Diary Entry
        </button>
    </div>

    <!-- Notes Section -->
    {#if diary}
    <div class="mt-8 flex flex-col items-center">
        <div class="relative bg-white p-9 rounded-lg shadow-lg w-full max-w-xl">
            <div class="absolute top-0 bottom-0 left-5 w-1 bg-green-500 rounded-full"></div>
            <h2 class="text-xl font-bold text-green-700 mb-4">Notes</h2>
            <textarea 
                placeholder="Write your thoughts here..."
                class="relative w-full h-40 p-4 bg-transparent border border-gray-300 rounded-lg resize-none focus:ring focus:ring-green-300 font-mono text-sm"
            ></textarea>
        </div>
        <button 
            class="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold px-4 py-2 rounded transform transition-transform hover:scale-105"
            on:click={hiddenDiary}>
            Remove
        </button>
        <!-- save button -->
        <button 
            class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded transform transition-transform hover:scale-105"
            on:click={updateStats}>
            Save
        </button>
    </div>
    {/if}

    <!-- Progress Section -->
    <div class="mt-16 bg-gray-100 p-8 rounded-lg shadow-md text-center">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Your Progress</h2>
        <div class="flex justify-center gap-10">
            <div>
                <p class="text-5xl font-bold text-blue-500">{stats.diariesWritten}</p>
                <p class="text-gray-600">Diaries Written</p>
            </div>
            <div>
                <p class="text-5xl font-bold text-green-500">{stats.favoriteTopic}</p>
                <p class="text-gray-600">Favorite Topic</p>
            </div>
        </div>
    </div>
</div>
