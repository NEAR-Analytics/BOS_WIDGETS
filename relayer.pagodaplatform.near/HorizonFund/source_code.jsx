const profileContract = "0x63F42eBF1b04aC2bc61381E9C4C85d8569890673";
const projectContract = "0x95daB0aDAF84E0E48AF341d90A7E723aDCc76EA6";

const profileAbi = fetch(
  "https://aqua-fresh-crawdad-962.mypinata.cloud/ipfs/QmWH1nkX6cY6SRweobev7kJi8UjuPY65wQtuuF8BjWZgfG"
);

const projectAbi = fetch(
  "https://aqua-fresh-crawdad-962.mypinata.cloud/ipfs/QmVndtnbiURR7n7ZqcXTMCGs3TqWF9ZeoVckQHF35Pb2ri"
);

if (!projectAbi.ok && !profileAbi.ok) {
  return "Loading...";
}

const projectIface = new ethers.utils.Interface(projectAbi.body);
const profileIface = new ethers.utils.Interface(profileAbi.body);

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
  }
}

const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800"
).body;
const css = fetch(
  "https://nativonft.mypinata.cloud/ipfs/Qmdpe64Mm46fvWNVaCroSGa2JKgauUUUE5251Cx9nTKNrs"
).body;

if (!cssFont || !css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    font-family: Manrope, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    ${cssFont}
    ${css}
`,
  });
}
const Theme = state.theme;

const getSender = () => {
  return !state.sender
    ? ""
    : state.sender.substring(0, 6) +
        "..." +
        state.sender.substring(state.sender.length - 4, state.sender.length);
};

return (
  <Theme>
    <div className="Container">
      {state.sender ? (
        <span>HorizonFund</span>
      ) : (
        <Web3Connect
          className="LidoStakeFormSubmitContainer"
          connectLabel="Connect with Web3"
        />
      )}
    </div>
  </Theme>
);
