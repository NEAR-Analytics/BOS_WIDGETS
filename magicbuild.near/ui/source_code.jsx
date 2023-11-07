State.init({
  blockList: [],
  openModalBlock: false,
  clickedModalBlock: false,
  widgetUrl,
  widgetProps,
});
const addBlock = () => {
  const blockList = state.blockList;
  const block = {
    id: Date.now(),
    widget: state.widgetUrl,
    props: state.widgetProps,
  };
  blockList.push(block);
  State.update({ blockList: blockList, openModalBlock: false });
};
const removeBlock = (index) => {
  const blockList = state.blockList;
  blockList.splice(index, 1);
  State.update({ blockList: blockList });
};
const openModalBlock = (e, type) => {
  if (type == "show") {
    State.update({ openModalBlock: true, clicked: false });
  }
  if (type == "close") {
    State.update({ openModalBlock: false });
  }
};
const onInputChangeWidgetUrl = (e) => {
  State.update({ widgetUrl: e.target.value });
};
const onInputChangeWidgetProps = (e) => {
  State.update({ widgetPropst: e.target.value });
};
return (
  <div class="container ">
    {state.openModalBlock && (
      <>
        <div
          style={{ display: "block" }}
          className={`modal fade show`}
          id="createClient"
          tabindex="-1"
          aria-labelledby="createClientLabel"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="createClientLabel">
                  Choose Block
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  onClick={(e) => openModalBlock(e, "close")}
                ></button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label>Widget Url:</label>
                  <input
                    class="form-control"
                    value={state.widgetUrl}
                    onChange={(e) => onInputChangeWidgetUrl(e)}
                  />
                </div>
                <div class="form-group">
                  <label>Props:</label>
                  <input
                    class="form-control"
                    value={state.widgetProps}
                    onChange={(e) => onInputChangeWidgetProps(e)}
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  onClick={(e) => openModalBlock(e, "close")}
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={addBlock}
                  class="btn btn-primary"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-backdrop fade show"></div>
      </>
    )}
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
                      <span class="text-info">{block.url}</span>
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
                <Widget src={widget.url} props={widget.props} />
              </div>
            ))}
        </div>
        <button
          type="button"
          onClick={(e) => openModalBlock(e, "show")}
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
