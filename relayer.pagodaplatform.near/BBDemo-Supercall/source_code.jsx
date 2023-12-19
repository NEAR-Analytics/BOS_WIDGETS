const MainLayout = styled.div`
  margin-bottom:20px;
  height: 100%;
`;

const PatternBackground = styled.div`
height: 100%;
background-image:  linear-gradient(#E9EBED 0.9px, transparent 0.9px), linear-gradient(to right, #E9EBED 0.9px, #F7F9F9 0.9px);
background-size: 18px 18px;
padding-bottom:100px;
`;

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
  <MainLayout>
    <Widget src="fofay-ac.near/widget/NavbarSupercall" />
    <PatternBackground>
      <div style={{ padding: "54px 120px 12px 120px" }}>
        <div style={{ marginBottom: "54px" }}>
          <Widget src="fay-tbl.near/widget/SupercallAccount" />
        </div>
        <div>
          <Widget src="xspeedx.near/widget/SupercallBundler" />
        </div>
      </div>
      <div
        style={{
          width: "100%",
          bottom: "24px",
          left: 0,
          position: "fixed",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Widget
          src="nt-sorravit.near/widget/CallNode"
          props={{ processCallContract: () => processCall }}
        />
      </div>
      <Widget
        src={`ribbinpo.near/widget/billbos-board`}
        props={{
          webpageOwnerAddress: "0xF72f6bE11bAE516a3Fa16B19c9d7988f4C1CDA42",
        }}
      />
    </PatternBackground>
  </MainLayout>
);
