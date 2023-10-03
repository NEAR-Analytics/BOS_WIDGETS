const DivBackground = styled.div`
  min-height: 100vh;
  background-color: #FDF3DD;
  display: flex;
  padding-bottom:20vh;
  width:100%;
  align-items:center;
   overflow-x: auto;
  justify-content:center;
    background-image: url("https://ipfs.near.social/ipfs/bafkreifhkr2j72jezjrb3dhuilmgavdlpnmcobxfdl56h6el6msj6bh6se");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
const accountId = props?.accountId ?? context?.accountId;

State.init({
  tokenId: {},
  nftDetails: false,
  hasFetched: {},
});

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
              where: { nft_contract_id: { _eq: "mint.sharddog.near" } token_id: {_regex: "^${series}:"}}
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
      const token = res.body.data.mb_views_nft_tokens;
      if (token) {
        State.update({
          [`${series}:token`]: token,
        });
      }
    }
  });
}

console.log(state.tokens);

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

const GridView = styled.div`
  display: grid;
  width:100%;
  padding-left:10px;
  margin: auto;
  gap:5px;
  grid-template-columns: repeat(10, 1fr);
  @media only screen and (max-width: 900px) {
    display:block;
  }
`;

const HideInMobile = styled.div`
  @media only screen and (max-width: 900px) {
    display:none;
  }
`;

const ShowInMobile = styled.div`
  @media only screen and (max-width: 900px) {
    display:block;
  }
`;

const getToken = (series) => {
  return state[`${series}:token`];
};

if (state.series) {
  return (
    <Widget
      src="cpassport.near/widget/Passport.NFTDetails.Main"
      props={{
        series: state.series,
        onBack: () => {
          State.update({ series: null });
        },
      }}
    />
  );
}

return (
  <DivBackground>
    <div>
      <h1 style={{ textAlign: "center" }}>Onboarding Manifest</h1>
      <GridView>
        <HideInMobile>
          <div>
            <div style={{ height: 70 }} />
            <p style={{ fontSize: 12 }}>Total:</p>
            <p style={{ fontSize: 12 }}>Flight log:</p>
          </div>
        </HideInMobile>
        {countryList.map((item) => (
          <>
            <div style={{ textAlign: "center" }}>
              <ShowInMobile style={{ marginBottom: 20 }} />

              <img
                style={{ width: 70, height: 70, cursor: "pointer" }}
                onClick={() => {
                  State.update({ series: item.series });
                }}
                src={item.image}
              />
              <div
                style={{
                  backgroundColor: "white",
                  border: "1px solid #ffce1f",
                  borderRadius: 10,
                  zIndex: -5,
                  transform: "translateY(10px)",
                }}
              >
                <p style={{ marginBottom: 0, padding: 10 }}>
                  <ShowInMobile>
                    Total : {getToken(item.series).length}
                  </ShowInMobile>
                </p>
              </div>
              {getToken(item.series).length !== 0 && (
                <div
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #ffce1f",
                    padding: 10,
                    paddingTop: 20,
                    zIndex: 10,
                    borderRadius: 10,
                  }}
                >
                  <ShowInMobile style={{ marginBottom: 16 }}>
                    Flight log
                  </ShowInMobile>
                  {getToken(item.series).map((item) => (
                    <p style={{ fontSize: 8 }}>{item.owner}</p>
                  ))}
                </div>
              )}
            </div>
          </>
        ))}
      </GridView>
    </div>
  </DivBackground>
);
