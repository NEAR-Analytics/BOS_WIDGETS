return (
  <>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <a href="#" class="nav-link" aria-current="page">
          <i class="bi bi-house-fill me-1" />
          Home
        </a>
      </li>
      <li>
        <a
          href="#"
          class="nav-link link-dark"
          data-bs-toggle="collapse"
          data-bs-target="#home-collapse"
          aria-expanded="false"
        >
          <i class="bi bi-chat-left-heart-fill me-1" />
          Discussions
        </a>
        <div class="collapse" id="home-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 ps-1 small">
            <li>
              <a href="#" class="nav-link link-dark">
                Overview
              </a>
            </li>
            <li>
              <a href="#" class="nav-link link-dark">
                Updates
              </a>
            </li>
            <li>
              <a href="#" class="nav-link link-dark">
                Reports
              </a>
            </li>
          </ul>
        </div>
      </li>
      <li>
        <a href="#" class="nav-link link-dark">
          <i class="bi bi-calendar-date-fill me-1" />
          Events
        </a>
      </li>
    </ul>
  </>
);
