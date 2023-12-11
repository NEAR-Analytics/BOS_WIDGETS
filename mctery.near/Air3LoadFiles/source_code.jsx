State.init({
  uploading: false,
  cid: null,
  filename: null,
  onload: true,

  //config
  ipfsUrl: "https://ipfs.near.social/ipfs/",
});

function _init() {
  let getWallet = "";
}

function getConnectWallet() {}

//return
if (state.onload) {
  return (
    <div>
      <h5>Test Files</h5>
      <p>is Loading...</p>
    </div>
  );
}

if (!state.onload) {
  return (
    <div>
      <h5>Test Files</h5>
      <button
        onclick={() => {
          getConnectWallet();
        }}
      >
        Connect Wallet
      </button>
    </div>
  );
}
