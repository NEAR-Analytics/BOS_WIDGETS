State.init({
  address: null,
  route: "def",
  cid: null,
  filename: null,
  uploading_file: false,
  api: "https://glowworm-organic-oddly.ngrok-free.app",
  graphQL: "https://air3-database.hasura.app/api/rest/",
  graphQL_token:
    "Hyi0kHeCvYUVfSJpLWK520VLjSIKXsJVIOwTy938xZdQjzLjvhsugLn89eqsrA5n",
  ipfsUrl: "https://ipfs.near.social/ipfs/",
});
function _init() {
  const eth_address = Ethers.send("eth_requestAccounts", [])[0];
  if (eth_address) {
    eth_address.toLowerCase();
    let ipfs_list = fetchGraphQL("getuseripfs", "POST", {
      _address: eth_address,
    });
    State.update({
      address: eth_address,
      route: "drive",
      ipfs_list: ipfs_list.uploads,
    });
  } else {
    State.update({ route: "def", address: null });
  }
}
function fetchGraphQL(rest, method, data) {
  try {
    let res = fetch(`${state.graphQL}/${rest}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": state.graphQL_token,
      },
      body: JSON.stringify(data),
    });
    return res.body;
  } catch (e) {
    return false;
  }
}
function fetchData(url, method, data) {
  try {
    let response = fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (e) {
    return false;
  }
}
function getHeader() {
  const address = state.address;
  return (
    <div>
      <div class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            NearFillar
          </a>
          <div class="d-flex">
            <div class="navbar-nav">
              {address ? (
                <>
                  <div class="nav-item p-1">
                    0{address.substring(1, 6)}...
                    {address.substring(address.length - 4, address.length)}
                  </div>
                  <Web3Connect
                    class="nav-item btn mt-3"
                    connectLabel="Disconnect"
                  />
                </>
              ) : (
                <Web3Connect class="nav-item btn mt-3" connectLabel="Connect" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function getFooter() {
  return (
    <div class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      NearFillar 1.1 beta #developer #bitkubblockathon
    </div>
  );
}
function setUploadFile() {
  State.update({ uploading_file: true });
  try {
    Ethers.provider()
      .getSigner()
      .signMessage(`${state.address}${state.filename}`)
      .then((result_sign) => {
        let source = {
          user_eth_address: state.address,
          ipfs_cid: state.cid,
          ipns_name: state.filename,
          project_name: state.project_name,
          signature: result_sign,
        };
        fetchData(`${state.api}/create`, "POST", source);
      });
  } catch (e) {
    return false;
  } finally {
    State.update({ uploading_file: false });
  }
}
function setUpdateFile(item) {
  try {
    Ethers.provider()
      .getSigner()
      .signMessage(`${state.address}${item.ipns_name}`)
      .then((result_sign) => {
        let source = {
          user_eth_address: state.address,
          ipns_from_generate: item.ipns_from_generate,
          ipfs_cid: state.ipfs_replace_cid,
          signature: result_sign,
        };
        fetchData(`${state.api}/replace`, "POST", source);
      });
  } catch (e) {
    return false;
  } finally {
    State.update({ uploading_file: false });
  }
}
function getIPFSInfo(info) {
  return (
    <div class="card mb-3" style={{ width: "30rem" }}>
      <div class="row g-0">
        <div class="col-md-4 text-center">
          <img
            class="img-thumbnail"
            width={"100px"}
            height={"100px"}
            src={`https://ipfs.io/ipfs/${info.ipfs_cid}`}
          ></img>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h6 class="card-title">{getLongName(info.ipfs_cid)}</h6>
            <a href="#" data-bs-toggle="modal" data-bs-target="#ipfs_id">
              Replace
            </a>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="ipfs_id"
        tabindex="-1"
        aria-labelledby="ipfs_idLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="ipfs_idLabel">
                Replace IPFS
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="ipfs_replace_cid">IPFS CID</label>
                <input
                  type="text"
                  class="form-control"
                  id="ipfs_replace_cid"
                  placeholder="new cid"
                  value={state.ipfs_replace_cid}
                  onChange={(e) => {
                    State.update({ ipfs_replace_cid: e.target.value });
                  }}
                ></input>
              </div>
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
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => {
                  setUpdateFile(info);
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const getLongName = (name) => {
  if (name.length >= 20) {
    return <div>{name.substring(0, 20)}...</div>;
  } else {
    return <div>{name}</div>;
  }
};
_init();
if (state.route === "def") {
  return (
    <div class="container">
      {getHeader()}
      <div class="row justify-content-md-center text-center">
        <div class="col col-lg-12 mt-5">
          <p>Please Connect your Wallet to Upload Files.</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="60"
            width="75"
            viewBox="0 0 384 512"
          >
            <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 408c0 13.3-10.7 24-24 24s-24-10.7-24-24V305.9l-31 31c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l72-72c9.4-9.4 24.6-9.4 33.9 0l72 72c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-31-31V408z" />
          </svg>
        </div>
      </div>
      {getFooter()}
    </div>
  );
}
if (state.route === "drive" && state.address) {
  return (
    <div class="container">
      {getHeader()}
      <div>
        <div class></div>
        <fieldset class="text-center mb-3 p-4">
          <Files
            multiple={false}
            accepts={[
              "image/*",
              "video/*",
              "audio/*",
              "font/*",
              "application/*",
              "font/*",
            ]}
            minFileSize={1}
            clickable
            className="btn btn-outline-primary"
            onChange={(files) => {
              if (!files || !files.length) return;
              const [body] = files;
              State.update({ uploading_file: true, cid: null });
              asyncFetch("https://ipfs.near.social/add", {
                method: "POST",
                headers: { Accept: "application/json" },
                body,
              }).then(({ body: { cid } }) => {
                State.update({
                  cid,
                  filename: body.name,
                  uploading_file: false,
                });
              });
            }}
          >
            {state.uploading_file ? "Loading..." : "Upload your file"}
          </Files>
        </fieldset>
        <div class="form text-left">
          <div class="form-group">
            <label for="ipns_name">IPNS Name</label>
            <input
              type="text"
              class="form-control"
              id="ipns_name"
              placeholder="put your ipns name"
              value={state.filename}
              onChange={(e) => {
                State.update({ filename: e.target.value });
              }}
            ></input>
          </div>
          <div class="form-group">
            <label for="cid">IPFS (CID)</label>
            <input
              type="text"
              class="form-control"
              id="cid"
              placeholder="cid..."
              value={state.cid}
              onChange={(e) => {
                State.update({ cid: e.target.value });
              }}
            ></input>
          </div>
          <div class="form-group">
            <label for="project">Project Name</label>
            <input
              type="text"
              class="form-control"
              id="project_name"
              placeholder="near fillar"
              value={state.project_name}
              onChange={(e) => {
                State.update({ project_name: e.target.value });
              }}
            ></input>
          </div>
          <div class="form-group mt-3 pb-3 border-bottom">
            <button
              type="button"
              onClick={() => {
                setUploadFile();
              }}
            >
              ดีใจจัง อัพโหลดได้แล้ว!
            </button>
          </div>
        </div>
      </div>
      <table class="table" width="100%" cellPadding={10}>
        <thead>
          <tr class="thead-dark">
            <td scope="col">No.</td>
            <td scope="col">Project</td>
            <td scope="col">IPNS Name</td>
            <td scope="col">IPFS</td>
          </tr>
        </thead>
        <tbody>
          {state.ipfs_list.length > 0 &&
            state.ipfs_list.map((i, index) => {
              return (
                <tr>
                  <td scope="row">{index + 1}</td>
                  <td>{i.project_name}</td>
                  <td>
                    <div>
                      {getLongName(i.ipns_name)}
                      <a
                        style={{ fontSize: "12px" }}
                        href="#"
                        data-toggle="tooltip"
                        title={`ipfs://${i.ipns_from_generate}`}
                        onClick={() => {
                          clipboard.writeText(`ipfs://${i.ipns_from_generate}`);
                        }}
                      >
                        Copy
                      </a>
                    </div>
                  </td>
                  <td>{getIPFSInfo(i)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {getFooter()}
    </div>
  );
}
