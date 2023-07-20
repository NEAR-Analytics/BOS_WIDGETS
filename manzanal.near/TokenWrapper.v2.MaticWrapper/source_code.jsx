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
