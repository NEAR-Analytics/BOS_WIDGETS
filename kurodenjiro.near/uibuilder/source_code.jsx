State.init({
  blockList: [],
  openModalBlock: false,
  clickedModalBlock: false,
  clientName: props.clientName ? props.clientName : "",
  clientId: props.clientId ? props.clientId : null,
  showModalClient: false,
  widgetUrl,
  widgetProps,
  widgetName: "",
  widgetLogo: [],
  name: "",
  description: "",
  website: "",
  image: {
    ipfs_cid: "",
  },
  exportList,
  clicked: false,
  export: false,
  img: null,
  tags,
  choose,
});

const addBlock = (widgetUrl, widgetProps) => {
  const blockList = state.blockList;
  const block = {
    id: { widgetUrl: widgetUrl, props: widgetProps || {} },
  };
  Object.assign(blockList, block);
  State.update({ blockList: blockList, openModalBlock: false });
};
const selectWidget = (e, widgetUrl) => {
  addBlock(widgetUrl, {});
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

const onInputChangeClientName = ({ target }) => {
  State.update({ clientName: target.value });
  State.update({ clicked: false });
};
const showModal = (e, type) => {
  if (type == "show") {
    State.update({ displayModal: true, clicked: false });
  }
  if (type == "close") {
    State.update({ displayModal: false });
  }
};
const showModalClient = (e, type) => {
  if (type == "show") {
    State.update({ showModalClient: true, clicked: false });
  }
  if (type == "close") {
    State.update({ showModalClient: false });
  }
};
const saveClient = (e) => {
  if (!state.clicked) {
    State.update({ clicked: true });
    if (state.clientName.length < 5) {
      State.update({
        error: "Name requires more than 5 characters",
      });
    } else {
      const saveData = {
        magicbuild: {
          blockList: blockList,
        },
      };
      Social.set(saveData, {
        force: true,
        onCommit: () => {
          State.update({ displayModal: false });
        },
        onCancel: () => {},
      });
    }
  }
};
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
};
loadData();
const onInputChangeWidgetUrl = (e) => {
  State.update({ widgetUrl: e.target.value });
};
const onInputChangeWidgetProps = (e) => {
  State.update({ widgetPropst: e.target.value });
};

const onInputChangeWidgetName = ({ target }) => {
  State.update({ widgetName: target.value });
  State.update({ clicked: false });
  State.update({ export: false });
};
const onInputChangeWidgetTitle = ({ target }) => {
  State.update({ name: target.value });
};
const onInputChangeWidgetDescription = ({ target }) => {
  State.update({ description: target.value });
};
const onInputChangeWidgetWebsite = ({ target }) => {
  State.update({ website: target.value });
};
const uploadFileUpdateState = (body) => {
  asyncFetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: { Accept: "application/json" },
    body,
  }).then((res) => {
    const cid = res.body.cid;
    State.update({ image: { ipfs_cid: cid } });
    State.update({ img: { cid } });
  });
};

const filesOnChange = (files) => {
  if (files) {
    State.update({ img: { uploading: true, cid: null } });
    uploadFileUpdateState(files[0]);
  }
};
const taggedWidgets = Social.keys(`*/widget/*/metadata/tags/*`, "final");
let tags = [];
if (Object.keys(taggedWidgets)) {
  Object.keys(taggedWidgets).forEach((item) => {
    if (taggedWidgets[item].widget) {
      if (Object.keys(taggedWidgets[item].widget).length > 0) {
        Object.keys(taggedWidgets[item].widget).forEach((item1) => {
          if (taggedWidgets[item].widget[item1].metadata.tags) {
            if (
              Object.keys(taggedWidgets[item].widget[item1].metadata.tags)
                .length > 0
            ) {
              Object.keys(
                taggedWidgets[item].widget[item1].metadata.tags
              ).forEach((tag) => {
                tags.push(tag);
              });
            }
          }
        });
      }
    }
  });
}

State.update({ tags: tags });
const openModal = () => {
  State.update({ clicked: false });
  State.update({ export: false });
};

const exportForm = () => {
  if (!state.clicked) {
    State.update({ clicked: true });
    const exportListData = Social.get(
      `${context.accountId}/magicbuild/widgetList`
    );
    const exporttList = JSON.parse(exportListData) || [];
    const isExist = false;
    exporttList.forEach((item, index) => {
      if (item.widgetName == state.widgetName) {
        exporttList[index].widgetName = state.widgetName;
        isExist = true;
      }
    });
    if (!isExist) {
      exporttList.push({ widgetName: state.widgetName });
    }
    const exportSource = "return <>";
    for (const block of state.blockList) {
      exportSource += `<Widget src={"${
        block.widgetUrl
      }"} props={JSON.parse(${JSON.stringify(block.props)})} />`;
    }
    exportSource += " </>";
    console.log(state.blockList);
    const data = {
      widget: {
        [state.widgetName]: {
          "": exportSource,
          metadata: {
            name: state.name,
            description: state.description,
            linktree: {
              website: state.website,
            },
            image: {
              ipfs_cid: state.img.cid,
            },
            tags: tagsObj,
          },
        },
      },
      magicbuild: { widgetList: exporttList },
    };
    Social.set(data, {
      force: true,
      onCommit: () => {
        State.update({ export: true });
      },
      onCancel: () => {
        State.update({ clicked: false });
      },
    });
  }
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
      <div class="form-group col-md-9 border rounded p-3 border-2">
        <div>
          {Object.keys(state.blockList) &&
            Object.keys(state.blockList).map((blockId, index) => (
              <div class="row border rounded p-3 border-2 m-2 ">
                <div class="row pb-2">
                  <div class="col-sm-11 ">
                    <h6>
                      <span class="text-info">
                        {state.blockList[blockId].widgetUrl}
                      </span>
                    </h6>
                  </div>
                  <div class="col-sm-1 ">
                    <button
                      type="button"
                      onClick={(e) => removeBlock(blockId)}
                      class="btn-close"
                    ></button>
                  </div>
                </div>
                <Widget
                  src={state.blockList[blockId].widgetUrl}
                  props={state.blockList[blockId].props}
                />
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
      <div class="form-group col-md-3 ">
        <div class="card">
          <div class="card-header">Custom</div>
          <div class="card-body">
            <ul class="nav nav-tabs" role="tablistBlock">
              <li class="nav-item" role="presentation">
                <span
                  class="nav-link px-3 active"
                  id="export-button"
                  data-bs-toggle="pill"
                  data-bs-target="#export-button"
                  type="button"
                  role="tab"
                  aria-controls="export-button"
                  aria-selected="true"
                >
                  Export to Widget
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
                  CSS
                </span>
              </li>
            </ul>

            <div class="tab-content">
              <div
                class="tab-pane fade show active "
                id={`export-button`}
                role="tabpanel"
                aria-labelledby={`export-buttont`}
                tabindex="0"
              >
                <div class="row m-1">
                  <button
                    type="button"
                    class="btn btn-primary btn-block m-1"
                    data-bs-toggle="modal"
                    data-bs-target={`#export-${Date.now()}`}
                    onClick={openModal}
                  >
                    Export
                  </button>
                  <div
                    class="modal fade"
                    id={`export-${Date.now()}`}
                    tabindex="-2"
                    aria-labelledby="exportLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exportLabel">
                            Export Widget
                          </h1>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">
                          {state.export && state.widgetName ? (
                            <>
                              <div class="alert alert-primary" role="alert">
                                <a
                                  href={`https://near.social/${context.accountId}/widget/${state.widgetName}`}
                                >
                                  {`https://near.social/${context.accountId}/widget/${state.widgetName}`}
                                </a>
                              </div>
                            </>
                          ) : (
                            <>
                              <div class="form-group">
                                <label>Widget URL</label>
                                <input
                                  class="form-control"
                                  defaultValue={state.widgetName || ""}
                                  onChange={(e) => onInputChangeWidgetName(e)}
                                />
                                <small class="form-text text-muted">
                                  A new widget configured with the form will be
                                  created.
                                </small>
                              </div>
                              <div class="form-group pt-2">
                                <label>Name</label>
                                <input
                                  class="form-control"
                                  defaultValue={state.name || ""}
                                  onChange={(e) => onInputChangeWidgetTitle(e)}
                                />
                              </div>
                              <div class="form-group pt-2">
                                <label>Description</label>
                                <input
                                  class="form-control"
                                  defaultValue={state.description || ""}
                                  onChange={(e) =>
                                    onInputChangeWidgetDescription(e)
                                  }
                                />
                              </div>
                              <div class="form-group pt-2">
                                <label></label>
                                <Files
                                  multiple={false}
                                  accepts={["image/*"]}
                                  minFileSize={1}
                                  clickable
                                  className="btn btn-outline-primary"
                                  onChange={filesOnChange}
                                >
                                  {state.img?.uploading ? (
                                    <> Uploading </>
                                  ) : (
                                    "Upload Logo Application"
                                  )}
                                </Files>
                              </div>
                              <div class="form-group pt-2">
                                <label></label>
                                {state.img && !state.img.uploading ? (
                                  <img
                                    class="rounded w-50 h-50"
                                    style={{ objectFit: "cover" }}
                                    src={`https://ipfs.near.social/ipfs/${state.img.cid}`}
                                    alt="upload preview"
                                  />
                                ) : (
                                  ""
                                )}
                              </div>
                              <div class="form-group pt-2">
                                <label>Website</label>
                                <input
                                  class="form-control"
                                  defaultValue={state.website || ""}
                                  onChange={(e) =>
                                    onInputChangeWidgetWebsite(e)
                                  }
                                />
                              </div>
                              <div class="form-group pt-2">
                                <label>Tags</label>

                                <Typeahead
                                  options={state.tags || []}
                                  multiple
                                  onChange={(value) => {
                                    State.update({ choose: value });
                                  }}
                                  placeholder="Input tag..."
                                />
                              </div>
                            </>
                          )}
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>

                          <button
                            type="button"
                            disabled={state.clicked}
                            onClick={exportForm}
                            class="btn btn-primary"
                          >
                            Export
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => showModalClient(e, "show")}
                    class="btn btn-success btn-block m-1"
                  >
                    Save Client
                  </button>
                  {state.showModalClient && (
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
                              <h1
                                class="modal-title fs-5"
                                id="createClientLabel"
                              >
                                Save Client
                              </h1>
                              <button
                                type="button"
                                class="btn-close"
                                onClick={(e) => showModalClient(e, "close")}
                              ></button>
                            </div>
                            <div class="modal-body">
                              <div class="form-group">
                                <label>Name</label>
                                <input
                                  class="form-control"
                                  value={state.clientName}
                                  onChange={(e) => onInputChangeClientName(e)}
                                />
                              </div>
                              <small class="form-text text-muted">
                                A new Client will be created.
                              </small>

                              {state.error && (
                                <p class="text-danger" role="alert">
                                  {state.error}
                                </p>
                              )}
                            </div>
                            <div class="modal-footer">
                              <button
                                type="button"
                                class="btn btn-secondary"
                                onClick={(e) => showModalClient(e, "close")}
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                disabled={state.clicked}
                                onClick={(e) => saveClient(e)}
                                class="btn btn-primary"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="modal-backdrop fade show"></div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
