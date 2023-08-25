const creatorId = props.creatorId ?? context.accountId;

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

const groupId = props.groupId ?? generateUID();

State.init({
  group,
});

return (
  <>
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
      </div>
      <div className="col-lg-6">
        <div className="m-2">
          <Widget
            src="hack.near/widget/group.list"
            props={{ creatorId, groupId }}
          />
        </div>
      </div>
    </div>
  </>
);
