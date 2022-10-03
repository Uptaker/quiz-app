<script lang="ts">
  import PageCard from '../../common/PageCard.svelte'
  import {formatUuid} from '../../utils'

  export let id: string
</script>

<PageCard title="Quiz{ id ? ` #${formatUuid(id)}` : ''}">
  <p>Quiz page!</p>
</PageCard>