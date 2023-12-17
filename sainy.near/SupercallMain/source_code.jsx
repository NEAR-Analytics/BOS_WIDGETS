const MULTICALL_ABI_URL =
  "https://gist.githubusercontent.com/SainyTK/8b83bbd26610ceeaa215a46f942d2702/raw/9bc41907fd49bc56553cf226c3ac92b225343cae/multicall-abi.json";
const MULTICALL_ABI = fetch(MULTICALL_ABI_URL).body;

function readAddress(accountNumber) {
  const addr = Storage.get(
    `contractAddress:${accountNumber}`,
    "sainy.near/widget/SupercallDeployer"
  );
  return addr;
}

function getCalls() {
  return Storage.get(`calls`, "sainy.near/widget/SupercallBundler");
}

function processCall() {
  const multicallAddr = readAddress("0");
  const multicall = new ethers.Contract(
    multicallAddr,
    MULTICALL_ABI,
    Ethers.provider().getSigner()
  );
  const calls = getCalls();
  multicall.aggregate(calls);
}

return (
  <div>
    <div>
      <h2>Accounts</h2>
      <Widget src="sainy.near/widget/SupercallAccount" />
    </div>
    <div>
      <h2>Calls</h2>
      <Widget src="sainy.near/widget/SupercallBundler" />
    </div>
    <div>
      <button onClick={processCall}>Call</button>
    </div>
  </div>
);
