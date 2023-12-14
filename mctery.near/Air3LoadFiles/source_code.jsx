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

  //config
  near_DB: "",
  livecoinURL: "https://api.livecoinwatch.com",
  livecoinAPI: "2e83cac3-4860-4889-a994-9baaf91c873a",
  ipfsUrl: "https://ipfs.near.social/ipfs/",
});

function _init() {
  let getWallet = "";

  setTimeout(() => {
    State.update({ onload: false });
  }, 1000);
}

function fetchData(url, method, data) {
  try {
    let response = fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `${state.livecoinAPI}`,
      },
      body: JSON.stringify(data),
    });
    return response.ok ? response.body : false;
  } catch (e) {
    console.log("error :", e);
  }
}

function getConnectWallet() {}

async function getLiveCoins() {
  let dataset = [];

  let liveCoins = fetchData(`${state.livecoinURL + "/coins/list"}`, "POST", {
    currency: "USD",
    sort: "rank",
    order: "ascending",
    offset: 0,
    limit: 10,
    meta: true,
  });

  function priceFormat(price) {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }

  if(liveCoins.length > 0) {
    return liveCoins.map((i, index) => {
      return (
            <div class="col-12 col-sm-6">
              <div class="card widget-card border-light shadow-sm">
                <div class="card-body p-4">
                  <div class="row">
                    <div class="col-8">
                      <h5 class="card-title widget-card-title mb-3">{i.code}</h5>
                      <h4 class="card-subtitle text-body-secondary m-0">
                        {priceFormat(i.rate)}
                      </h4>
                    </div>
                    <div class="col-4">
                      <div class="d-flex justify-content-end">
                        <div class="lh-1 text-white rounded-circle p-3 d-flex align-items-center justify-content-center">
                          <img src={i.png64} alt={i.name} width={80} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <div class="d-flex align-items-center mt-3">
                        <span class="lh-1 me-3 bg-danger-subtle text-danger rounded-circle p-1 d-flex align-items-center justify-content-center">
                          <i class="bi bi-arrow-right-short bsb-rotate-45"></i>
                        </span>
                        <div>
                          <p class="fs-7 mb-0">-9%</p>
                          <p class="fs-7 mb-0 text-secondary">since last week</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      )
    })
  }
}

//return
if (state.onload) {
  _init();

  return (
    <div>
      <h5>Test Files</h5>
      <p>is Loading...</p>
    </div>
  );
}

if (!state.onload) {
  return (
    <div class="container">
      <div>
        <div class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              Air3 Drive
            </a>
            <button
              class="btn btn-light"
              type="button"
              onclick={() => {
                getConnectWallet();
              }}
            >
              Connect
            </button>
          </div>
        </div>
      </div>


      <div class="row justify-content-md-center text-center">
        <div class="col col-lg-12 mt-5">
          <h5>Files Upload Header</h5>
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


      <div class="row justify-content-center py-5 my-4 border-top">
        <div class="col-12 col-lg-10 col-xl-8 col-xxl-7">
          <div class="row gy-4">
            {getLiveCoins()}
          </div>
        </div>
      </div>

      <div class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div class="col-md-4 d-flex align-items-center">
          <a class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
            Air3 Drive Developer
          </a>
        </div>
      </div>
    </div>
  );
}
