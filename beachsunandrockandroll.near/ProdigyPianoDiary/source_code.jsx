const [user, setUser] = useState("");
const [sheetIdx, setSheetIdx] = useState("");

const { getNormalDate, ppdContract, ppdAbi } = VM.require(
  "beachsunandrockandroll.near/widget/utils"
);

State.init({
  visibleObj: "userSheets",
});

const getUsers = () => {
  const ppd = new ethers.Contract(
    ppdContract,
    ppdAbi.body,
    Ethers.provider().getSigner()
  );

  ppd.getUsers().then((res) => {
    State.update({ users: res });
  });
};

// const getComposerSheets = () => {
//   const ppd = new ethers.Contract(
//     ppdContract,
//     ppdAbi.body,
//     Ethers.provider().getSigner()
//   );
//   console.log("llamando cs");
//   try {
//     ppd.getComposerSheets(0).then((res) => {
//       console.log("en composer sheets");
//       console.log(res);
//       // const comp = res && res.map((r) => r[0]);
//       // State.update({ composers: comp });
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };

const isUserRegistered = () => {
  if (!state.users) return false;

  const userTmp = state.users.find(
    (user) => user[0].toLowerCase() === state.sender
  );

  if (userTmp != undefined) setUser(userTmp);

  return userTmp != undefined;
};

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
    getUsers();
  }
}

return (
  <>
    {user !== "" && (
      <div class="mt-4 p-3">
        <button
          onClick={() => {
            State.update({ visibleObj: "composerList" });
          }}
        >
          Get composer List
        </button>
        <button
          onClick={() => {
            State.update({ visibleObj: "userSheets" });
          }}
        >
          Get my Sheets
        </button>
      </div>
    )}

    {!!state.sender ? (
      <>
        {!isUserRegistered() && (
          <Widget src={`beachsunandrockandroll.near/widget/registerUser`} />
        )}
      </>
    ) : (
      <Web3Connect connectLabel="Connect with Web3" />
    )}
    {/*{user && <>{user[1]}</>}

    */}
    {!!state.sender &&
      isUserRegistered() &&
      state.visibleObj === "userSheets" && (
        <Widget
          src={`beachsunandrockandroll.near/widget/userSheets`}
          props={{
            action: (sheetId) => {
              State.update({ visibleObj: "sheet", sheetIdx: sheetId });
            },
          }}
        />
      )}
    {!!state.sender && isUserRegistered() && state.visibleObj === "sheet" && (
      <Widget
        src={`beachsunandrockandroll.near/widget/sheet`}
        props={{
          action: viewSheet,
          sheetIdx: state.sheetIdx,
          back: () => State.update({ visibleObj: "userSheets" }),
        }}
      />
    )}
    {!!state.sender &&
      isUserRegistered() &&
      state.visibleObj === "composerList" && (
        <Widget
          src={`beachsunandrockandroll.near/widget/composerList`}
          props={{
            back: () => State.update({ visibleObj: "userSheets" }),
          }}
        />
      )}
  </>
);
