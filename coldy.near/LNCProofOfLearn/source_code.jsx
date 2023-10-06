context.initialPage = 1;
context.currentPage = context.initialPage;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
`;

const TableHeader = styled.th`
  background-color: #f2f2f2;
  padding: 8px;
  border: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
`;

const TableRow = styled.tr`
  background-color: ${(props) => (props.even ? "#f2f2f2" : "white")};

  &:hover {
    background-color: #ddd;
  }
`;

const Pagination = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  background-color: #008CBA;
  color: white;
  border: none;
  padding: 8px 16px;
  margin: 4px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #005f79;
  }
`;

const response = fetch(
  `https://learnnear.club/wp-json/api/lnw-proof-of-learns-data?wallet=${context.accountId}&p=1`,
  {
    method: "GET",
  }
);

if (response?.body?.error) {
  return (
    <>
      <div class="container border border-info p-3">
        <h3 class="text-center">
          <span class="text-decoration-underline">{response.body.message}</span>
        </h3>
      </div>
    </>
  );
}

const pages = response?.body?.total_pages;
context.data = response?.body?.data;

const handlePageChange = (newPage) => {
  if (newPage >= 1 && newPage <= pages) {
    context.currentPage = newPage;
    const pgResponse = fetch(
      `https://learnnear.club/wp-json/api/lnw-proof-of-learns-data?wallet=${context.accountId}&p=${newPage}`,
      {
        method: "GET",
      }
    );
    console.log(context.currentPage);
    console.log(context.data);
    context.data = pgResponse?.body?.data;
  }
  render("<div>1</div>");
};

return (
  <>
    <h2>Proof of learns for {context.accountId}</h2>
    {context.data !== null ? (
      <div>
        <Table>
          <thead>
            <tr>
              <TableHeader>Date</TableHeader>
              <TableHeader>nLEARNs</TableHeader>
              <TableHeader>Entry</TableHeader>
            </tr>
          </thead>
          <tbody>
            {context.data.map((item, index) => (
              <TableRow key={index} even={index % 2 === 0}>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.creds}</TableCell>
                <TableCell>{item.message}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
        <br />
        <Pagination>
          <PaginationButton
            onClick={() => handlePageChange(context.currentPage - 1)}
          >
            Prev
          </PaginationButton>
          <span>{`Page ${context.currentPage} of ${pages}`}</span>
          <PaginationButton
            onClick={() => handlePageChange(context.currentPage + 1)}
          >
            Next
          </PaginationButton>
        </Pagination>
      </div>
    ) : (
      <div>Loading ...</div>
    )}
  </>
);
