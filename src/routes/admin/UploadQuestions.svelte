<script lang="ts">
  import {formatBytes, getFileExtension} from '../../utils'
  import {sendToast, ToastType} from '../../toast'


  let files: File[]
  let statusCode: number

  async function handleSubmit() {
    if (files.length > 0) {
      const formData = new FormData()
      for (const file of files) {
        formData.append('files', file)
      }
      const response = await fetch('/api/quiz/upload', {
        method: 'POST',
        body: formData,
      })
      if (response.ok) sendToast('Failid ülesse laetud')
      else sendToast('Tekis süsteemi tõrge. Palun proovige uuesti.', ToastType.ERROR)
    }
  }
</script>

<div class="spaced">
  <form id="uploadForm" on:submit|preventDefault={handleSubmit}>
    <input class="form-control" bind:files multiple type="file"
           accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    />
  </form>

  {statusCode ? statusCode : ''}
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
    <input form="uploadForm" class="btn bg-light w-lg-50 justify" type="submit" value="Lae ülesse"/>
  {/if}
</div>