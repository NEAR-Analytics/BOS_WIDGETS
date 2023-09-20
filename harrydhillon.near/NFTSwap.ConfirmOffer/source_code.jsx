const ShadowBOX = styled.div`
-webkit-box-shadow: -1px 0px 9px 8px rgba(0,0,0,0.03);
-moz-box-shadow: -1px 0px 9px 8px rgba(0,0,0,0.03);
box-shadow: -1px 0px 9px 8px rgba(0,0,0,0.03);
  border-radius:10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top:10px;
  padding-bottom:10px;
`;

const ScrollContainer = styled.div`
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar { 
      display: none;
  }
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 200px;
  border-radius:5px;
  padding: 5px;
  border: 1px solid lightgray;
`;

const ConfirmOffer = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h4>Confirm NFT Offer</h4>
        <button
          onClick={() => {
            props.update({ isOfferModalOpen: false });
          }}
        >
          X
        </button>
      </div>
      <p style={{ marginBottom: 5, wordBreak: "break-all" }}>
        Offering: {accountId}
        <br />
        near: Ⓝ {props.offerAmount}
      </p>
      <ScrollContainer>
        {(props?.sendNFTS ?? [])?.map((item) => (
          <ShadowBOX
            style={{
              width: "100%",
              marginBottom: 10,
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>
              <img
                style={{ width: 60, height: 60, borderRadius: 10 }}
                src={item.media}
              />
              <p style={{ marginBottom: 0 }}>Token ID : {item.tokenId}</p>
              <p style={{ marginBottom: 0, fontSize: 10 }}>
                NFT Contract : {item.contractId}
              </p>
            </div>
          </ShadowBOX>
        ))}
      </ScrollContainer>
      <p style={{ marginBottom: 5, marginTop: 10, wordBreak: "break-all" }}>
        Receving: {props.receiverId}
      </p>
      <ScrollContainer>
        {(props?.offerNFTS ?? [])?.map((item) => (
          <ShadowBOX
            style={{
              width: "100%",
              marginBottom: 10,
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>
              <img
                style={{ width: 60, height: 60, borderRadius: 10 }}
                src={item.media}
              />
              <p style={{ marginBottom: 0, fontSize: 12 }}>
                Token ID : {item.tokenId}
              </p>
              <p style={{ marginBottom: 0, fontSize: 10 }}>
                NFT Contract : {item.contractId}
              </p>
            </div>
          </ShadowBOX>
        ))}
      </ScrollContainer>
      <button onClick={props.generateOfferAndCallContract} style={{ marginTop: 10 }}>
        Offer
      </button>
    </div>
  );
};

return ConfirmOffer();
