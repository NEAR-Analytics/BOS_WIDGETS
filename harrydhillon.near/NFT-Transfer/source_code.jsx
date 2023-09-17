// add nft transfers here
// NEED TO FIX SCIENTIFIC NOTION ON PRICE //  ADD ERROR CHECKING for nft contract but preview is enough
const image = props.image;
const onChange = props.onChange;
const amount = "10000000000000000000000"; // 0.01 NEAR // amount to list at, by default its for other marketplaces
const accountId = context.accountId; // add check for context it
const ownerId = "minorityprogrammers.near"; // attribution
const nft = props.nft ?? {
  contractId: props.contractId,
  tokenId: props.tokenId,
}; // just in case need to pass in a NFT
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
  validReceiver: true,
  ownsNFT: false, // change this and check intially
  transfer: false, // add checkbox for transfer that shows
  url: image.url,
  allNFTS: [],
  nft: image.nft ?? {}, // from santiago
});

const ShadowBOX = styled.div`
-webkit-box-shadow: -1px 0px 9px 8px rgba(0,0,0,0.03);
-moz-box-shadow: -1px 0px 9px 8px rgba(0,0,0,0.03);
box-shadow: -1px 0px 9px 8px rgba(0,0,0,0.03);
  border-radius:10px;
  padding-top:10px;
  padding-bottom:10px;
`;

/* HELPER FUNCTION */
function isNearAddress(address) {
  if (typeof address !== "string") {
    return false;
  }
  if (!address.endsWith(".near")) {
    return false;
  }
  const parts = address.split(".");
  if (parts.length !== 2) {
    return false;
  }
  if (parts[0].length < 2 || parts[0].length > 32) {
    return false;
  }
  if (!/^[a-z0-9_-]+$/i.test(parts[0])) {
    return false;
  }
  return true;
}

const offer = () => {
  if (!accountId) {
    return;
  }
  // need to buffer serialize arguments, add helper functions with state arguments
  const gas = 100000000000000; // 100 tGas
  //   const deposit = 1; // exactly 1 yocto
  const deposit = 1; // 0.01 near // maybe less
  Near.call([
    {
      contractName: state.contractId,
      methodName: "nft_transfer",
      args: {
        receiver_id: state.receiverId,
        token_id: state.tokenId,
      },
      gas: gas ?? 200000000000000,
      deposit: deposit ?? 10000000000000000000000,
    },
  ]);
};

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
            State.update({ isOfferModalOpen: false });
          }}
        >
          X
        </button>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "space-around",
          gap: "5px",
          overflowX: "hidden",
          overFlowY: "scroll",
        }}
      >
        {state.allNFTS.map((item) => (
          <ShadowBOX
            style={{
              width: 200,
              marginBottom: 10,
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              justifyContent:"center",
            }}
          >
            <div>
              <img
                style={{ width: 150, height: 150, borderRadius: 10 }}
                src={item.media}
              />
              <p style={{ marginBottom: 0 }}>Token ID : {item.tokenId}</p>
              <p style={{ marginBottom: 0, fontSize: 10 }}>
                NFT Contract : {item.contractId}
              </p>
            </div>
          </ShadowBOX>
        ))}
      </div>
    </div>
  );
};

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
                selectedNFTS: state.allNFTS,
                onChange: (nftDetails) => {
                  const isInList = !!state.allNFTS.filter(
                    ({ tokenId }) => tokenId === nftDetails.tokenId
                  )?.[0];
                  console.log(
                    isInList,
                    state.allNFTS.filter(
                      ({ tokenId }) => tokenId !== nftDetails.tokenId
                    ),
                    state.allNFTS
                  );
                  if (isInList) {
                    State.update({
                      allNFTS: state.allNFTS.filter(
                        ({ tokenId }) => tokenId !== nftDetails.tokenId
                      ),
                    });
                  } else {
                    State.update({
                      allNFTS: [...state.allNFTS, nftDetails],
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
          disabled={
            state.allNFTS.length === 0 ||
            !isNearAddress(state.receiverId) ||
            state.offerAmount === ""
          }
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
          <div className="mt-2"></div>
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
