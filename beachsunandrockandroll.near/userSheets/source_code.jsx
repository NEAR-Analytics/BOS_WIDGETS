const { getNormalDate, ppdContract, ppdAbi } = VM.require(
  "beachsunandrockandroll.near/widget/utils"
);

const action = props.action;

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
    ppd.getUserSheets(parseInt(userIdx.toString())).then((res) => {
      let sheets = res.map((userSheet, i) => ({
        name: userSheet[0],
        createdAt: getNormalDate(userSheet[1]),
        difficulty: userSheet[2],
        dataUri: userSheet[3],
      }));
      State.update({ userSheets: sheets });
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

const GridWrap = styled.div`
.gap-4 {
    gap: 1rem;
}

.grid-cols-2 {
    grid-template-columns: repeat(2,minmax(0,1fr));
}
.grid {
    display: grid;
}
  `;

return (
  <>
    {state.userSheets.length === 0 && (
      <h2 class="text-center">No Sheets Founded</h2>
    )}
    {state.userSheets.map((userSheet, i) => {
      return (
        <GridWrap>
          <div class="grid gap-4 grid-cols-2">
            <Widget
              src={`beachsunandrockandroll.near/widget/card`}
              props={{
                title: userSheet.name,
                desc: userSheet.createdAt,
                buttonTitle: "View Sheet",
                action: () => {
                  action(i);
                },
              }}
            />

            {/* <button
              onClick={() => {
                setAddRecord(true);
                setSheetIdx(i);
              }}
            >
              New Record
            </button>*/}
          </div>
        </GridWrap>
      );
    })}
  </>
);
