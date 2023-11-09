State.init({
  blockList: [],
  openModalBlock: false,
  clickedModalBlock: false,
  widgetUrl,
  widgetProps,
  exportList,
});
const addBlock = (widgetUrl, widgetProps) => {
  const blockList = state.blockList;
  const block = {
    id: Date.now(),
    widgetUrl: widgetUrl,
    props: widgetProps || {},
  };
  blockList.push(block);
  State.update({ blockList: blockList, openModalBlock: false });
};
const selectWidget = (e, widgetUrl) => {
  console.log(e.detail);
  switch (e.detail) {
    case 1:
      break;
    case 2:
      addBlock(widgetUrl, {});
      break;
  }
};
const loadWidgetList = () => {
  const exportListData = Social.get(
    `${context.accountId}/magicbuild/widgetList`
  );
  if (exportListData) {
    const exportList = JSON.parse(exportListData);
    State.update({ exportList: exportList });
  }
};

loadWidgetList();
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
          id="addBlock"
          tabindex="-1"
          aria-labelledby="addBlockLabel"
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="addBlockLabel">
                  Choose Block
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  onClick={(e) => openModalBlock(e, "close")}
                ></button>
              </div>
              <div class="modal-body">
                <ul class="nav nav-tabs" role="tablistBlock">
                  <li class="nav-item" role="presentation">
                    <span
                      class="nav-link px-3 active"
                      id="block-list-tab"
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
                      id="layout-tab"
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
                  <li class="nav-item" role="presentation">
                    <span
                      class="nav-link px-3"
                      id="export-list-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-export-list"
                      type="button"
                      role="tab"
                      aria-controls="pills-export-list"
                      aria-selected="true"
                    >
                      Your Exported
                    </span>
                  </li>
                  <li class="nav-item" role="presentation">
                    <span
                      class="nav-link px-3"
                      id="export-self-customize-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-self-customize-list"
                      type="button"
                      role="tab"
                      aria-controls="pills-self-customize-list"
                      aria-selected="true"
                    >
                      Self-customize
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
                  ></div>
                  <div
                    class="tab-pane fade  "
                    id={`pills-export-list`}
                    role="tabpanel"
                    aria-labelledby={`pills-export-list`}
                    tabindex="0"
                  >
                    <div
                      class="row m-3 overflow-auto "
                      style={{ height: "600px" }}
                    >
                      {state.exportList &&
                        state.exportList.map((widget, index) => (
                          <div class="col m-2">
                            <div
                              class="card p-2"
                              style={{ width: "130px" }}
                              onClick={(e) =>
                                selectWidget(
                                  e,
                                  `${context.accountId}/widget/${widget.widgetName}`
                                )
                              }
                            >
                              <img
                                src="https://ipfs.near.social/ipfs/bafkreido7gsk4dlb63z3s5yirkkgrjs2nmyar5bxyet66chakt2h5jve6e"
                                class="card-img-top"
                                alt="..."
                              />
                              <div class="card-body p-0">
                                <span
                                  class="card-text  d-inline-block text-truncate "
                                  style={{
                                    maxWidth: "120px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {widget.widgetName}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div
                    class="tab-pane fade "
                    id={`pills-self-customize-list`}
                    role="tabpanel"
                    aria-labelledby={`pills-tab-self-customize-list`}
                    tabindex="0"
                  >
                    <div class="row m-3">
                      <div class="form-group col-md-12 ">
                        <div class="card mb-2">
                          <div class="card-header">Block</div>
                          <div class="card-body">
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
                        </div>
                        <div class="card">
                          <div class="card-header" id="headingOne">
                            <h5 class="mb-0">
                              <button class="btn btn-link">Preview</button>
                            </h5>
                          </div>

                          <div id="collapseOne" class="collapse show">
                            <div class="card-body">
                              {state.widgetUrl ? (
                                <Widget
                                  src={state.widgetUrl}
                                  props={state.props || null}
                                />
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                        <div class="text-mute pt-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              addBlock(state.widgetUrl, state.widgetProps);
                            }}
                            class="btn btn-primary"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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
                      <span class="text-info">{block.widgetUrl}</span>
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
                <Widget src={block.widgetUrl} props={block.props} />
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
