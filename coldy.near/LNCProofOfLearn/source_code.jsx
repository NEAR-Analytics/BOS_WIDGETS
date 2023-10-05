const fetchData = async () => {
  try {
    const response = await fetch(
      `https://learnnear.club/wp-json/api/lnw-proof-of-learns-data?wallet=${context.accountId}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    const tableData = data.data;

    const table = (
      <table className="table">
        <thead>
          <tr>
            <th>Credentials</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              <td>{item.creds}</td>
              <td>{item.message}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );

    ReactDOM.render(table, document.getElementById("table-container"));
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

return (
  <>
    <div class="container border border-info p-3">
      {fetchData()}
      <h3 class="text-center">
        <span class="text-decoration-underline"> {context.accountId} </span>
      </h3>
    </div>
  </>
);
