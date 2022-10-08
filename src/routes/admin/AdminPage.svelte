<script lang="ts">
  import Page from '../../common/Page.svelte'
  import UploadQuestions from './UploadQuestions.svelte'
  import UploadImages from './UploadImages.svelte'
  import ProtectedPageCard from '../../common/ProtectedPageCard.svelte'
</script>

<Page>
  <ProtectedPageCard transparent>
    <h3 class="mb-4 mx-auto">Lae ülesse</h3>
    <UploadQuestions/>
    <UploadImages/>
  </ProtectedPageCard>
</Page>