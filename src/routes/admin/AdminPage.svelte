<script lang="ts">
  import Page from '../../common/Page.svelte'
  import PageCard from '../../common/PageCard.svelte'
  import UploadQuestions from './UploadQuestions.svelte'
  import UploadImages from './UploadImages.svelte'
</script>

<Page>
  <PageCard title="Admin" transparent>
    <UploadQuestions/>
    <UploadImages/>
  </PageCard>
</Page>