State.init({
  elements: {},
  inputVal: "",
});

function addElement(newElement) {
  State.update({
    elements: { ...state.elements, [newElement]: "" },
  });
}

function removeElement(elementKey) {
  const updatedElements = { ...state.elements };
  delete updatedElements[elementKey];

  State.update({
    elements: updatedElements,
  });
}

const daoId = props.daoId ?? "build.sputnik-dao.near";

const policy = Near.view(daoId, "get_policy");

if (policy === null) {
  return "Loading...";
}

const deposit = policy.proposal_bond;

function generateUID() {
  return (
    Math.random().toString(16).slice(2) +
    Date.now().toString(36) +
    Math.random().toString(16).slice(2)
  );
}

const groupId = props.groupId ?? generateUID();

const group_args = JSON.stringify({
  data: {
    [daoId]: {
      graph: {
        [groupId]: state.elements,
      },
      index: {
        post: JSON.stringify({
          key: "group",
          value: {
            type: "work",
          },
        }),
      },
    },
  },
});

const proposal_args = Buffer.from(group_args, "utf-8").toString("base64");

const handleProposal = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "create DAO group on NEAR Social",
          kind: {
            FunctionCall: {
              receiver_id: "social.near",
              actions: [
                {
                  method_name: "set",
                  args: proposal_args,
                  deposit: "100000000000000000000000",
                  gas: "219000000000000",
                },
              ],
            },
          },
        },
      },
      deposit: deposit,
      gas: "219000000000000",
    },
  ]);
};

const { handleClose } = props;

let SocialContract = "social.near";

const widgets = {
  styledComponents: "nomination.ndctools.near/widget/NDC.StyledComponents",
};

State.init({
  groupImage: {
    uploading: "false",
    url: RealProfileImageAsURL,
    name: RealProfileImageAsURL ? "Uploaded from NEAR Social Profile" : "",
  },
  groupName: groupInfo.name ? groupInfo.name : "",
  groupAccount: props.groupAccount ? "@" + context.accountId : "",
  agreement: "false",
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
  const { img, groupAccount, groupName, members, agreement } = state;

  const isEmpty = (str) => str.trim() === "";
  const isFalse = (check) => check === "false";
  let isValid = true;
  let error_msg;

  if (img.cid === null) isValid = false;
  if (isEmpty(groupAccount)) isValid = false;
  if (isEmpty(groupName)) isValid = false;
  if (isEmpty(members)) isValid = false;
  if (isFalse(agreement)) isValid = false;
  else {
    isValid = false;
  }

  State.update({
    error_msg: isValid
      ? null
      : error_msg || "* Please complete all required fields.",
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

const handleName = (item) => State.update({ groupName: item, error_msg: null });

const handleProfile = (item) =>
  State.update({ groupAccount: item, error_msg: null });

const addMember = () => {
  var temp = state.members;
  let object = {
    memberId: "",
    role: "",
  };

  if (temp.length === 6) return;

  temp.push(object);
  State.update({ members: temp, error_msg: null });
};

const removeMember = (index) => {
  State.update({
    members: state.members.splice(index, 1),
    error_msg: null,
  });
};

const validate = (key, item, limit) =>
  State.update({ [key]: item.substring(0, limit ?? 2000), error_msg: null });

const validateMembers = (params, key, limit) => {
  let data = state.members;

  data[params.index][key] = params.event.target.value.substring(0, limit);
  State.update({ members: data, error_msg: null });
};

const handleDeclaration = (agreement) => {
  State.update({ agreement: agreement.toString, error_msg: null });
};

const handleCreate = () => {
  if (!validatedInputs()) return;

  let newstate = Object.assign({}, state);
  newstate.members = JSON.stringify(newstate.af);
  const stateAsString = JSON.stringify(newstate);
  const data = ` {"data":{ "${context.accountId}": {"groups":${stateAsString}} }}`;
  const SocialArgs = JSON.parse(data);

  // let CreateGroup_Payload = {
  //   contractName: daoId,
  //   methodName: "add_proposal",
  //   args: {},
  //   gas: 300000000000000,
  //   deposit: 100000000000000000000000,
  // };

  let Social_Payload = {
    contractName: SocialContract,
    methodName: "set",
    args: SocialArgs,
    gas: 300000000000000,
    deposit: 100000000000000000000000,
  };

  Near.call([Social_Payload, CreatGroup_Payload]).then(() => handleClose());
};

return (
  <Modal>
    <ComponentWrapper>
      <CardStyled name="compose">
        <div className="d-flex flex-column ">
          <CardForm>
            <H1>Create Work Group</H1>
            <Hr />
            <Widget
              src={widgets.groupInfo}
              props={{
                inputs: [
                  {
                    label: "What is the NEAR account of your work group? *",
                    placeholder: "Profile ID",
                    value: state.groupId,
                    handleChange: (e) => validate("groupId", e.target.value),
                    inputType: "text",
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
                      className: "danger ",
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
                      onClick: () => handleCreate(),
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
