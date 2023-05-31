return (
  <div class="card border-secondary">
    <div class="nav navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item ">
            <a class="nav-link active" href="Guide">
              <i class="bi-balloon-heart"> </i>
              Events
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="Widgets">
              <i class="bi-gear"> </i>
              Widgets
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link active" href="Projects">
              <i class="bi-clipboard"> </i>
              Projects
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link active" href="">
              <i class="bi-patch-check"> </i>
              Badges
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link active" href="Teams">
              <i class="bi-signpost-2"> </i>
              Groups
            </a>
          </li>
        </ul>
      </div>
      <a
        key="edit"
        href={"#/devs.near/widget/dev.menu.config"}
        className="position-absolute top-0 end-0 link-secondary m-3"
      >
        <i class="bi bi-wrench-adjustable" /> Edit Menu
      </a>
    </div>
  </div>
);
