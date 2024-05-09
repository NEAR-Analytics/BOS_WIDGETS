const pool = props.pool ?? "builddao.poolv1.near";

const accounts = Near.view(pool, "get_accounts", {
  from_index: 0,
  limit: 888,
});

if (!accounts) {
  return "";
}

const stakeholders = accounts.sort(
  (a, b) => Big(b.staked_balance) - Big(a.staked_balance)
);

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 15px;
`;

const TableRow = styled.tr`
  &:nth-child(odd) {
    background-color: #e8e8e8;
  }
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px 15px;
  background-color: #333;
  color: #fff;
  width: 50%;
`;

const TableCell = styled.td`
  padding: 10px 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 600px) {
    padding: 8px;
    font-size: 13px;
  }
`;

const BalanceDisplay = styled.span`
  font-family: monospace;
`;

return (
  <Table>
    <thead>
      <tr>
        <TableHeader>Stakeholder</TableHeader>
        <TableHeader>Amount</TableHeader>
      </tr>
    </thead>
    <tbody>
      {stakeholders.map((item, index) => (
        <TableRow key={index}>
          <TableCell>{item.account_id}</TableCell>
          <TableCell>
            <BalanceDisplay>
              {(item.staked_balance / 1e24).toFixed(2)}
            </BalanceDisplay>
          </TableCell>
        </TableRow>
      ))}
    </tbody>
  </Table>
);
