const DivBackground = styled.div`
  background-color:#FDF3DD;
  height:100vh;
  display:flex;
  align-items:center;
  justify-content: center;
  text-align:center;
`;

const portugal = {
  series: "230",
  country: "Portugal",
  image:
    "https://ipfs.near.social/ipfs/bafybeiewfpsywztby7id634y7iox3icdkge5ptu3spgd3efeilrst64gh4",
};

return (
  <DivBackground>
    <div style={{ width: "40%" }}>
      <img style={{ width: "100%" }} src={portugal.image} />
    </div>
    <div style={{ width: "60%", padding: 10 }}>
      <p style={{ fontSize: 25, fontWeight: "600", marginBottom: 5 }}>
        Fillipino Artists Guild
      </p>
      <p>
        Filipino Artist Guild is the only active community of Near in the
        Philippines that focuses on the talent and creativity of all Filipino
        artists.
      </p>
    </div>
  </DivBackground>
);
