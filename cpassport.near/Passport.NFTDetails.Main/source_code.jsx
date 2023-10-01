const DivBackground = styled.div`
  background-color:#FDF3DD;
  height:100vh;
  padding-bottom:20vh;
  display:flex;
  align-items:center;
  justify-content: center;
  text-align:center;
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

const selectedCountry = countryList.find((item)=>item.series===props.series);

return (
  <div style={{ backgroundColor: "#FDF3DD" }}>
    <button
      style={{ backgroundColor: "transparent", borderWidth: 0, padding: 10 }}
      onClick={props.onBack}
    >
      <img
        style={{ width: 30, height: 30, borderRadius: 100 }}
        src="https://i.pinimg.com/736x/63/d9/a0/63d9a0f0ca26a6a3da699c91132aa03d.jpg"
      />
    </button>
    <DivBackground>
      <div style={{ width: "40%" }}>
        <img style={{ width: "100%" }} src={selectedCountry.image} />
      </div>
      <div style={{ width: "60%", padding: 10 }}>
        <p style={{ fontSize: 25, fontWeight: "600", marginBottom: 5 }}>
          {selectedCountry.country}
        </p>
        <p>
         Welcome to {selectedCountry.country}
        </p>
      </div>
    </DivBackground>
  </div>
);
