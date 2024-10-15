<script>
  import MoodFlip from './lib/MoodFlip.svelte'
</script>

<main class="container mt-5">
  <h1 class="text-center mb-4">MoodFlip</h1>
  <p class="text-center mb-5">Turn that frown upside down! Select a situation and let's flip your mood.</p>
  <MoodFlip />
</main>

<style>
  :global(body) {
    background-color: #f0f8ff;
    font-family: 'Arial', sans-serif;
  }

  h1 {
    color: #4a4a4a;
    font-size: 3rem;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  }

  p {
    color: #6a6a6a;
    font-size: 1.2rem;
  }
</style>