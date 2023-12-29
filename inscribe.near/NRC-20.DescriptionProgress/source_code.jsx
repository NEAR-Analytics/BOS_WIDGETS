const ProgressBorder = styled.div`
  height: 8px;
  border-radius: 9999px;
  overflow: hidden;
  display: flex;
`;
const ProgressSelected = styled.div`
  width: ${props.progress * 100}%;
  height: 100%;
  background-color: rgb(0, 141, 106);
`;

const Spacer = styled.div`
  flex: 1;
  height: 100%;
  background-color: #9f9f9f;
`;

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProgressText = styled.div`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`;

return (
  <ProgressContainer>
    <ProgressText>
      {Big(props.progress ?? 0)
        .times(100)
        .toFixed(2) + "%"}
    </ProgressText>
    <ProgressBorder>
      <ProgressSelected />
      <Spacer />
    </ProgressBorder>
  </ProgressContainer>
);
