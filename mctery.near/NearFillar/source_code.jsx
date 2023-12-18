State.init({
  uploading: false,
  cid: context.accountId || undefined,
  cid_img: context.accountId
    ? Social.get(
        `https://i.near.social/magic/large/https://near.social/magic/img/account/${context.accountId}`
      )
    : undefined,
  filename: null,
  onload: true,
  address: null,
  route: "def",

  //file upload componance
  cid: null,
  filename: null,
  uploading_file: false,

  //config
  graphQL: "https://air3-database.hasura.app/v1/graphql",
  graphQL_token:
    "Hyi0kHeCvYUVfSJpLWK520VLjSIKXsJVIOwTy938xZdQjzLjvhsugLn89eqsrA5n",
  ipfsUrl: "https://ipfs.near.social/ipfs/",
});

function _init() {
  let eth_address = Ethers.send("eth_requestAccounts", [])[0];
  if (eth_address) {
    State.update({ address: eth_address });
    State.update({ route: "drive", onload: false });
  } else {
    State.update({ route: "def", address: null });
  }
}

function fetchGraphQL(query) {
  try {
    let res = fetch(state.graphQL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": state.graphQL_token,
      },
      body: JSON.stringify({ query: query }),
    });
    console.log(res);
    return res.data;
  } catch (e) {
    console.log(e);
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
    console.log(response);
    return response.ok ? response.body : false;
  } catch (e) {
    console.log("error :", e);
  }
}

//View
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
                <Web3Connect
                  class="nav-item btn mt-3"
                  connectLabel="Connect"
                  onclick={() => {
                    getConnectWallet();
                  }}
                />
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
      <div class="col-md-4 d-flex align-items-center">
        <p class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
          NearFillar 1.0 beta
        </p>
        <div>#developer #bitkubblockathon</div>
      </div>
    </div>
  );
}

//methods
function setValue(v, field) {
  console.log(v, field);
}

function getIPFSInfo(info) {
  return (
    <div class="card mb-3" style={{ maxWidth: "300px" }}>
      <div class="row g-0">
        <div class="col-md-4">
          <img
            class="img-fluid rounded-start"
            width={"100px"}
            src="https://ipfs.io/ipfs/bafybeihkoviema7g3gxyt6la7vd5ho32ictqbilu3wnlo3rs7ewhnp7lly"
          ></img>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h6 class="card-title">{info.ipfs}</h6>
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
                <label for="ipfs_url">IPFS URL</label>
                <input
                  type="text"
                  class="form-control"
                  id="ipfs_url"
                  placeholder="ipfs://cid..."
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

//return
_init();

if (state.onload && state.route === "def") {
  return (
    <div class="container">
      {getHeader()}

      <div class="row justify-content-md-center text-center">
        <div class="col col-lg-12 mt-5">
          <h5>Air3 Files Upload</h5>
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

      <div class="row justify-content-center py-5 my-4">
        <div class="col-12 col-lg-10 col-xl-8 col-xxl-7">
          <div class="row gy-4"></div>
        </div>
      </div>

      {getFooter()}
    </div>
  );
}

let jsonIPFS = {
  address: "0x12234",
  ipns: "ipns://127.0.0.1",
  ipfs: "ipfs://127.0.0.2",
  created_date: "2017-12-12",
};

if (state.route === "drive" && state.address) {
  return (
    <div class="container">
      {getHeader()}
      <div>
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
                // props.update(cid);
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
              placeholder="push your name"
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
            <button type="button">ดีใจจัง อัพโหลดได้แล้ว!</button>
          </div>
        </div>
      </div>
      <table width="100%" cellPadding={10}>
        <tr border={1}>
          <td>No.</td>
          <td>Project</td>
          <td>IPNS Name</td>
          <td>IPFS</td>
        </tr>
        <tr border={1}>
          <td>1</td>
          <td>Cat</td>
          <td>
            <div>
              <a
                href="#"
                data-toggle="tooltip"
                title="ipns://localhostlocalhost"
                onClick={() => {
                  clipboard.writeText("ipns://localhostlocalhost");
                }}
              >
                CatIPFS
              </a>
            </div>
          </td>
          <td>{getIPFSInfo(jsonIPFS)}</td>
        </tr>
      </table>
      {getFooter()}
    </div>
  );
}
