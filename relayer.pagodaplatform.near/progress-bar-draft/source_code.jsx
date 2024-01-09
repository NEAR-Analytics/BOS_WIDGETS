const goalAmount = props.goalAmount || 0;
const collectedAmount = props.collectedAmount || 0;

const ProgressContainer = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
  display: inline-flex;
`;

const ProgressText = styled.div`
  color: #181021;
  font-size: 16px;
  font-family: 'DM Sans';
  font-weight: 500;
  line-height: 18px;
  word-wrap: break-word;
`;

const ProgressBar = styled.div`
  width: 116px;
  height: 12px;
  position: relative;
`;

const WhiteBar = styled.div`
  width: 116px;
  height: 12px;
  left: 0;
  top: 0;
  position: absolute;
  border-radius: 40px;
  background: rgba(32, 34, 38, 0.08);
`;

const GreenBar = styled.div`
  height: 12px;
  position: absolute;
  background: #4FA58D;
  border-radius: 40px;
`;

const calculatePercentage = (collected, goal) => {
  if (!goal) return 0;

  return Math.min((collected / goal) * 100, 100); // Ensure the percentage doesn't exceed 100%
};

const percentage = calculatePercentage(collectedAmount, goalAmount);

return (
  <ProgressContainer>
    <ProgressText>{`$${collectedAmount} of $${goalAmount}`}</ProgressText>
    <ProgressBar>
      <WhiteBar />
      <GreenBar style={{ width: `${percentage}%` }} />
    </ProgressBar>
  </ProgressContainer>
);
