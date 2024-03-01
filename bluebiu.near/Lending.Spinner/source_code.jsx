const StyledSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  color: #979abe;
`;

return (
  <StyledSpinner>
    <Widget
      src="bluebiu.near/widget/0vix.LendingLoadingIcon"
      props={{ size: 30 }}
    />
  </StyledSpinner>
);
