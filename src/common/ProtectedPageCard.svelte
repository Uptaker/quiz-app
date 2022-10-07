<script lang="ts">
  import PageCard from './PageCard.svelte'
  import {isAdmin} from '../store/auth'

  export let title: string
  export let transparent = false
  export let padding = 'p-0'

  $: if (!$isAdmin) location.href = '/'
</script>

{#if $isAdmin}
  <PageCard {transparent} flex {padding} class="mb-3 {$$props.class}" outerTitle={title}>
    <slot/>
  </PageCard>
{/if}