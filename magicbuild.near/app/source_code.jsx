State.init({ clientList: [] });

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
        clientListData[index].abi = abi;
      }
    });
    State.update({ clientList: clientListData });
  }
};
loadData();
const Wrapper = styled.div`
.nav-pills .nav-link.active, .nav-pills .show>.nav-link {
  color: #fff;
    background-color: #000000;
}
.nav-link {
  color: #000000;
}
`;
return (
  <Wrapper>
    <div class="container">
      <div class="row">
        <div class="col-md-2">
          <div
            class="side-bar"
            data-bs-scroll="true"
            tabindex="-1"
            id="offcanvas"
            aria-labelledby="offcanvas"
          >
            <div class="offcanvas-body p-0">
              <div>
                <ul
                  class="nav flex-column nav-pills  navbar-dark "
                  id="pills-tab"
                  role="tablist"
                >
                  <li class="mb-1">
                    <div class=" small fw-bold text-uppercase px-3"></div>
                  </li>
                  <li class="nav-item" role="presentation">
                    <span
                      class="nav-link px-3 active"
                      id="pills-tab-home"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      <span class="fw-bold">🪄 Magic Build</span>
                    </span>
                  </li>
                  <li>
                    <hr />
                  </li>
                  <li class="mb-1">
                    <div class="small fw-bold text-uppercase d-flex  px-3 align-items-center justify-content-between">
                      <span>Client</span>
                    </div>
                  </li>
                  <li class="nav-item" role="presentation">
                    <span
                      class="nav-link active"
                      id="pills-tab-builder"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-builder"
                      type="button"
                      role="tab"
                      aria-controls="pills-builder"
                      aria-selected="true"
                      class="nav-link px-3 "
                    >
                      {" "}
                      <label class="custom-control-label" for="darkSwitch">
                        <span class="fw-bold">Form Builder</span>
                      </label>
                    </span>
                  </li>
                  {state.clientList.length > 0 && (
                    <li>
                      <a
                        class="nav-link px-3 sidebar-link"
                        data-bs-toggle="collapse"
                        href="#collapseArchive"
                        role="button"
                        aria-expanded="true"
                        aria-controls="collapseArchive"
                      >
                        <span class="fw-bold">📦Archive</span>
                        <span class="right-icon ms-auto">
                          <i class="bi bi-chevron-down"></i>
                        </span>
                      </a>

                      <div class="collapse show" id="collapseArchive">
                        <div>
                          <ul class="navbar-nav ps-3 ">
                            {state.clientList &&
                              state.clientList.map((client, index) => {
                                if (client.archived == false) {
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
                                        <span class="fw-bold">
                                          ✨{client.name}
                                        </span>
                                      </a>
                                    </li>
                                  );
                                }
                              })}
                          </ul>
                        </div>
                      </div>
                    </li>
                  )}

                  <li>
                    <hr />
                  </li>
                  <li class="mb-3">
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
                    <span
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
                        <span class="fw-bold">🛟 Help</span>
                      </label>
                    </span>
                  </li>

                  <li>
                    <hr />
                  </li>
                  <li>
                    <a
                      href="https://www.minorityprogrammers.com/"
                      class="nav-link px-3"
                    >
                      ℹ Built with ❤️ by
                      <span class="fw-bold">Minority Programmers</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-10">
          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show"
              id={`pills-builder`}
              role="tabpanel"
              aria-labelledby={`pills-tab-builder`}
              tabindex="0"
            >
              <Widget src={"magicbuild.near/widget/builder"} />
            </div>
            <div
              class="tab-pane fade show active"
              id={`pills-home`}
              role="tabpanel"
              aria-labelledby={`pills-tab-home`}
              tabindex="0"
            >
              <Widget src={"magicbuild.near/widget/welcome"} />
            </div>

            <div
              class="tab-pane fade"
              id={`pills-help`}
              role="tabpanel"
              aria-labelledby={`pills-tab-help`}
              tabindex="0"
            ></div>
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
                    src={"magicbuild.near/widget/builder"}
                    props={client}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  </Wrapper>
);
