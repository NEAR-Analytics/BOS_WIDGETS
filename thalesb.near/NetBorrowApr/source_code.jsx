const SectionHeader = styled.span`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
`;

const InfoSection = styled.div`
  background: #292a3d;
  border-radius: 8px;
  color: white;
  width: 100%;
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
  color: #888baf;
`;

const { getApr } = VM.require("thalesb.near/widget/compound-requests");

const { aprData } = props;

const borrowRewardsApr = (aprData.rewards.borrow_rewards_apr || 0) * 100;

return (
  <>
    <SectionHeader>Net Borrow APR</SectionHeader>
    <InfoSection marginTop={12}>
      <InfoRow>
        <InfoLabel>APR</InfoLabel>
        <InfoValue>{Number(aprData.borrowApr || 0).toFixed(2)}%</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Fee</InfoLabel>
        <InfoValue>{Number(borrowRewardsApr || 0).toFixed(2)}%</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Interest</InfoLabel>
        <InfoValue>
          {Number(aprData.borrowApr - borrowRewardsApr || 0).toFixed(2)}%
        </InfoValue>
      </InfoRow>
    </InfoSection>
  </>
);
