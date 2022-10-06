<script lang="ts">
  import {slide} from 'svelte/transition'
</script>

<div class="w-100 text-center" in:slide={{delay:350}} out:slide>
  <div class="spinner-border text-primary" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>
