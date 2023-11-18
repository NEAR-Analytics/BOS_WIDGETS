const sheetIdx = props.sheetIdx || 0;

const { getNormalDate, ppdContract, ppdAbi } = VM.require(
  "beachsunandrockandroll.near/widget/utils"
);

State.init({
  userSheets: [],
});

const getUserSheets = () => {
  if (ppdContract == undefined) return;

  const ppd = new ethers.Contract(
    ppdContract,
    ppdAbi.body,
    Ethers.provider().getSigner()
  );

  ppd.getUserIdx().then((userIdx) => {
    ppd.getUserSheets(parseInt(userIdx.toString())).then((userSheets) => {
      userSheets.map((userSheet, i) => {
        if (i === sheetIdx) {
          const sheet = {
            name: userSheet[0],
            createdAt: getNormalDate(userSheet[1]),
            difficulty: userSheet[2],
            dataUri: userSheet[3],
          };
          State.update({ sheet });
        }
      });
    });
  });
};

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
    getUserSheets();
  }
}

return (
  <>
    <h2>{state.sheet.name}</h2>
  </>
);
