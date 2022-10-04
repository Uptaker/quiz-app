<script lang="ts">
  import {QuizInfo} from '../../../server/types'
  import Card from '../../common/Card.svelte'
  import LinkTo from '../../common/LinkTo.svelte'
  import {formatUuid} from '../../utils'


  export let quiz: QuizInfo
</script>

<Card flex="d-flex flex-row justify-content-between align-items-center gap-3 w-100" padding="px-4 py-3">
  <div>
    <div class="fw-bolder mb-3">{quiz.name}</div>
    <div class="text-small fw-bolder text-primary">#{formatUuid(quiz.uuid)}</div>
  </div>
  <LinkTo to="/quiz/{quiz.uuid}" class="btn btn-lg btn-primary">Soorita</LinkTo>
<!--  <div class="mt-2 text-small">{formatUuid(quiz.uuid)}</div> TODO include ID? -->
</Card>


