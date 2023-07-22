return (
  <div class="navbar navbar-dark navbar-expand-lg bg-dark px-3">
    <a
      class="navbar-brand text-white"
      style={{ fontWeight: 700, textTransform: "uppercase" }}
    >
      <img
        src="https://www.knwtechs.com/_next/static/media/knw.39a87d22.png"
        width="40"
        height="40"
        class="d-inline-block align-top"
        alt="KNW Technologies FZCO"
      />
      {APP_TITLE}
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a
            class="nav-link text-light text-capitalize"
            style={{ fontWeight: 700 }}
            href="#"
          >
            Create
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link text-light text-capitalize"
            style={{ fontWeight: 700 }}
            href="#"
          >
            Manage
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link text-white"
            style={{ fontWeight: 700 }}
            href="#"
            tabindex="-1"
          >
            View
          </a>
        </li>
      </ul>
    </div>
    <div class="d-flex justify-content-between">
      {state.balance && <a class="nav-link text-white">{state.balance} Ξ</a>}
      <Web3Connect connectLabel="Connect with Web3" />
    </div>
  </div>
);
