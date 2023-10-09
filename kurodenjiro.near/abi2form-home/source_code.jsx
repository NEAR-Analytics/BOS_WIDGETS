State.init({ clientName: "", clientContract: "", clientList: [] });
const onInputChangeClientName = ({ target }) => {
  State.update({ clientName: target.value.replaceAll(" ", "-") });
};
const onInputChangeClientContract = ({ target }) => {
  State.update({ clientName: target.value.replaceAll(" ", "-") });
};

const loadData = () => {
  const clientList = Social.get(`${context.accountId}/magicbuild/clientlist`);
  if (clientList) {
    const clientListData = JSON.parse(clientList);
    clientListData.forEach((item, index) => {
      const abiRes = Social.get(
        `${context.accountId}/magicbuild/client/${item.id}/abi`
      );
      if (abiRes) {
        const abi = JSON.parse(abiRes);
        abi.address = item.contract;
        abi.name = item.name;
        abi.id = item.id;
        clientListData[index].abi = abi;
      }
    });
    console.log(clientListData);
    State.update({ clientList: clientListData });
  }
};
loadData();
const saveClient = () => {
  const data = state.clientList;
  const clientData = {
    id: Date.now(),
    name: state.clientName,
    contract: state.clientContract,
    archived: false,
    abi: null,
  };
  data.push(clientData);
  const saveData = {
    magicbuild: {
      clientlist: data,
    },
  };
  Social.set(saveData, {
    force: true,
    onCommit: () => {},
    onCancel: () => {},
  });
};
return (
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <div
          class=" bg-white text-dark side-bar"
          data-bs-scroll="true"
          tabindex="-1"
          id="offcanvas"
          aria-labelledby="offcanvas"
        >
          <div class="offcanvas-body p-0">
            <div class="navbar-white">
              <ul
                class="navbar-nav nav nav-pills"
                id="pills-tab"
                role="tablist"
              >
                <li>
                  <div class=" small fw-bold text-uppercase px-3">
                    Magic Build
                  </div>
                </li>
                <li class="nav-item" role="presentation">
                  <a
                    class="nav-link active"
                    id="pills-tab-home"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-home"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                    class="nav-link px-3 active"
                  >
                    <span class="me-2">
                      <i class="bi bi-house-door"></i>
                    </span>
                    <span class="fw-bold">Home</span>
                  </a>
                </li>
                <li>
                  <hr />
                </li>
                <li>
                  <div class="small fw-bold text-uppercase d-flex  px-3 align-items-center justify-content-between">
                    <span>Client</span>
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#createClient"
                    >
                      Add
                      <i class="bi bi-file-earmark-plus"></i>
                    </button>
                  </div>
                  <div
                    class="modal fade"
                    id="createClient"
                    tabindex="-1"
                    aria-labelledby="createClientLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="createClientLabel">
                            Create Client
                          </h1>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">
                          <div class="form-group">
                            <label>Name</label>
                            <input
                              class="form-control"
                              onChange={(e) => onInputChangeClientName(e)}
                            />
                          </div>
                          <div class="form-group">
                            <label>Contract ID</label>
                            <input
                              class="form-control"
                              onChange={(e) => onInputChangeClientName(e)}
                            />
                          </div>
                          <small class="form-text text-muted">
                            A new Client will be created.
                          </small>
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
                            onClick={saveClient}
                            class="btn btn-primary"
                          >
                            Create
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                {state.clientList &&
                  state.clientList.map((client, index) => {
                    if (client.archived == false) {
                      return (
                        <li role="presentation">
                          <a
                            class="nav-link px-3"
                            id={`pills-tab-${client.id}`}
                            data-bs-toggle="pill"
                            data-bs-target={`#pills-${client.id}`}
                            type="button"
                            role="tab"
                            aria-controls={`#pills-${client.id}`}
                            aria-selected="true"
                          >
                            <span class="me-2">
                              <i class="bi bi-file-text"></i>
                            </span>
                            <span class="fw-bold">{client.name}</span>
                          </a>
                        </li>
                      );
                    }
                  })}

                <li>
                  <a
                    class="nav-link px-3 sidebar-link"
                    data-bs-toggle="collapse"
                    href="#collapseArchive"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseArchive"
                  >
                    <span class="me-2">
                      <i class="bi bi-archive"></i>
                    </span>
                    <span class="fw-bold">Archive</span>
                    <span class="right-icon ms-auto">
                      <i class="bi bi-chevron-down"></i>
                    </span>
                  </a>

                  <div class="collapse" id="collapseArchive">
                    <div>
                      <ul class="navbar-nav ps-3">
                        {state.clientList &&
                          state.clientList.map((client, index) => {
                            if (client.archived == true) {
                              return (
                                <li>
                                  <a
                                    href="#"
                                    class="nav-link px-3"
                                    id={`pills-tab-${client.id}`}
                                    data-bs-toggle="pill"
                                    data-bs-target={`#pills-${client.id}`}
                                    type="button"
                                    role="tab"
                                    aria-controls={`#pills-${client.id}`}
                                    aria-selected="true"
                                  >
                                    <span class="me-2">
                                      <i class="bi bi-file-text"></i>
                                    </span>
                                    <span class="fw-bold">{client.name}</span>
                                  </a>
                                </li>
                              );
                            }
                          })}
                      </ul>
                    </div>
                  </div>
                </li>

                <li>
                  <hr />
                </li>
                <li>
                  <div class=" small fw-bold text-uppercase px-3">Addons</div>
                </li>
                <li>
                  <a href="#" class="nav-link px-3">
                    <span class="me-2">
                      <i class="bi bi-activity"></i>
                    </span>
                    <span class="fw-bold">Activity</span>
                  </a>
                </li>
                <li>
                  <a href="#" class="nav-link px-3">
                    <span class="me-2">
                      <i class="bi bi-clipboard2-data"></i>
                    </span>
                    <span class="fw-bold">Data</span>
                  </a>
                </li>
                <li>
                  <hr />
                </li>
                <li class="nav-item" role="presentation">
                  <a
                    class="nav-link active"
                    id="pills-tab-help"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-help"
                    type="button"
                    role="tab"
                    aria-controls="pills-help"
                    aria-selected="true"
                    class="nav-link px-3 "
                  >
                    {" "}
                    <label class="custom-control-label" for="darkSwitch">
                      <span class="fw-bold">
                        <i class="bi bi-question-circle"></i>
                        Help
                      </span>
                    </label>
                  </a>
                </li>

                <li>
                  <hr />
                </li>
                <li>
                  <a
                    href="https://near.social/mob.near/widget/ProfilePage?accountId=kurodenjiro.near"
                    class="nav-link px-3"
                  >
                    <span class="me-2">
                      <i class="bi bi-info-circle"></i>
                    </span>
                    Provided by
                    <span class="fw-bold">Kuro Denjiro</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <div class="tab-content" id="pills-tabContent">
          <div
            class="tab-pane fade show active"
            id={`pills-home`}
            role="tabpanel"
            aria-labelledby={`pills-tab-home`}
            tabindex="0"
          >
            Home
          </div>
          <div
            class="tab-pane fade"
            id={`pills-help`}
            role="tabpanel"
            aria-labelledby={`pills-tab-help`}
            tabindex="0"
          >
            Help
          </div>
          {state.clientList &&
            state.clientList.map((client, index) => (
              <div
                class="tab-pane fade "
                id={`pills-${client.id}`}
                role="tabpanel"
                aria-labelledby={`pills-tab-${client.id}`}
                tabindex="0"
              >
                <Widget
                  src={"kurodenjiro.near/widget/abi2form-builder"}
                  props={client.abi}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  </div>
);
