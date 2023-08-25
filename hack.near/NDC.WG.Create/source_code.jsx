const creatorId = props.creatorId ?? context.accountId;

if (!creatorId) {
  return "Please connect your NEAR account :)";
}

const { handleClose } = props;

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

State.init({
  group,
  members: { [creatorId]: "" },
  newMember: "",
});

function addMember(newMember) {
  State.update({
    members: { ...state.members, [newMember]: "" },
  });
}

function removeMember(memberKey) {
  const updatedMembers = { ...state.members };
  delete updatedMembers[memberKey];

  State.update({
    members: updatedMembers,
  });
}

function isNearAddress(address) {
  if (typeof address !== "string") {
    return false;
  }
  if (!address.endsWith(".near")) {
    return false;
  }
  const parts = address.split(".");
  if (parts.length !== 2) {
    return false;
  }
  if (parts[0].length < 2 || parts[0].length > 32) {
    return false;
  }
  if (!/^[a-z0-9_-]+$/i.test(parts[0])) {
    return false;
  }
  return true;
}

const memberId = props.memberId ?? state.newMember;

const isValid = isNearAddress(memberId);

let SocialContract = "social.near";

const widgets = {
  styledComponents: "hack.near/widget/NDC.StyledComponents",
};

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
  font-weight: 555;
  font-size: 23px;
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

const Hr = styled.div`
  height: 1px;
  margin: 15px 0;
  width: 100%;
  background: rgba(208, 214, 217, 0.4);
`;

const Section = styled.div`
  margin: 12px 0;
`;

const handleCreate = () => {
  let Members_Payload = {
    contractName: "social.near",
    methodName: "set",
    args: {
      data: {
        [creatorId]: {
          graph: {
            [groupId]: {
              ...state.members,
            },
          },
        },
      },
    },
    gas: 300000000000000,
    deposit: 100000000000000000000000,
  };

  let Group_Payload = {
    contractName: SocialContract,
    methodName: "set",
    args: {
      data: {
        [creatorId]: {
          thing: {
            group: {
              [groupId]: {
                ...state.group,
              },
            },
          },
        },
      },
    },
    gas: 300000000000000,
    deposit: 100000000000000000000000,
  };

  const proposal_args = JSON.stringify({
    data: {
      [daoId]: {
        groups: {
          [groupId]: "",
        },
      },
    },
  });

  const ProposalArgs = Buffer.from(proposal_args, "utf-8").toString("base64");

  let Proposal_Payload = {
    contractName: daoId,
    methodName: "add_proposal",
    args: {
      proposal: {
        description: "create group on the BOS",
        kind: {
          FunctionCall: {
            receiver_id: "social.near",
            actions: [
              {
                method_name: "set",
                args: ProposalArgs,
                deposit: "100000000000000000000000",
                gas: "285000000000000",
              },
            ],
          },
        },
      },
    },
    deposit: deposit,
    gas: "219000000000000",
  };

  Near.call([Group_Payload, Members_Payload, Proposal_Payload]).then(() =>
    handleClose()
  );
};

return (
  <Modal>
    <ComponentWrapper>
      <CardStyled name="compose">
        <div className="d-flex flex-column">
          <CardForm>
            <div className="d-flex justify-content-between align-items-center">
              <H1>Create Work Group</H1>
              <Submitcontainer>
                <Widget
                  src={widgets.styledComponents}
                  props={{
                    Button: {
                      style: "danger",
                      text: "Close",
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
            <Hr />
            <div className="row">
              <div className="col-lg-6 mt-2">
                <h5>Details</h5>
                <Widget
                  src="hack.near/widget/group.card"
                  props={{ creatorId, groupId, group: state.group }}
                />
                <div className="mb-2 mt-3">
                  <Widget
                    src="near/widget/MetadataEditor"
                    props={{
                      initialMetadata: group,
                      onChange: (group) => State.update({ group }),
                      options: {
                        name: { label: "Name" },
                        image: { label: "Logo" },
                        description: { label: "About" },
                        tags: {
                          label: "Tags",
                          tagsPattern: `*/${groupId}/tags/*`,
                          placeholder:
                            "art, gov, edu, dev, com, nft, ai, social",
                        },
                        linktree: {
                          links: [
                            {
                              label: "Twitter",
                              prefix: "https://twitter.com/",
                              name: "twitter",
                            },
                            {
                              label: "Github",
                              prefix: "https://github.com/",
                              name: "github",
                            },
                            {
                              label: "Telegram",
                              prefix: "https://t.me/",
                              name: "telegram",
                            },
                            {
                              label: "Website",
                              prefix: "https://",
                              name: "website",
                            },
                          ],
                        },
                      },
                    }}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div>
                  <h5>Account ID</h5>
                  <input
                    placeholder="<example>.near"
                    onChange={(e) =>
                      State.update({ newMember: e.target.value })
                    }
                  />
                  <div className="d-flex align-items-center mt-2">
                    <button
                      className="btn btn-primary m-2"
                      disabled={!isValid}
                      onClick={() => addMember(state.newMember)}
                    >
                      add
                    </button>
                  </div>
                </div>
                <hr />
                <div>
                  <h5>Members</h5>
                  {Object.keys(state.members).map((a) => {
                    return (
                      <div className="d-flex m-2 p-2 justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <Widget
                            src="mob.near/widget/Profile"
                            props={{ accountId: a }}
                          />
                        </div>
                        <button
                          className="btn btn-danger m-1"
                          disabled={!isNearAddress(a)}
                          onClick={() => removeMember(a)}
                        >
                          remove
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardForm>
        </div>
      </CardStyled>
    </ComponentWrapper>
  </Modal>
);
