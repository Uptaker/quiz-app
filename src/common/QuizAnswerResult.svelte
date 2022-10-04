<script lang="ts">
  export let key: string
  export let value: string
  export let result: 'correct' | 'incorrect' | undefined = undefined
</script>

<div class="form-control key-value {result ? 'q-' + result : ''}">
  <div class="key-value-border form-control border-0 text-center {result ? 'q-' + result + '-key' : ''}">{key}</div>
  <div class="bg-white key-value-border form-control border-0 text-center fw-normal {result ? 'q-' + result + '-val' : ''}">{value ?? '<vastamata>'}</div>
</div>

<style>
  .key-value {
    display: grid;
    grid-template-columns: 1fr 4fr;
    padding: 0px;
  }

  .key-value-border {
    border-radius: 0;
  }
</style>