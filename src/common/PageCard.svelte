<script lang="ts">
  import Card from './Card.svelte'

  export let title: string
  export let transparent = false
  export let padding = 'p-0'
</script>

<Card {transparent} flex {padding} class="mb-3" outerTitle={title}>
  <slot/>
</Card>
