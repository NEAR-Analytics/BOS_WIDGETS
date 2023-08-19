let members = Social.keys(
  `${props.creatorId}/graph/${props.groupId}/*`,
  "final",
  {
    return_type: "BlockHeight",
    values_only: true,
  }
);

if (members === null) {
  return "";
}

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

function generateUID() {
  return (
    Math.random().toString(16).slice(2) +
    Date.now().toString(36) +
    Math.random().toString(16).slice(2)
  );
}

const type = group ? "remove" : "add";

const handleCreateGroup = () => {
  const groupId = props.groupId ?? generateUID();
  const data = {
    // thing: { // We can create the thing later, just remember to save the UUID in your notes
    //   [groupId]: {
    //     ...
    //   },
    // },
    graph: {
      [groupId]: state.elements,
    },
    index: {
      graph: JSON.stringify({
        key: groupId,
        value: {
          type,
          data: state.elements,
        },
      }),
    },
  };

  Social.set(data, {
    onCommit: () => {},
    onCancel: () => {},
  });
};

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

const accountId = props.accountId ?? state.inputVal;

const memberId = JSON.stringify(state.elements[0]);

const isValid = isNearAddress(accountId);

return (
  <>
    <div>
      <input onChange={(e) => State.update({ inputVal: e.target.value })} />
      <br />
      <button disabled={!isValid} onClick={() => addElement(state.inputVal)}>
        add
      </button>
    </div>
    <br />
    <div>
      {Object.keys(state.elements).length > 0 && (
        <div>
          <button
            className="btn btn-success"
            onClick={handleCreateGroup}
            success
          >
            create
          </button>
          <hr />
          <h3>Group Members</h3>
        </div>
      )}
      {Object.keys(state.elements).map((a) => {
        return (
          <div className="d-flex m-2 p-2 justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Widget src="mob.near/widget/Profile" props={{ accountId: a }} />
            </div>
            <button
              className="btn btn-danger m-1"
              disabled={!isNearAddress(a)}
              onClick={() => removeElement(a)}
            >
              remove
            </button>
          </div>
        );
      })}
    </div>
  </>
);
