State.init({ blockList: [] });
const addBlock = () => {
  const blockList = state.blockList;
  const block = { id: Date.now(), widget: "", props: {} };
  blockList.push(block);
  State.update({ blockList: blockList });
};
const removeBlock = (index) => {
  const blockList = state.blockList;
  blockList.splice(index, 1);
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
                  id="block-list-tab-home"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-block-list"
                  type="button"
                  role="tab"
                  aria-controls="pills-block-list"
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
                  data-bs-target="#pills-layout-list"
                  type="button"
                  role="tab"
                  aria-controls="pills-layout-list"
                  aria-selected="true"
                >
                  Layout
                </span>
              </li>
            </ul>

            <div class="tab-content">
              <div
                class="tab-pane fade show active "
                id={`pills-block-list`}
                role="tabpanel"
                aria-labelledby={`pills-tab-block-list`}
                tabindex="0"
              >
                1
              </div>
              <div
                class="tab-pane fade "
                id={`pills-layout-list`}
                role="tabpanel"
                aria-labelledby={`pills-tab-layout-list`}
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
              <div class="row border rounded p-3 border-2 m-2 ">
                <div class="row pb-2">
                  <div class="col-sm-11 ">
                    <h6>
                      {functions.name}
                      <span class="text-info">{"widget url"}</span>
                    </h6>
                  </div>
                  <div class="col-sm-1 ">
                    <button
                      type="button"
                      onClick={(e) => removeBlock(index)}
                      class="btn-close"
                    ></button>
                  </div>
                </div>
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
          class="btn btn-outline-primary btn-lg btn-block"
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
