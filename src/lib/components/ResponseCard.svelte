<script>
  import { fly } from 'svelte/transition';
  import { elasticOut } from 'svelte/easing';
  import ShareButtons from './ShareButtons.svelte';

  export let flippedResponse;
  export let userSituation;
</script>

{#if flippedResponse}
  <div class="response-card" transition:fly={{y: 200, duration: 800, easing: elasticOut}}>
    <h4>Positive Flip:</h4>
    <p>{flippedResponse}</p>
    <ShareButtons {userSituation} {flippedResponse} />
  </div>
{/if}

<style>
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
</style>
