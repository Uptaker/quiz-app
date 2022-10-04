<script lang="ts">
  import {QuizQuestion} from '../../../server/types'
  import QuizCard from './QuizCard.svelte'

  export let questions: QuizQuestion[]
  export let showAnswers: boolean

  function submit() {
    showAnswers = true
    scrollTo(0, 0)
  }
</script>
<form on:submit|preventDefault={submit} class="d-flex flex-column justify-center w-100 gap-4">
{#each questions as q, index}
    <QuizCard question={q} questionAmount={questions.length} index={index + 1} />
{/each}
  <input type="submit" class="btn btn-lg btn-primary py-3 my-5" value="Lõpeta">
</form>

