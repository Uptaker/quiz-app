<script lang="ts">
  import LinkTo from '../common/LinkTo.svelte'
  import {useLocation} from 'svelte-navigator'

  export let to: string

  const location = useLocation()
  $: active = to && (($location.pathname == '/' && (to == '' || to == '/')) || $location.pathname.startsWith('/' + to))
</script>

<LinkTo class="nav-item py-1 px-3 {active ? 'nav-active' : ''}" {to}>
  <slot/>
</LinkTo>

<style>
  :global(.nav-item) {
    color: dimgray;
    text-decoration: none;
    box-sizing: border-box;
    transition: border 50ms, height 1s;
    border-bottom: 2px solid transparent;
  }

  :global(.nav-active) {
    border-bottom: 2px solid cornflowerblue;
    font-weight: bold;
  }

  :global(.nav-item):hover {
    border-bottom: 2px solid gray;
    color: gray
  }


</style>