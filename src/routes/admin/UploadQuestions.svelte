<script lang="ts">
  import {formatBytes, getFileExtension} from "../../utils";


  let files: File[]
  let statusCode = ''

  async function handleSubmit() {
    if (files.length > 0) {
      const formData = new FormData();
      files.forEach(file => {
        formData.append("file", file);
      })
      const response = await fetch("/api/test/upload", {
        method: "POST",
        body: formData
      });
      statusCode = response.status;
    }
  }
</script>

<div class="spaced">
  <form id="uploadForm" on:submit|preventDefault={handleSubmit}>
    <input class="form-control" bind:files multiple type="file"
      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    />
  </form>

  {statusCode}
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