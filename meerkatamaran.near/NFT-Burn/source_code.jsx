const BoatTicket = styled.div`
  border: 2px dashed navy;
  background-color: white;
  color: black;
  padding: 20px;
  width: 600px; /* or any suitable width */
  font-family: 'Courier', sans-serif;
  margin: auto;
`;

const TicketHeader = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const TicketSection = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: semi-bold;
    text-transform: uppercase;
  }

  input {
    width: 100%;
    padding: 8px;
    border: 0px;
    border-bottom: 2px dashed;
    font-style: italic;
  }
`;

const TicketFooter = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const PrimaryButton = styled.button`
  background-color: navy;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: darkblue;
  }
`;

const image = props.image;
const onChange = props.onChange;
const amount = "10000000000000000000000"; // 0.01 NEAR // amount to list at, by default its for other marketplaces
const accountId = context.accountId; // add check for context it
const ownerId = "meerkatamaran.near"; // attribution
const nft = props.nft ?? {
  contractId: props.contractId,
  tokenId: props.tokenId,
}; // just in case need to pass in a NFT
const contractId = "somenft.contract.near"; // default nft contract
const tokenId = "1"; // maybe condtional check if props is eempty // default nft
// maybe utilize the helper funciton here
// const fewfarlink =
const default_receiver =
  "0000000000000000000000000000000000000000000000000000000000000000"; // default reciver nft for transfers
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
console.log(tokenInfo.approved_account_ids);
initState({
  contractId: contractId,
  tokenId: tokenId,
  validMarketLink: true,
  nftMetadata: nftMetadata,
  tokenInfo: tokenInfo,
  receiverId: default_receiver,
  validReceiver: true,
  ownsNFT: false, // change this and check intially
  transfer: false, // add checkbox for transfer that shows
  url: image.url,
  nft: image.nft ?? {}, // from santiago
});
function ownsNFT() {
  const ownsNFT = accountId === state.tokenInfo.owner_id;
  State.update({
    ownsNFT: ownsNFT,
  });
}
ownsNFT();

/*ON CHANGE FUNCTIONS - NEED TO FINISH NOT CONCATENATING*/

const onChangeReceiver = (receiverId) => {
  const validReceiverLink = isNearAddress(receiverId); // add error message or change button based on this
  ownsNFT();
  State.update({
    receiverId,
    validReceiver: validReceiverLink,
  });
};

const onChangeContract = (contractId) => {
  const nftMetadata = Near.view(contractId, "nft_metadata"); // get the contract name
  State.update({
    contractId,
    nftMetadata,
  });
  onChangeToken(state.tokenId); // this doesnt change the token
  ownsNFT();
};

const onChangeToken = (tokenId) => {
  const tokenInfo = Near.view(state.contractId, "nft_token", {
    token_id: tokenId,
  });
  State.update({
    tokenId,
    tokenInfo,
  });
  ownsNFT();
};
// finish this statement
const updateLink = () => {
  if (state.contractId && state.tokenId) {
  }
};
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

const transfer = () => {
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
        msg: "nft burn",
      },
      gas: gas ?? 200000000000000,
      deposit: deposit ?? 10000000000000000000000,
    },
  ]);
};
return (
  <div>
    <div>
      <div
        className="p-2"
        style={{
          background: "#fdfdfd",
          border: "solid 1px #dee2e6",
          borderTop: 0,
          borderBottomLeftRadius: ".375rem",
          borderBottomRightRadius: ".375rem",
          minHeight: "9em",
        }}
      >
        <div>
          <div className="mt-2">
            <Widget
              src={`meerkatamaran.near/widget/nft-selector`}
              props={{
                onChange: ({ contractId, tokenId }) => {
                  State.update({
                    contractId: contractId,
                    tokenId: tokenId,
                  });
                  onChangeToken(tokenId);
                  onChangeContract(contractId);
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>

    <BoatTicket>
      <TicketHeader>NFT Funeral Ticket</TicketHeader>

      <TicketSection>
        <label>Selected ContractID</label>
        <input type="text" readOnly value={state.contractId} />
      </TicketSection>

      <TicketSection>
        <label>Selected Token ID</label>
        <input type="text" readOnly value={state.tokenId} />
      </TicketSection>

      <TicketSection>
        <label>Burn Address</label>
        <input
          type="text"
          placeholder={state.receiverId}
          onChange={(e) => onChangeReceiver(e.target.value)}
          readOnly
        />
      </TicketSection>
      <div className="row">
        {state.ownsNFT && state.validReceiver && (
          <>
            <TicketFooter>
              <small>
                WARNING: This cannot be undone. <br />
                Once you confirm the transaction it is burned FOREVER
              </small>
              <br />
              <PrimaryButton onClick={transfer}>
                Set Sail ⛵️ To This NFT
              </PrimaryButton>
              <br />
              <small>
                WARNING: Please double check the select NFT is the one to burn
              </small>
            </TicketFooter>
          </>
        )}
        <div className="col-lg-6"></div>
        {state.ownsNFT && !state.validReceiver && (
          <button className="btn btn-warning mt-3">
            Can't Burn (Invalid Receiver)
          </button>
        )}
        {!state.ownsNFT && state.validReceiver && (
          <button className="btn btn-danger mt-3">
            Can't Burn (Don't Own)
          </button>
        )}
      </div>
    </BoatTicket>
  </div>
);

// TODO: Only listing to marketplaces (already listed) to marketplaces that this nft hasnt been listed on
// add buttons to links in the marketplaces if they have been listed
// add ability to list on different marketplaces at different price
// add conditional for not being able to list if their is invalid custom maretkpalce trying to list to or invalid anything
