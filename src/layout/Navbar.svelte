<div class="card px-3 px-lg-5 mb-5">
  <nav id="top" class="navbar py-3 d-flex gap-5 gap-md-3 p-0">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-center w-100 gap-3">
      <a class="navbar-brand text-dark fw-bolder p-0 me-lg-4"><img width="40" src="/media/logo.svg" alt="logo"> <span class="brand-gradient">Testkeskond</span></a>
      <div class="d-flex align-items-center justify-content-between w-100 gap-3">
        <slot/>
      </div>
    </div>
  </nav>
  <slot name="authenticated"/>
</div>