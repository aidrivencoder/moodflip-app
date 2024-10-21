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
    const OPENROUTER_API_KEY = 'YOUR-API-KEY';
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
          "model": "meta-llama/llama-3.2-1b-instruct:free",
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
</script>

<div class="mood-flip-container">
  <SituationInput bind:userSituation {isLoading} on:click={flipIt} />
  
  <ResponseCard {flippedResponse} {userSituation} />

  <FlipHistory {flipHistory} bind:currentPage {itemsPerPage} />
</div>

<style>
  @import './styles/MoodFlip.css';
</style>
