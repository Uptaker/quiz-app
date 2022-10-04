<script lang="ts">
  import PageCard from './PageCard.svelte'
  import LinkTo from './LinkTo.svelte'
</script>

<PageCard title="Lehte ei leitud">
  <p>Kahjuks me ei leidnud otsitavat lehte.</p>
  <p>Palun proovige uuesti või alustage <LinkTo to="/">avalehelt</LinkTo></p>
</PageCard>