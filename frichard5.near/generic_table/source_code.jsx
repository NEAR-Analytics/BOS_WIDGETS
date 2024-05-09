const filter = props.filter;
const maxHeight = props.maxHeight || 400;
const boxShadow = props.boxShadow || "3px 2px 24px rgba(68, 152, 224, 0.3)"
const MainWrapper = styled.div`
  box-shadow: ${boxShadow};
  border-radius: 4px;
  padding: 20px;
  margin: 40px 0px;
`;

const TableWrapper = styled.div`
  max-height: ${maxHeight}px;
  overflow: auto;
`;
const Table = styled.table`
    position: relative;
    display: table;
    width: 100%;
    borderCollapse: separate;
    borderSpacing: 0px;
    fontSize: 14px;
    td {
      text-overflow: ellipsis;
      overflow: hidden;
      whiteSpace: nowrap;
      padding: 10px 10px 10px 0;
      max-width: 130px;
      border-bottom: 1px solid rgb(81, 81, 81);
    }
    th {
      position: sticky;
      top: 0;
      background:white;
    }
    img {
      height: 15px;
      width: 15px;
    }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const columns = props.columns || [
  { label: "props columns missing", id: "data" },
];
const data = props.data || [{ data: "no data props" }];
const { title, nextPage, previousPage, offset, resPerPage } = props;

const formatRow = (data, column) => {
  return column.formatter ? (
    <td>{column.formatter(data)}</td>
  ) : (
    <td>{data[column.id]}</td>
  );
};

let rows = [];

data &&
  data.forEach((d) => {
    rows.push(<tr>{columns.map((c) => formatRow(d, c))}</tr>);
  });

return (
  <MainWrapper>
    {title && <h2>{title}</h2>}
    {filter && filter}
    <TableWrapper>
      <Table>
        <tr>
          {columns.map((c) => (
            <th>{c.label}</th>
          ))}
        </tr>
        {rows}
      </Table>
    </TableWrapper>
    {nextPage && previousPage && resPerPage && (
      <Pagination>
        {offset ? (
          <button onClick={previousPage}>previous {resPerPage}</button>
        ) : (
          ""
        )}
        {data.length === resPerPage ? (
          <button onClick={nextPage}>next {resPerPage}</button>
        ) : (
          ""
        )}
      </Pagination>
    )}
  </MainWrapper>
);
