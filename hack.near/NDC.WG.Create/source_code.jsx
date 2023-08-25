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
  const groupData = `{ "data": {
    "${context.accountId}": {
      "thing": {
        "group": {
        "${groupId}": "${state.group}",
        },
      },
    },
  }}`;
  const membersData = `{ "data": {
    "${context.accountId}": {
      "graph": {
        "${groupId}": "${state.members}",
        },
      },
    },
  }}`;

  const MembersArgs = JSON.parse(membersData);
  const GroupArgs = JSON.parse(groupData);

  const proposal_args = JSON.stringify({
    data: {
      [daoId]: {
        graph: {
          [groupId]: "",
        },
      },
    },
  });

  const ProposalArgs = Buffer.from(proposal_args, "utf-8").toString("base64");

  let Members_Payload = {
    contractName: SocialContract,
    methodName: "set",
    args: MembersArgs,
    gas: 300000000000000,
    deposit: 100000000000000000000000,
  };

  let Group_Payload = {
    contractName: SocialContract,
    methodName: "set",
    args: GroupArgs,
    gas: 300000000000000,
    deposit: 100000000000000000000000,
  };

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
            <Widget
              src="hack.near/widget/group.edit"
              props={{ creatorId: context.accountId }}
            />
          </CardForm>
        </div>
      </CardStyled>
    </ComponentWrapper>
  </Modal>
);
