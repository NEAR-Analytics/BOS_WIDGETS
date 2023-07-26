// State
State.init({
  theme: "",
  Dao_Contract: "",
  Issuer_selected: null,
  Issuer_filled: "",
  Receiver: "",
  ClassIdSelected: 1,
  IssuedAT: "",
  ExpiresAt: "",
  Referencelink: "",
  Referencelink_valid: false,
  Referencelink_json: false,
  Referencehash: "",
  IssuerPropList: props.IssuerList,
  ischeckselected: true,
  Submitdisable: true,
});
const MAX_SAFE_INTEGER = 2e53 - 1;
const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800"
).body;
const css = fetch(
  "https://raw.githubusercontent.com/dokxo96/fastSbt/master/fastsbt.css?token=GHSAT0AAAAAACEQ4SVRD7BVOYKVKF5B4FEAZF36DWQ"
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
const NDCicon =
  "https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmP5CETfUsGFqdcsnrfPgUk3NvRh78TGZcX2srfCVFuvqi?_gl=1*faq1pt*_ga*Mzc5OTE2NDYyLjE2ODg1MTY4MTA.*_ga_5RMPXG14TE*MTY4OTg3Njc1OC4xMS4xLjE2ODk4NzY4MjYuNjAuMC4w";
const CheckIcon =
  "https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmVGE45rLuHiEHh8RPfL11QsQBXVDfmdV3pevZU7CG1ucg?preview=1&_gl=1*1dpaowv*_ga*Mzc5OTE2NDYyLjE2ODg1MTY4MTA.*_ga_5RMPXG14TE*MTY4OTg4MDMyOS4xMi4xLjE2ODk4ODA3MTAuMTkuMC4w";
const SubmitBtn = styled.button`
display: flex;
width: 107px;
padding: 8px 12px;
justify-content: center;
align-items: center;
gap: 10px;
color:#000;
display: flex;
width: 107px;
padding: 8px 12px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 10px;
 border-width: 1px;
  border: solid 1px transparent;
 
 
  background-image: ${
    state.Submitdisable
      ? "linear-gradient(#a4a39e, #cbcac8), radial-gradient(circle at top left,#000000, #000000);"
      : "linear-gradient(#FFD50D, #FFD50D), radial-gradient(circle at top left,#F0E1CE, #F0E1CE);"
  }
  background-origin: border-box;
  background-clip: padding-box, border-box;
@media only screen and (max-width: 480px) {
 
}
`;

const CustomCheckbox = styled.div`
 width:20px;
 height:20px;
 background:${
   state.ischeckselected
     ? "linear-gradient(90deg, #9333EA 0%, #4F46E5 100%);"
     : "#F8F8F9;"
 }
border: medium solid ${
  state.ischeckselected
    ? "linear-gradient(90deg, #9333EA 0%, #4F46E5 100%);"
    : "black"
};
border-radius:4px;
 
`;

const validatedInputs = async () => {
  console.log(state);
  const isEmpty = (str) => str.trim() === "";
  let isValid = false;
  if (isEmpty(state.Dao_Contract)) {
    console.log("V:DAO");
    State.update({ error_msg: "Write the DAO contract", Submitdisable: true });
    return (isValid = false);
  }
  if (isEmpty(state.Issuer_selected)) {
    console.log("V:Issuer");
    State.update({ error_msg: "Select an issuer", Submitdisable: true });
    return (isValid = false);
  }
  // the user will provide a new issuer
  if (state.Issuer_selected === "showinput" && isEmpty(state.Issuer_filled)) {
    console.log("V:META");
    State.update({ error_msg: "provide an issuer", Submitdisable: true });
    return (isValid = false);
  }
  if (isEmpty(state.Receiver)) {
    console.log("V:Receiver ");
    State.update({ error_msg: "Write the receiver", Submitdisable: true });
    return (isValid = false);
  }
  if (state.ischeckselected === true) {
    console.log("se activo la meta", isEmpty(state.ClassIdSelected));
    if (isEmpty(state.ClassIdSelected)) {
      console.log("select toke", isEmpty(state.ClassIdSelected));
      State.update({ error_msg: "Select a token class", Submitdisable: true });
      return (isValid = false);
    } else {
      State.update({ error_msg: "Select a token class", Submitdisable: false });
      return (isValid = true);
    }
  }

  State.update({ Submitdisable: false });
  return (isValid = true);
};
const Submitform = () => {
  if (validatedInputs()) {
    console.log("es valido");
    const meta = JSON.stringify({
      receiver: state.Receiver,
      metadata: {
        class: state.ClassIdSelected,
      },
      reference: state.Referencelink ? state.Referencelink : null,
      reference_hash: state.Referencehash ? state.Referencehash : null,
    });

    const argsencoded = Buffer.from(meta, "utf-8").toString("base64");
    Near.call([
      {
        contractName: state.Dao_Contract,
        methodName: "add_proposal",
        args: {
          proposal: {
            description: "create proposal to mint SBT",
            kind: {
              FunctionCall: {
                receiver_id:
                  state.Issuer_selected === "showinput"
                    ? state.Issuer_filled
                    : state.Issuer_selected,
                actions: [
                  {
                    method_name: "sbt_mint",
                    args: argsencoded,
                    deposit: "80000000000000000000000",
                    gas: "200000000000000",
                  },
                ],
              },
            },
          },
        },
        deposit: 100000000000000000000000,
        gas: "219000000000000",
      },
    ]);
  } else {
    console.log("no es valido");
  }
};

const validateReference = () => {
  try {
    if (state.Referencelink.length > 0) {
      const response = fetch(state.Referencelink);

      const istJson = response.contentType.trim() === "application/json";
      let bodyEncoded = Buffer.from(response.body, "utf-8").toString("base64");

      console.table(
        "res",
        response,
        "istJson",
        istJson,
        "bodyEncoded",
        bodyEncoded
      );
      State.update({
        Referencelink_valid: response.status === 200 ? true : false,
        Referencelink_json: istJson ? true : false,
        Referencehash: istJson ? bodyEncoded : "",
      });

      console.log(
        "state.Referencelink: " + state.Referencelink,
        "state.Referencelink_valid: " + state.Referencelink_valid,
        "state.Referencelink_json: " + state.Referencelink_json
      );
    }
  } catch {
    State.update({
      Referencelink_valid: false,
      Referencelink_json: false,
    });
  }
};

return (
  <Theme>
    <div class="ModalCard">
      <div class="Header">
        <img src={NDCicon} />
        <label class="Headerlabel">SBT DAO minter</label>
      </div>
      <div class="CardStyled" name="card">
        <div class=" BodyForm mx-auto">
          <div class="Rowcont">
            <div class="Colcont">
              <h1 class="H1styled">Minter DAO *</h1>
              <input
                class="InputStyled"
                type="text"
                placeholder="Input DAO contract address"
                value={state.Dao_Contract}
                onChange={(e) => {
                  State.update({ Dao_Contract: e.target.value });
                  validatedInputs();
                }}
              />
            </div>
            <div class="Colcont">
              <h1 class="H1styled">Issuer *</h1>
              <select
                class="Dropdown"
                placeholder="Input DAO contract address "
                value={state.Issuer_selected}
                onChange={(e) => {
                  State.update({ Issuer_selected: e.target.value });
                  validatedInputs();
                }}
              >
                <option default value="">
                  Select issuer
                </option>
                {props.IssuerList ? (
                  props.IssuerList.map((item) => {
                    return <option value={item.value}> {item.label}</option>;
                  })
                ) : (
                  <></>
                )}
                <option value="showinput">Other -- write it.</option>
              </select>
            </div>
            {state.Issuer_selected === "showinput" ? (
              <div class="Colcont">
                <h1 class="H1styled">Enter issuer *</h1>
                <input
                  class="InputStyled"
                  type="text"
                  placeholder="Input Issuer"
                  value={state.Issuer_filled}
                  onChange={(e) => {
                    State.update({ Issuer_filled: e.target.value });
                    validatedInputs();
                  }}
                />
              </div>
            ) : (
              <></>
            )}
            <div class="Colcont">
              <h1 class="H1styled">Receiver *</h1>
              <input
                class="InputStyled"
                type="text"
                placeholder="dokxo.near"
                value={state.Receiver}
                onChange={(e) => {
                  State.update({ Receiver: e.target.value });
                  validatedInputs();
                }}
              />
            </div>
          </div>
          <div className="d-flex flex-column mt-2">
            <div class="d-flex">
              <h1 class="H1styled">Metadata</h1>
            </div>
            {state.ischeckselected ? (
              <div class="MetaCard">
                <div class="row  col-sm-12  mx-0  gap-1   ">
                  <div class="Metarow" name="Classid">
                    <div class="MetaTitles">{"Class id *"}</div>
                    <div>
                      <input
                        class="Dropdown"
                        type="number"
                        placeholder="write the class id"
                        min={1}
                        max={MAX_SAFE_INTEGER}
                        value={state.ClassIdSelected}
                        onChange={(e) => {
                          State.update({ ClassIdSelected: e.target.value });
                          validatedInputs();
                        }}
                      ></input>
                    </div>
                  </div>

                  <div class="Metarow">
                    <div class="MetaTitles">
                      {"Reference = link to a JSON file (eg, IPFS)."}
                    </div>
                    <div>
                      <input
                        class="FormInput"
                        value={state.Referencelink}
                        placeholder="Write your reference (optional)"
                        onChange={async (e) => {
                          State.update({ Referencelink: e.target.value });

                          validateReference();
                        }}
                      />
                    </div>
                    <div
                      style={{
                        "justify-content": " end",
                        gap: "1rem",
                        margin: "4px 2px 0px",
                        display: "flex",
                        "font-size": "10px",
                      }}
                    >
                      <a
                        style={{
                          color: state.Referencelink_json
                            ? "#008500"
                            : "#FF0000",
                          "font-size": "10px",
                        }}
                      >
                        valid json
                      </a>
                    </div>
                  </div>
                  <div class="Metarow">
                    <div class="MetaTitles">
                      {"Reference hash = Base64-encoded sha256 hash of JSON."}
                    </div>
                    <div style={{ "font-size": "10px" }}>
                      <input
                        class="FormInput"
                        disabled
                        value={state.Referencehash}
                        placeholder="Write your reference hash (optional)"
                        onChange={(e) => {
                          State.update({ Referencehash: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div class="Separator"></div>
            )}
            <div className="d-flex flex-column mt-2">
              <h1 class="H1styled">Memo </h1>
              <input
                class="InputStyled"
                type="text"
                placeholder="Write a memo"
                value={state.Memo}
                onChange={(e) => {
                  State.update({ Memo: e.target.value.substring(0, 200) });
                  validatedInputs();
                }}
              />
              <div
                style={{
                  "justify-content": " end",
                  gap: "1rem",
                  margin: "4px 2px 0px",
                  display: "flex",
                  "font-size": "10px",
                }}
              >
                <a
                  style={{
                    color:
                      state.Memo.length < 200 || state.Memo.length === undefined
                        ? "#008500"
                        : "#FF0000",
                    "font-size": "10px",
                  }}
                >
                  {state.Memo.length === undefined ? 0 : state.Memo.length} of
                  200
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="FooterForm" name="Footerform">
          <div class="Submitcontainer">
            <SubmitBtn
              disabled={state.Submitdisable}
              onClick={() => {
                Submitform();
              }}
            >
              {" "}
              Submit{" "}
            </SubmitBtn>
          </div>
        </div>
      </div>
    </div>
  </Theme>
);
