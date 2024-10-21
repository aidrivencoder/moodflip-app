<script>
  export let userSituation;
  export let flippedResponse;

  function generateShareMessage(situation, response) {
    return `I turned "${situation}" into "${response}" with MoodFlip! 🌟 Transform your perspective at https://moodflip.aidrivencoder.com #MoodFlip #PositiveVibes`;
  }

  function shareOnTwitter() {
    const message = generateShareMessage(userSituation, flippedResponse);
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://twitter.com/intent/tweet?text=${encodedMessage}`, '_blank');
  }

  function shareOnFacebook() {
    const message = generateShareMessage(userSituation, flippedResponse);
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=https://moodflip.aidrivencoder.com&quote=${encodedMessage}`, '_blank');
  }

  function shareOnLinkedIn() {
    const message = generateShareMessage(userSituation, flippedResponse);
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=https://moodflip.aidrivencoder.com&title=MoodFlip&summary=${encodedMessage}`, '_blank');
  }
</script>

<div class="share-buttons">
  <button on:click={shareOnTwitter} class="share-btn twitter">Share on Twitter</button>
  <button on:click={shareOnFacebook} class="share-btn facebook">Share on Facebook</button>
  <button on:click={shareOnLinkedIn} class="share-btn linkedin">Share on LinkedIn</button>
</div>

<style>
  .share-buttons {
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
    }

    .share-btn {
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
    }

    .share-btn.twitter {
    background-color: #1da1f2;
    }

    .share-btn.facebook {
    background-color: #4267B2;
    }

    .share-btn.linkedin {
    background-color: #0077b5;
    }

    .share-btn:hover {
    opacity: 0.9;
    }

  @media (max-width: 768px) {
    .share-buttons {
        flex-direction: column;
    }

    .share-btn {
        margin-bottom: 0.5rem;
    }
}
</style>