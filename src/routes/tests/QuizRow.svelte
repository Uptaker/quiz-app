<script lang="ts">
  import {isAdmin} from '../../store/auth'
  import {QuizInfo} from '../../../server/types'
  import Card from '../../common/Card.svelte'
  import LinkTo from '../../common/LinkTo.svelte'
  import {formatUuid} from '../../utils'

  export let quiz: QuizInfo
</script>

<Card flex="d-flex flex-row justify-content-between align-items-center gap-3 w-100" padding="px-4 py-3">
  <div>
    <div class="fw-bolder mb-3">{quiz.name}</div>
    <div class="text-small d-inline fw-bolder text-primary me-3">#{formatUuid(quiz.uuid)}</div>

      {#if $isAdmin}
      <LinkTo to="/quiz/{quiz.uuid}/edit" class="btn btn-sm btn-light fw-bolder text-small text-primary">
        <i class="fa-solid fa-pen-to-square"></i>&nbsp;&nbsp;Muuda
      </LinkTo>
    {/if}

  </div>
  <LinkTo to="/quiz/{quiz.uuid}" class="btn btn-lg btn-primary"><i class="fa-solid fa-play"></i>&nbsp;&nbsp; Soorita</LinkTo>
</Card>


