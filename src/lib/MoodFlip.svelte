<script>
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
  <div class="col-md-6 offset-md-3">
    <h2 class="mb-3">Select a situation:</h2>
    <div class="list-group mb-4">
      {#each situations as situation}
        <button
          class="list-group-item list-group-item-action"
          class:active={situation === selectedSituation}
          on:click={() => selectSituation(situation)}
        >
          {situation}
        </button>
      {/each}
    </div>
    
    <button
      class="btn btn-primary btn-lg w-100 mb-4"
      disabled={!selectedSituation}
      on:click={flipIt}
    >
      Flip It!
    </button>
    
    {#if flippedResponse}
      <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">Positive Flip:</h4>
        <p>{flippedResponse}</p>
      </div>
    {/if}
  </div>
</div>