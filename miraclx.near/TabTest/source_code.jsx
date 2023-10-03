State.init({
  view: "tab1",
});

return (
  <>
    <ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="tab1-tab"
          data-bs-toggle="tab"
          data-bs-target="#tab1"
          type="button"
          role="tab"
          aria-controls="tab1"
          aria-selected={state.view == "tab1"}
          onClick={() => State.update({ view: "tab1" })}
        >
          Tab 1
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="tab2-tab"
          data-bs-toggle="tab"
          data-bs-target="#tab2"
          type="button"
          role="tab"
          aria-controls="tab2"
          aria-selected={state.view == "tab2"}
          onClick={() => State.update({ view: "tab2" })}
        >
          Tab 2
        </button>
      </li>
    </ul>
    <div class="tab-content text-center" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="tab1"
        role="tabpanel"
        aria-labelledby="tab1-tab"
      >
        Tab 1 Content
      </div>
      <div
        class="tab-pane fade"
        id="tab2"
        role="tabpanel"
        aria-labelledby="tab2-tab"
      >
        Tab 2 Content
      </div>
    </div>
  </>
);
