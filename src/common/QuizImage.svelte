<script lang="ts">
  export let image: string
  export let maxHeight: number

  let imageError = false
</script>

{#if image}
  <div class="px-1 px-md-3 {$$props.class}">
    {#if imageError}
      <div style="border: 1px dashed lightslategray; padding: 90px; border-radius: 15px">
        Puudub pilt <code>{image}</code>
      </div>
    {:else}
      <img on:error={() => imageError = true} class="w-100 rounded-4"
           src="/api/image/{image}" alt={image} style="height: {maxHeight ? maxHeight + 'px' : 'auto'} !important;">
    {/if}
  </div>
{/if}