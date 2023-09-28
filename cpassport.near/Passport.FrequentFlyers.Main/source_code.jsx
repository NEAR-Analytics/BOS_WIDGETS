const DivBackground = styled.div`
  height: 100vh;
  background-color: #FDF3DD;
  display: flex;
  padding-bottom:20vh;
  width:100vw;
  align-items:center;
  justify-content:center;
`;

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

const GridView = styled.div`
display: grid;
width:100%;
align-items:center;
grid-template-columns: 30% 70%;
`;

const allHolders = [
  "harrydhillon.near",
  "noak.near",
  "blaze.near",
  "james.near",
  "ndcplug.near",
];

return (
  <DivBackground>
    <div style={{ width: "100%", padding: 10 }}>
      <h1 style={{ textAlign: "center" }}>Frequent Flyers</h1>
      {allHolders.map((item) => (
        <GridView>
          <div>
            <p style={{ fontSize: 12, marginBottom: 0 }}>{item}</p>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(8,1fr)" }}
          >
            {countryList.map((item) => (
              <img style={{ height: 60, width: 60 }} src={item.image} />
            ))}
          </div>
        </GridView>
      ))}
    </div>
  </DivBackground>
);
