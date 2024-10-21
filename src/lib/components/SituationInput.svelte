<script>
    export let userSituation = "";
    export let isLoading = false;

    function handleInput(event) {
        userSituation = event.target.value;
    }
</script>

<div>
    <h2 class="mb-4">Describe your situation:</h2>
    <textarea
        class="situation-input mb-4"
        placeholder="Enter your situation here..."
        bind:value={userSituation}
        on:input={handleInput}
    ></textarea>

    <button
        class="flip-btn"
        disabled={!userSituation.trim() || isLoading}
        on:click
    >
        {isLoading ? "Flipping..." : "Flip It!"}
    </button>
</div>

<style>
    h2 {
        color: #2c3e50;
        font-weight: bold;
        font-size: 1.8rem;
        margin-bottom: 1.5rem;
    }
    .situation-input {
        width: 100%;
        height: 100px;
        padding: 15px;
        border-radius: 10px;
        border: 2px solid #ecf0f1;
        font-size: 1rem;
        resize: vertical;
        transition: all 0.3s ease;
    }

    .situation-input:focus {
        outline: none;
        border-color: #3498db;
        box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
    }

    .flip-btn {
        background-color: #2ecc71;
        color: white;
        border: none;
        padding: 15px 30px;
        font-size: 1.3rem;
        font-weight: bold;
        border-radius: 50px;
        cursor: pointer;
        transition: all 0.3s ease;
        display: block;
        margin: 2rem auto;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .flip-btn:hover:not(:disabled) {
        transform: scale(1.05) rotate(-3deg);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        background-color: #27ae60;
    }

    .flip-btn:disabled {
        background-color: #95a5a6;
        cursor: not-allowed;
    }

    @media (max-width: 768px) {
        .flip-btn {
            font-size: 1.1rem;
            padding: 12px 24px;
        }
    }
</style>
