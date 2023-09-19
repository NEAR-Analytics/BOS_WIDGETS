// add nft transfers here
// NEED TO FIX SCIENTIFIC NOTION ON PRICE //  ADD ERROR CHECKING for nft contract but preview is enough
const amount = "10000000000000000000000"; // 0.01 NEAR // amount to list at, by default its for other marketplaces
const accountId = context.accountId; // add check for context it
const ownerId = "minorityprogrammers.near"; // attribution

const contractId = "genadrop-contract.nftgen.near"; // default nft contract
const tokenId = "1679119560198"; // maybe condtional check if props is eempty // default nft
const fewfarmarket = "market.fewandfar.near";
const tradeportmarket = "market.tradeport.near";
// fewfar link // display button if listed // asking them for format and they are working on a fix // https://fewfar.com/genadrop-single-nft-near/1675689302938/
const tradeportLink =
  "https://www.tradeport.xyz/near/collection/" + contractId + "/" + tokenId;
// maybe utilize the helper funciton here
// const fewfarlink =
const default_receiver = ""; // default reciver nft for transfers
const msg =
  '{"price":' +
  '"' +
  amount +
  '"' +
  ',"market_type":"sale","ft_token_id":"near"}';
// need to find custom market link to work with

const nftMetadata = Near.view(contractId, "nft_metadata"); // get the contract name
const tokenInfo = Near.view(contractId, "nft_token", {
  token_id: tokenId,
});

initState({
  receiverId: default_receiver,
  offerAmount: 0,
  validReceiver: true,
  ownsNFT: false, // change this and check intially
  transfer: false, // add checkbox for transfer that shows
  url: image.url,
  sendNFTS: [],
  offerNFTS: [],
  nft: image.nft ?? {}, // from santiago
});

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

/* HELPER FUNCTION */
function isNearAddress(address) {
  if (typeof address !== "string" || address === "") {
    return false;
  }
  if (context.accountId === address) {
    return false;
  }

  return true;
}

console.log(state);

const returnBuffer = (data)=>{
  Buffer.from(
      JSON.stringify(data),
      "utf-8"
    ).toString("base64");
}

const ConfirmOffer = () => {
  const generateOfferAndCallContract = () => {
    const allTransactions = [];
    if (state.offerAmount && state.offerNFTS.length === 0) {
      allTransactions.push({
        contractName: "v1.havenswap.near",
        methodName: "mass_transfer",
        args: {
          receiver_id: state.receiverId,
        },
        gas: 100000000000000,
        deposit: 1000000000000000000000000 * parseFloat(state.offerAmount),
      });
    }
    if (state.offerNFTS) {
      state.offerNFTS.map((item) => {
        allTransactions.push({
          contractName: "v1.havenswap.near",
          methodName: "send_offer",
          args: {
            sender_id: accountId,
            sender_near: state.offerAmount
              ? 0
              : 1000000000000000000000000 * parseFloat(state.offerAmount),
            sender_nfts: state.sendNFTS.map((item) => ({
              tokenId: item.tokenId,
              contractId: item.contractId,
            })),
            receiver_id: state.receiverId,
            receiver_nfts: state.offerNFTS.map((item) => ({
              tokenId: item.tokenId,
              contractId: item.contractId,
            })),
            is_holder: false,
          },
          gas: 100000000000000,
        });
      });
    }
    if (state.sendNFTS) {
      state.sendNFTS.map((item) => {
        allTransactions.push({
          contractName: item.contractId,
          methodName: "nft_transfer",
          args: {
            receiver_id: state.receiverId,
            token_id: item.tokenId,
          },
          gas: 100000000000000,
        });
      });
    }
    Near.call(allTransactions);
    State.update({ isOfferModalOpen: false });
  };

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
            State.update({ isOfferModalOpen: false });
          }}
        >
          X
        </button>
      </div>
      <p style={{ marginBottom: 5 }}>
        Offering: {accountId}
        <br />
        near: Ⓝ {state.offerAmount}
      </p>
      <ScrollContainer>
        {state.sendNFTS?.map((item) => (
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
      <p style={{ marginBottom: 5, marginTop: 10 }}>
        Receving: {state.receiverId}
      </p>
      <ScrollContainer>
        {state.offerNFTS?.map((item) => (
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
      <button onClick={generateOfferAndCallContract} style={{ marginTop: 10 }}>
        Offer
      </button>
    </div>
  );
};

const offerButtonDisabled =
  (state.sendNFTS.length === 0 || state.offerNFTS.length === 0) &&
  !isNearAddress(state.receiverId);

return (
  <div>
    <h1> 🛍️ Transfer NFT </h1>
    <div style={{ display: "flex", gap: "5px" }}>
      <div
        className="p-2"
        style={{
          background: "#fdfdfd",
          border: "1px solid lightgray",
          borderTop: 0,
          width: "40%",
          borderRadius: "5px",
        }}
      >
        <div>
          <p>Your Wallet : {accountId} </p>
          <div className="mt-2">
            <Widget
              src={`harrydhillon.near/widget/nft-selector`}
              props={{
                selectedNFTS: state.sendNFTS,
                onChange: (nftDetails) => {
                  const isInList = !!state.sendNFTS.filter(
                    ({ tokenId }) => tokenId === nftDetails.tokenId
                  )?.[0];
                  console.log(
                    isInList,
                    state.sendNFTS.filter(
                      ({ tokenId }) => tokenId !== nftDetails.tokenId
                    ),
                    state.sendNFTS
                  );
                  if (isInList) {
                    State.update({
                      sendNFTS: state.sendNFTS.filter(
                        ({ tokenId }) => tokenId !== nftDetails.tokenId
                      ),
                    });
                  } else {
                    State.update({
                      sendNFTS: [...state.sendNFTS, nftDetails],
                    });
                  }
                },
              }}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          width: "20%",
          padding: 10,
          border: "1px solid lightgray",
          borderRadius: 10,
          height: "fit-content",
        }}
      >
        <h4>Offer </h4>
        Instructions:
        <br />
        1. Select the NFTs you want to trade.
        <br />
        2. Input the recipient's address.
        <br />
        3. Select the NFTs you want to receive.
        <br />
        4. Click on the "Offer" button.
        <input
          style={{ marginTop: 10 }}
          type="number"
          placeholder="amount in near Ⓝ"
          value={state.offerAmount}
          onChange={(e) => {
            State.update({ offerAmount: e.target.value });
          }}
        />
        <input
          style={{ marginTop: 10 }}
          placeholder="Recipient Address"
          value={state.receiverId}
          onChange={(e) => {
            State.update({ receiverId: e.target.value });
          }}
        />
        {!isNearAddress(state.receiverId) && (
          <p style={{ color: "red", fontSize: 10, marginBottom: 0 }}>
            Please enter a valid near wallet address
          </p>
        )}
        <button
          disabled={offerButtonDisabled}
          onClick={() => {
            State.update({ isOfferModalOpen: true });
          }}
          style={{ width: "100%", marginTop: 15 }}
        >
          Offer
        </button>
      </div>
      <div
        className="p-2"
        style={{
          background: "#fdfdfd",
          border: "1px solid lightgray",
          borderTop: 0,
          width: "40%",
          borderRadius: "5px",
        }}
      >
        <div>
          <p>Recipient{`'`}s Wallet</p>
          <div className="mt-2">
            {isNearAddress(state.receiverId) && (
              <Widget
                src={`harrydhillon.near/widget/nft-selector`}
                props={{
                  selectedNFTS: state.offerNFTS,
                  accountId: state.receiverId,
                  onChange: (nftDetails) => {
                    const isInList = !!state.offerNFTS.filter(
                      ({ tokenId }) => tokenId === nftDetails.tokenId
                    )?.[0];
                    console.log(
                      isInList,
                      state.offerNFTS.filter(
                        ({ tokenId }) => tokenId !== nftDetails.tokenId
                      ),
                      state.offerNFTS
                    );
                    if (isInList) {
                      State.update({
                        offerNFTS: state.offerNFTS.filter(
                          ({ tokenId }) => tokenId !== nftDetails.tokenId
                        ),
                      });
                    } else {
                      State.update({
                        offerNFTS: [...state.offerNFTS, nftDetails],
                      });
                    }
                  },
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>

    <Widget
      src="harrydhillon.near/widget/Keypom.Components.Modal"
      props={{
        children: ConfirmOffer(),
        isOpen: state.isOfferModalOpen,
        contentStyles: {
          style: {
            overflowX: "hidden",
            width: 600,
          },
        },
      }}
    />
  </div>
);
