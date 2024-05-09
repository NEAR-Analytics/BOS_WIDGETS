// Initialize variables with default values or from props
const limit = 20;
const series = props.series ?? "496";
const title = props.title ?? "Total";
const showHeader = props.showHeader ?? true;
const showImage = props.showImage ?? false;
const daoId = props.daoId ?? "research-collective.sputnik-dao.near";

// Initialize state
State.init({
  offset: 0,
  nftHolders: [],
  daoMembers: [],
});

// Function to fetch NFT holders
function fetchNftHolders() {
  asyncFetch("https://graph.mintbase.xyz/mainnet", {
    method: "POST",
    headers: {
      "mb-api-key": "omni-site",
      "Content-Type": "application/json",
      "x-hasura-role": "anonymous",
    },
    body: JSON.stringify({
      query: `
          query MyQuery {
            mb_views_nft_tokens(
                limit: ${limit},
                offset: ${state.offset},
                where: { 
                  nft_contract_id: { _eq: "mint.sharddog.near" }, 
                  token_id: {_regex: "^${series}:", _neq: "496:1"} 
                },
                order_by: {minted_timestamp: desc}
            ) {
              owner
            }
          }
        `,
    }),
  }).then((res) => {
    if (res.ok) {
      const newNftHolders = res.body.data.mb_views_nft_tokens.map(
        (token) => token.owner
      );
      const uniqueNewNftHolders = newNftHolders.filter(
        (owner) => !state.nftHolders.includes(owner)
      ); // Filter out duplicates
      State.update({
        nftHolders: [...state.nftHolders, ...uniqueNewNftHolders],
        offset: state.offset + limit,
      });
      fetchDaoMembers(); // Fetch DAO members after fetching NFT holders
    }
  });
}

// Function to fetch DAO members
function fetchDaoMembers() {
  const policy = Near.view(daoId, "get_policy");
  if (policy) {
    const groups = policy.roles
      .filter((role) => role.kind.Group)
      .map((role) => ({
        members: role.kind.Group,
      }));

    const daoMembers = groups.flatMap((group) => group.members);
    const uniqueDaoMembers = daoMembers.filter(
      (member) => !state.daoMembers.includes(member)
    ); // Filter out duplicates

    State.update({
      daoMembers: [...state.daoMembers, ...uniqueDaoMembers],
    });
  }
}

// Fetch NFT holders
fetchNftHolders();

// Function to display each NFT
function Sharddog({ owner }) {
  const size = "100px";
  return (
    <div className="row">
      <div className="col-sm-3">
        {showImage && (
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: {
                url: `https://storage.googleapis.com/mintbase-files/${series}/images/${owner}.png`,
              },
              style: {
                width: size,
                height: size,
                objectFit: "cover",
                minWidth: size,
                minHeight: size,
                maxWidth: size,
                maxHeight: size,
                overflowWrap: "break-word",
              },
            }}
          />
        )}
      </div>
      <div className="col-sm-12">
        {state.daoMembers.includes(owner) && (
          <Widget
            src="ndcplug.near/widget/ProfileCard.AddToDAO"
            props={{ accountId: owner }}
          />
        )}
      </div>
    </div>
  );
}

// Final rendering
return (
  <>
    {showHeader && (
      <h1 style={{ marginLeft: "20px" }}>
        {title}:{" "}
        {
          state.nftHolders.filter((owner) => state.daoMembers.includes(owner))
            .length
        }
      </h1>
    )}

    {state.nftHolders.map((owner, index) => (
      <Sharddog key={index} owner={owner} />
    ))}
  </>
);
