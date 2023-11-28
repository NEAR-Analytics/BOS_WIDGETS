import(["constants", "TableStyle", "data/GlobalData"]);

const headers = ["Rank", "Address", "Amount"];
const current = String(state.current ?? "1");
const totalPage = String(Math.ceil(state.holders.length / pageAmountOfPage));
const data = state.holders
  .slice(
    (Number(current) - 1) * pageAmountOfPage,
    Number(current) * pageAmountOfPage
  )
  .map((row, idx) => ({
    rank: String(Number(idx) + 1),
    address: row.account,
    amount: Number(row.balance).toLocaleString(),
  }));
return (
  <TableOuter>
    <TableContainer>
      <IndexTable>
        <IndexHeaderTr>
          {headers.map((header) => (
            <IndexTh key={header}>{header}</IndexTh>
          ))}
        </IndexHeaderTr>
        <IndexTableBody>
          {data.map((row) => (
            <IndexDataTr key={row.rank}>
              <IndexTd>{row.rank}</IndexTd>
              <IndexTd style={{ paddingRight: "24px" }}>
                <AddressData>{row.address}</AddressData>
              </IndexTd>
              <IndexTd>{row.amount}</IndexTd>
            </IndexDataTr>
          ))}
        </IndexTableBody>
      </IndexTable>
    </TableContainer>
    <TableFooter>
      <TableRowsAmount>
        {state.holders.length.toLocaleString()} rows
      </TableRowsAmount>
      <Widget
        src={`${config.ownerId}/widget/NEAT.Pagination`}
        props={{
          current,
          totalPage,
          updateCurrentPage: (value) => {
            State.update({ current: value });
          },
        }}
      />
    </TableFooter>
  </TableOuter>
);
