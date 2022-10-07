<script lang="ts">
  import {QuizQuestion} from '../../server/types'

  export let question: QuizQuestion
  let imageError = false
</script>

{#if question.pictureName}
  <div class="px-1 px-md-3">
    {#if imageError}
      <div style="border: 1px dashed lightslategray; padding: 90px; border-radius: 15px">
        Puudub pilt <code>{question.pictureName}</code>
      </div>
    {:else}
      <img on:error={() => imageError = true} class="w-100 rounded-4"
           src="/api/image/{question.pictureName}" alt={question.pictureName}>
    {/if}
  </div>
{/if}