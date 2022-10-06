<script lang="ts">
  import Card from '../../common/Card.svelte'
  import Pie from '../../common/chart/Pie.svelte'
  import {QuizQuestion} from '../../../server/types'

  export let questions: QuizQuestion[]
  export let correctAmount: number

  $: percent = Math.floor(correctAmount / questions.length * 100 * 100) / 100
</script>

<Card fullWidth flex="">
  {#if percent >= 0}
    <div class="d-flex justify-content-around align-items-center py-5">
      <Pie size={150} {percent} />
      <div class="font-large d-flex flex-column justify-content-around align-items-center gap-3">
        <div class="d-flex justify-content-center gap-5 w-100">
          <div class="text-green fw-bolder">Õige</div><div class="result-pill q-correct-val">{correctAmount}</div>
        </div>
        <div class="d-flex justify-content-center gap-5 w-100">
          <div class="text-red fw-bolder">Vale</div><div class="result-pill q-incorrect-val">{questions.length - correctAmount}</div>
        </div>
        <div class="mt-3 fw-bolder"><span class="text-secondary">Tulemus</span>&nbsp;&nbsp;<b class="font-larger">{percent}%</b></div>
      </div>
    </div>
  {/if}
</Card>

<style>
  .font-large {
    font-size: large;
  }

  .font-larger {
    font-size: xx-large;
  }

  .text-green {
    color: darkseagreen !important;
  }

  .text-red {
    color: indianred !important;

  }

  .result-pill {
    padding: 1px 11px !important;
    border-radius: 10px;
    font-weight: bold;
  }
</style>