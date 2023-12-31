const accountId = context?.accountId;

const proxyMinter = "1.minsta.mintbus.near";
const nftContractId = "nearapac.mintbase1.near";
const mbGraphEndpoint = "https://graph.mintbase.xyz";

const ipfsUrl = (cid) => `https://ipfs.near.social/ipfs/${cid}`;

let posts = [];

const data = fetch(mbGraphEndpoint, {
  method: "POST",
  headers: {
    "mb-api-key": "omni-site",
    "Content-Type": "application/json",
    "x-hasura-role": "anonymous",
  },
  body: JSON.stringify({
    query: `
  query FetchFeedMintedThings {
  nft_activities(where: {kind: {_eq: "mint"}, nft_contract_id: {_eq: "apac.mintbase1.near"}}, limit: 10, order_by: {timestamp: desc}) {
      nft_contract_id
      action_receiver
      token_id
      memo
      timestamp
    }
  }
`,
  }),
});

const handleImageUpload = (files) => {
  if (files?.length > 0) {
    State.update({
      img: {
        uploading: true,
        cid: null,
      },
    });
    const body = files[0];
    asyncFetch("https://ipfs.near.social/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body,
    }).then((res) => {
      const cid = res.body.cid;

      State.update({
        img: {
          cid,
        },
      });

      handleMint(cid);
    });
  } else {
    State.update({
      img: null,
    });
  }
};

const handleMint = (cid) => {
  const gas = 200000000000000;
  const deposit = 0;

  Near.call([
    {
      contractName: proxyMinter,
      methodName: "mint",
      args: {
        owner_id: accountId,
        metadata: {
          media: ipfsUrl(cid),
        },
        num_to_mint: 1,
        royalty_args: {
          split_between: {
            [accountId]: 10000,
          },
          percentage: 1000,
        },
        split_owners: null,
        nft_contract_id: nftContractId,
      },
      gas: gas,
      deposit: deposit,
    },
  ]);
};

if (data?.body?.data?.nft_activities) {
  posts = data?.body?.data?.nft_activities;
}

const size = "15em";

return (
  <div class="text-black p-2 container-fluid d-flex flex-column w-100 text-center justify-content-center align-items-center">
    <div class="flex justify-content-between">
      <div>
        <a
          href={`https://shard.dog/go?url=https://near.social/#${context.widgetSrc}`}
        >
          Create account
        </a>
      </div>
      <div class="flex gap-8">
        <a
          href="https://blog.mintbase.xyz/ethdenver-photo-book-mints-on-near-social-minsta-and-mintbase-baec3f49bd4c"
          target="_blank"
        >
          Learn more
        </a>
        |
        <a href="https://nearapac.mintbase.xyz" target="_blank">
          Minsta
        </a>
        |
        <a href="https://nearapac.mintbase.xyz/leaderboard" target="_blank">
          Leaderboard
        </a>
      </div>
    </div>

    <div class="container-fluid text-center d-flex flex-column justify-content-center align-items-center">
      <div class="d-flex flex-column gap-2">
        {posts.map((post) => {
          const memo = JSON.parse(post.memo);
          const split_between = memo.royalty.split_between;
          const sender = Object.keys(split_between)[0];

          return (
            <div>
              <div class="m-4">
                <Widget
                  src="mob.near/widget/ProfileLine"
                  props={{
                    accountId: sender,
                    hideName: true,
                    hideAccountId: true,
                    tooltip: true,
                  }}
                />
                <span role="img" aria-label="poked" title="poked">
                  📸
                </span>
              </div>

              <a
                href={`https://mintbase.xyz/contract/${post.nft_contract_id}/token/${post.token_id}`}
              >
                <Widget
                  src="mob.near/widget/NftImage"
                  props={{
                    nft: {
                      tokenId: post.token_id,
                      contractId: post.nft_contract_id,
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
                    className: "",
                    fallbackUrl:
                      "https://ipfs.near.social/ipfs/bafkreihdiy3ec4epkkx7wc4wevssruen6b7f3oep5ylicnpnyyqzayvcry",
                  }}
                />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);
