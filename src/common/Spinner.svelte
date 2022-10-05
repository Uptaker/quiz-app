<script lang="ts">
  import {slide} from 'svelte/transition'
</script>

<div class="w-100 text-center" transition:slide={{delay:550}}>
  <div class="spinner-border text-primary" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>
