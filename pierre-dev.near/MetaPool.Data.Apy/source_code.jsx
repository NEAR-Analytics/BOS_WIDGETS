function getAPY() {
  //   const result = fetch("https://metrics.linearprotocol.org", {
  //     method: "GET",
  //   });
  //   const apy = result.body.apy;
  //   if (!apy) return "-";
  //   return Big(apy).mul(100).toFixed(2) + "%";
  return "9.08%";
}

const apy = getAPY();

const APYContainer = styled.div`
  font-size: 20px;
  margin: 12px 0;
  span {
    margin-left: 12px;
    font-weight: bold;
  }
  color: black;
`;

return (
  <APYContainer>
    APY <span>{apy}</span>
  </APYContainer>
);
