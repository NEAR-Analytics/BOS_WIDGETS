State.init({ blockList: [] });
const addBlock = () => {
  const blockList = state.blockList;
  const block = { id: Date.now(), widget: "", props: {} };
  blockList.push(block);
  State.update({ blockList: blockList });
};
return (
  <div class="container ">
    <div class="row mb-3">
      <div class="form-group col-md-3 ">
        <div class="card">
          <div class="card-header">Block</div>
          <div class="card-body">
            <ul class="nav nav-tabs" role="tablistBlock">
              <li class="nav-item" role="presentation">
                <span
                  class="nav-link px-3 active"
                  id="block-tab-home"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-block"
                  type="button"
                  role="tab"
                  aria-controls="pills-block"
                  aria-selected="true"
                >
                  Block
                </span>
              </li>
              <li class="nav-item" role="presentation">
                <span
                  class="nav-link px-3 "
                  id="layout-tab-home"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-layout"
                  type="button"
                  role="tab"
                  aria-controls="pills-layout"
                  aria-selected="true"
                >
                  Layout
                </span>
              </li>
            </ul>

            <div class="tab-content">
              <div
                class="tab-pane fade show active "
                id={`pills-block-ui`}
                role="tabpanel"
                aria-labelledby={`pills-tab-block-ui`}
                tabindex="0"
              >
                1
              </div>
              <div
                class="tab-pane fade "
                id={`pills-layout`}
                role="tabpanel"
                aria-labelledby={`pills-tab-layout`}
                tabindex="0"
              >
                2
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group col-md-7 border rounded p-3 border-2">
        <div>
          {state.blockList &&
            state.blockList.map((block, index) => (
              <div class="row">
                <Widget
                  src={`magicbuild.near/widget/preview-button`}
                  props={state}
                />
                {"<Widget src={`${block.url}`} props={block.props} /> "}
              </div>
            ))}
        </div>
        <button
          type="button"
          onClick={addBlock}
          class="btn btn-outline-primary btn-lg  w-100"
        >
          Add Block +
        </button>
      </div>
      <div class="form-group col-md-2 ">
        <div class="card">
          <div class="card-header">Edit</div>
          <div class="card-body"></div>
        </div>
      </div>
    </div>
  </div>
);
