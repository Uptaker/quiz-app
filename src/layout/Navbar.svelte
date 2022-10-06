<div class="bg-white outline navbar-light navbar-expand-lg px-3 px-lg-5 mb-5 rounded">
  <nav id="top" class="navbar py-3 d-flex gap-5 gap-md-3 flex-column justify-content-start flex-md-row p-0">
      <a class="navbar-brand text-dark fw-bolder p-0 me-lg-4"><img width="40" src="/media/logo.svg" alt="logo"> <span>Testkeskond</span></a>
      <slot/>
  </nav>
  <slot name="authenticated"/>
</div>