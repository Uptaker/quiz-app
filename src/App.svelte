<script lang="ts">
  import {Route, Router} from 'svelte-navigator'
  import NotFoundPage from './common/NotFoundPage.svelte'
  import QuizPage from './routes/quiz/QuizPage.svelte'
  import TestsPage from './routes/tests/TestsPage.svelte'
  import AdminPage from './routes/admin/AdminPage.svelte'
  import QuizEditPage from './routes/admin/QuizEditPage.svelte'
  import Navbar from './layout/Navbar.svelte'
  import NavBarLink from './layout/NavBarLink.svelte'
  import {SvelteToast} from '@zerodevx/svelte-toast'

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
        <NavBarLink to="/">Testid</NavBarLink>
        <NavBarLink to="admin">Admin</NavBarLink>
      </Navbar>
    </nav>
    <div>
      <Route path="/" component={TestsPage}/>
      <Route path="admin" component={AdminPage}/>
      <Route path="quiz/*">
        <Route path="/">
          <NotFoundPage/>
        </Route>
        <Route path=":id" component={QuizPage}/>
        <Route path=":id/edit" component={QuizEditPage}/>
      </Route>
    </div>
    <Route component={NotFoundPage}/>
  </Router>
</main>