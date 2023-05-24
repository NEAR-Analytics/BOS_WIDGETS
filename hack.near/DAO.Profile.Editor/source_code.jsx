const daoId = props.daoId;

let profile = Social.getr(`${daoId}/profile`);

if (profile === null) {
  return "Loading...";
}

State.init({
  profile,
  daoId: "",
  isDao: false,
});

const groupId = props.groupId ?? "community";
const policy = Near.view(state.daoId, "get_policy");

if (policy === null) {
  return "Loading...";
}

const deposit = policy.proposal_bond;

const profile_args = JSON.stringify({
  data: {
    [state.daoId]: {
      profile: state.profile,
    },
  },
});

const proposal_args = Buffer.from(profile_args, "utf-8").toString("base64");

const handleProposal = () => {
  Near.call([
    {
      contractName: state.daoId,
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
                  deposit: "50000000000000000000000",
                  gas: "300000000000000",
                },
              ],
            },
          },
        },
      },
      deposit: deposit,
      gas: "300000000000000",
    },
  ]);
};

const onChangeDao = (daoId) => {
  State.update({
    daoId,
  });
};

let string = "sputnik-dao.near";

const checkDao = (daoId) => {
  if (daoId.indexOf(string) !== -1) {
    return State.update({ isDao: true });
  }
};

const validDao = checkDao(state.daoId);

return (
  <div className="mb-3">
    <div className="row">
      <div className="col-lg-6">
        <div>
          <h4>Edit DAO Profile</h4>
        </div>
        <div className="mb-3">
          Sputnik Contract ID:
          <input
            type="text"
            placeholder="<example>.sputnik-dao.near"
            value={state.daoId}
            onChange={(e) => onChangeDao(e.target.value)}
          />
        </div>
        {validDao && (
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
        )}
        <div className="mb-2">
          <button
            className="btn btn-outline-success m-1"
            onClick={handleProposal}
            disabled={!validDao}
          >
            Propose Changes
          </button>
          <button
            className="btn btn-outline-primary m-1"
            href={`#/hack.near/widget/DAO.Profile?daoId=${daoId}`}
            disabled={!validDao}
          >
            View Profile
          </button>
        </div>
      </div>
      <div className="col-lg-6">
        <div>
          <Widget
            src="hack.near/widget/DAO.ProfileLarge"
            props={{ daoId: state.daoId, profile: state.profile }}
          />
        </div>
      </div>
    </div>
  </div>
);
