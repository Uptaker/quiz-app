<script lang="ts">
  import {fly} from 'svelte/transition'

  export let fullWidth = false
  export let padding = 'p-3 pb-4 pt-lg-4 pb-lg-5 px-lg-5'
  export let flex = 'd-flex flex-column justify-content-center align-items-center gap-3'
  export let transparent = false
  export let innerTitle: string = ''
  export let outerTitle: string = ''
</script>

{#if outerTitle}
  <h3 class="mb-4 mx-auto {flex} {fullWidth ? '' : 'fix-width'}">{outerTitle}</h3>
{/if}
<div
  class="{flex} {fullWidth ? 'w-100' : 'fix-width'} {padding} {transparent ? '' : 'card shadow'} rounded-3 mx-auto {$$props.class ?? ''}"
  in:fly={{x: -200, duration: 200, local: true}}>
  {#if innerTitle}
    <h5 class="mb-3">{innerTitle}</h5>
  {/if}
  <slot/>
</div>