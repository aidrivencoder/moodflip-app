<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import SituationInput from './components/SituationInput.svelte';
  import ResponseCard from './components/ResponseCard.svelte';
  import FlipHistory from './components/FlipHistory.svelte';

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

  async function generatePositiveResponse(situation) {
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ situation })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from server');
      }

      const data = await response.json();
      return data.response;
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
</script>

<div class="mood-flip-container">
  <SituationInput bind:userSituation {isLoading} on:click={flipIt} />
  
  <ResponseCard {flippedResponse} {userSituation} />

  <FlipHistory {flipHistory} bind:currentPage {itemsPerPage} />
</div>

<style>
  @import './styles/MoodFlip.css';
</style>
