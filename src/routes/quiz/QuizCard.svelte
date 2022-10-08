<script lang="ts">
  import Card from '../../common/Card.svelte'
  import {QuizQuestion} from '../../../server/types'
  import QuizImage from '../../common/QuizImage.svelte'

  export let question: QuizQuestion
  export let questionAmount: number
  export let index: number
  let imageError = false
</script>

<Card fullWidth flex="d-flex justify-content-between align-items-center gap-4 gap-lg-5" padding="px-3 px-md-4 px-lg-5 py-4">
  <div class="d-flex justify-content-between w-100 gap-2">
    <span class="lead">{question.question}</span>
    <span class="fw-bolder text-small">{index}&nbsp;/&nbsp;{questionAmount}</span>
  </div>

  <QuizImage image={question.pictureName} />

  <input bind:value={question.studentAnswer} class="form-control" type="text" placeholder="Vastus" required>
</Card>