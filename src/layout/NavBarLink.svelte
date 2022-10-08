<script lang="ts">
  import LinkTo from '../common/LinkTo.svelte'
  import {useLocation} from 'svelte-navigator'

  export let to: string

  const location = useLocation()
  $: active = to && (($location.pathname == '/' && (to == '' || to == '/')) || $location.pathname.startsWith('/' + to))
</script>

<LinkTo class="btn nav-item py-1 px-3 {active ? 'nav-active fw-bolder' : ''}" {to}>
  <slot/>
</LinkTo>

<style>
  :global(.nav-item) {
    box-sizing: border-box;
    transition: border 50ms, height 1s;
    border-bottom: 2px solid transparent;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  :global(.nav-active) {
    border-bottom: 2px solid cornflowerblue;
  }
</style>