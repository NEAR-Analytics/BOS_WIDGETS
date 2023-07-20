const ownerId = "manzanal.near";
const tokenName = "MATIC";
const wrapTokenName = "WMATIC";
const wmaticAddress =
  props.wmaticAddress || "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270";
const tokenDecimals = 18;
const wmaticAbiUrl =
  props.wmaticAbiUrl ||
  "https://raw.githubusercontent.com/leomanza/chain-agnostic-bos-workshop/main/ABIs/WETH.abi.json?token=GHSAT0AAAAAACFEJMQZUSUDFPBXDYUPLNOYZFZIHMA";
const wmaticAbi = fetch(wmaticAbiUrl);

if (!wmaticAbi.ok) {
  return "Loading";
}
const wmaticAbiBody = wmaticAbi.body;
console.log("ABI", wmaticAbiBody);
const signer = Ethers.provider() ? Ethers.provider().getSigner() : null;
const wmaticContract = new ethers.Contract(
  wmaticAddress,
  wmaticAbiBody,
  signer
);

State.init({
  signerAddress: null,
});

const getSignerAddress = () => {
  signer.getAddress().then((signerAddress) => {
    State.update({ signerAddress });
  });
};
getSignerAddress();

const imgWrapTokenSvg = (
  <svg
    width="485"
    height="382"
    viewBox="0 0 485 382"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M187.763 158.848L241.91 278.932L322.5 232.475L322.561 232.451V139.464L187.763 158.848Z"
      fill="#2BBDF7"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M426.827 69.745L376.525 50.7983L322.766 46.4558V335.423L403.416 381.905L467.073 251.631L426.924 125.663L426.827 69.745Z"
      fill="#2891F9"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M421.773 46.5527L403.093 93.0219H403.069V381.953L483.732 335.484V46.5527H421.773Z"
      fill="#2BBDF7"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M403.428 0L322.766 46.5055L403.428 92.999L484.091 46.5055L403.428 0Z"
      fill="#2B6DEF"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M241.965 185.924V185.9L161.314 95.6542L0 46.4558V335.387L80.6387 381.88L103.685 221.986L161.314 232.454V232.405L241.977 278.886V185.924H241.965Z"
      fill="#2891F9"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M80.6872 0L0 46.4934L241.94 186.01L278.5 164.941L322.591 139.505L80.6872 0Z"
      fill="#2B6DEF"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M80.7035 185.92H80.6914V381.864L161.354 335.383V232.413L80.7035 185.92Z"
      fill="#2BBDF7"
    />
  </svg>
);
const imgTokenSvg = (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none">
      <circle fill="#6F41D8" cx="16" cy="16" r="16" />
      <path
        d="M21.092 12.693c-.369-.215-.848-.215-1.254 0l-2.879 1.654-1.955 1.078-2.879 1.653c-.369.216-.848.216-1.254 0l-2.288-1.294c-.369-.215-.627-.61-.627-1.042V12.19c0-.431.221-.826.627-1.042l2.25-1.258c.37-.216.85-.216 1.256 0l2.25 1.258c.37.216.628.611.628 1.042v1.654l1.955-1.115v-1.653a1.16 1.16 0 00-.627-1.042l-4.17-2.372c-.369-.216-.848-.216-1.254 0l-4.244 2.372A1.16 1.16 0 006 11.076v4.78c0 .432.221.827.627 1.043l4.244 2.372c.369.215.849.215 1.254 0l2.879-1.618 1.955-1.114 2.879-1.617c.369-.216.848-.216 1.254 0l2.251 1.258c.37.215.627.61.627 1.042v2.552c0 .431-.22.826-.627 1.042l-2.25 1.294c-.37.216-.85.216-1.255 0l-2.251-1.258c-.37-.216-.628-.611-.628-1.042v-1.654l-1.955 1.115v1.653c0 .431.221.827.627 1.042l4.244 2.372c.369.216.848.216 1.254 0l4.244-2.372c.369-.215.627-.61.627-1.042v-4.78a1.16 1.16 0 00-.627-1.042l-4.28-2.409z"
        fill="#FFF"
      />
    </g>
  </svg>
);

const parseToUnitsFn = (amount) => {
  const tokenDecimals = 18;
  return ethers.utils.parseUnits(amount, tokenDecimals);
};

const formatUnitsFn = (amount) => {
  const tokenDecimals = 18;
  return ethers.utils.formatUnits(amount, tokenDecimals);
};
const isValidAmountFn = (amount) => {
  if (!amount) return false;
  if (isNaN(Number(amount))) return false;
  if (amount === "") return false;
  if (amount < 0) return false;
  return true;
};
const isSignedIn = () => !!state.signerAddress;

const getMaticBalance = (signerAddress, updateStateCb) => {
  Ethers.provider()
    .getBalance(signerAddress)
    .then((balance) => updateStateCb(formatUnitsFn(balance)));
};

const getWMaticBalance = (signerAddress, updateStateCb) => {
  wmaticContract
    .balanceOf(signerAddress)
    .then((balance) => updateStateCb(formatUnitsFn(balance)));
};

const wrapFn = (amountIn) => {
  const amount = parseToUnitsFn(amountIn);

  wmaticContract.deposit({ value: amount });
};
const unwrapFn = (amountIn) => {
  const amount = parseToUnitsFn(amountIn);

  wmaticContract.withdraw(amount);
};
if (!state.signerAddress) return "Loading...";
return (
  <Widget
    src={`${ownerId}/widget/TokenWrapper.v2.AbstractWrapper`}
    props={{
      tokenName,
      wrapTokenName,
      imgTokenSvg,
      imgWrapTokenSvg,
      getTokenBalanceFn: getMaticBalance,
      getWrapTokenBalanceFn: getWMaticBalance,
      parseToUnitsFn,
      formatUnitsFn,
      isValidAmountFn,
      wrapFn,
      unwrapFn,
      isSignedIn,
      signerAddress: state.signerAddress,
    }}
  />
);
