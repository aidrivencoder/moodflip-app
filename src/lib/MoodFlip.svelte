<script>
  import { fade, fly, scale } from 'svelte/transition';
  import { elasticOut, bounceOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  let userSituation = '';
  let flippedResponse = null;
  let isLoading = false;

  // Flip history store
  const flipHistory = writable([]);
  let currentPage = 1;
  const itemsPerPage = 5;

  // Load flip history from local storage
  onMount(() => {
    const storedHistory = localStorage.getItem('flipHistory');
    if (storedHistory) {
      flipHistory.set(JSON.parse(storedHistory));
    }
  });

  function handleInput(event) {
    userSituation = event.target.value;
    flippedResponse = null;
  }

  async function generatePositiveResponse(situation) {
    const OPENROUTER_API_KEY = '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';
    const YOUR_SITE_URL = 'https://moodflip.aidrivencoder.com/';
    const YOUR_SITE_NAME = 'MoodFlip App';

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": YOUR_SITE_URL,
          "X-Title": YOUR_SITE_NAME,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "openai/gpt-3.5-turbo",
          "messages": [
            {
              "role": "system",
              "content": "You are a positive and encouraging AI assistant. Your task is to take a user's situation and provide a short, humorous, uplifting perspective on it. Use emojis where appropriate to enhance the positive message. Keep your response concise, ideally within 1-2 sentences."
            },
            {
              "role": "user",
              "content": `Please provide a short positive perspective on this situation: ${situation}`
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from OpenRouter API');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error generating positive response:', error);
      return 'Oops! 😅 Something went wrong. Please try again later!';
    }
  }

  async function flipIt() {
    if (userSituation.trim() !== '') {
      isLoading = true;
      flippedResponse = await generatePositiveResponse(userSituation);
      isLoading = false;

      // Save to history
      const newFlip = { situation: userSituation, response: flippedResponse, timestamp: new Date().toISOString() };
      flipHistory.update(history => {
        const updatedHistory = [newFlip, ...history];
        localStorage.setItem('flipHistory', JSON.stringify(updatedHistory));
        return updatedHistory;
      });

      // Reset current page to 1 to show the latest flip
      currentPage = 1;
    }
  }

  $: paginatedHistory = $flipHistory.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  $: totalPages = Math.ceil($flipHistory.length / itemsPerPage);

  function nextPage() {
    if (currentPage < totalPages) currentPage++;
  }

  function prevPage() {
    if (currentPage > 1) currentPage--;
  }
</script>

<div class="mood-flip-container">
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
    on:click={flipIt}
  >
    {isLoading ? 'Flipping...' : 'Flip It!'}
  </button>
  
  {#if flippedResponse}
    <div class="response-card" transition:fly={{y: 200, duration: 800, easing: elasticOut}}>
      <h4>Positive Flip:</h4>
      <p>{flippedResponse}</p>
    </div>
  {/if}

  <div class="flip-history">
    <h3>Flip History</h3>
    {#each paginatedHistory as flip}
      <div class="history-item">
        <p class="situation">{flip.situation}</p>
        <p class="response">{flip.response}</p>
        <p class="timestamp">{new Date(flip.timestamp).toLocaleString()}</p>
      </div>
    {/each}
    <div class="pagination">
      <button on:click={prevPage} disabled={currentPage === 1}>Previous</button>
      <span>{currentPage} of {totalPages}</span>
      <button on:click={nextPage} disabled={currentPage === totalPages}>Next</button>
    </div>
  </div>
</div>

<style>
  .mood-flip-container {
    max-width: 800px;
    margin: 0 auto;
  }

  h2, h3 {
    color: #2c3e50;
    font-weight: bold;
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  h3 {
    font-size: 1.5rem;
    margin-top: 2rem;
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
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }

  .flip-btn:hover:not(:disabled) {
    transform: scale(1.05) rotate(-3deg);
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    background-color: #27ae60;
  }

  .flip-btn:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }

  .response-card {
    background-color: #ffffff;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    margin-top: 2rem;
  }

  .response-card h4 {
    color: #3498db;
    font-weight: bold;
    margin-bottom: 15px;
    font-size: 1.4rem;
  }

  .response-card p {
    font-size: 1.2rem;
    color: #34495e;
    line-height: 1.6;
  }

  .flip-history {
    margin-top: 2rem;
  }

  .history-item {
    background-color: #f8f9fa;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 1rem;
  }

  .history-item .situation {
    font-weight: bold;
    color: #2c3e50;
  }

  .history-item .response {
    color: #34495e;
    margin-top: 0.5rem;
  }

  .history-item .timestamp {
    font-size: 0.8rem;
    color: #7f8c8d;
    margin-top: 0.5rem;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
  }

  .pagination button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 8px 15px;
    margin: 0 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .pagination button:hover:not(:disabled) {
    background-color: #2980b9;
  }

  .pagination button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }

  .pagination span {
    font-size: 1rem;
    color: #34495e;
  }

  @media (max-width: 768px) {
    .flip-btn {
      font-size: 1.1rem;
      padding: 12px 24px;
    }
  }
</style>
