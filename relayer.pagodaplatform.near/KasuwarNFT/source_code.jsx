const accountId = props.accountId || context.accountId;
const contracts = props.contracts ||
  context.contracts || [
    "core.namesky.near",
    "asac.near",
    "mrbrownproject.near",
    "spin-nft-contract.near",
    "citizen.bodega-lab.near",
    "ff.nekotoken.near",
  ];
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
        mb_views_active_listings_by_contract(limit: 200, order_by: {created_at: desc}, where: {market_id: {_eq: "simple.market.mintbase1.near"}, nft_contract_id: {_in: $contracts}}) {
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

if (!data.ok) {
  return "Loading";
}

const size = "100%";

const theme = props.theme;

const MainContainer = styled.div`
  width: 100%;
  padding-block: 32px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap:32px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
  max-width: 600px;
`;
const ContentContainer = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  overflow: hidden;
`;

const ActionButton = styled.button`
  border: none;
  background-color: #01e1d3;
  color: black;

  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 0px;

  :hover {
    background-color: #47fff3;
  }
`;

return data !== null ? (
  <MainContainer>
    <Header>
      <h2 style={{ fontWeight: 600 }}>Barka Da Zuwa Kasuwar NFT</h2>
      <p>Anan Zaka samun Duk Irin NFT da kake so ka siya akan Farashin Near</p>
    </Header>

    <ContentContainer>
      {data.body.data?.mb_views_active_listings_by_contract.map(
        (listing, i) => {
          const priceYocto = listing.price.toLocaleString().replace(/,/g, "");
          const priceNear = YoctoToNear(priceYocto);

          return (
            <ItemContainer>
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

              <ActionButton
                disabled={!accountId}
                onClick={() => {
                  if (!accountId) return;
                  Siya(priceYocto, listing.token_id, listing.nft_contract_id);
                }}
              >
                Near {priceNear} Kacal
              </ActionButton>
            </ItemContainer>
          );
        }
      )}
    </ContentContainer>
  </MainContainer>
) : (
  <p>loading...</p>
);
