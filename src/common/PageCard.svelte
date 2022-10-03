<script lang="ts">
  import {fly} from 'svelte/transition'
  import Card from './Card.svelte'

  export let title: string
  export let transparent = false
  export let padding = 'px-4 py-3'
</script>

<div in:fly={{x: -200, duration: 200}}>
  <Card {transparent} flex {padding} class="mb-3" outerTitle={title}>
    <slot/>
  </Card>
</div>
