const DivBackground = styled.div`
  height: 100vh;
  background-color: #FDF3DD;
  display: flex;
  padding-bottom:20vh;
  width:100%;
  align-items:center;
  justify-content:center;
`;

State.init({
  tokenId: {},
  nftDetails: false,
  hasFetched: {},
  numberOfNfts: {},
  allTokens: [],
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

const tokenSeries = countryList.map((item) => `${item.series}:token`);
const allState = [];

tokenSeries.map((item, idx) => {
  const totalState = state?.[item];
  (totalState ?? [])?.map((item) => {
    allState.push(item);
  });
  if (idx !== tokenSeries.length - 1) {
    State.update({ allTokens: allState });
  }
});

function findTopNFrequentOwners(data, n) {
  const ownerFrequency = {};

  // Building the frequency map
  for (let item of data) {
    if (item.owner in ownerFrequency) {
      ownerFrequency[item.owner]++;
    } else {
      ownerFrequency[item.owner] = 1;
    }
  }

  // Sorting owners based on their frequencies
  const sortedOwners = Object.entries(ownerFrequency).sort(
    (a, b) => b[1] - a[1]
  );

  // Getting the top N owners
  const topNOwners = sortedOwners.slice(0, n).map((item) => {
    return {
      owner: item[0],
      frequency: item[1],
    };
  });

  return topNOwners;
}

const allOwnerIds = findTopNFrequentOwners(state.allTokens).map(
  (item) => item.owner
);

const GridView = styled.div`
display: grid;
width:100%;
background-color:#ffce1f;
align-items:center;
margin-bottom:10px;
border-radius:10px;
padding:10px;
grid-template-columns: 30% 70%;
@media (max-width: 1024px) {
grid-template-columns: 40% 60%;
  }
  
`;

const allHolders = [
  "harrydhillon.near",
  "noak.near",
  "blaze.near",
  "james.near",
  "ndcplug.near",
];

const findIfExisting = (owner, token) => {
  const allitems = state.allTokens.filter(
    (item) => item.owner === owner && item.token_id.includes(token)
  );
  return allitems;
};

if (state.nftDetails) {
  return (
    <>
      <Widget
        src="cpassport.near/widget/Passport.NFTDetails.Main"
        props={{
          series: state.nftDetails,
          onBack: () => {
            State.update({ nftDetails: null });
          },
        }}
      />
    </>
  );
}

const GridDetailsNFT = styled.div`
  grid-template-columns:repeat(8,1fr);
   @media (max-width: 1024px) {
   grid-template-columns:repeat(4,1fr);
  }
  @media (max-width: 768px) {
   grid-template-columns:repeat(2,1fr);
  }
`;

allOwnerIds.map((item) => {
  let counter = 0;
  countryList.map((_, index) => {
    const isExsisting = findIfExisting(item, _.series);
    if (isExsisting?.[0]) {
      counter++;
    }
    if (index !== countryList.length - 1) {
      State.update({ [item]: counter });
    }
  });
});

console.log(state)

return (
  <DivBackground>
    <div style={{ width: "100%", padding: 10 }}>
      <h1 style={{ textAlign: "left" }}>
        Frequent
        <br /> Flyers
      </h1>
      {allOwnerIds.splice(0, 5).map((item) => {
        return (
          <GridView>
            <div>
              <p style={{ fontSize: 14, marginBottom: 0 }}>{item} <span style={{marginLeft:10}}>{state[item]}/8</span></p>
            </div>
            <GridDetailsNFT style={{ display: "grid" }}>
              {countryList.map((_) => {
                const isExsisting = findIfExisting(item, _.series);
                return (
                  <img
                    onClick={() => {
                      State.update({ nftDetails: _.series });
                    }}
                    style={{
                      height: 60,
                      width: 60,
                      opacity: isExsisting.length === 0 ? 0.6 : 1,
                    }}
                    src={_.image}
                  />
                );
              })}
            </GridDetailsNFT>
          </GridView>
        );
      })}
    </div>
  </DivBackground>
);
