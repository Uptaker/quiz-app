<script lang="ts">
  import Card from '../../common/Card.svelte'
  import Pie from '../../common/chart/Pie.svelte'
  import {QuizQuestion} from '../../../server/types'

  export let questions: QuizQuestion[]
  export let correctAmount: number

  $: percent = Math.floor(correctAmount / questions.length * 100 * 100) / 100
</script>

<Card innerTitle="Tulemus" flex="">
  {#if percent >= 0}
    <div class="d-flex justify-content-around align-items-center">
      <Pie size={200} {percent} />
      <div>
        <ul class="lead">
          <li>Õige: <b style="font-weight: bold !important;">{correctAmount}&nbsp;/&nbsp;{questions.length}</b></li>
          <br>
          <li>Tulemus: <b style="font-weight: bold !important;">{percent}%</b></li>
        </ul>
      </div>
    </div>
  {/if}
</Card>