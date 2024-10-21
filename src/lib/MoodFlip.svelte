<script>
  import { fade, fly, scale } from 'svelte/transition';
  import { elasticOut, bounceOut } from 'svelte/easing';

  let situations = [
    "I failed an exam",
    "My car broke down",
    "I lost my phone",
    "I got stuck in traffic",
    "I spilled coffee on my shirt",
    "My computer crashed",
    "I missed my bus",
    "I forgot my lunch at home",
    "I got caught in the rain without an umbrella",
    "I overslept and was late for work"
  ];

  let positiveResponses = [
    "At least you learned what not to study next time!",
    "Time for an exciting bike adventure!",
    "Enjoy a digital detox day!",
    "Extra time to practice your car karaoke skills!",
    "Congrats! You've invented a new fashion trend!",
    "Your computer just wanted a power nap too!",
    "Surprise cardio session achieved!",
    "Intermittent fasting level: Accidental pro!",
    "Free shower and water park experience!",
    "You've mastered the art of the dramatic entrance!"
  ];

  let selectedSituation = null;
  let flippedResponse = null;

  function selectSituation(situation) {
    selectedSituation = situation;
    flippedResponse = null;
  }

  function flipIt() {
    const index = situations.indexOf(selectedSituation);
    flippedResponse = positiveResponses[index];
  }
</script>

<div class="mood-flip-container">
  <h2 class="mb-4">Select a situation:</h2>
  <div class="situation-grid mb-4">
    {#each situations as situation}
      <button
        class="situation-btn"
        class:active={situation === selectedSituation}
        on:click={() => selectSituation(situation)}
        transition:scale={{duration: 200, easing: bounceOut}}
      >
        {situation}
      </button>
    {/each}
  </div>
  
  <button
    class="flip-btn"
    disabled={!selectedSituation}
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

  .situation-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
  }

  .situation-btn {
    background-color: #ecf0f1;
    border: none;
    padding: 15px;
    border-radius: 10px;
    font-size: 1rem;
    transition: all 0.3s ease;
    cursor: pointer;
    text-align: left;
    line-height: 1.3;
  }

  .situation-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    background-color: #e0e6e8;
  }

  .situation-btn.active {
    background-color: #3498db;
    color: white;
    font-weight: bold;
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
    .situation-grid {
      grid-template-columns: 1fr;
    }

    .flip-btn {
      font-size: 1.1rem;
      padding: 12px 24px;
    }
  }
</style>
