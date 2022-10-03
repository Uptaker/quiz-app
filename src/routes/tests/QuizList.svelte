<script lang="ts">
  import {QuizInfo} from '../../../server/types'
  import QuizRow from './QuizRow.svelte'
  import {onMount} from 'svelte'
  import Card from '../../common/Card.svelte'

  let quizzes: QuizInfo[]

  onMount(() => load())

  async function load() {
    quizzes = await fetch('/api/quiz', {
      headers: {
        'Accept': 'application/json'
      }
    }).then(res => res.json()).catch((e) => quizzes = []) ?? []
  }
</script>

{#if quizzes?.length}
  {#each quizzes as quiz}
    <QuizRow {quiz}/>
  {/each}
{:else}
  <Card padding="p-3">
      <h1><i class="fa-solid fa-box-open"></i></h1>
      <p>Testid puuduvad</p>
  </Card>
{/if}
