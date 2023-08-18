const { handleClose, nomination_contract } = props;

let SocialContract = "social.near";

let profileInfo = Social.getr(`${context.accountId}/profile`);

let imageIsNFT = profileInfo.image.nft ? true : false;
let imageIsIpfs_cid = profileInfo.image.ipfs_cid ? true : false;
let imageIsUrl = profileInfo.image.url ? true : false;
let RealProfileImageAsURL = "";

const widgets = {
  styledComponents: "nomination.ndctools.near/widget/NDC.StyledComponents",
  affiliations: "hack.near/widget/NDC.WG.Compose.Affiliations",
  platform: "hack.near/widget/NDC.WG.Compose.Platform",
  page: "hack.near/widget/NDC.WG.Page",
  tags: "hack.near/widget/NDC.WG.Compose.Tags",
};

if (imageIsNFT) {
  let nftData = profileInfo.image.nft;
  const getNftCid = Near.view(nftData.contractId, "nft_token", {
    token_id: nftData.tokenId,
  });

  RealProfileImageAsURL =
    "https://nativonft.mypinata.cloud/ipfs/" + getNftCid.metadata.media;
  console.log("was nft", RealProfileImageAsURL);
}

if (imageIsIpfs_cid) {
  RealProfileImageAsURL =
    "https://nativonft.mypinata.cloud/ipfs/" + profileInfo.image.ipfs_cid;
  console.log("was ipfs", RealProfileImageAsURL);
}

if (imageIsUrl) {
  RealProfileImageAsURL = profileInfo.image.url;
  console.log("was url", RealProfileImageAsURL);
}

State.init({
  theme,
  img: {
    uploading: "false",
    url: RealProfileImageAsURL,
    name: RealProfileImageAsURL ? "Uploaded from Social Profile" : "",
  },
  name: profileInfo.name ? profileInfo.name : "",
  profileAccount: context.accountId ? "@" + context.accountId : "",
  GroupName: "",
  Members: "",
  Key_Issue_1: "",
  Key_Issue_2: "",
  Key_Issue_3: "",
  details: "",
  affiliation: [
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
  width: 100%;
  height: 100%;
  background: #f8f8f9;
  gap: 10px;
  padding: 25px;
  margin: 0 auto;
  border-radius: 10px;
  overflow-y: scroll;
`;

const CardForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
`;

const H1 = styled.h1`
  margin-bottom: 10px;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
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
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
`;

const ComponentWrapper = styled.div`
  display: flex;
  width: 80%;
  height: 80%;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 10px;
  background: #fff;
  border: 1px solid transparent;
  margin: 140px auto auto auto;
  @media only screen and (max-width: 480px) {
    width: 90%;
  }
`;

const ErrorBlock = styled.div`
  color: #c23f38;
  font-size: 14px;
  margin: 10px 0;
`;

const Hr = styled.div`
  height: 1px;
  margin: 15px 0;
  width: 100%;
  background: rgba(208, 214, 217, 0.4);
`;

const Section = styled.div`
  margin: 12px 0;
`;

const validatedInputs = () => {
  const {
    img,
    name,
    profileAccount,
    GroupName,
    Members,
    affiliation,
    agreement,
    tags,
  } = state;

  const isEmpty = (str) => str.trim() === "";
  const isFalse = (check) => check === "false";
  let isValid = true;
  let error_msg;

  if (img.cid === null) isValid = false;
  if (isEmpty(name)) isValid = false;
  if (isEmpty(profileAccount)) isValid = false;
  if (isEmpty(GroupName)) isValid = false;
  if (isEmpty(Members)) isValid = false;
  if (tags.split(",").length == 0) isValid = false;
  if (isFalse(agreement)) isValid = false;
  if (affiliation.length == 0) isValid = false;

  if (affiliation.length > 0) {
    affiliation.forEach((element) => {
      if (isEmpty(element.company_name)) isValid = false;
      if (isEmpty(element.start_date)) isValid = false;
      if (isEmpty(element.end_date)) isValid = false;
      if (isEmpty(element.role)) isValid = false;
    });
  } else {
    isValid = false;
  }

  State.update({
    error_msg: isValid
      ? null
      : error_msg || "* Please complete all required fields",
  });

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

const handleName = (item) => State.update({ name: item, error_msg: null });

const handleProfile = (item) =>
  State.update({ profileAccount: item, error_msg: null });

const addFields = () => {
  var temp = state.affiliation;
  let object = {
    company_name: "",
    start_date: "",
    end_date: "",
    role: "",
  };

  if (temp.length === 6) return;

  temp.push(object);
  State.update({ affiliation: temp, error_msg: null });
};

const removeField = (index) => {
  State.update({
    affiliation: state.affiliation.splice(index, 1),
    error_msg: null,
  });
};

const validate = (key, item, limit) =>
  State.update({ [key]: item.substring(0, limit ?? 2000), error_msg: null });

const validateAffiliations = (params, key, limit) => {
  let data = state.affiliation;

  data[params.index][key] = params.event.target.value.substring(0, limit);
  State.update({ affiliation: data, error_msg: null });
};

const handleDeclaration = (agreement) => {
  State.update({ agreement: agreement.toString, error_msg: null });
};

const handleCreate = () => {
  if (!validatedInputs()) return;

  let newstate = Object.assign({}, state);
  newstate.affiliation = JSON.stringify(newstate.af);
  const stateAsString = JSON.stringify(newstate);
  const data = ` {"data":{ "${context.accountId}": {"groups":${stateAsString}} }}`;
  const SocialArgs = JSON.parse(data);

  let CreateGroup_Payload = {
    contractName: nomination_contract,
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
    contractName: SocialContract,
    methodName: "set",
    args: SocialArgs,
    gas: 300000000000000,
    deposit: 100000000000000000000000,
  };

  Near.call([Social_Payload, SelfNominate_Payload]).then(() => handleClose());
};

return (
  <Modal>
    <ComponentWrapper>
      <div
        style={{
          display: "flex",
          "justify-content": "center",
        }}
      >
        <HiddeableWidget>
          <Widget
            src={widgets.page}
            props={{
              groupData: {
                img: {
                  cid: state.img.cid,
                  isCid: RealProfileImageCid.IS_CID,
                },
                groupAccount: state.groupAccount,
                affiliation: JSON.stringify(state.affiliation),
                GroupName: state.GroupName,
                Members: state.Members,
                Linktree: state.Linktree,
                details: state.details,
                tags: state.tags,
              },
              profileData: {
                name: state.name,
              },
              preview: true,
            }}
          />
        </HiddeableWidget>
      </div>
      <CardStyled name="compose">
        <div className="d-flex flex-column ">
          <CardForm>
            <H1>Create Work Group</H1>
            <Hr />
            <Widget
              src={widgets.platform}
              props={{
                inputs: [
                  {
                    label: "What is the name of your work group? *",
                    placeholder: "Profile ID",
                    value: state.groupId,
                    handleChange: (e) => validate("GroupName", e.target.value),
                  },
                  {
                    label:
                      "What is your strategy to develop the NEAR ecosystem? *",
                    placeholder: "Elaborate on your strategy",
                    value: state.Members,
                    handleChange: (e) => validate("Members", e.target.value),
                  },
                  {
                    label: "Additional Information",
                    placeholder: "Elaborate on this work group. *",
                    value: state.details,
                    handleChange: (e) => validate("details", e.target.value),
                  },
                ],
              }}
            />
            <Widget
              src={widgets.affiliations}
              props={{
                affiliations: state.affiliation,
                addFields,
                removeField,
                handleAFFCompanyName: (params) =>
                  validateAffiliations(params, "company_name", 500),
                handleAFFStartdate: (params) =>
                  validateAffiliations(params, "start_date"),
                handleAFFEnddate: (params) =>
                  validateAffiliations(params, "end_date"),
                handleAFFRole: (params) =>
                  validateAffiliations(params, "role", 500),
              }}
            />

            <Section>
              <Widget
                src={widgets.styledComponents}
                props={{
                  Input: {
                    label: "Video Link (optional)",
                    placeholder:
                      "Add a Youtube video link that describes your candidacy",
                    value: state.video,
                    handleChange: (e) =>
                      State.update({ video: e.target.value }),
                  },
                }}
              />
            </Section>

            <Widget
              src={widgets.tags}
              props={{
                agreement: state.agreement,
                tags: state.tags,
                handleTags: (e) => validate("tags", e.target.value, 500),
                handleDeclaration,
              }}
            />

            {state.error_msg && (
              <ErrorBlock>
                <label className="text-danger">{state.error_msg}</label>
              </ErrorBlock>
            )}

            <div className="col-sm-12 px-4 w-100">
              <Submitcontainer>
                <Widget
                  src={widgets.styledComponents}
                  props={{
                    Button: {
                      className: "secondary dark",
                      text: "Cancel",
                      onClick: handleClose,
                    },
                  }}
                />
                <Widget
                  src={widgets.styledComponents}
                  props={{
                    Button: {
                      text: "Submit",
                      onClick: () => handleNominate(),
                    },
                  }}
                />
              </Submitcontainer>
            </div>
          </CardForm>
        </div>
      </CardStyled>
    </ComponentWrapper>
  </Modal>
);
