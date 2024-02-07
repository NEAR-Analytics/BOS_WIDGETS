State.init({
  address: undefined,
  position,
});

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

const { contractData, position } = props;

const { getCollateralsWithLiquidationData } = VM.require(
  "thalesb.near/widget/compound-requests"
);

useEffect(() => {
  if (Ethers.provider()) {
    Ethers.provider()
      .send("eth_requestAccounts", [])
      .then((accounts) => {
        State.update({ address: accounts[0] });
      });
  }
}, [Ethers]);

const positionData = useCache(
  () => {
    if (!contractData) return Promise.resolve({});

    return getCollateralsWithLiquidationData({
      cometAddress: props.contractData.cometAddress,
      rpcUrl: props.contractData.httpRpcUrl,
      userAddress: props.contractData.userAddress,
    });
  },
  "getCollateralsWithLiquidationData",
  {
    subscribe: false,
  }
);

useEffect(() => {
  if (!contractData) {
    State.update({ position });
  } else {
    State.update({ position: positionData });
  }
}, [position, positionData]);

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
      <InfoValue>
        {Number(state.position.liquidationPoint || 0).toFixed(4)}
      </InfoValue>
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
