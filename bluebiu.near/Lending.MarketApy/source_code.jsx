const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;
const StyledApy = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const RewardApyItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
const RewardIcon = styled.img`
  width: 14px;
  height: 14px;
`;
const RewardApy = styled.div`
  font-weight: 400;
  line-height: 14px;
  color: rgba(255, 255, 255, 0.5);
`;

const { apy, distributionApy, key } = props;

return (
  <StyledBox>
    <StyledApy>{apy}</StyledApy>
    {distributionApy &&
      distributionApy
        .filter((reward) => {
          const apy = reward[key].slice(0, -1);
          return !!Number(apy);
        })
        .map((reward) => (
          <RewardApyItem key={reward.symbol}>
            <RewardIcon src={reward.icon} />
            <RewardApy>{reward[key]}</RewardApy>
          </RewardApyItem>
        ))}
  </StyledBox>
);
