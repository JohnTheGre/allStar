<script>
    import { onMount } from "svelte";
    let note = "";
    let username = "";

    onMount(() => {
        if (typeof localStorage !== "undefined") {
            username = localStorage.getItem("username") || ""; // Get username
        } else {
            console.warn("localStorage is not available.");
        }
    });

    async function saveNote() {
        if (note) {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await fetch(`http://localhost:3019/api/note/${username}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({ user: username, note }),
                });
                if (response.ok) {
                    alert("Note saved successfully!");
                    window.location.href = "/home"; // Redirect to the home page
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

    function cancel() {
        window.location.href = "/home"; // Redirect back to the home page
    }
</script>

<style>
    .notebook {
        background-color: #fdfde7; /* Light beige background */
        border: 1px solid #ccc; /* Border for the notebook */
        border-radius: 12px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
        padding: 20px;
        width: 100%;
        max-width: 700px;
        margin: auto;
    }

    .notebook .textarea {
        background-color: transparent;
        border: none;
        border-left: 2px dashed #ccc; /* Notebook-style margin */
        height: 300px;
        width: 100%;
        resize: none;
        font-family: 'Courier New', Courier, monospace; /* Notebook-like font */
        font-size: 16px;
        line-height: 1.5;
        padding: 10px;
        outline: none;
    }

    .notebook .textarea:focus {
        outline: none;
        background-color: #faf9e1; /* Slightly lighter background on focus */
    }

    .button-group {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
        gap: 10px;
    }

    .button {
        padding: 10px 20px;
        font-size: 14px;
        border-radius: 8px;
        font-weight: bold;
        cursor: pointer;
        transition: transform 0.2s ease;
    }

    .button.cancel {
        background-color: #e74c3c;
        color: white;
    }

    .button.save {
        background-color: #3498db;
        color: white;
    }

    .button:hover {
        transform: scale(1.05);
    }

    .header {
        text-align: center;
        font-family: 'Georgia', serif;
        margin-bottom: 20px;
    }

    .header h1 {
        font-size: 2rem;
        margin: 0;
    }

    .header p {
        font-size: 1.2rem;
        color: #555;
    }
</style>

<div class="notebook">
    <div class="header">
        <h1>Diary Entry</h1>
        <p>Write your thoughts below</p>
    </div>
    <textarea
        class="textarea"
        placeholder="Write your thoughts here..."
        bind:value={note}>
    </textarea>
    <div class="button-group">
        <button class="button cancel" on:click={cancel}>Cancel</button>
        <button class="button save" on:click={saveNote}>Save</button>
    </div>
</div>
    