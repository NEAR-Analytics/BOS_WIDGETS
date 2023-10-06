context.initialPage = 1;
context.currentPage = context.initialPage;
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
    context.data = pgResponse?.body?.data;
  }
};

return (
  <>
    <h2>Proof of learns for {context.accountId}</h2>
    {context.data !== null ? (
      <div>
        <table id="proof-of-learns-table">
          <tr>
            <th>Date</th>
            <th>nLEARNs</th>
            <th>Entry</th>
          </tr>
          <div id="important-content">
            {context.data.map((item) => (
              <tr>
                <td>{item.date}</td>
                <td>{item.creds}</td>
                <td>{item.message}</td>
              </tr>
            ))}
          </div>
        </table>
        <br />
        <div className="pagination">
          <button onClick={() => handlePageChange(context.currentPage - 1)}>
            Prev
          </button>
          <span>{`Page ${context.currentPage} of ${pages}`}</span>
          <button onClick={() => handlePageChange(context.currentPage + 1)}>
            Next
          </button>
        </div>
      </div>
    ) : (
      <div>Loading ...</div>
    )}
  </>
);
