<script lang="ts">
  import {onMount} from 'svelte'
  import {Quiz} from '../../../server/types'
  import Spinner from '../../common/Spinner.svelte'
  import {formatUuid} from '../../utils'
  import Card from '../../common/Card.svelte'
  import {navigate} from 'svelte-navigator'
  import {sendToast} from '../../toast'
  import ProtectedPageCard from '../../common/ProtectedPageCard.svelte'

  export let id: string
  let quiz: Quiz

  onMount(() => load())

  async function remove() {
    if (!confirm(`Kas oled kindel, et soovid kustutada testi #${formatUuid(quiz.info.uuid)}?\n"${quiz.info.name}"`)) return
    await fetch('/api/quiz/' + id, {
      headers: {'Accept': 'application/json'},
      method: 'DELETE'
    }).then(res => {
      if (res.ok) {
        sendToast(`Test ${formatUuid(quiz.info.uuid)} kustutatud`)
        navigate('/')
      } else {
        sendToast(`Tekis tõrge kustutamise ajal. Palun proovi uuesti`)
      }
    })
  }

  async function load() {
    quiz = await fetch('/api/quiz/' + id, {
      headers: {'Accept': 'application/json'}
    }).then(res => res.json()).catch(() => quiz = {} as Quiz) ?? {}
    // quiz = {'questions': [{'question': 'Võrdse tulemuse (_____ m) said kirja Maria ja Leena, kuid parema koha sai Maria, kuna tema paremuselt teine katse oli Leena omast pikem.', 'answer': '26.5', 'pictureName': 'pilt1.jpg'}, {'question': 'Poolita sõna: palju', 'answer': 'pal-ju'}], 'info': {'name': 'Testide kysimused vastused pildid', 'uuid': 'a274a14e-e5f6-4c6b-a6f0-227de58acabc', 'createdAt': '1664923946254'}}
  }
</script>

<ProtectedPageCard flex="" transparent title={'Muuda test'} padding="p-0">
  {#if quiz?.questions?.length}
    <div class="d-flex flex-column gap-3 mb-5">
      <p class="text-small fw-bolder text-primary">#{formatUuid(quiz.info.uuid)} {quiz.info.name}</p>
      <div>
        <label for="quiz-name" class="lead fw-bolder"><i class="fa-solid fa-quote-left"></i>&nbsp;&nbsp;Pealkiri</label>
        <input id="quiz-name" type="text" class="form-control mt-1 fw-normal bg-white" placeholder="Otsi..." bind:value={quiz.info.name} />
      </div>
    </div>

    <div class="d-flex justify-content-between gap-5">
      <div class="d-flex gap-3">
        <button class="btn btn-danger" on:click={remove}>Kustuta</button>
      </div>
      <button class="btn btn-primary" disabled>Salvesta</button>
    </div>

<!--    <QuizModeAllAtOnce bind:questions={quiz.questions}/>-->
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
</ProtectedPageCard>