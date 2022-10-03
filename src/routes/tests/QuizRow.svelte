<script lang="ts">
  import {QuizInfo} from '../../../server/types'
  import Card from '../../common/Card.svelte'
  import LinkTo from '../../common/LinkTo.svelte'


  export let quiz: QuizInfo
</script>

<Card flex="d-flex flex-row justify-content-between align-items-center gap-3" padding="px-4 py-3">
  <div class="fw-bolder">{quiz.name}</div>
  <LinkTo to="/quiz/{quiz.uuid}" class="btn btn-primary">Soorita</LinkTo>
<!--  <div class="mt-2 text-small">{formatUuid(quiz.uuid)}</div> TODO include ID? -->

</Card>


