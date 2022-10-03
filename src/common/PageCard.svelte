<script lang="ts">
  import {fly} from 'svelte/transition'
  import Card from './Card.svelte'

  export let title: string
</script>

<div in:fly={{x: -200, duration: 200}}>
  <Card flex padding="px-4 py-3" class="mb-3" outerTitle={title}>
    <slot/>
  </Card>
</div>
