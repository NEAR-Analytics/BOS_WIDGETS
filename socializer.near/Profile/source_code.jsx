const Owner = "socializer.near";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  background: #FAFAFA;
  flex-direction: column;
  padding: 18px;
  gap: 18px;
`;

const WalletComponent = styled.div`
  display: flex;
  width: 100%;
  background: #F3F3F3;
  flex-direction: column;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid var(--light_90, #E6E6E6);
  gap: 20px;
`;

const Avatar = styled.img`
  display: flex;
  width: 100px;
  height: 100px;
  border-radius: 100px;
`;

return (
  <Wrapper>
    <div className="d-flex align-items-center" style={{ gap: 24 }}>
      <Avatar src="https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm" />
      <h4>Hi, Skylar Dias</h4>
    </div>
    <WalletComponent>
      <div className="d-flex " style={{ borderBottom: "1px solid #808080" }}>
        <h5 style={{ fontWeight: 700, fontSize: 18, lineHeight: "150%" }}>
          Near Wallet
        </h5>
      </div>
      <div className="d-flex ">
        <h5 style={{ fontWeight: 600, fontSize: 18 }}>skylar.near</h5>
      </div>
    </WalletComponent>
  </Wrapper>
);
