<script lang="ts">
  import {QuizInfo} from '../../../server/types'
  import Card from '../../common/Card.svelte'

  export let quiz: QuizInfo
</script>

<Card flex="d-flex flex-row justify-content-between align-items-center gap-3" padding="px-4 py-3">
  <div class="fw-bolder">{quiz.name}</div>
  <button class="btn btn-primary">Soorita</button>
</Card>


