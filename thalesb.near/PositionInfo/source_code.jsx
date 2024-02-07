State.init({
  address: undefined,
  position,
});

const { getUserPosition } = VM.require("thalesb.near/widget/compound-requests");

const InfoSection = styled.div`
  color: white;
  margin-top: ${(props) => props.marginTop || 0}px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #333;

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  color: #fff;
`;

const InfoValue = styled.span`
  color: white;
`;

const abi = fetch(
  "https://docs.compound.finance/public/files/comet-interface-abi-98f438b.json"
);

if (!abi) return "Loading...";

const contractInfo = {
  address: props.cometAddress,
  baseAddress: props.baseTokenAddress,
};

useEffect(() => {
  if (Ethers.provider()) {
    Ethers.provider()
      .send("eth_requestAccounts", [])
      .then((accounts) => {
        State.update({ address: accounts[0] });
      });
  }
}, [Ethers]);

useEffect(() => {
  if (!state.address) return;

  getUserPosition({
    userAddress: state.address,
    cometAddress: contractInfo.address,
    rpcUrl: props.httpRpcUrl,
  }).then((position) => {
    State.update({ position });
  });
}, [state.address]);

return (
  <InfoSection>
    <InfoRow>
      <InfoLabel>Collateral value</InfoLabel>
      <InfoValue>
        {Number(state.position.collateralValueUsd || 0).toFixed(4)}
      </InfoValue>
    </InfoRow>
    <InfoRow>
      <InfoLabel>Liquidation point</InfoLabel>
      <InfoValue>0.0000</InfoValue>
    </InfoRow>
    <InfoRow>
      <InfoLabel>Borrow capacity</InfoLabel>
      <InfoValue>
        {Number(
          state.position.borrowCapacityBase + state.position.borrowedInBase || 0
        ).toFixed(4)}
      </InfoValue>
    </InfoRow>
    <InfoRow>
      <InfoLabel>Available to borrow</InfoLabel>
      <InfoValue>
        {Number(state.position.borrowCapacityBase || 0).toFixed(4)}
      </InfoValue>
    </InfoRow>
  </InfoSection>
);
