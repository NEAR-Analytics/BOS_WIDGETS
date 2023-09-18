const data = props.data;
const accountId = props.accountId || context.accountId;
const contracts = data.contracts ||
  context.contracts || ["learnernft.learnclub.near", "opencann.mintbase1.near"];
const marketId = "simple.market.mintbase1.near";

const AFFILIATE_ACCOUNT = data.affiliateAccount || "mintbase.near";

const marketData = fetch("https://graph.mintbase.xyz", {
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

const YoctoToNear = (amountYocto) =>
  new Big(amountYocto).div(new Big(10).pow(24)).toString();

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

if (!marketData.ok) {
  return "Loading";
}

const size = "20em";

return marketData !== null ? (
  <>
    <div>
      <h2>OpenCann Marketplace</h2>
      <p>
        This component is in open-beta and still under active construction. DO
        NOT publish any sensitive or proprietary information. Best viewed on
        desktop.
      </p>
    </div>
    <Widget src="denysk.near/widget/PriceStats" />
    <hr></hr>
    <div>
      <h5>Data Sets</h5>
      <p>
        Showing NFTs listed by contracts learnernft.learnclub.near and
        opencann.mintbase1.near.
      </p>
    </div>
    <div className="d-flex gap-4 flex-wrap">
      {marketData.body.data?.mb_views_active_listings_by_contract.map(
        (listing, i) => {
          const priceYocto = listing.price.toLocaleString().replace(/,/g, "");
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
                style={{
                  border: "1px solid black",
                  backgroundColor: "white",
                  color: "black",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                Buy {priceNear} N
              </button>
              <button
                style={{
                  border: "1px solid black",
                  backgroundColor: "lightgreen",
                  color: "black",
                  fontSize: "18px",
                  cursor: "pointer",
                  width: size,
                  height: "2em",
                  objectFit: "cover",
                  minWidth: size,
                  minHeight: "2em",
                  maxWidth: size,
                  maxHeight: "2em",
                }}
              >
                <Widget src="mob.near/widget/LikeButton" />
                Like
              </button>
            </div>
          );
        }
      )}
    </div>
    <hr></hr>
    <div>
      <h5>Algorithms</h5>
      <p>
        Purchase jobs you would like to run on your data. Each job describes the
        input and output file formats, as well as the Docker container used.
      </p>
    </div>
    <hr></hr>
    <div>
      <h5>Impact Certificates</h5>
      <p>
        Impact certificates allow scientists and funders an opportunity to earn
        retroactive public goods funding for thier contributions to knowledge as
        a public good. Impact Certificates are linked to corresponding input
        data, algorithms, and output data that generated impact in the world.
      </p>
    </div>
    <hr></hr>
    <h5>Balances</h5>
    Coming soon!
    <hr></hr>
    <h5>Explore</h5>
    <p>
      Replace "opencann.near" with any contract address to view public data.
    </p>
    <Widget src="opencann.near/widget/explorer" />
    <hr></hr>
    <Widget src="mintbase.near/widget/BuiltWithMintbase" />
  </>
) : (
  <p>loading...</p>
);
