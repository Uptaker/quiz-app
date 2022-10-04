<script lang="ts">
  import {QuizInfo} from '../../../server/types'
  import QuizRow from './QuizRow.svelte'
  import {onMount} from 'svelte'
  import Card from '../../common/Card.svelte'
  import {formatUuid} from '../../utils'

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
      headers: {'Accept': 'application/json'}
    }).then(res => res.json()).catch(() => quizzes = []) ?? []
  }
</script>

{#if quizzes?.length}
  {@const filteredQuizzes = filtered(quizzes, filter)}

  <div class="d-flex flex-column w-100 gap-4">
    <input type="text" class="form-control bg-white" placeholder="Otsi..." bind:value={filter} />
  {#if filteredQuizzes?.length}
    {#each filteredQuizzes as quiz}
      <QuizRow {quiz}/>
    {/each}
  {:else}
    <Card padding="p-3">
      <h1><i class="fa-solid fa-magnifying-glass"></i></h1>
      <p>Otsing tagastas tühjuse</p>
    </Card>
  {/if}

  </div>

{:else}
  <Card padding="p-3">
      <h1><i class="fa-solid fa-box-open"></i></h1>
      <p>Testid puuduvad</p>
  </Card>
{/if}
