const accountId = props?.accountId ?? context?.accountId;

State.init({
  tokenId: {},
  nftDetails: false,
  hasFetched: {},
});

console.log(state);

const phillipines = {
  series: "224",
  country: "Phillipines",
  image:
    "https://ipfs.near.social/ipfs/bafybeih7fmsubhl2inkboy3ngkpoirffgbygyn6gg6pkthd5pvikyxrum4",
};

const india = {
  series: "225",
  country: "India",
  image:
    "https://ipfs.near.social/ipfs/bafybeiaqolijobdczeeihfx2gcqfc4hxxy54pnrym5ujm45yndbinfuqfu",
};

const brazil = {
  series: "226",
  country: "Brazil",
  image:
    "https://ipfs.near.social/ipfs/bafybeib57ef23gpshvn7nv4ux7gypoevx4weblc3a2vpgb3n25u5qvxieq",
};

const unitedStates = {
  series: "227",
  country: "United States",
  image:
    "https://ipfs.near.social/ipfs/bafybeih5pggkqxka6wxdlcimei6ghn6opuroxkvknirmpfc3xedsub5dta",
};

const antiqua = {
  series: "228",
  country: "Antiqua",
  image:
    "https://ipfs.near.social/ipfs/bafybeid2t5czk6q6at2t4nbczp3tf3acxu2nw3sz4bxte7z6yg5m37sw6a",
};

const nigerea = {
  series: "229",
  country: "Nigerea",
  image:
    "https://ipfs.near.social/ipfs/bafybeiaalp75q2bjwzjyatxyuwmhpxcyrlvye6bbioenrfrvqbsypyz6om",
};

const portugal = {
  series: "230",
  country: "Portugal",
  image:
    "https://ipfs.near.social/ipfs/bafybeiewfpsywztby7id634y7iox3icdkge5ptu3spgd3efeilrst64gh4",
};

const canada = {
  series: "231",
  country: "Canada",
  image:
    "https://ipfs.near.social/ipfs/bafybeibjnx2u3oluxda7snccioccxynlm7mmd2o2ieahbzg6eiv3udd44m",
};

const countryList = [
  phillipines,
  india,
  brazil,
  unitedStates,
  antiqua,
  nigerea,
  portugal,
  canada,
];

function fetchTokens(series) {
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
              where: { nft_contract_id: { _eq: "mint.sharddog.near" } 
               owner: { _eq:"${accountId}" } token_id: {_regex: "^${series}:"}}
            ) {
              owner
              token_id
              media
              base_uri
              minter
              metadata_id
            }
          }
        `,
    }),
  }).then((res) => {
    if (res.ok) {
      const [token] = res.body.data.mb_views_nft_tokens;
      if (token) {
        State.update({
          tokens: { ...state.tokens, [series]: token },
        });
      }
    }
  });
}

const fetchAllTokens = () => {
  countryList.forEach((item, idx) => {
    if (state.hasFetched[item.series] !== true) {
      fetchTokens(item.series);
      State.update({
        hasFetched: { ...state.hasFetched, [item.series]: true },
      });
    }
  });
};

if (Object.keys(state.hasFetched).length !== countryList.length) {
  fetchAllTokens();
}

const DivBackground = styled.div`
  height: 100vh;
  background-color: #FDF3DD;
  display: flex;
  padding-bottom:20vh;
  width:100%;
  align-items:center;
  justify-content:center;
    background-image: url("https://ipfs.near.social/ipfs/bafkreifhkr2j72jezjrb3dhuilmgavdlpnmcobxfdl56h6el6msj6bh6se");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const GridView = styled.div`
  display: grid;
  width:100%;
  margin-top: 20px;
  grid-template-columns: 35% 60%;
  @media only screen and (max-width: 768px) {
    display:block;
  }
`;

const ImageGrid = styled.div`
    display:grid;
    grid-template-columns: repeat(4,1fr);
`;

console.log(state);

return state?.nftDetails ? (
  <>
    <Widget
      src="cpassport.near/widget/Passport.NFTDetails.Main"
      props={{
        series: state.series,
        onBack: () => {
          State.update({ nftDetails: false });
        },
      }}
    />
  </>
) : (
  <DivBackground>
    <div style={{ width: "100%", textAlign: "center" }}>
      <GridView>
        <div style={{ paddingLeft: 20 }}>
          <div style={{ textAlign: "left" }}>
            <>
              <h1>
                AROUND
                <br /> THE
                <br /> WORLD
              </h1>
              <div style={{ marginLeft: 20 }}>
                <p style={{ fontSize: 20 }}>Visit with Artists</p>
                <p style={{ fontSize: 20 }}>Scan the QR Codes</p>
                <p style={{ fontSize: 20 }}>Collect Stamps</p>
                <p style={{ fontSize: 20 }}>Unlock Prizes</p>
              </div>
            </>
          </div>
        </div>
        <div style={{ paddingLeft: 10 }}>
          <p style={{ fontSize: 14, textAlign: "left" }}>{accountId} stamps</p>
          <ImageGrid>
            {countryList.map((item) => (
              <button
                onClick={() => {
                  State.update({ nftDetails: true, series: item.series });
                }}
                style={{
                  opacity: state.tokens[item.series] ? 1 : 0.4,
                  padding: 0,
                  backgroundColor: "transparent",
                  borderWidth: 0,
                }}
              >
                <img style={{ width: 80, height: 80 }} src={item.image} />
              </button>
            ))}
          </ImageGrid>
        </div>
      </GridView>
    </div>
  </DivBackground>
);
