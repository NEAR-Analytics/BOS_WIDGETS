const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px 36px;
  color: #fff;
`;
const dapps = [
  {
    src: "bluebiu.near/widget/Mantle.Swap",
    bannerImg:
      "https://ipfs.near.social/ipfs/bafkreie7a5cb6qj3je2dn5iatdulom3ottpwvtyxc7q2zodqqafizum6ge",
    icon: "https://ipfs.near.social/ipfs/bafkreih5g53fla4rhvb3ori5mand6rqtdj5xosqjiqrnif3qadk7sun564",
    tags: ["Dexes", "Mantle"],
  },
];

return (
  <Container>
    {dapps.map((dapp) => (
      <Widget
        src="bluebiu.near/widget/Mantle.MantleTemplateCard"
        key={dapp.src}
        props={{
          ...dapp,

          bannerStyle: {
            background: "#05180A",
          },
        }}
      />
    ))}
  </Container>
);
