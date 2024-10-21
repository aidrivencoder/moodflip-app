<script>
  import MoodFlip from './lib/MoodFlip.svelte'
</script>

<main class="container mt-5">
  <div class="app-content">
    <h1 class="text-center mb-4">MoodFlip</h1>
    <p class="text-center mb-5">Turn that frown upside down! Select a situation and let's flip your mood.</p>
    <MoodFlip />
  </div>
</main>

<style>
  :global(body) {
    background-color: #f0f8ff;
    font-family: 'Roboto', 'Arial', sans-serif;
    color: #333;
    line-height: 1.6;
  }

  :global(*) {
    box-sizing: border-box;
  }

  .app-content {
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  h1 {
    color: #2c3e50;
    font-size: 3.5rem;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    margin-bottom: 1rem;
  }

  p {
    color: #34495e;
    font-size: 1.3rem;
    max-width: 600px;
    margin: 0 auto 2rem;
  }

  :global(.btn-primary) {
    background-color: #3498db;
    border-color: #3498db;
  }

  :global(.btn-primary:hover) {
    background-color: #2980b9;
    border-color: #2980b9;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }

    p {
      font-size: 1.1rem;
    }
  }
</style>
