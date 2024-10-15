<script>
  import { fade, fly } from 'svelte/transition';
  import { elasticOut } from 'svelte/easing';

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

<div class="row">
  <div class="col-md-8 offset-md-2">
    <h2 class="mb-3">Select a situation:</h2>
    <div class="list-group mb-4">
      {#each situations as situation}
        <button
          class="list-group-item list-group-item-action situation-btn"
          class:active={situation === selectedSituation}
          on:click={() => selectSituation(situation)}
          transition:fade={{duration: 200}}
        >
          {situation}
        </button>
      {/each}
    </div>
    
    <button
      class="btn btn-primary btn-lg w-100 mb-4 flip-btn"
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
</div>

<style>
  h2 {
    color: #4a4a4a;
    font-weight: bold;
  }

  .situation-btn {
    transition: all 0.3s ease;
    border-radius: 10px;
    margin-bottom: 10px;
    font-size: 1.1rem;
  }

  .situation-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }

  .situation-btn.active {
    background-color: #007bff;
    color: white;
  }

  .flip-btn {
    font-size: 1.3rem;
    font-weight: bold;
    transition: all 0.3s ease;
    border-radius: 25px;
  }

  .flip-btn:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0,0,0,0.1);
  }

  .response-card {
    background-color: #ffffff;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }

  .response-card h4 {
    color: #007bff;
    font-weight: bold;
    margin-bottom: 15px;
  }

  .response-card p {
    font-size: 1.2rem;
    color: #4a4a4a;
  }
</style>