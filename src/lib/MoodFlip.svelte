<script>
  import { fade, fly, scale } from 'svelte/transition';
  import { elasticOut, bounceOut } from 'svelte/easing';

  let userSituation = '';
  let flippedResponse = null;

  function handleInput(event) {
    userSituation = event.target.value;
    flippedResponse = null;
  }

  function generatePositiveResponse(situation) {
    // This is a simple function to simulate AI-generated responses
    // In a real-world scenario, you'd want to integrate with an actual AI service API
    const responses = [
      `Look on the bright side: ${situation} is an opportunity for growth!`,
      `Every cloud has a silver lining. In this case, ${situation} might lead to unexpected positive outcomes!`,
      `Remember, ${situation} is just a temporary setback. You've got this!`,
      `Think of ${situation} as a plot twist in your life's exciting story!`,
      `${situation} is challenging, but it's also a chance to showcase your resilience!`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  function flipIt() {
    if (userSituation.trim() !== '') {
      flippedResponse = generatePositiveResponse(userSituation);
    }
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
    disabled={!userSituation.trim()}
    on:click={flipIt}
  >
    Flip It!
  </button>
  
  {#if flippedResponse}
    <div class="response-card" transition:fly={{y: 200, duration: 800, easing: elasticOut}}>
      <h4>Positive Flip:</h4>
      <p>{flippedResponse}</p>
    </div>
  {/if}
</div>

<style>
  .mood-flip-container {
    max-width: 800px;
    margin: 0 auto;
  }

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

  @media (max-width: 768px) {
    .flip-btn {
      font-size: 1.1rem;
      padding: 12px 24px;
    }
  }
</style>
