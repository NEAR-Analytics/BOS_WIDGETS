const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "multi.sputnik-dao.near";
const onClose = props.onClose;
const policy = props.policy;

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

if (policy === null) return "";

let allRolesArray;
if (policy.roles) {
  allRolesArray = policy?.roles
    ?.filter((r) => r.kind !== "Everyone")
    ?.map((r) => r.name);
}
console.log(allRolesArray);

const roles = State.init({
  member_id: state.member_id,
  role: state.role,
  error: undefined,
});

function isNearAddress(address) {
  const ACCOUNT_ID_REGEX =
    /^(([a-z\d]+[-_])*[a-z\d]+\.)*([a-z\d]+[-_])*[a-z\d]+$/;
  return (
    address.length >= 2 &&
    address.length <= 64 &&
    ACCOUNT_ID_REGEX.test(address)
  );
}

const handleProposal = () => {
  if (
    !state.member_id ||
    state.member_id === "" ||
    !isNearAddress(state.member_id)
  ) {
    State.update({
      error: "Please enter a valid member ID",
    });
    return;
  }
  if (!state.role || state.role === "") {
    State.update({
      error: "Please enter a valid role",
    });
    return;
  }
  if (allRolesArray && !allRolesArray.includes(state.role)) {
    State.update({
      error: "Please enter a valid role: " + allRolesArray.join(", "),
    });
    return;
  }

  const gas = 200000000000000;
  const deposit = 100000000000000000000000;
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "Potential member",
          kind: {
            AddMemberToRole: {
              member_id: state.member_id ?? accountId,
              role: state.role ?? "council",
            },
          },
        },
      },
      gas: gas,
      deposit: deposit,
    },
  ]);
};

const onChangeMember = (member_id) => {
  State.update({
    member_id,
    error: undefined,
  });
};

const onChangeRole = (role) => {
  State.update({
    role,
    error: undefined,
  });
};

return (
  <>
    <div className="mb-2">
      <h5>Account ID</h5>
      <input type="text" onChange={(e) => onChangeMember(e.target.value)} />
    </div>

    <div className="mb-2">
      <h5>Role</h5>
      {allRolesArray ? (
        <Typeahead
          options={allRolesArray}
          multiple={false}
          onChange={(v) => onChangeRole(v[0])}
          placeholder="Choose a role..."
        />
      ) : (
        <input type="text" onChange={(e) => onChangeRole(e.target.value)} />
      )}
    </div>

    {state.error && <div className="text-danger">{state.error}</div>}
    <div className="ms-auto">
      <Widget
        src="sking.near/widget/Common.Button"
        props={{
          children: "Propose To Add Member",
          onClick: handleProposal,
          className: "mt-2",
          variant: "success",
        }}
      />
      {onClose && (
        <Widget
          src="sking.near/widget/Common.Button"
          props={{
            children: "Close",
            onClick: onClose,
            className: "mt-2",
          }}
        />
      )}
    </div>
  </>
);
