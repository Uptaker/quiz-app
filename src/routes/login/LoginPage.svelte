<script lang="ts">
  import Page from '../../common/Page.svelte'
  import PageCard from '../../common/PageCard.svelte'
  import Card from '../../common/Card.svelte'

  async function handleSubmit() {
    // TODO handle login
  }
</script>

<Page>
  <PageCard transparent padding="p-0">
    <Card transparent padding="p-0" class="w-100">
      <div class="w-lg-100">
        <h3 class="text-left w-100 mb-5">Logi sisse</h3>
        <form on:submit|preventDefault={handleSubmit} class="card py-5 px-3 px-sm-5 shadow">
          <label class="w-100 text-start mb-1" for="username">Nimi</label>
          <input class="form-control mb-5" type="text" id="username" required>

          <label class="w-100 text-start mb-1" for="pass">Salasõna</label>
          <input class="form-control mb-3" type="password" id="pass" required>

          <input class="btn btn-lg btn-primary text-large mt-5" type="submit" value="Sisene"/>
        </form>
      </div>
    </Card>
  </PageCard>
</Page>