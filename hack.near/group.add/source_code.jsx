const creatorId = props.creatorId ?? context.accountId;

if (!creatorId) {
  return "Please connect your NEAR account :)";
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

State.init({
  groupId: props.groupId ?? "",
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

const widgets = {
  styledComponents: "hack.near/widget/NDC.StyledComponents",
};

const handleCreate = () => {
  const proposal_args = JSON.stringify({
    data: {
      [daoId]: {
        groups: {
          [state.groupId]: "",
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
                gas: "300000000000000",
              },
            ],
          },
        },
      },
    },
    deposit: deposit,
    gas: "235000000000000",
  };
  Near.call([Proposal_Payload]);
};

return (
  <>
    <input
      placeholder="Group ID"
      onChange={(e) => State.update({ groupId: e.target.value })}
    />
    <br />
    <Widget
      src={widgets.styledComponents}
      props={{
        Button: {
          text: "Submit",
          onClick: () => handleCreate(),
        },
      }}
    />
  </>
);
