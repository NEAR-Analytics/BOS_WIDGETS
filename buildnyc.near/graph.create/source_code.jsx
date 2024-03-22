const creatorId = props.creatorId ?? context.accountId;
const [graphId, setGraphId] = useState("");

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  align-items: flex-start;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  margin: 20px auto;
`;

const handleCreate = () => {
  const data = {
    graph: {
      [graphId]: {
        ...state.members,
      },
    },
  };
  Social.set(data);
};

return (
  <div className="m-3">
    <div className="d-flex flex-row justify-content-between">
      <h3>Build Social</h3>
      <button
        disabled={!graphId}
        onClick={handleCreate}
        className="btn btn-success"
      >
        Create
      </button>
    </div>
    <div className="m-2">
      <h5 className="mb-2">Graph ID</h5>
      <div className="mb-3">
        <input
          placeholder="name this group"
          onChange={(e) =>
            setGraphId(e.target.value.replace(/\s+/g, "-").replace(/\//g, ""))
          }
        />
      </div>
      <h5 className="mb-2">New Member</h5>
      <div className="mb-2">
        <input
          label="input each member's account ID here, then click `add` below"
          placeholder="<example>.near"
          onChange={(e) => State.update({ newMember: e.target.value })}
        />
        <div className="d-flex align-items-center mt-2">
          <button
            disabled={!isValid}
            className="btn btn-primary mt-1"
            onClick={() => addMember(state.newMember)}
          >
            Add
          </button>
        </div>
      </div>
      <br />
      <div>
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
                onClick={() => removeMember(a)}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);
