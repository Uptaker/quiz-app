<script lang="ts">
  import LinkTo from '../common/LinkTo.svelte'
  import {useLocation} from 'svelte-navigator'

  export let to: string

  const location = useLocation()
  $: active = to && (($location.pathname == '/' && (to == '' || to == '/')) || $location.pathname.startsWith('/' + to))
</script>

<LinkTo class="btn py-1 px-3 {active ? 'nav-active fw-bolder' : ''}" {to}>
  <slot/>
</LinkTo>

<style>
  :global(.nav-active) {
    border-bottom: 2px solid cornflowerblue;
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
</style>