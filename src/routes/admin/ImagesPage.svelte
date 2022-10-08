<script lang="ts">
  import Page from '../../common/Page.svelte'
  import ProtectedPageCard from '../../common/ProtectedPageCard.svelte'
  import Card from '../../common/Card.svelte'
  import {onMount} from 'svelte'
  import QuizImage from '../../common/QuizImage.svelte'
  import Spinner from '../../common/Spinner.svelte'
  import {sendToast, ToastType} from '../../toast'

  let images: string[]
  let filter = ''
  let loading = false

  onMount(() => load())

  function filtered(names: string[], filter: string): string[] {
    if (filter) {
      filter = filter.trim().toLowerCase()
      names = names?.filter(name => name.toLowerCase().includes(filter))
    }
    return names
  }

  async function remove(imgToDelete: string) {
    loading = true
    try {
      if (!confirm(`Oled kindel, et soovid kustutada pildi ${imgToDelete}?`)) return
      const response = await fetch('/api/image/' + imgToDelete, {method: 'DELETE'})
      if (response.ok) {
        sendToast(`Pilt ${imgToDelete} kustutatud`)
        images = images.filter(image => image !== imgToDelete)
      } else throw Error('Error response')
    } catch (e) {
      sendToast('Kustutamine ebabõnnestus', ToastType.ERROR)
    } finally {
      loading = false
    }
  }

  async function load() {
    images = await fetch('/api/image').then(r => r.json()).catch(() => []) ?? []
  }

</script>

<Page>
  <ProtectedPageCard transparent>
    {#if images}
      <h3><i class="fa-regular fa-images"></i>&nbsp;&nbsp;Pildid</h3>
      {#if images?.length}
        {@const filteredImages = filtered(images, filter)}

        <div class="mb-5 text-primary">Kokku <span class="fw-bolder">{images.length}</span> pilte</div>
        <input type="text" class="form-control bg-white mb-3" placeholder="Otsi..." bind:value={filter} />

        {#if filteredImages?.length}
          {#each filteredImages as image}
            <div class="card bg-white rounded shadow d-flex flex-row justify-content-between gap-3 w-100 p-3 mb-5">
              <div class="d-flex flex-column justify-content-between gap-3">
                <h3>{image}</h3>
                <button disabled={loading} class="btn btn-danger w-min" on:click={() => remove(image)}>Kustuta</button>
              </div>
              <div>
                <QuizImage {image} maxHeight={150}/>
              </div>
            </div>
          {/each}
        {:else}
          <Card padding="px-3 py-5">
            <div class="my-5">
              <h1 class="text-center" style="font-size: 4rem"><i class="fa-solid fa-magnifying-glass"></i></h1>
              <p>Piltide otsing tagastas tühjuse</p>
            </div>
          </Card>
        {/if}

      {:else}
        <Card padding="px-3 py-5">
          <div class="my-5">
            <h1 class="text-center" style="font-size: 4rem"><i class="fa-solid fa-box-open mb-5"></i></h1>
            <p>Pildid puuduvad</p>
          </div>
        </Card>
      {/if}
    {:else}
      <Spinner/>
    {/if}
  </ProtectedPageCard>
</Page>