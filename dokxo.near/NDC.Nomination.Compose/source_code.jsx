let Nominationcontract = "nominations-v1.gwg-testing.near";
let Socialcontract = "social.near";

let profileInfo = Social.getr(`${context.accountId}/profile`);
console.log("profileInfo", profileInfo);
let imageIsNFT = profileInfo.image.nft ? true : false;
let nftData = profileInfo.image.nft;
const getNftCid = Near.view(nftData.contractId, "nft_token", {
  token_id: nftData.tokenId,
});
console.log("getNftCid", getNftCid);
let isNFTCid = getNftCid.metadata.media ? getNftCid.metadata.media : "";
// State
State.init({
  theme,

  img: {
    uploading: "false",
    cid: isNFTCid,
    name: isNFTCid ? "Uploaded from Social Profile" : "",
  },
  name: profileInfo.name ? profileInfo.name : "",
  profileAccount: context.accountId ? "@" + context.accountId : "",
  house_intended: "",
  issued1: "",
  issued2: "",
  issued3: "",
  addition_platform: "",

  afiliation: [
    {
      company_name: "",
      start_date: "",
      end_date: "",
      role: "",
    },
  ],
  agreement: "false",
  tags: "",
  error_msg: "",
});

const ModalCard = styled.div`
 position: absolute;
  z-index: 99;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.70);
  overflow:auto;
@media only screen and (max-width: 480px) {
 
}
`;

const CardStyled = styled.div`
 
width: 60%;
height: 100%;
 
background: #F8F8F9;
gap:10px;
border-radius: 10px;
margin-left:auto;
margin-right:auto;
overflow: auto;
@media only screen and (max-width: 480px) {
  width: 100%;
}

  `;

const CardForm = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
 
width: 100%;
height: auto;
 
margin-top:18px;
@media only screen and (max-width: 480px) {
  
   
   
}
  `;

const FormsectionHouse_ = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
 
width: 33%;
height: 54px;
flex: none;
display: none;
order: 6;
flex-grow: 0;
@media only screen and (max-width: 480px) {
  
  
  display: flex;
}

  `;
const FormsectionHouseDropdown = styled.select`
box-sizing: border-box;
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 8px 10px;
gap: 10px;
width: 100%;
height: 32px;
background: #FFFFFF;
border: 1px solid #D0D6D9;
border-radius: 8px;
flex: none;
order: 1;

font-size:12px;
font-family: 'Avenir';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 120%;
 
display: flex;
align-items: center;

color: #828688;
@media only screen and (max-width: 480px) {
   
}
  `;

const H1styled = styled.h1`
 
margin-left:16px;
margin-top:16px;
margin-right:auto; 
width: 104px;
height: 19px;
font-family: 'Avenir';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 120%;
color: #000000;
`;
const H2styled = styled.h1`
 
height: 14px;
font-family: 'Avenir';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 120%;
display: flex;
align-items: center;
color: #000000;
flex: none;
order: 0;
flex-grow: 0;
`;

const Submitcontainer = styled.div`
display: flex;
justify-content: flex-end;
align-items: center;
gap: 8px;
margin-bottom:16px;

`;
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
 
 
  background-image: linear-gradient(#FFD50D, #FFD50D), radial-gradient(circle at top left,#F0E1CE, #F0E1CE);
  background-origin: border-box;
  background-clip: padding-box, border-box;
@media only screen and (max-width: 480px) {
 
}

`;
const CancelBtn = styled.button`
display: flex;
width: 107px;
padding: 8px 12px;
justify-content: center;
align-items: center;
gap: 10px;
color:#9333EA;
border-radius: 10px;
 border-width: 1px;
  border: solid 1px #9333EA;
  background-image: linear-gradient(#fff, #fff), radial-gradient(circle at top left,#F0E1CE, #F0E1CE);
  background-origin: border-box;
  background-clip: padding-box, border-box;
@media only screen and (max-width: 480px) {
 
}
`;

const HiddeableWidget = styled.div`
  display: none;
  @media (max-width: 480px) {
    display: block;
  }
`;

const validatedInputs = () => {
  const {
    img,
    name,
    profileAccount,
    house_intended,
    issued1,
    issued2,
    issued3,
    afiliation,
    agreement,
    tags,
  } = state;
  console.log(state);
  const isEmpty = (str) => str.trim() === "";
  const isFalse = (check) => check === "false";
  let isValid = true;
  if (img.cid === null) {
    State.update({ error_msg: "Pic an image" });
    isValid = false;
  }
  if (isEmpty(name)) {
    State.update({ error_msg: "Fill the name" });

    isValid = false;
  }
  if (isEmpty(profileAccount)) {
    State.update({ error_msg: "Fill the Profile Account" });

    isValid = false;
  }
  if (isEmpty(house_intended)) {
    State.update({ error_msg: "Select a house" });

    isValid = false;
  }
  if (isEmpty(issued1)) {
    State.update({ error_msg: "Fill the key issued 1" });

    isValid = false;
  }
  if (isEmpty(issued2)) {
    State.update({ error_msg: "Fill the key issued 2" });

    isValid = false;
  }
  if (isEmpty(issued3)) {
    State.update({ error_msg: "Fill the key issued 3" });

    isValid = false;
  }
  if (tags.split(",").length == 0) {
    State.update({ error_msg: "Write a tag" });

    isValid = false;
  }
  if (isFalse(agreement)) {
    State.update({ error_msg: "Accept the declaration" });

    isValid = false;
  }
  if (afiliation.length == 0) {
    State.update({ error_msg: "Add a affiliation" });
    isValid = false;
  }

  if (afiliation.length > 0) {
    afiliation.forEach((element) => {
      if (isEmpty(element.company_name)) {
        State.update({ error_msg: "Fill the company name" });

        isValid = false;
      }
      if (isEmpty(element.start_date)) {
        State.update({ error_msg: "Select a start date" });

        isValid = false;
      }
      if (isEmpty(element.end_date)) {
        State.update({ error_msg: "Select a end date" });

        isValid = false;
      }
      if (isEmpty(element.role)) {
        State.update({ error_msg: "Write your role" });

        isValid = false;
      }
    });
  } else {
    State.update({ error_msg: null });
  }
  return isValid;
};

const uploadFileUpdateState = (body) => {
  console.log("sending img");
  asyncFetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: { Accept: "application/json" },
    body,
  }).then(async (res) => {
    console.log("body", res.body);
    const _cid = res.body.cid;
    const _name = body.name;
    State.update({ img: { uploading: true, cid: _cid, name: _name } });
    console.log("final ", state);
  });

  console.log("final ", state.img);
};

const filesOnChange = (files) => {
  if (files) {
    State.update({ error_msg: null });
    uploadFileUpdateState(files[0]);
  }
};

const handleName = (item) => {
  State.update({ name: item, error_msg: null });
};
const handleProfile = (item) => {
  State.update({ profileAccount: item, error_msg: null });
};
const handleHouse = (item) => {
  State.update({ house_intended: item, error_msg: null });
};
const handleIssued1 = (item) => {
  State.update({ issued1: item, error_msg: null });
};
const handleIssued2 = (item) => {
  State.update({ issued2: item, error_msg: null });
};
const handleIssued3 = (item) => {
  State.update({ issued3: item, error_msg: null });
};
const handleAditional = (item) => {
  State.update({ addition_platform: item, error_msg: null });
};
const addFields = () => {
  var temp = state.afiliation;
  let object = {
    company_name: "",
    start_date: "",
    end_date: "",
    role: "",
  };

  if (temp.length === 6) {
    return;
  } else {
    temp.push(object);
    State.update({ afiliation: temp, error_msg: null });
  }
};
const removeField = (index) => {
  let data = state.afiliation;
  console.log(data);
  data.splice(index, 1);
  console.log(data);
  State.update({ afiliation: data, error_msg: null });
};
const handleAFFCompanyName = (params) => {
  let data = state.afiliation;
  console.log("updating the company", params);
  data[params.index].company_name = params.event.target.value;
  State.update({ afiliation: data, error_msg: null });
};
const handleAFFStartdate = (params) => {
  let data = state.afiliation;

  data[params.index].start_date = params.event.target.value;
  State.update({ afiliation: data, error_msg: null });
};
const handleAFFEnddate = (params) => {
  let data = state.afiliation;

  data[params.index].end_date = params.event.target.value;
  State.update({ afiliation: data, error_msg: null });
};
const handleAFFRole = (params) => {
  let data = state.afiliation;
  data[params.index].role = params.event.target.value;
  State.update({ afiliation: data, error_msg: null });
};
const handleTags = (item) => {
  State.update({ tags: item.target.value, error_msg: null });
};
const handleDeclaration = (item) => {
  State.update({ agreement: item.target.checked.toString(), error_msg: null });
};

const Self_Nominate = () => {
  //Validate the Data outPut
  if (validatedInputs()) {
    console.log("was valid");
    //Create a copy
    let newstate = Object.assign({}, state);
    //modify the affiliations into a string
    newstate.afiliation = JSON.stringify(newstate.afiliation);
    //convert all the newstate into a string
    const stateAsString = JSON.stringify(newstate);
    //Storage.privateSet("SelfNominate_Payload", state);
    //prepare a the final structure
    const data = ` {"data":{ "${context.accountId}": {"nominations":${stateAsString}} }}`;

    //convert the string into and object
    const SocialArgs = JSON.parse(data);

    // set the payloads for the batch
    let SelfNominate_Payload = {
      contractName: Nominationcontract,
      methodName: "self_nominate",
      args: {
        house: state.house_intended,
        comment: "hello dokxo",
        link: "OWA.io",
      },
      gas: 300000000000000,
      deposit: 100000000000000000000000,
    };

    let Social_Payload = {
      contractName: Socialcontract,
      methodName: "set",
      args: SocialArgs,
      gas: 300000000000000,
      deposit: 100000000000000000000,
    };

    // call the methods
    Near.call([SelfNominate_Payload, Social_Payload]);
  } else {
    //The fields are incomplete
    console.log("still invalid");
  }
};

const Test_Self_Nominate = () => {
  //Validate the Data outPut

  //Store the state in the local storage
  Storage.privateSet("SelfNominate_Payload", state);

  // call the smart contract Self nominate method
  const contract = "hello.near-examples.near";
  Near.call(contract, "set_greeting", {
    greeting: "holaaa",
  });
};

return (
  <ModalCard>
    <div
      style={{
        display: "flex",
        "justify-content": "center",
        "padding-top": "16px",
        "margin-bottom": "15px",
      }}
    >
      <HiddeableWidget>
        <Widget
          src={`syi216.near/widget/NDC.nomination.card`}
          props={{
            name: state.name,
            profileAccount: state.profileAccount,
            issued1: state.issued1,
            issued2: state.issued2,
            issued3: state.issued3,
            house_intended: state.house_intended,
            afiliation: state.afiliation,
            tags: state.tags.split(","),
          }}
        />
      </HiddeableWidget>
    </div>
    <CardStyled name="compose" class="Cardstyled">
      <div className="d-flex flex-column ">
        <div className="d-flex flex-column">
          <H1styled>Self Nominate</H1styled>
        </div>

        <CardForm name="cardform">
          <Widget
            src={`dokxo.near/widget/Compose.Profile`}
            props={{
              img: state.img,
              name: state.name,
              profileAccount: state.profileAccount,
              house_intended: state.house_intended,

              filesOnChange: (file) => filesOnChange(file),
              handleName: (text) => handleName(text),
              handleProfile: (text) => handleProfile(text),
              handleHouse: (text) => handleHouse(text),
            }}
          />
          <Widget
            src={`dokxo.near/widget/Compose.Platform`}
            props={{
              issued1: state.issued1,
              issued2: state.issued2,
              issued3: state.issued3,
              addition_platform: state.addition_platform,

              handleIssued1: (file) => handleIssued1(file),
              handleIssued2: (text) => handleIssued2(text),
              handleIssued3: (text) => handleIssued3(text),
              handleAditional: (text) => handleAditional(text),
            }}
          />
          <Widget
            src={`dokxo.near/widget/Compose.Affiliations`}
            props={{
              affiliations: state.afiliation,

              addFields: () => addFields(),
              removeField: (index) => removeField(index),
              handleAFFCompanyName: (_params) => handleAFFCompanyName(_params),
              handleAFFStartdate: (_params) => handleAFFStartdate(_params),
              handleAFFEnddate: (_params) => handleAFFEnddate(_params),
              handleAFFRole: (_params) => handleAFFRole(_params),
            }}
          />

          <Widget
            src={`dokxo.near/widget/Compose.TagAndDeclaration`}
            props={{
              agreement: state.agreement,
              tags: state.tags,
              handleTags: (item) => handleTags(item),
              handleDeclaration: (item) => handleDeclaration(item),
            }}
          />
          <div
            class="row col-sm-12  mx-0  "
            style={{
              width: "100%",
              "padding-left": "16px",
              "padding-right": "16px",
            }}
          >
            {
              <div
                style={{
                  display: "flex",
                  "justify-content": "start",
                }}
              >
                {state.error_msg ? (
                  <label
                    style={{
                      display: "flex",
                      "justify-content": "end",
                      color: "#FF0000",
                      "border-bottom": "1px solid red",
                      "font-size": "14px",
                      "margin-bottom": "10px",
                      "margin-top": "10px",
                    }}
                  >
                    {state.error_msg}
                  </label>
                ) : (
                  <></>
                )}
              </div>
            }
            <Submitcontainer>
              <CancelBtn onClick={props.onClickCancel}> Cancel </CancelBtn>
              <SubmitBtn onClick={Self_Nominate}> Submit </SubmitBtn>
            </Submitcontainer>
          </div>
        </CardForm>
      </div>
    </CardStyled>
  </ModalCard>
);
