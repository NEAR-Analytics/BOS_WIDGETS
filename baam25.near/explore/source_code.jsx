const accountId = props.accountId || context.accountId;
const contracts = props.contracts ||
  context.contracts || ["nft.yearofchef.near"];
const marketId = "simple.market.mintbase1.near";

const AFFILIATE_ACCOUNT = props.affiliateAccount || "mintbase.near";

const data = fetch("https://graph.mintbase.xyz", {
  method: "POST",
  headers: {
    "mb-api-key": "omni-site",
    "Content-Type": "application/json",
    "x-hasura-role": "anonymous",
  },
  body: JSON.stringify({
    query: `
      query MyQuery($contracts: [String]) {
        mb_views_active_listings_by_contract(limit: 100, order_by: {created_at: desc}, where: {market_id: {_eq: "simple.market.mintbase1.near"}, nft_contract_id: {_in: $contracts}}) {
            listed_by
            created_at
            price
            nft_contract_id
            token_id
            metadata_id
        }   
      }
`,
    variables: {
      contracts: contracts,
    },
  }),
});

const YoctoToNear = (amountYocto) => {
  return new Big(amountYocto || 0).div(new Big(10).pow(24)).toString();
};

let buy = (price, token_id, nft_contract_id) => {
  const gas = 200000000000000;
  const deposit = new Big(price).toFixed(0);

  Near.call(
    marketId,
    "buy",
    {
      nft_contract_id: nft_contract_id,
      token_id: token_id,
      referrer_id: AFFILIATE_ACCOUNT,
    },
    gas,
    deposit
  );
};

if (!data.ok) {
  return "Loading";
}

const size = "20em";

return data !== null ? (
  <>
    <div className="d-flex gap-4 flex-wrap">
      {data.body.data?.mb_views_active_listings_by_contract.map(
        (listing, i) => {
          const priceYocto = listing.price
            .toLocaleString()
            .replace(/,/g, "")
            .replace(/\s/g, "");
          const priceNear = YoctoToNear(priceYocto);

          return (
            <div className="d-flex flex-column gap-1 w-15 p-3">
              <a
                href={`https://mintbase.xyz/meta/${listing.metadata_id}/`}
                target="_blank"
              >
                <Widget
                  src="mob.near/widget/NftImage"
                  props={{
                    nft: {
                      tokenId: listing.token_id,
                      contractId: listing.nft_contract_id,
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
              <button
                disabled={!accountId}
                onClick={() => {
                  if (!accountId) return;
                  buy(priceYocto, listing.token_id, listing.nft_contract_id);
                }}
                className="btn-main"
                style={{
                  width: "100%",
                  textAlign: "cetner",
                }}
              >
                Buy {priceNear} N
              </button>
            </div>
          );
        }
      )}
    </div>

    <div class="py-4">
      <Widget src="mintbase.near/widget/BuiltWithMintbase" />
    </div>
  </>
) : (
  <p>loading...</p>
);
