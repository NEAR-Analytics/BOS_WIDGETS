return (
  <>
    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="pills-trending-now-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-trending-now"
          type="button"
          role="tab"
          aria-controls="pills-trending-now"
          aria-selected="true"
        >
          Now
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="pills-trending-3days-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-trending-3days"
          type="button"
          role="tab"
          aria-controls="pills-trending-3days"
          aria-selected="false"
        >
          3 Days
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="pills-trending-7days-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-trending-7days"
          type="button"
          role="tab"
          aria-controls="pills-trending-7days"
          aria-selected="false"
        >
          7 Days
        </button>
      </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
      <div
        class="tab-pane fade show active"
        id="pills-trending-now"
        role="tabpanel"
        aria-labelledby="pills-trending-now-tab"
      >
        <Widget src={`kurodenjiro.near/widget/trending1days`} />
      </div>
      <div
        class="tab-pane fade"
        id="pills-trending-3days"
        role="tabpanel"
        aria-labelledby="pills-trending-3days-tab"
      >
        <Widget src={`kurodenjiro.near/widget/trending3days`} />
      </div>
      <div
        class="tab-pane fade"
        id="pills-trending-7days"
        role="tabpanel"
        aria-labelledby="pills-trending-7days-tab"
      >
        <Widget src={`kurodenjiro.near/widget/trending7days`} />
      </div>
    </div>
  </>
);
