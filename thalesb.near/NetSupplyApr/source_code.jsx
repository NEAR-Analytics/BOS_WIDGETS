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

const { aprData } = props;

const earnRewardsApr = (aprData.rewards.earn_rewards_apr || 0) * 100;

return (
  <>
    <SectionHeader>Net Supply APR</SectionHeader>
    <InfoSection marginTop={12}>
      <InfoRow>
        <InfoLabel>APR</InfoLabel>
        <InfoValue>{Number(aprData.supplyApr || 0).toFixed(2)}%</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Fee</InfoLabel>
        <InfoValue>{Number(earnRewardsApr || 0).toFixed(2)}%</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Interest</InfoLabel>
        <InfoValue>
          {Number(earnRewardsApr + aprData.supplyApr || 0).toFixed(2)}%
        </InfoValue>
      </InfoRow>
    </InfoSection>
  </>
);
