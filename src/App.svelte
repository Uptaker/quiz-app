<script lang="ts">
  import {Route, Router} from 'svelte-navigator'
  import NotFoundPage from './common/NotFoundPage.svelte'
  import QuizPage from './routes/quiz/QuizPage.svelte'
  import TestsPage from './routes/tests/TestsPage.svelte'
  import AdminPage from './routes/admin/AdminPage.svelte'
  import LoginPage from './routes/login/LoginPage.svelte'
  import QuizEditPage from './routes/admin/QuizEditPage.svelte'
  import Navbar from './layout/Navbar.svelte'
  import NavBarLink from './layout/NavBarLink.svelte'
  import {SvelteToast} from '@zerodevx/svelte-toast'
  import {isAdmin, logout} from './store/auth'

  function showUnhandledError(e: PromiseRejectionEvent) {
    console.error(e.reason)
    alert('Error, please reload the page:\n\n' + e.reason?.message ?? '')
  }
</script>

<svelte:window on:unhandledrejection={showUnhandledError}/>
<SvelteToast/>

<main class="container mw-100 p-3">
  <Router>
    <nav>
      <Navbar>
        <div class="d-flex flex-column flex-sm-row gap-3">
          <NavBarLink to="/">Testid</NavBarLink>
          {#if $isAdmin}
            <NavBarLink to="admin">Admin</NavBarLink>
          {/if}
        </div>
        {#if $isAdmin}
          <button class="btn" on:click={ async () => await logout()}>Välju&nbsp;&nbsp;<i class="fa-solid fa-right-to-bracket"></i></button>
        {:else}
          <NavBarLink to="/login">Sisene</NavBarLink>
        {/if}
      </Navbar>
    </nav>
    <div>
      <Route path="/" component={TestsPage}/>
      <Route path="login" component={LoginPage}/>
      <Route path="quiz/*">
        <Route path="/">
          <NotFoundPage/>
        </Route>
        <Route path=":id" component={QuizPage}/>
        {#if $isAdmin}
          <Route path=":id/edit" component={QuizEditPage}/>
        {/if}
      </Route>

      {#if $isAdmin}
        <Route path="admin" component={AdminPage}/>
      {/if}
    </div>
    <Route component={NotFoundPage}/>
  </Router>
</main>