const accountId = props.accountId ?? context.accountId;
const onChange = props.onChange;
const options = props.options;

if (context.loading) {
  return (
    <>
      <h2>)"Loading..."</h2>
    </>
  );
}

if (!accountId) {
  return (
    <>
      <h2>"Please sign in with a NEAR ecosystem wallet to use this widget"</h2>
    </>
  );
}

let optInInfo = {};
let changeLog = [];

const initialState = {
  accountId,
  birthday: "",
  astrological_sign: "",
  age: "",
  gender: "",
  profession: "",
  income: "",
  preferred_wallet: "",
  preferred_nft_marketplace: "",
  preferred_crypto: "",
  saveState: "Started",
  sex: "",
  height: "",
  weight: "",
  cannabisUse: "",
  cannabisTolerance: "",
  psychonautLevel: "",
  medications: "",
  conditions: "",
  celebrity: "",
  email: "",
};

State.init(initialState);

function fetchDataFromAPI() {
  const data = fetch(``, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

function reportEventToAPI() {
  const data = fetch(`https://dev.kitwallet.app/producer/${accountId}/event`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accountId,
      events: [{ type: "updateProfile", data: "coolwhip" }],
    }),
  });
}

function registerProfileToAPI() {
  const data = fetch(`https://dev.kitwallet.app/producer`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accountId,
      profile: state,
    }),
  });
}

function setFormStatusOnAccount() {
  State.update({ optInInfoFormStatus: "completed" });
}

function addChangeLogEntry() {
  const dateTime = Date.now();
  // const timestampUTC = dateTime.toUTCString();
  const changeEvent = { thisEvent: "form submitted", timestamp: dateTime };
  changeLog.push(changeEvent);
  return changeLog;
}

function handleOnClick() {
  reportEventToAPI();
  registerProfileToAPI();
}

function handleOnCommit() {
  setFormStatusOnAccount();
}

function handleChangeOnInput(event) {
  State.update({
    [event.target.id]: event.target.value,
    saveState: "in progress...",
  });
}

let page = (
  <div>
    <h2>{`Hello, ${accountId}!`}</h2>
    <hr></hr>
    <div>
      <h5>Demographic Data</h5>
    </div>
    <div>
      <ul>
        <li>All items below are optional and encrypted by default.</li>
        <li>Your account retains exclusive control over this data</li>
        <li>
          You can opt-in to enable decryption of this data for additional
          rewards by adjusting your{" "}
          <a href="#/sking.near/widget/DAO.Permissions">Permissions Settings</a>
          .
        </li>
      </ul>
    </div>
    <p>
      {`Instructions: Please fill out the following information. This data is private!
      Only include the data you are willing to share with analytics queries. 
      Everytime your data is accessed in a query, you will earn NEAR!`}
    </p>
    <p></p>
    <div id="optInDataForm">
      {options.birthday.label ?? "Birthday"}
      <input
        id="birthday"
        type="date"
        value={state.birthday}
        onChange={(event) => handleChangeOnInput(event)}
      />
      {options.astrological_sign.label ?? "Astrological Sign"}
      <input
        id="astrological_sign"
        type="text"
        value={state.astrological_sign}
        onChange={(event) => handleChangeOnInput(event)}
      />
      {options.age.label ?? "Age"}
      <input
        id="age"
        type="text"
        value={state.age}
        onChange={(event) => handleChangeOnInput(event)}
      />
      {options.height.label ?? "Height"}
      <input
        id="height"
        type="text"
        value={state.height}
        onChange={(event) => handleChangeOnInput(event)}
      />
      {options.weight.label ?? "Weight"}
      <input
        id="weight"
        type="text"
        value={state.weight}
        onChange={(event) => handleChangeOnInput(event)}
      />
      {options.sex.label ?? "Sex"}
      <input
        id="sex"
        type="text"
        value={state.sex}
        onChange={(event) => handleChangeOnInput(event)}
      />
      {options.gender.label ?? "Gender"}
      <input
        id="gender"
        type="text"
        value={state.gender}
        onChange={(event) => handleChangeOnInput(event)}
      />
      {options.profession.label ?? "Profession"}
      <input
        id="profession"
        type="text"
        value={state.profession}
        onChange={(event) => handleChangeOnInput(event)}
      />
      {options.income.label ?? "Income"}
      <input
        id="income"
        type="text"
        value={state.income}
        onChange={(event) => handleChangeOnInput(event)}
      />
      {options.preferred_wallet.label ?? "Preferred Wallet"}
      <input
        id="preferred_wallet"
        type="text"
        value={state.preferred_wallet}
        onChange={(event) => handleChangeOnInput(event)}
      />
      {options.preferred_nft_marketplace.label ?? "Preferred NFT Marketplace"}
      <input
        id="preferred_nft_marketplace"
        type="text"
        value={state.preferred_nft_marketplace}
        onChange={(event) => handleChangeOnInput(event)}
      />
      {options.preferred_crypto.label ?? "Preferred Crypto"}
      <input
        id="preferred_crypto"
        type="text"
        value={state.preferred_crypto}
        onChange={(event) => handleChangeOnInput(event)}
      />
      {options.cannabisUse.label ?? "Have you ever used cannabis before?"}
      <input
        id="cannabisUse"
        type="text"
        value={state.cannabisUse}
        onChange={(event) => handleChangeOnInput(event)}
      />
      {options.cannabisTolerance.label ??
        "What is your cannabis tolerance level?"}
      <input
        id="cannabisTolerance"
        type="text"
        value={state.cannabisTolerance}
        onChange={(event) => handleChangeOnInput(event)}
      />
      {options.substances.label ?? "Have you ever tried other substances?"}
      <input
        id="substances"
        type="text"
        value={state.substances}
        onChange={(event) => handleChangeOnInput(event)}
      />
      {options.medications.label ?? "Currently prescribed medication(s)"}
      <input
        id="medications"
        type="text"
        value={state.medications}
        onChange={(event) => handleChangeOnInput(event)}
      />
      {options.conditions.label ??
        "Current health conditions (including mental health conditions)"}
      <input
        id="conditions"
        type="text"
        value={state.conditions}
        onChange={(event) => handleChangeOnInput(event)}
      />
      {options.celebrity.label ??
        "What famous person (or character) would you like to hang out with while consuming cannabis together?"}
      <input
        id="celebrity"
        type="text"
        value={state.celebrity}
        onChange={(event) => handleChangeOnInput(event)}
      />
      {options.email.label ?? "Email Address"}
      <input
        id="email"
        type="text"
        value={state.email}
        onChange={(event) => handleChangeOnInput(event)}
      />
      <p></p>
      <CommitButton
        data={{ optInInfoFormStatus: state.saveState }}
        onClick={handleOnClick}
        onCommit={handleOnCommit}
      >
        Save Opt-In Info
      </CommitButton>
      <button onClick={() => State.update(initialState)}>Reset Form</button>
    </div>
    <p></p>
  </div>
);

return page;
