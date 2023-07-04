return (
  <a
    target="_blank"
    href={`https://twitter.com/${props.username}`}
    class="text-decoration-none"
  >
    <div class="card">
      <div class="card-body p-4">
        <div class="d-flex text-black">
          <div class="flex-shrink-0">
            <img
              src={props.avatarUrl}
              alt="avatar"
              class="img-fluid rounded-circle"
            />
          </div>
          <div class="flex-grow-1 ms-3">
            <h5 class="mb-1 fw-bold">{props.name}</h5>
            <p class="mb-0">@{props.username}</p>
          </div>
        </div>
      </div>
    </div>
  </a>
);
