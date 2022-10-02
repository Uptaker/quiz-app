<script lang="ts">
  import PageCard from "../../common/PageCard.svelte";
  export let id: string
</script>

<PageCard title="Quiz{id ? ` ${id}` : ''}">
  <p>Quiz page!</p>
</PageCard>