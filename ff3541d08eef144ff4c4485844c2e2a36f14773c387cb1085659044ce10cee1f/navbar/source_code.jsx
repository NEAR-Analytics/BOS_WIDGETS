return (
  <>
    <div class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse btn-group "
          role="group"
          id="navbarSupportedContent"
          aria-label="Basic outlined example"
        >
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">
                <button type="button" class="btn btn-outline-primary">
                  Acerca De
                </button>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <button type="button" class="btn btn-outline-primary">
                  Docomentación
                </button>
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <button type="button" class="btn btn-outline-primary">
                  Github
                </button>
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="#">
                    <button type="button" class="btn btn-outline-primary">
                      Middle
                    </button>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <button type="button" class="btn btn-outline-primary">
                      Left
                    </button>
                  </a>
                </li>

                <li>
                  <a class="dropdown-item" href="#">
                    <button type="button" class="btn btn-outline-primary">
                      Middle
                    </button>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <div class="d-flex">
            <Web3Connect
              className="ConnectButton "
              connectLabel="Connect with Web3"
            />
          </div>
        </div>
      </div>
    </div>
  </>
);
