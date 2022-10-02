<script lang="ts">
  import {Link} from 'svelte-navigator'

  export let to: string
</script>

<Link class="{$$props.class}" {to}><slot/></Link>