<script lang="ts">
  import {formatBytes, getFileExtension} from '../../utils'
  import {sendToast, ToastType} from '../../toast'
  import {slide} from 'svelte/transition'
  import Spinner from '../../common/Spinner.svelte'
  import Card from '../../common/Card.svelte'


  let files: File[]
  let showExample = false
  let loading = false

  async function handleSubmit() {
    try {
      if (files.length > 0) {
        loading = true
        const formData = new FormData()
        for (const file of files) {
          formData.append('files', file)
        }

        const response = await fetch('/api/quiz', {method: 'POST', body: formData})
        if (response.ok) sendToast('Failid ülesse laetud')
        else sendToast('Tekis süsteemi tõrge. Palun proovige uuesti.', ToastType.ERROR)
      }
    } catch(e) {
        sendToast('Tekis süsteemi tõrge. Palun proovige uuesti.', ToastType.ERROR)
    } finally {
      loading = false
      files = []
    }

  }
</script>

<Card flex="d-flex justify-content-between gap-4 mb-5" padding="px-3 py-4" fullWidth>
  <div class="d-flex justify-content-between">
    <h5>Testid</h5>
    <button
      class="btn btn-light"
      on:click={() => showExample = !showExample}>Näidisfail&nbsp;&nbsp;<i class="fa-solid fa-chevron-{showExample ? 'up' : 'down'}"></i></button>
  </div>

  {#if showExample}
    <div class="w-100" transition:slide|local>
      <p>Fail peab olema järgmise struktuuriga. Veergu nimed on tõstutundlikud</p>
      <p>Võetakse vastu <b>.xlsx</b>, <b>.xls</b> ning <b>.csv</b> faile</p>
      <table class="mt-2 w-100">
        <tr>
          <th colspan="2">KÜSIMUSED</th>
          <th>VASTUSED</th>
          <th class="w-25">PILT</th>
        </tr>
        <tr>
          <td colspan="2">Mis on Lüganuse valla suurim linn?</td>
          <td>Kiviõli</td>
          <td></td>
        </tr>
        <tr>
          <td colspan="2">Eesti kõrgeim mägi on?</td>
          <td>Suur Munamägi</td>
          <td></td>
        </tr>
        <tr>
          <td colspan="2">Millises linnas asub see loss?</td>
          <td>Rakvere</td>
          <td>pilt.jpg</td>
        </tr>
      </table>
    </div>
  {/if}
  <form id="uploadFile" on:submit|preventDefault={handleSubmit}>
    <input class="form-control" bind:files multiple type="file"
           accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
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
        <tr>
          <td>{file.name}</td>
          <td>{formatBytes(file.size)}</td>
          <td>{getFileExtension(file.name)}</td>
        </tr>
      {/each}
    </table>

  {/if}

  {#if files?.length}
    <input disabled={loading} form="uploadFile" class="btn btn-primary w-lg-50 justify" type="submit" value="Lae ülesse"/>
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