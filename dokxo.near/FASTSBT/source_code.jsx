// State
State.init({
  theme: "",
  Dao_Contract: "",
  Issuer_selected: null,
  Issuer_filled: "",
  Receiver: "",
  ClassIdSelected: "",
  IssuedAT: "",
  ExpiresAt: "",
  Referencelink: "",
  Referencelink_valid: false,
  Referencelink_json: false,
  Referencehash: "",
  IssuerPropList: props.IssuerList,
  ischeckselected: true,
  Submitdisable: true,
  FormIsValid: false,
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
const proposalKinds = {
  FunctionCall: "call",
};
const actions = {
  AddProposal: "AddProposal",
};
const _type = {
  SHOWINPUT: "showinput",
};
//Custom components
const Theme = state.theme;
const daoId = props.daoId ?? "multi.sputnik-dao.near";
const accountId = props.accountId ?? context.accountId;
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

// -- Get all the roles from the DAO policy
let roles = Near.view(daoId, "get_policy");
roles = roles === null ? [] : roles.roles;
//console.log("roles", roles);
//Validate if the user can add a Function call to DAO
const isUserAllowedTo = (user, kind, action) => {
  // -- Filter the user roles
  const userRoles = [];
  for (const role of roles) {
    if (role.kind === "Everyone") {
      userRoles.push(role);
      continue;
    }
    if (!role.kind.Group) continue;
    if (accountId && role.kind.Group && role.kind.Group.includes(accountId)) {
      userRoles.push(role);
    }
  }

  // -- Check if the user is allowed to perform the action
  let allowed = false;

  userRoles
    .filter(({ permissions }) => {
      const allowedRole =
        permissions.includes(`${kind.toString()}:${action.toString()}`) ||
        permissions.includes(`${kind.toString()}:*`) ||
        permissions.includes(`*:${action.toString()}`) ||
        permissions.includes("*:*");
      allowed = allowed || allowedRole;
      return allowedRole;
    })
    .map((role) => role.name);

  return allowed;
};
const canAddProposal = isUserAllowedTo(
  accountId,
  proposalKinds.FunctionCall,
  actions.AddProposal
);

//Get alll daos
const daos = Near.view("sputnik-dao.near", "get_dao_list");
console.log("daos", daos);
const validAccoundAtIssuer = () => {
  //get the issuer and class
  const issuer =
    state.Issuer_selected != "show"
      ? state.Issuer_selected
      : state.Issuer_filled;
  const checkMintersJson = Near.view(issuer, "class_minter", {
    class: state.ClassIdSelected,
  });
  const mintAuthorities = checkMintersJson.minters;

  if (!mintAuthorities.includes(context.accountId)) {
    State.update({
      error_msg: "you are no allowed at this issuer",
      Submitdisable: true,
    });
    return (isValid = false);
  }
};

//console.log("checkMintersJson", checkMintersJson);
const isMintAuthority = console.log("isMintAuthority", isMintAuthority);

const validateReceiverHasSbt = () => {
  const issuer =
    state.Issuer_selected != _type.SHOWINPUT
      ? state.Issuer_selected
      : state.Issuer_filled;
  const fetchlnk = `https://api.pikespeak.ai/sbt/has-sbt?holder=${
    state.Receiver
  }&class_id=${state.ClassIdSelected}&issuer=${issuer}&registry=${
    props.registry ? props.registry : "registry.i-am-human.near"
  }`;
  console.log("fetching", fetchlnk);
  asyncFetch(fetchlnk, httpRequestOpt).then((res) => {
    console.log("validateReceiverHasSbt", res);
    if (res.body) {
      //the receiver already has sbt
      State.update({
        error_msg: "The receiver already has SBT",
        Submitdisable: false,
      });
      return true;
    }
  });
};

//Methods
const validatedInputs = async () => {
  //local methods
  const isEmpty = (str) => str.trim() === "";
  const showError = (msg) => {
    return {
      error_msg: msg,
      Submitdisable: true,
      FormIsValid: false,
    };
  };
  const showSuccess = () => {
    return {
      error_msg: "",
      Submitdisable: false,
      FormIsValid: true,
    };
  };

  if (isEmpty(state.Dao_Contract)) {
    //validate the user filled the Dao input
    console.log("showerror");
    const res = showError("Write the DAO contract");
    console.log("res", res);
    return State.update(res);
  }
  if (!daos.includes(state.Dao_Contract)) {
    //validate that the DAO provided is a valid one
    return State.update(showError("Is not a Dao contract"));
  }
  if (isEmpty(state.Issuer_selected)) {
    //validate the user selected an issuer prefilled
    return State.update(showError("Select an issuer"));
  }

  if (
    state.Issuer_selected === _type.SHOWINPUT &&
    isEmpty(state.Issuer_filled)
  ) {
    // the user will provide a new issuer
    return State.update(showError("provide an issuer"));
  }
  if (isEmpty(state.Receiver)) {
    //validate the user filled the Receiver
    return State.update(showError("Write the receiver"));
  }
  if (state.ischeckselected === true) {
    if (state.ClassIdSelected === "0") {
      //validate the user dont add a o in the class id
      return State.update({
        ClassIdSelected: "",
        error_msg: "Select a token class",
        Submitdisable: true,
        FormIsValid: false,
      });
    }

    if (isEmpty(state.ClassIdSelected)) {
      //validate the user select a class id higher than 0
      return State.update(showError("Select a token class"));
    } else {
      if (
        (state.Receiver && state.Issuer_selected) ||
        (state.Issuer_selected && state.ClassIdSelected)
      ) {
        const issuer =
          state.Issuer_selected != _type.SHOWINPUT
            ? state.Issuer_selected
            : state.Issuer_filled;
        const fetchlnk = `https://api.pikespeak.ai/sbt/has-sbt?holder=${
          state.Receiver
        }&class_id=${state.ClassIdSelected}&issuer=${issuer}&registry=${
          props.registry ? props.registry : "registry.i-am-human.near"
        }`;
        console.log("fetching", fetchlnk);
        asyncFetch(fetchlnk, httpRequestOpt).then((res) => {
          console.log("validateReceiverHasSbt", res);
          if (res.body) {
            //the receiver already has sbt
            return State.update(showError("The receiver already has SBT"));
          }
        });
      }

      //validate alll is good
      return State.update(showSuccess());
    }
  }

  return State.update(showSuccess());
};
//split and improve subtmit
const createMeta = () => {
  const meta = {
    receiver: state.Receiver,
    metadata: {
      class: state.ClassIdSelected,
    },
    reference: state.Referencelink || null,
    reference_hash: state.Referencehash || null,
  };
  return JSON.stringify(meta);
};
const encodeArgs = (meta) => {
  return Buffer.from(meta, "utf-8").toString("base64");
};
const Submitform = () => {
  const isValid = validatedInputs();

  if (isValid) {
    const meta = createMeta();
    const argsencoded = encodeArgs(meta);

    const { Dao_Contract, Issuer_selected, Issuer_filled } = state;

    const receiver_id =
      Issuer_selected === _type.SHOWINPUT ? Issuer_filled : Issuer_selected;

    Near.call([
      {
        contractName: Dao_Contract,
        methodName: "add_proposal",
        args: {
          proposal: {
            description: "create proposal to mint SBT",
            kind: {
              FunctionCall: {
                receiver_id,
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
    console.log("not valid");
  }
};

const validateReference = (link) => {
  try {
    if (state.Referencelink.length > 0) {
      //fetch the link
      asyncFetch(state.Referencelink).then((response) => {
        //validate if its a JSON
        if (response.contentType.trim() === "application/json") {
          // convert to Uft8 the body content
          const toUtf8 = ethers.utils.toUtf8Bytes(
            JSON.stringify(response.body)
          );
          //Encrypt the Uft8 string into Sha256
          const encryptSha256 = ethers.utils.keccak256(toUtf8);
          //parse the sha256 into a base64 string
          let bodyEncoded = Buffer.from(encryptSha256, "utf-8").toString(
            "base64"
          );
          //modify the state and mark the Rererence as a valid json and fill the reference hash with the
          // Base64(sha256(bodycontent))
          State.update({
            Referencelink_valid: true,
            Referencelink_json: true,
            Referencehash: bodyEncoded,
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
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
                <option value={_type.SHOWINPUT}>Other -- write it.</option>
              </select>
            </div>
            {state.Issuer_selected === _type.SHOWINPUT ? (
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
              <CustomCheckbox
                onClick={() => {
                  State.update({ ischeckselected: !state.ischeckselected });
                  validatedInputs();
                }}
              >
                {state.ischeckselected ? (
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      "object-fit": "cover",
                      "vertical-align": " initial",
                    }}
                    src={CheckIcon}
                  />
                ) : (
                  <></>
                )}
              </CustomCheckbox>
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
                        step="1"
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
                        onChange={(e) => {
                          State.update({ Referencelink: e.target.value });
                          validateReference(e.target.value);
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
          {!canAddProposal && (
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
                  color: "#850000",
                  "font-size": "10px",
                }}
              >
                You are not allowed to do a FunctionCall
              </a>
            </div>
          )}
          <div class="Submitcontainer">
            <a
              style={{
                color: "#850000",
                "font-size": "10px",
              }}
            >
              {state.error_msg}
            </a>
            {context.accountId ? (
              <SubmitBtn
                disabled={state.Submitdisable && canAddProposal}
                onClick={() => {
                  Submitform();
                }}
              >
                {" "}
                Submit{" "}
              </SubmitBtn>
            ) : (
              <SubmitBtn disabled onClick={() => {}}>
                Connect
              </SubmitBtn>
            )}
          </div>
        </div>
      </div>
    </div>
  </Theme>
);
