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

const cannabisHistory = [
  { text: "First time", value: "First time" },
  { text: "A few times", value: "A few times" },
  { text: "Tried a range of doses", value: "Tried a range of doses" },
  { text: "Very experienced", value: "Very experienced" },
  { text: "Expert/Professional", value: "Expert/Professional" },
];

const cannabisLevel = [
  { text: "None", value: "None" },
  { text: "Low", value: "Low" },
  { text: "Medium", value: "Medium" },
  { text: "High", value: "High" },
];

const psychonautLevel = [
  { text: "Only food & water.", value: "Newbie" },
  { text: "Very light substance use.", value: "Conservative" },
  { text: "Familiar with altered states.", value: "Moderate" },
  { text: "Pursuer of altered states.", value: "Liberal" },
  { text: "I've studied substances extensively.", value: "Psychonaut" },
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
  profession: [],
  income: "",
  preferred_wallet: [],
  preferred_nft_marketplace: [],
  preferred_crypto: [],
  saveState: "Started",
  height: "",
  weight: "",
  cannabisUse: "",
  cannabisTolerance: "",
  psychonautStatus: "",
  medications: [],
  conditions: [],
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
      <b>{options.birthday.label ?? "Birthday"}</b>
      <input
        id="birthday"
        type="date"
        value={state.birthday}
        onChange={(event) => handleChangeOnInput(event)}
      />
      <Widget
        src={`opencann.near/widget/profile.demographics.astrology`}
        props={{
          label: "Astrological Sign",
          placeholder: "Aries",
          astrology,
          value: state.astrological_sign,
          onChange: (astrological_sign) => State.update({ astrological_sign }),
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
          onChange: (height) => State.update({ height }),
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
          onChange: (weight) => State.update({ weight }),
          validate: () => {
            return;
          },
        }}
      />
      <Widget
        src={`opencann.near/widget/profile.demographics.sex`}
        props={{
          label: "Sex",
          placeholder: "Choose your sex",
          sexOptions,
          value: state.sex,
          onChange: (sex) =>
            State.update({
              sex: sex.map(({ name }) => ({
                name: name.trim().replaceAll(/\s+/g, "-"),
              })),
            }),
        }}
      />
      <Widget
        src={`crowdtestify.near/widget/Inputs.Text`}
        props={{
          label: "Gender",
          value: state.gender,
          onChange: (gender) => State.update({ gender }),
          validate: () => {
            return;
          },
        }}
      />
      <Widget
        src={`opencann.near/widget/profile.profession`}
        props={{
          label: "Profession",
          placeholder: "Pro Wrestler",
          value: state.profession,
          onChange: (profession) =>
            State.update({
              profession: profession.map(({ name }) => ({
                name: name.trim().replaceAll(/\s+/g, "-"),
              })),
            }),
        }}
      />
      <Widget
        src={`crowdtestify.near/widget/Inputs.Number`}
        props={{
          label: "Income",
          placeholder: "12,345",
          onChange: (income) => State.update({ income }),
          hasDollar: true,
          validate: () => {
            return;
          },
        }}
      />
      <Widget
        src={`opencann.near/widget/profile.walletArray`}
        props={{
          label: "Preferred Wallet",
          placeholder: "What is your wallet of choice?",
          value: state.preferred_wallet,
          onChange: (preferred_wallet) =>
            State.update({
              preferred_wallet: preferred_wallet.map(({ name }) => ({
                name: name.trim().replaceAll(/\s+/g, "-"),
              })),
            }),
        }}
      />
      <Widget
        src={`opencann.near/widget/profile.marketArray`}
        props={{
          label: "Preferred NFT Marketplace",
          placeholder: "Where do you like to buy and list NFTs?",
          value: state.preferred_nft_marketplace,
          onChange: (preferred_nft_marketplace) =>
            State.update({
              preferred_nft_marketplace: preferred_nft_marketplace.map(
                ({ name }) => ({
                  name: name.trim().replaceAll(/\s+/g, "-"),
                })
              ),
            }),
        }}
      />
      <Widget
        src={`opencann.near/widget/profile.tokenArray`}
        props={{
          label: "Preferred Payment Token",
          placeholder: "How do you want people to pay you?",
          value: state.preferred_crypto,
          onChange: (preferred_crypto) =>
            State.update({
              preferred_crypto: preferred_crypto.map(({ name }) => ({
                name: name.trim().replaceAll(/\s+/g, "-"),
              })),
            }),
        }}
      />
      <Widget
        src={`opencann.near/widget/profile.demographics.cannabisHistory`}
        props={{
          label: "Have you ever used cannabis before?",
          placeholder: "Have you ever used cannabis before?",
          cannabisHistory,
          value: state.cannabisUse,
          onChange: (cannabisUse) => State.update({ cannabisUse }),
        }}
      />
      <Widget
        src={`opencann.near/widget/profile.demographics.cannabisLevel`}
        props={{
          label: "What is your cannabis tolerance level?",
          placeholder: "What is your cannabis tolerance level?",
          cannabisLevel,
          value: state.cannabisTolerance,
          onChange: (cannabisTolerance) => State.update({ cannabisTolerance }),
        }}
      />
      <Widget
        src={`opencann.near/widget/profile.demographics.psychonautLevel`}
        props={{
          label: "What's your experience level with other substances?",
          placeholder: "Have you ever tried other substances?",
          psychonautLevel,
          value: state.psychonautStatus,
          onChange: (psychonautStatus) => State.update({ psychonautStatus }),
        }}
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
