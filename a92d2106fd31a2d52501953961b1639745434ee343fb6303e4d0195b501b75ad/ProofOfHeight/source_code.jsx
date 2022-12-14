const ownerId =
  "a92d2106fd31a2d52501953961b1639745434ee343fb6303e4d0195b501b75adr";
const appName = "POH";
const accountId = context.accountId;
const contractId = props.contractId ?? ownerId;

if (!accountId) {
  return "No account ID";
}

const badges = props.badges ?? Social.getr(`${appName}/badges/6-2`);
//const height = props.height ?? 7;
if (badges === null) {
  return "Loading";
}

initState({ badges });

return (
  <div className="container row">
    <div>{badges}</div>
    <div className="mb-2">
      <CommitButton
        disabled={badges === null}
        data={{
          [contractId]: {
            badges: {
              "6-2": {
                info: {
                  name: "A Tall Man TM",
                  description: "A really tall man",
                  image: {
                    url: "https://commons.wikimedia.org/wiki/File:Image-Vertical.jpg#/media/File:Image-Vertical.jpg",
                  },
                },
                holder: {
                  [accountId]: "",
                },
              },
            },
          },
        }}
      >
        Get that badge
      </CommitButton>
    </div>
  </div>
);
