const accountId = context.accountId;

if (!accountId) {
  return "Please connect your NEAR account :)";
}

function generateUID() {
  return (
    Math.random().toString(16).slice(2) +
    Date.now().toString(36) +
    Math.random().toString(16).slice(2)
  );
}

const groupId = props.groupId ?? "83dc9a797ac0ellif3mt0a1aee215d3088";

let group = Social.getr(`${accountId}/graph/${groupId}`);

if (group === null) {
  return "Loading...";
}

State.init({
  group,
});

return (
  <>
    <div className="row">
      <div className="col-lg-6">
        <div>
          <h4>Edit Group</h4>
          <p>
            <i>{groupId}</i>
          </p>
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
            Save
          </CommitButton>
          <a
            className="btn btn-outline-primary ms-2"
            href={`#/hack.near/widget/group.members?creatorId=${accountId}?`}
          >
            View
          </a>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="m-2">
          <Widget
            src="hack.near/widget/group"
            props={{ creatorId: accountId, groupId, group: state.group }}
          />
        </div>
      </div>
    </div>
  </>
);
