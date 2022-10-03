<script lang="ts">
  import {QuizInfo} from '../../../server/types'
  import QuizRow from './QuizRow.svelte'
  import {onMount} from 'svelte'

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
<!--{:else}-->
<!--  <Card>Testid puuduvad</Card>-->
{/if}
