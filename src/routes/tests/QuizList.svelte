<script lang="ts">
  import {QuizInfo} from '../../../server/types'
  import QuizRow from './QuizRow.svelte'
  import {onMount} from 'svelte'
  import Card from '../../common/Card.svelte'
  import {formatUuid} from '../../utils'
  import Spinner from '../../common/Spinner.svelte'

  let quizzes: QuizInfo[]
  let filter = ''

  onMount(() => load())

  function filtered(quizzes: QuizInfo[], filter: string): QuizInfo[] {
    if (filter) {
      filter = filter.trim().toLowerCase()
      quizzes = quizzes?.filter(q => q.name.toLowerCase().includes(filter) || q.uuid.toLowerCase().includes(filter) ||
        formatUuid(q.uuid).toLowerCase().includes(filter))
    }
    return quizzes
  }

  async function load() {
    quizzes = await fetch('/api/quiz', {
      headers: {'Accept': 'application/json; charset=UTF-8'}
    }).then(res => res.json()).catch(() => quizzes = []) ?? []
    // quizzes = [{"name":"Testide kysimused vastused pildid","uuid":"bf0d0289-cf0b-449a-bf21-36c7dbdd4977","createdAt":"1664836992002"},{"name":"Piraatlus_vastused_1","uuid":"95b0781d-973b-45fb-b842-0bcc9ada52b7","createdAt":"1664836992088"}]
  }
</script>

{#if quizzes}
  {#if quizzes.length}
    {@const filteredQuizzes = filtered(quizzes, filter)}
    <div class="d-flex flex-column w-100 gap-4">
    <input type="text" class="form-control bg-white mb-3" placeholder="Otsi..." bind:value={filter} />
    {#if filteredQuizzes?.length}
      {#each filteredQuizzes as quiz}
        <QuizRow {quiz}/>
      {/each}
    {:else}
      <Card padding="px-3 py-5">
        <div class="my-5">
          <h1 class="text-center" style="font-size: 4rem"><i class="fa-solid fa-magnifying-glass"></i></h1>
          <p>Testide otsing tagastas tühjuse</p>
        </div>
      </Card>
    {/if}
    </div>
  {:else}
      <Card padding="px-3 py-5">
        <div class="my-5">
          <h1 class="text-center" style="font-size: 4rem"><i class="fa-solid fa-box-open mb-5"></i></h1>
          <p>Testid puuduvad</p>
        </div>
      </Card>
  {/if}
{:else}
  <Spinner/>
{/if}
