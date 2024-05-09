State.init({
  blockList: {},
  openModalBlock: false,
  clickedModalBlock: false,
});

const selectWidget = props.selectWidget ?? (() => {});

const loadData = () => {
  const widgetListGet = Social.get(
    `${context.accountId}/magicbuild/widgetList`
  );
  if (widgetListGet) {
    const widgetList = JSON.parse(widgetListGet);
    const widgetLogo = {};
    for (const widget of widgetList) {
      const logoWidgets = Social.get(
        `${context.accountId}/widget/${widget.widgetName}/metadata/image/ipfs_cid`
      );
      const widgetName = widget.widgetName;
      if (logoWidgets) Object.assign(widgetLogo, { [widgetName]: logoWidgets });
    }
    State.update({ widgetLogo: widgetLogo });
    State.update({ clientList: clientListData });
  }

  const blockWidgetPattern = {
    stack: {
      widgetName: "Stack",
      widgetUrl: "magicbuild.near/widget/ui-stack",
      props: {},
      type: "block",
    },
  };
  State.update({ blockWidgetPattern: blockWidgetPattern });
};
loadData();

const addBlock = (widgetUrl, widgetProps) => {
  const id = Date.now();
  const block = {
    [id]: {
      widgetUrl: widgetUrl,
      props: widgetProps || {},
      type: "block",
    },
  };
  State.update({ openModalBlock: false });
};
const openModalBlock = (e, type) => {
  if (type == "show") {
    State.update({ openModalBlock: true, clicked: false });
  }
  if (type == "close") {
    State.update({ selectBlock: null, selectPositionBlock: null });
    State.update({ openModalBlock: false });
  }
};

const selectLayout = (layoutType) => {
  const id = Date.now();
  const block = {
    [id]: { layoutType: layoutType, type: "layout" },
  };
  State.update({ openModalBlock: false });
};

return (
  <>
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
                  {!state.selectBlock && (
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
                  )}
                  <li class="nav-item" role="presentation">
                    <span
                      class="nav-link px-3 active "
                      id="block-list-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-block-list"
                      type="button"
                      role="tab"
                      aria-controls="pills-block-list-label"
                      aria-selected="true"
                    >
                      Block
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
                      Import Widget
                    </span>
                  </li>
                </ul>

                <div class="tab-content">
                  <div
                    class="tab-pane fade "
                    id={`pills-layout-list`}
                    role="tabpanel"
                    aria-labelledby={`pills-tab-layout-list`}
                    tabindex="0"
                  >
                    <div class="row m-3 overflow-auto ">
                      <div class="col m-2">
                        {state.blockData}
                        <div
                          class="card p-2 align-items-center"
                          style={{ width: "130px" }}
                          onClick={(e) => selectLayout("50-50")}
                        >
                          <svg
                            width="48"
                            height="48"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H25V34H39ZM23 34H9V14H23V34Z"
                            ></path>
                          </svg>
                          <div class="card-body p-0">
                            <span
                              class="card-text  d-inline-block text-truncate "
                              style={{
                                maxWidth: "120px",
                                fontWeight: "bold",
                              }}
                            >
                              50/50
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="col m-2">
                        <div
                          class="card p-2 align-items-center"
                          style={{ width: "130px" }}
                          onClick={(e) => selectLayout("33-66")}
                        >
                          <svg
                            width="48"
                            height="48"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H20V34H39ZM18 34H9V14H18V34Z"
                            ></path>
                          </svg>
                          <div class="card-body p-0">
                            <span
                              class="card-text  d-inline-block text-truncate "
                              style={{
                                maxWidth: "120px",
                                fontWeight: "bold",
                              }}
                            >
                              33/66
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="col m-2 ">
                        <div
                          class="card p-2 align-items-center"
                          style={{ width: "130px" }}
                          onClick={(e) => selectLayout("66-33")}
                        >
                          <svg
                            width="48"
                            height="48"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H30V34H39ZM28 34H9V14H28V34Z"
                            ></path>
                          </svg>
                          <div class="card-body p-0">
                            <span
                              class="card-text  d-inline-block text-truncate "
                              style={{
                                maxWidth: "120px",
                                fontWeight: "bold",
                              }}
                            >
                              66/33
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="col m-2 ">
                        <div
                          class="card p-2 align-items-center"
                          style={{ width: "130px" }}
                          onClick={(e) => selectLayout("33-33-33")}
                        >
                          <svg
                            width="48"
                            height="48"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM28.5 34h-9V14h9v20zm2 0V14H39v20h-8.5zm-13 0H9V14h8.5v20z"
                            ></path>
                          </svg>
                          <div class="card-body p-0">
                            <span
                              class="card-text  d-inline-block text-truncate "
                              style={{
                                maxWidth: "120px",
                                fontWeight: "bold",
                              }}
                            >
                              33/33/33
                            </span>
                          </div>
                        </div>
                      </div>

                      <div class="col m-2 ">
                        <div
                          class="card p-2 align-items-center"
                          style={{ width: "130px" }}
                          onClick={(e) => selectLayout("25-50-25")}
                        >
                          <svg
                            width="48"
                            height="48"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM31 34H17V14h14v20zm2 0V14h6v20h-6zm-18 0H9V14h6v20z"
                            ></path>
                          </svg>
                          <div class="card-body p-0">
                            <span
                              class="card-text  d-inline-block text-truncate "
                              style={{
                                maxWidth: "120px",
                                fontWeight: "bold",
                              }}
                            >
                              25/50/25
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                              class="card p-2 align-items-center"
                              style={{ width: "130px", height: "180px" }}
                              onClick={(e) => {
                                selectWidget(
                                  `${context.accountId}/widget/${widget.widgetName}`
                                );
                              }}
                            >
                              <img
                                src={
                                  state.widgetLogo[widget.widgetName]
                                    ? `https://ipfs.near.social/ipfs/${
                                        state.widgetLogo[widget.widgetName]
                                      }`
                                    : "https://ipfs.near.social/ipfs/bafkreido7gsk4dlb63z3s5yirkkgrjs2nmyar5bxyet66chakt2h5jve6e"
                                }
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
                    class="tab-pane fade show active"
                    id={`pills-block-list`}
                    role="tabpanel"
                    aria-labelledby={`pills-block-list`}
                    tabindex="0"
                  >
                    <div
                      class="row m-3 overflow-auto "
                      style={{ height: "600px" }}
                    >
                      {state.blockWidgetPattern &&
                        Object.keys(state.blockWidgetPattern).map(
                          (widget, index) => (
                            <div class="col m-2">
                              <div
                                class="card p-2 align-items-center"
                                style={{ width: "150px", height: "150px" }}
                                onClick={(e) => {
                                  openModalBlock(e, "close");
                                  selectWidget(
                                    `${state.blockWidgetPattern[widget].widgetUrl}`
                                  );
                                }}
                              >
                                <div class="card-body p-0">
                                  <span
                                    class="card-text  d-inline-block text-truncate "
                                    style={{
                                      maxWidth: "120px",
                                      fontWeight: "120px",
                                    }}
                                  >
                                    {
                                      state.blockWidgetPattern[widget]
                                        .widgetName
                                    }
                                  </span>
                                </div>
                              </div>
                            </div>
                          )
                        )}
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
                          <div class="card-header">Widget</div>
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
                              selectWidget(state.widgetUrl);
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
    <div class="d-grid gap-2 p-1">
      <button
        type="button"
        onClick={(e) => {
          openModalBlock(e, "show");
          State.update({
            selectBlock: blockId,
          });
          State.update({
            selectPositionBlock: 1,
          });
        }}
        class="btn btn-outline-primary btn-lg btn-block"
      >
        Add Block +
      </button>
    </div>
  </>
);
