<script lang="ts">
  import PageCard from './PageCard.svelte'
  import LinkTo from './LinkTo.svelte'
</script>

<PageCard title="Lehte ei leitud" padding="p-5">
  <div class="d-flex flex-column gap-5 align-items-center py-5">
    <h1 style="font-size: 6rem"><i class="fa-regular fa-face-frown"></i></h1>
    <div>
      <p>Kahjuks me ei leidnud otsitavat lehte.</p>
      <p>Palun proovige uuesti või alustage <LinkTo to="/">avalehelt</LinkTo></p>
    </div>
  </div>

</PageCard>