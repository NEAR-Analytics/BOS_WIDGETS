const accountId = props?.accountId ?? context?.accountId;

State.init({
  tokenId: {},
  hasFetched: {},
});

const phillipines = {
  series: "224",
  country: "Phillipines",
  image:
    "https://ipfs.near.social/ipfs/bafybeih7fmsubhl2inkboy3ngkpoirffgbygyn6gg6pkthd5pvikyxrum4",
};
const DivBackground = styled.div`
  height: 100vh;
  background-color: #FDF3DD;
  display: flex;
  padding-bottom:20vh;
  width:100%;
  align-items:center;
  justify-content:center;
`;

const GridView = styled.div`
  display: grid;
  width:100%;
  align-items:center;
  margin-top: 20px;
  grid-template-columns: 40% 50%;
`;

return (
  <DivBackground>
    <div style={{ width: "100%", textAlign: "center" }}>
      <GridView>
        <div>
          <div style={{ textAlign: "center" }}>
            <img style={{ width: "100%" }} src={phillipines.image} />
          </div>
        </div>
        <div>
          <p style={{ fontSize: 35, fontWeight: "bold" }}>
            Fillipino Artists Guild
          </p>
          <p>
            Filipino Artist Guild is the only active community of Near in the
            Philippines that focuses on the talent and creativity of all
            Filipino artists.
          </p>
        </div>
      </GridView>
    </div>
  </DivBackground>
);
