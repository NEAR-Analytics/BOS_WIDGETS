const Wrapper = styled.div`
    padding: 20px;
    border-radius: 8px;
    background-color: rgb(38, 38, 38);
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px;
`;

return (
  <Wrapper>
    <img
      style={{ height: 192 }}
      className="w-100 object-fit-cover rounded-3"
      src="https://cdn.discordapp.com/icons/988431580538224641/e77dc47375e528b351f7ec287be40080.png?size=1024"
    />
    <div className="text-center px-2 py-3">
      <h5>AOI NFT</h5>
      <p style={{ fontSize: 14, color: "rgb(163, 163, 163)" }}>
        666 AOI NFT collections will stored on NEAR Blockchain, powered by
        utilities to amplify your thrill.
      </p>
    </div>
  </Wrapper>
);
