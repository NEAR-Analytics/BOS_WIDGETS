const { handleClose } = props;

let Nominationcontract = "nominations-v1.gwg-testing.near";
let Socialcontract = "social.near";

let profileInfo = Social.getr(`${context.accountId}/profile`);

let imageIsNFT = profileInfo.image.nft ? true : false;
let imageIsIpfs_cid = profileInfo.image.ipfs_cid ? true : false;
let imageIsUrl = profileInfo.image.url ? true : false;
let RealProfileImageAsURL = "";

const widgets = {
  button: "rubycop.near/widget/NDC.StyledComponents",
};

//Recover image from NFT
if (imageIsNFT) {
  let nftData = profileInfo.image.nft;
  const getNftCid = Near.view(nftData.contractId, "nft_token", {
    token_id: nftData.tokenId,
  });

  RealProfileImageAsURL =
    "https://nativonft.mypinata.cloud/ipfs/" + getNftCid.metadata.media;
  console.log("was nft", RealProfileImageAsURL);
}
//Recover image from IPFS_CID

if (imageIsIpfs_cid) {
  RealProfileImageAsURL =
    "https://nativonft.mypinata.cloud/ipfs/" + profileInfo.image.ipfs_cid;
  console.log("was ipfs", RealProfileImageAsURL);
}
//Recover image from URL

if (imageIsUrl) {
  RealProfileImageAsURL = profileInfo.image.url;
  console.log("was url", RealProfileImageAsURL);
}
// State
State.init({
  theme,

  img: {
    uploading: "false",
    url: RealProfileImageAsURL,
    name: RealProfileImageAsURL ? "Uploaded from Social Profile" : "",
  },
  name: profileInfo.name ? profileInfo.name : "",
  profileAccount: context.accountId ? "@" + context.accountId : "",
  house_intended: "",
  HAYInvolve: "",
  WIYStrategy: "",
  Key_Issue_1: "",
  Key_Issue_2: "",
  Key_Issue_3: "",
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

const CardStyled = styled.div`
  width: 70%;
  height: 100%;
  background: #f8f8f9;
  gap: 10px;
  border-radius: 10px;
  margin: 0 auto;
  overflow-y: scroll;
  @media only screen and (max-width: 480px) {
    width: 92%;
  }
`;

const CardForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 100%;
  height: auto;
`;

const H1styled = styled.h1`
  margin-left: 16px;
  margin-top: 16px;
  margin-right: auto;
  width: 100%;
  height: 19px;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 120%;
  color: #000000;
`;

const Submitcontainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  @media only screen and (max-width: 480px) {
    margin-top: 10px;
  }
`;

const HiddeableWidget = styled.div`
  display: none;
  @media (max-width: 480px) {
    display: block;
  }
`;

const Modal = styled.div`
  position: fixed;
  z-index: 101;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  background: rgba(128, 128, 128, 0.65);
`;

const ComponentWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 80%;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const validatedInputs = () => {
  const {
    img,
    name,
    profileAccount,
    house_intended,
    HAYInvolve,
    WIYStrategy,
    Key_Issue_1,
    Key_Issue_2,
    Key_Issue_3,
    afiliation,
    agreement,
    tags,
  } = state;

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
  if (isEmpty(HAYInvolve)) {
    State.update({ error_msg: "How are you involved?" });

    isValid = false;
  }
  if (isEmpty(WIYStrategy)) {
    State.update({ error_msg: "What is your strategy?" });

    isValid = false;
  }
  if (isEmpty(Key_Issue_1)) {
    State.update({ error_msg: "Fill the key issued 1" });

    isValid = false;
  }
  if (isEmpty(Key_Issue_1)) {
    State.update({ error_msg: "Fill the key issued 1" });

    isValid = false;
  }
  if (isEmpty(Key_Issue_2)) {
    State.update({ error_msg: "Fill the key issued 2" });

    isValid = false;
  }
  if (isEmpty(Key_Issue_3)) {
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
  asyncFetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: { Accept: "application/json" },
    body,
  }).then(async (res) => {
    const _cid = res.body.cid;
    const _name = body.name;
    State.update({ img: { uploading: "true", cid: _cid, name: _name } });
  });
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
  console.log(item);
  if (item === "HouseOfMerit") {
    console.log("HouseOfMerit");
    Storage.privateSet("Houseselected", 1);
  }
  if (item === "CouncilOfAdvisors") {
    console.log("CouncilOfAdvisors");

    Storage.privateSet("Houseselected", 2);
  }
  if (item === "TransparencyCommission") {
    console.log("TransparencyCommission");

    Storage.privateSet("Houseselected", 3);
  }
  console.log(Storage.privateGet("Houseselected"));

  State.update({ house_intended: item, error_msg: null });
};
const handleHAYInvolve = (item) => {
  console.log(item);
  State.update({
    HAYInvolve: item.substring(0, 2000),
    error_msg: null,
  });
  return;
};
const handleWIYStrategy = (item) => {
  State.update({
    WIYStrategy: item.substring(0, 2000),
    error_msg: null,
  });
  return;
};
const handleKey_Issue_1 = (item) => {
  State.update({
    Key_Issue_1: item.substring(0, 2000),
    error_msg: null,
  });
  return;
};
const handleKey_Issue_2 = (item) => {
  State.update({
    Key_Issue_2: item.substring(0, 2000),
    error_msg: null,
  });
};
const handleKey_Issue_3 = (item) => {
  State.update({
    Key_Issue_3: item.substring(0, 2000),
    error_msg: null,
  });
  return;
};
const handleAditional = (item) => {
  State.update({
    addition_platform: item.substring(0, 2000),
    error_msg: null,
  });
  return;
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

  let newData = data.splice(index, 1);

  State.update({ afiliation: data });
  State.update({ error_msg: null });
};
const handleAFFCompanyName = (params) => {
  let data = state.afiliation;

  data[params.index].company_name = params.event.target.value.substring(0, 500);
  State.update({ afiliation: data, error_msg: null });
  return;
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
  data[params.index].role = params.event.target.value.substring(0, 500);
  State.update({ afiliation: data, error_msg: null });
  return;
};
const handleTags = (item) => {
  State.update({
    tags: item.target.value.substring(0, 500),
    error_msg: null,
  });
};
const handleDeclaration = (item) => {
  State.update({ agreement: item.target.checked.toString(), error_msg: null });
};

const handleNominate = () => {
  //Validate the Data outPut
  if (validatedInputs()) {
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
        comment: context.accountId,
        link: "",
      },
      gas: 300000000000000,
      deposit: 100000000000000000000000,
    };

    let Social_Payload = {
      contractName: Socialcontract,
      methodName: "set",
      args: SocialArgs,
      gas: 300000000000000,
      deposit: 100000000000000000000000,
    };

    // call the methods
    Near.call([Social_Payload, SelfNominate_Payload]);
  } else {
    //The fields are incomplete
    console.log("still invalid");
  }
};

return "";
