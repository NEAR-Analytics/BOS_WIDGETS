const ownerId = "manzanal.near";
const tokenName = "MATIC";
const wrapTokenName = "WMATIC";
const wmaticAddress =
  props.wmaticAddress || "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270";
const tokenDecimals = 18;
const wmaticAbiUrl =
  props.wmaticAbiUrl ||
  "https://raw.githubusercontent.com/leomanza/chain-agnostic-bos-workshop/main/ABIs/WMATIC.abi.json";
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
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="32px"
    height="32px"
    viewBox="0 0 32 25"
    version="1.1"
  >
    <g id="surface1">
      <path
        style=" stroke:none;fill-rule:evenodd;fill:rgb(16.862745%,74.117647%,96.862745%);fill-opacity:1;"
        d="M 12.386719 10.394531 L 15.960938 18.253906 L 21.277344 15.214844 L 21.28125 15.210938 L 21.28125 9.128906 Z M 12.386719 10.394531 "
      />
      <path
        style=" stroke:none;fill-rule:evenodd;fill:rgb(15.686275%,56.862745%,97.647059%);fill-opacity:1;"
        d="M 28.160156 4.566406 L 24.84375 3.324219 L 21.296875 3.039062 L 21.296875 21.953125 L 26.617188 24.992188 L 30.816406 16.46875 L 28.167969 8.222656 Z M 28.160156 4.566406 "
      />
      <path
        style=" stroke:none;fill-rule:evenodd;fill:rgb(16.862745%,74.117647%,96.862745%);fill-opacity:1;"
        d="M 27.828125 3.046875 L 26.597656 6.085938 L 26.59375 6.085938 L 26.59375 24.996094 L 31.917969 21.957031 L 31.917969 3.046875 Z M 27.828125 3.046875 "
      />
      <path
        style=" stroke:none;fill-rule:evenodd;fill:rgb(16.862745%,42.745098%,93.72549%);fill-opacity:1;"
        d="M 26.617188 0 L 21.296875 3.042969 L 26.617188 6.085938 L 31.941406 3.042969 Z M 26.617188 0 "
      />
      <path
        style=" stroke:none;fill-rule:evenodd;fill:rgb(15.686275%,56.862745%,97.647059%);fill-opacity:1;"
        d="M 15.964844 12.167969 L 10.644531 6.261719 L 0 3.039062 L 0 21.949219 L 5.320312 24.992188 L 6.839844 14.527344 L 10.644531 15.214844 L 10.644531 15.210938 L 15.964844 18.25 Z M 15.964844 12.167969 "
      />
      <path
        style=" stroke:none;fill-rule:evenodd;fill:rgb(16.862745%,42.745098%,93.72549%);fill-opacity:1;"
        d="M 5.324219 0 L 0 3.042969 L 15.964844 12.171875 L 18.375 10.792969 L 21.285156 9.128906 Z M 5.324219 0 "
      />
      <path
        style=" stroke:none;fill-rule:evenodd;fill:rgb(16.862745%,74.117647%,96.862745%);fill-opacity:1;"
        d="M 5.324219 12.167969 L 5.324219 24.992188 L 10.644531 21.949219 L 10.644531 15.210938 Z M 5.324219 12.167969 "
      />
    </g>
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
