State.init({
  contractId: props.contractId,
  source: context.networkId,
});

const Stack = styled.div`
  padding: 4px;
  border-color: gray;
  border-style: dashed;
  border-width: 1px;
  border-radius: 16px;
  text-align: start;
  align-items: start;
  justify-content: start;
  gap: 10px;
`;

const Heading = styled.div`
  font-size: lg;
  text-decoration: underline;
  text-underline-offset: 6px;
  text-decoration-style: dashed;
  text-decoration-color: gray;
`;

return <Stack></Stack>;
