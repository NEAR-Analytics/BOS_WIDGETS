const NumberStat = styled.div`
    font-size: 96px;
    font-weight: normal;
    line-height: tight;
    padding: 0px;
    float: left;
`;

const Symbol = styled.div`
    font-size: 56px;
    float: left;
    margin-top: 17px;
    color: grey;
`;

const Text = styled.div`
    font-size: 24px;
    clear: both;
    margin-left: 5px;
    text-align: left;
`;

const Icon = styled.div`
    float: left;
    margin-top: 50px;
    margin-left: 45px;
    color: grey;
`;

return (
  <div
    style={{ width: "23%", marginLeft: "5px", borderLeft: "1px solid #e9ecef" }}
  >
    <div style={{ marginLeft: "10px" }}>
      <NumberStat>{props.numberStat}</NumberStat>
      <Symbol>{props.symbol}</Symbol>
      <Icon>{props.image}</Icon>
      <Text>{props.text}</Text>
    </div>
  </div>
);
