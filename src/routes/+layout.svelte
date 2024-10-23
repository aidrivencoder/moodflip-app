<script>
  import '../app.css';
  import 'bootstrap/dist/css/bootstrap.min.css';
</script>

<slot />

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
</style>
