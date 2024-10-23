<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { sessionId } from '$lib/stores/session';
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

  let currentSessionId;
  
  // Initialize session and load flip history
  onMount(() => {
    sessionId.init();
    sessionId.subscribe(value => {
      if (value) {
        currentSessionId = value;
        loadHistory(value);
      }
    });
  });

  async function loadHistory(sid) {
    try {
      const response = await fetch(`/api/history?sessionId=${sid}`);
      if (!response.ok) throw new Error('Failed to load history');
      const data = await response.json();
      flipHistory.set(data);
    } catch (error) {
      console.error('Error loading history:', error);
    }
  }

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

      // Save to database
      try {
        const response = await fetch('/api/history', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: currentSessionId,
            situation: userSituation,
            response: flippedResponse
          })
        });
        
        if (!response.ok) throw new Error('Failed to save flip');
        
        // Reload history to show new flip
        await loadHistory(currentSessionId);
      } catch (error) {
        console.error('Error saving flip:', error);
      }

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
