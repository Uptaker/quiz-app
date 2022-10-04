<script lang="ts">
  import PageCard from '../../common/PageCard.svelte'
  import {onMount} from 'svelte'
  import {Quiz} from '../../../server/types'
  import QuizModeAllAtOnce from './QuizModeAllAtOnce.svelte'
  import QuizResults from './QuizResults.svelte'
  import Spinner from '../../common/Spinner.svelte'
  import {formatUuid} from '../../utils'
  import Card from '../../common/Card.svelte'

  export let id: string
  let quiz: Quiz
  let showAnswers = false

  onMount(() => load())

  async function load() {
    quiz = await fetch('/api/quiz/' + id, {
      headers: {'Accept': 'application/json'}
    }).then(res => res.json()).catch(() => quiz = {} as Quiz) ?? {}
    console.log(quiz)
  }
</script>


<PageCard transparent title={quiz?.info ? quiz.info.name : ''} padding="p-0">
  {#if quiz?.questions?.length}
    <p class="text-small fw-bolder text-primary">#{formatUuid(quiz.info.uuid)}</p>
    {#if showAnswers}
      <QuizResults bind:showAnswers questions={quiz.questions}/>
    {:else}
      <QuizModeAllAtOnce bind:showAnswers bind:questions={quiz.questions}/>
    {/if}
  {:else}
    {#if quiz}
      <Card padding="p-3">
        <h1><i class="fa-solid fa-box-open"></i></h1>
        <p>Selline test ei ole saadaval</p>
      </Card>
    {:else}
      <Spinner/>
    {/if}
  {/if}
</PageCard>