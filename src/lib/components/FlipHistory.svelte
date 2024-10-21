<script>
  import ShareButtons from './ShareButtons.svelte';

  export let flipHistory;
  export let currentPage;
  export let itemsPerPage;

  $: paginatedHistory = $flipHistory.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  $: totalPages = Math.ceil($flipHistory.length / itemsPerPage);

  function nextPage() {
    if (currentPage < totalPages) currentPage++;
  }

  function prevPage() {
    if (currentPage > 1) currentPage--;
  }
</script>

<div class="flip-history">
  <h3>Flip History</h3>
  {#each paginatedHistory as flip}
    <div class="history-item">
      <p class="situation">{flip.situation}</p>
      <p class="response">{flip.response}</p>
      <p class="timestamp">{new Date(flip.timestamp).toLocaleString()}</p>
      <ShareButtons userSituation={flip.situation} flippedResponse={flip.response} />
    </div>
  {/each}
  <div class="pagination">
    <button on:click={prevPage} disabled={currentPage === 1}>Previous</button>
    <span>{currentPage} of {totalPages}</span>
    <button on:click={nextPage} disabled={currentPage === totalPages}>Next</button>
  </div>
</div>

<style>
  h3 {
    color: #2c3e50;
    font-weight: bold;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    margin-top: 2rem;
  }
  .flip-history {
    margin-top: 2rem;
  }

  .history-item {
    background-color: #f8f9fa;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 1rem;
  }

  .history-item .situation {
    font-weight: bold;
    color: #2c3e50;
  }

  .history-item .response {
    color: #34495e;
    margin-top: 0.5rem;
  }

  .history-item .timestamp {
    font-size: 0.8rem;
    color: #7f8c8d;
    margin-top: 0.5rem;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
  }

  .pagination button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 8px 15px;
    margin: 0 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .pagination button:hover:not(:disabled) {
    background-color: #2980b9;
  }

  .pagination button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }

  .pagination span {
    font-size: 1rem;
    color: #34495e;
  }
</style>
