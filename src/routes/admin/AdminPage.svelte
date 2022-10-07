<script lang="ts">
  import Page from '../../common/Page.svelte'
  import UploadQuestions from './UploadQuestions.svelte'
  import UploadImages from './UploadImages.svelte'
  import ProtectedPageCard from '../../common/ProtectedPageCard.svelte'
</script>

<Page>
  <ProtectedPageCard title="Admin" transparent>
    <UploadQuestions/>
    <UploadImages/>
  </ProtectedPageCard>
</Page>