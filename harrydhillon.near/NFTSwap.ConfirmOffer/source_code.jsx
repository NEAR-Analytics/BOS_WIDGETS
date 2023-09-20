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

function multiplyBy10ToThe24(num) {
  // Convert the number to a string
  let strNum = num.toString();

  // Number of zeros to append
  let zeros = "000000000000000000000000";

  // Check if the number has a decimal point
  let indexOfDecimal = strNum.indexOf(".");

  if (indexOfDecimal === -1) {
    // If there's no decimal, simply append 24 zeros
    return strNum + zeros;
  } else {
    // If there's a decimal, shift the numbers after the decimal
    let beforeDecimal = strNum.substring(0, indexOfDecimal);
    let afterDecimal = strNum.substring(indexOfDecimal + 1);

    // Append necessary zeros and adjust the decimal point
    let newNum = beforeDecimal + afterDecimal;

    // Account for the cases where there's less than 24 digits after the decimal
    let zerosToAdd = 24 - afterDecimal.length;
    for (let i = 0; i < zerosToAdd; i++) {
      newNum += "0";
    }

    // Remove leading zeros
    while (newNum[0] === "0" && newNum.length > 1) {
      newNum = newNum.substring(1);
    }

    return newNum;
  }
}

const ConfirmOffer = () => {
  const generateOfferAndCallContract = () => {
    const allTransactions = [];
    if (props.offerAmount && props.offerNFTS.length === 0) {
      allTransactions.push({
        contractName: "v1.havenswap.near",
        methodName: "mass_transfer",
        args: {
          receiver_id: props.receiverId,
        },
        gas: 100000000000000,
        deposit: 1000000000000000000000000 * parseFloat(props.offerAmount),
      });
    }
    if (props.offerNFTS) {
      props?.offerNFTS?.map((item) => {
        const contractArgs = {
          sender_id: context.accountId,
          sender_near: multiplyBy10ToThe24(parseFloat(props.offerAmount)),
          sender_nfts: props.sendNFTS.map((item) => ({
            tokenId: item.tokenId,
            contractId: item.contractId,
          })),
          receiver_id: props.receiverId,
          receiver_nfts: props.offerNFTS.map((item) => ({
            tokenId: item.tokenId,
            contractId: item.contractId,
          })),
          is_holder: false,
        };
        allTransactions.push({
          contractName: "v1.havenswap.near",
          methodName: "send_offer",
          args: {
            ...contractArgs,
          },
          gas: 100000000000000,
          deposit: 1000000000000000000000000 * parseFloat(props.offerAmount),
        });
      });
    }
    if (props.sendNFTS) {
      props?.sendNFTS?.map((item) => {
        allTransactions.push({
          contractName: item.contractId,
          methodName: "nft_transfer",
          args: {
            receiver_id: props.receiverId,
            token_id: item.tokenId,
          },
          gas: 100000000000000,
          deposit: 1,
        });
      });
    }
    Near.call(allTransactions);
    props.update({ isOfferModalOpen: false });
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
      <button
        onClick={() => generateOfferAndCallContract()}
        style={{ marginTop: 10 }}
      >
        Offer
      </button>
    </div>
  );
};

return props.isOfferModalOpen ? (
  <Widget
    src="harrydhillon.near/widget/Keypom.Components.Modal"
    props={{
      children: ConfirmOffer(),
      isOpen: props?.isOfferModalOpen,
      contentStyles: {
        style: {
          width: 600,
        },
      },
    }}
  />
) : (
  <></>
);
