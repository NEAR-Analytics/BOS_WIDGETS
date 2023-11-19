const TableWrapper = styled.div`
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
`;

const TableHeader = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #e6e6e6;
  }
`;

const TableCell = styled.td`
  padding: 15px;
`;

State.init({
  txData: [],
  baseURL: "https://0xpo.app/starkard/starktx.php?wallet",
});

function getStarknetTx(wallet) {
  asyncFetch(`${state.baseURL}=${wallet}`).then((res) => {
    State.update({ txData: JSON.parse(res.body).items });
  });
}

function formatAddress(address) {
  return `${address.slice(0, 6)}...${address.slice(-5)}`;
}

if (!state.theme) {
  State.update({
    theme: styled.div`
                font-family: Manrope, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                ${cssFont}
                ${css}
            `,
  });
}

if (!state.starkHistory) {
  getStarknetTx(
    "0x023025555d4de58684539d576acce885dbfe9201773fe81dc83dab6bf200f93d"
  );
}

const Theme = state.theme;

return (
  <Theme>
    <TableWrapper>
      <StyledTable>
        <thead>
          <TableRow>
            <TableHeader>Transaction Hash</TableHeader>
            <TableHeader>Value</TableHeader>
            <TableHeader>To</TableHeader>
            <TableHeader>Details</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {state.txData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{formatAddress(row.hash)}</TableCell>
              <TableCell>
                {Big(row.actual_fee).div(Big(10).pow(18)).toFixed(6)} ETH.
              </TableCell>
              <TableCell>{formatAddress(row.blockId)}</TableCell>
              <TableCell>
                <a href={`https://starkscan.co/tx/${row.hash}`} target="_blank">
                  View details
                </a>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  </Theme>
);
