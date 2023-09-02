const creatorId = props.creatorId ?? context.accountId;

if (!creatorId) {
  return "Please connect your NEAR account :)";
}

const groupId = props.groupId;

const initMembers = Social.get(`${creatorId}/graph/${groupId}/**`);

State.init({
  groupId,
  group,
  members: initMembers || { [context.accountId]: "" },
  newMember: "",
  exists: false,
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

const groupData = Social.get(`${creatorId}/graph/${state.groupId}/**`);

if (groupData) {
  State.update({ exists: true });
}

const groupMembers = Social.get(`${creatorId}/graph/${state.groupId}/**`);

const handleCreate = () => {
  let Group_Payload = {
    contractName: "social.near",
    methodName: "set",
    args: {
      data: {
        [creatorId]: {
          thing: {
            [state.groupId]: {
              ...state.group,
              members: { ...state.members },
            },
          },
          graph: {
            [state.groupId]: {
              ...state.members,
            },
          },
        },
      },
    },
    gas: 300000000000000,
    deposit: 100000000000000000000000,
  };

  Near.call(Group_Payload).then(() => handleClose());
};

return (
  <>
    <div className="row">
      <div className="col-lg-6 mt-2">
        <h5>Edit Group</h5>
        <input
          placeholder="groupId"
          onChange={(e) => State.update({ groupId: e.target.value })}
        />
        {state.exists && (
          <>
            <div className="mt-3">
              <Widget
                src="hack.near/widget/group.card"
                props={{ groupId: state.groupId }}
              />
            </div>
            <div className="mt-3">
              <button className="btn btn-success me-2" onClick={handleCreate}>
                Update
              </button>
              <button
                className="btn btn-secondary me-2"
                href={`/hack.near/widget/group?groupId=${state.groupId}`}
              >
                View Group
              </button>
            </div>
          </>
        )}

        {state.exists && (
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
                    placeholder: "art, gov, edu, dev, com, nft, ai, social",
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
        )}
      </div>
      <div className="col-lg-6">
        {state.exists && (
          <>
            <div>
              <h5>Account ID</h5>
              <input
                placeholder="<example>.near"
                onChange={(e) => State.update({ newMember: e.target.value })}
              />
              <div className="d-flex align-items-center mt-2">
                <button
                  className="btn btn-primary m-2"
                  onClick={() => addMember(state.newMember)}
                >
                  add
                </button>
              </div>
            </div>
            <hr />
            <div>
              <h5>Members</h5>
              {groupId ? (
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
                          disabled={!isNearAddress(a)}
                          onClick={() => removeMember(a)}
                        >
                          remove
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>
                  {Object.keys(groupMembers).map((a) => {
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
              )}
            </div>
          </>
        )}
      </div>
    </div>
  </>
);
