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
    // quiz = {"questions":[{"question":"Võrdse tulemuse (_____ m) said kirja Maria ja Leena, kuid parema koha sai Maria, kuna tema paremuselt teine katse oli Leena omast pikem.","answer":"26.5","pictureName":"pilt1.jpg"},{"question":"Poolita sõna: palju","answer":"pal-ju"}],"info":{"name":"Testide kysimused vastused pildid","uuid":"a274a14e-e5f6-4c6b-a6f0-227de58acabc","createdAt":"1664923946254"}}
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