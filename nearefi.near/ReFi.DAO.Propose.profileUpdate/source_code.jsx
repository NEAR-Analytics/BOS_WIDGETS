const accountId = context.accountId;

let profile = Social.getr(`${daoId}/profile`);

if (profile === null) {
  return "Loading...";
}

const groups = [`${accountId}`];

State.init({
  args: {
    config: {
      name: state.name,
      purpose: state.purpose,
      metadata: "",
    },
    policy: {
      groups,
    },
  },
  profile,
  name,
  isDao: false,
  isAvailable: false,
});
const daoId = props.daoId ?? "refi.sputnik-dao.near";

// const daoId = state.name + ".sputnik-dao.near";
const name = state.name;

const groupId = props.groupId ?? "community";
const policy = Near.view(daoId, "get_policy");

const deposit = policy.proposal_bond;

const profile_args = JSON.stringify({
  data: {
    [daoId]: {
      profile: state.profile,
    },
  },
});

const proposal_args = Buffer.from(profile_args, "utf-8").toString("base64");

const handleProposal = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "update DAO profile on NEAR Social",
          kind: {
            FunctionCall: {
              receiver_id: "social.near",
              actions: [
                {
                  method_name: "set",
                  args: proposal_args,
                  deposit: "80000000000000000000000",
                  gas: "219000000000000",
                },
              ],
            },
          },
        },
      },
      deposit: deposit,
      gas: "219000000000000",
    },
  ]);
};

const dao_args = Buffer.from(JSON.stringify(state.args), "utf-8").toString(
  "base64"
);

const onChangeName = (name) => {
  State.update({
    name,
  });
};

return (
  <div className="mb-3">
    <div className="row">
      <div className="col-lg-6">
        <div>
          <h4>Edit DAO Profile</h4>
        </div>
        <div className="mb-2">
          <Widget
            src="mob.near/widget/MetadataEditor"
            props={{
              initialMetadata: profile,
              onChange: (profile) => State.update({ profile }),
              options: {
                name: { label: "Name" },
                image: { label: "Logo" },
                backgroundImage: { label: "Background" },
                description: { label: "About" },
                tags: {
                  label: "Tags",
                  tagsPattern: "*/profile/tags/*",
                  placeholder: "dev, gaming, nft, privacy, eth",
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

        <p>⬆️ input existing DAO account!</p>

        <div className="mb-2">
          <button
            className="btn btn-outline-success m-1"
            onClick={handleProposal}
          >
            Propose Changes
          </button>
          <button
            className="btn btn-outline-primary m-1"
            href={`#/hack.near/widget/DAO.Profile?daoId=${daoId}`}
          >
            Request Permission to Post on Behalf of DAO
          </button>
        </div>
      </div>
      <div className="col-lg-6">
        <Widget
          src="mob.near/widget/ProfileLarge"
          props={{
            accountId: daoId,
            profile: state.profile,
          }}
        />
      </div>
    </div>
  </div>
);
