// State
State.init({
  theme: "",
  Dao_Contract: "",
  Issuer_selected: null,
  Issuer_filled: "",
  Receiver: "",
});
//const
const MAX_SAFE_INTEGER = 2e53 - 1;
const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800"
).body;
const css = fetch(
  "https://raw.githubusercontent.com/dokxo96/fastSbt/master/fastsbt.css?token=GHSAT0AAAAAACEQ4SVRD7BVOYKVKF5B4FEAZF36DWQ"
).body;
const httpRequestOpt = {
  headers: {
    "x-api-key": props.api_key
      ? props.api_key
      : "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5",
  },
};
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
const _type = {
  SHOWINPUT: "showinput",
};
//Custom components
const Theme = state.theme;

const handleDao_Contract = (e) => {
  console.log("padre", e);
  State.update({ Dao_Contract: e });
  //props.validatedInputs();
};
const handleIssuer_filled = (e) => {
  console.log("padre", e);
  State.update({ Issuer_filled: e });

  console.log(state);
  //props.validatedInputs();
};
const handleIssuer_selected = (e) => {
  console.log("padre", e);
  State.update({ Issuer_selected: e });

  console.log(state);
  //props.validatedInputs();
};

const handleReceiver = (e) => {
  console.log("padre", e);
  State.update({ Receiver: e });

  //props.validatedInputs();
};
const PropsIssuerList = props.IssuerList
  ? props.IssuerList.map((item) => {
      return { value: item.value, label: item.label };
    })
  : null;

const Dropdowndefaultoptions = [
  { value: "", label: "Select issuer", def: true },
  { value: "registry.i-am-human.near", label: "registry.i-am-human.near" },
  {
    value: "registry-v1.gwg-testing.near",
    label: "registry-v1.gwg-testing.near",
  },
  {
    value: "registry-v1.gwg-testing.near",
    label: "registry-v1.gwg-testing.near",
  },
  { value: "issuer.regens.near", label: "issuer.regens.near" },
  { value: "issuer.proofofvibes.near", label: "issuer.proofofvibes.near" },
  { value: _type.SHOWINPUT, label: "Other -- write it." },
];
return (
  <Theme>
    <div class="Rowcont">
      <Widget
        src={`dokxo.near/widget/FastSBT_Input`}
        props={{
          title: "Minter DAO",
          placeholder: "Input DAO contract address",
          value: state.Dao_Contract,
          onchangeFunc: handleDao_Contract,
        }}
      />
      <Widget
        src={`dokxo.near/widget/FastSBT_Dropdown`}
        props={{
          title: "Issuer",
          placeholder: "Input DAO contract address ",
          value: state.Issuer_selected,
          onchangeFunc: handleIssuer_selected,
          options: Dropdowndefaultoptions,
        }}
      />

      {state.Issuer_selected === _type.SHOWINPUT ? (
        <Widget
          src={`dokxo.near/widget/FastSBT_Input`}
          props={{
            title: "Enter issuer",
            placeholder: "Input Issuer",
            value: state.Issuer_filled,
            onchangeFunc: handleIssuer_selected,
          }}
        />
      ) : (
        <></>
      )}

      <Widget
        src={`dokxo.near/widget/FastSBT_Input`}
        props={{
          title: "Receiver",
          placeholder: "dokxo.near",
          value: state.Receiver,
          onchangeFunc: handleReceiver,
        }}
      />
    </div>
  </Theme>
);
