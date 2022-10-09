<script lang="ts">
  import {formatBytes, getFileExtension} from '../../utils'
  import {sendToast, ToastType} from '../../toast'
  import Spinner from '../../common/Spinner.svelte'
  import Card from '../../common/Card.svelte'
  import {slide} from 'svelte/transition'


  let files: File[]
  let loading = false
  let duplicates: string[] = []

  async function upload() {
    try {
      loading = true
      const formData = new FormData()
      for (const file of files) formData.append('files', file)
      const response = await fetch('/api/image', {method: 'POST', body: formData})
      if (response.ok) {
        duplicates = []
        sendToast('Pildid ülesse laetud')
      }
      else throw Error('Failed up upload')
    } catch (e) {
        sendToast('Tekis süsteemi tõrge. Palun proovige uuesti.', ToastType.ERROR)
    } finally {
      loading = false
      files = null
    }
  }

  async function handleSubmit() {
    duplicates = []
    if (files.length > 0) {
      loading = true
      let fileNames: string[] = []
      for (let i = 0; i < files.length; i++) fileNames.push(files[i].name.toLowerCase())

      const allImages: string[] = await fetch('/api/image').then(r => r.json()).catch(() => []) ?? []
      duplicates = fileNames.filter(name => allImages.includes(name))
      if (duplicates?.length) {
        loading = false
        return sendToast("Leitud pildid, mis on juba olemas<br><br>Pildid peavad olema unikaalse nimega", ToastType.ERROR)
      }
      await upload()
      loading = false
      files = null
    }
  }
</script>

<Card flex="d-flex justify-content-between gap-4 mb-5" padding="px-3 py-4" fullWidth innerTitle="Pildid">
  <form id="uploadImage" on:submit|preventDefault={handleSubmit}>
    <input class="form-control" bind:files multiple type="file"
           accept="image/png, image/gif, image/jpeg"
    />
  </form>

  {#if files?.length}
    <table>
      <tr>
        <th>Nimi</th>
        <th>Suurus</th>
        <th>Tüüp</th>
      </tr>
      {#each Array.from(files) as file}
        {@const alreadyExists = duplicates?.includes(file.name)}
        <tr class:q-incorrect-val={alreadyExists}>
          <td class:text-danger={alreadyExists}>{file.name}</td>
          <td class:text-danger={alreadyExists}>{formatBytes(file.size)}</td>
          <td class:text-danger={alreadyExists}>{getFileExtension(file.name)}</td>
        </tr>
      {/each}
    </table>
  {/if}

  {#if files?.length}
    <input disabled={loading} form="uploadImage" class="btn btn-light w-lg-50 justify" type="submit" value="Lae ülesse" transition:slide/>
    {#if duplicates?.length}
      <button disabled={loading} class="btn btn-danger w-lg-50 justify" transition:slide
              on:click={() => {if ('Oled kindel, et soovid siiski üle kirjutada faild, mis on juba olemas?') upload() }}>
        Lae ülesse ja kirjuta üle
      </button>
    {/if}
    {#if loading}
      <Spinner/>
    {/if}
  {/if}
</Card>

<style>
  table, th, td {
    border: 1px solid #dde2e5;
  }

  table {
    border-collapse: collapse;
    border-radius: 1em;
    overflow: hidden;

  }
</style>