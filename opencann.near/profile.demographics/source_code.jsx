const accountId = props.accountId ?? context.accountId;
const onChange = props.onChange;
const options = props.options;

//const medications = VM.require("opencann.near/widget/pharm.array"};
//const conditions = VM.require("opencann.near/widget/conditions.array"};

const astrology = [
  { text: "Aries", value: "Aries" },
  { text: "Taurus", value: "Taurus" },
  { text: "Gemini", value: "Gemini" },
  { text: "Cancer", value: "Cancer" },
  { text: "Leo", value: "Leo" },
  { text: "Virgo", value: "Virgo" },
  { text: "Libra", value: "Libra" },
  { text: "Scorpio", value: "Scorpio" },
  { text: "Sagittarius", value: "Sagittarius" },
  { text: "Capricorn", value: "Capricorn" },
  { text: "Aquarius", value: "Aquarius" },
  { text: "Pisces", value: "Pisces" },
];

const sexOptions = [
  { text: "Male", value: "Male" },
  { text: "Female", value: "Female" },
  { text: "Intersex", value: "Intersex" },
  { text: "Other", value: "Other" },
];

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
  sex: "",
  gender: "",
  profession: "",
  income: "",
  preferred_wallet: "",
  preferred_nft_marketplace: "",
  preferred_crypto: "",
  saveState: "Started",
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
const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 60%;
  gap: 1em;
`;

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
      <Widget
        src={`crowdtestify.near/widget/Inputs.Select`}
        props={{
          label: "Astrological Sign",
          placeholder: "Aries",
          astrology,
          value: state.astrological_sign,
          onChange: (astrological_sign) => State.update({ astrological_sign }),
          validate: () => {
            return;
          },
        }}
      />
      <Widget
        src={`crowdtestify.near/widget/Inputs.Number`}
        props={{
          label: "Age",
          placeholder: "Example: 21",
          onChange: (event) => State.update({ age }),
          validate: () => {
            // add age verification???
            return;
          },
        }}
      />
      <Widget
        src={`crowdtestify.near/widget/Inputs.Number`}
        props={{
          label: "Height",
          placeholder: "Example: 175cm",
          onChange: (event) => State.update({ height }),
          validate: () => {
            return;
          },
        }}
      />
      <Widget
        src={`crowdtestify.near/widget/Inputs.Number`}
        props={{
          label: "Weight",
          placeholder: "Example: 150lbs",
          onChange: (event) => State.update({ weight }),
          validate: () => {
            return;
          },
        }}
      />
      <Widget
        src={`crowdtestify.near/widget/Inputs.Text`}
        props={{
          label: "Sex",
          placeholder: "Example: Female",
          value: state.sex,
          onChange: (event) => State.update({ sex }),
          validate: () => {
            return;
          },
        }}
      />
      <Widget
        src={`crowdtestify.near/widget/Inputs.Text`}
        props={{
          label: "Gender",
          value: state.gender,
          onChange: (event) => State.update({ gender }),
          validate: () => {
            return;
          },
        }}
      />
      <Widget
        src={`crowdtestify.near/widget/Inputs.Text`}
        props={{
          label: "Profession",
          placeholder: "Example: Pro Wrestler",
          value: state.profession,
          onChange: (event) => State.update({ profession }),
          validate: () => {
            return;
          },
        }}
      />
      <Widget
        src={`crowdtestify.near/widget/Inputs.Number`}
        props={{
          label: "Income",
          placeholder: "12,345",
          onChange: (event) => State.update({ income }),
          hasDollar: true,
          validate: () => {
            return;
          },
        }}
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
