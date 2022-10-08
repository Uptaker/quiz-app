<script lang="ts">
  import {QuizQuestion} from '../../../server/types'
  import Card from '../../common/Card.svelte'
  import QuizAnswerResult from '../../common/QuizAnswerResult.svelte'
  import {isQuizAnswerCorrect} from '../../utils'
  import ResultStats from './ResultStats.svelte'
  import QuizImage from '../../common/QuizImage.svelte'

  export let questions: QuizQuestion[]
  export let showAnswers: boolean

  $: correctAmount = questions?.filter(q => isQuizAnswerCorrect(q)).length

  function reset() {
    questions.forEach(q => delete q.studentAnswer)
    showAnswers = false
  }
</script>
<div class="d-flex flex-column justify-center w-100 gap-5">
  <ResultStats {questions} {correctAmount}/>

  <button class="btn btn-primary py-3 my-5" on:click={reset}>Proovi uuesti</button>
  {#each questions as q}
      <Card fullWidth flex="d-flex justify-content-between align-items-center gap-3 gap-lg-4" padding="px-3 px-md-4 px-lg-5 py-4">
        <span class="lead mb-3">{q.question}</span>
        <QuizImage image={q.pictureName} />
        {#if isQuizAnswerCorrect(q)}
          <QuizAnswerResult key="Tubli!" value={q.answer} icon="correct" result="correct"/>
        {:else}
          <QuizAnswerResult icon="correct" value={q.answer}/>
          <QuizAnswerResult icon="incorrect" result="incorrect" value={q.studentAnswer}/>
        {/if}
      </Card>
  {/each}
</div>
<style>
  :global(.q-correct) {
    border: 1px solid rgba(143, 188, 143, 0.35) !important;
  }

  :global(.q-incorrect) {
    border: 1px solid rgba(255, 182, 193, 0.35) !important;
  }

  :global(.q-correct-key) {
    background-color: rgba(143, 188, 143, 0.6) !important;
    border-radius: 0;
  }

  :global(.q-incorrect-key) {
    background-color: rgba(255, 182, 193, 0.6) !important;
    border-radius: 0;
  }

  :global(.q-correct-val) {
    background-color: rgba(143, 188, 143, 0.3) !important;
    border-radius: 0;
  }

  :global(.q-incorrect-val) {
    background-color: rgba(255, 182, 193, 0.3) !important;
    border-radius: 0;
  }
</style>
