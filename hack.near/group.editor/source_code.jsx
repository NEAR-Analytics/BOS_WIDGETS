const creatorId = props.creatorId ?? context.accountId;
const groupId = props.groupId ?? "83dc9a797ac0ellif3mt0a1aee215d3088";

let members = Social.getr(`${creatorId}/graph/${groupId}`, "final", {});

if (members === null) {
  return "";
}

if (!creatorId) {
  return "Please connect your NEAR account :)";
}

function generateUID() {
  return (
    Math.random().toString(16).slice(2) +
    Date.now().toString(36) +
    Math.random().toString(16).slice(2)
  );
}

State.init({
  groupId,
});

const type = group ? "remove" : "add";

const handleCreateGroup = () => {
  const groupId = groupId ?? generateUID();
  const data = {
    graph: {
      [groupId]: state.members,
    },
    index: {
      graph: JSON.stringify({
        key: groupId,
        value: {
          type,
        },
      }),
    },
  };

  Social.set(data, {
    onCommit: () => {},
    onCancel: () => {},
  });
};

return (
  <>
    <div className="row">
      <div className="col-lg-6 mt-2">
        <div className="mb-2">
          <h5>Details</h5>
          <input
            style={{ fontSize: "15px" }}
            value={state.groupId}
            onChange={(e) => State.update({ groupId: e.target.value })}
          />
        </div>
        <div className="mb-2">
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
        <div className="mb-2">
          <CommitButton
            data={{ thing: { group: { [`${groupId}`]: state.group } } }}
          >
            update
          </CommitButton>
          <a
            className="btn btn-outline-primary ms-2"
            href={`#/hack.near/widget/group.members?creatorId=${creatorId}?`}
          >
            view
          </a>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="m-2">
          <Widget
            src="hack.near/widget/group.save"
            props={{ creatorId, groupId }}
          />
        </div>
      </div>
    </div>
  </>
);
