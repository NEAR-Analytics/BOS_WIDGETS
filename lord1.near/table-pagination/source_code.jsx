if (!props.data || !props.columns) {
  return "column and data props are required.";
}
State.init({ currentPage: 1 });
const data = props.data || [];
const rowsCount = props.rowsCount || null;

const handlePagination = () => {
  if (!rowsCount) return { table: data };
  const currentPage = state.currentPage;
  const totalPages = Math.ceil(data.length / rowsCount);
  const currentTableData = data.slice(
    (currentPage - 1) * rowsCount,
    rowsCount * currentPage
  );
  const buttons = Array(totalPages).fill(0);
  buttons[currentPage - 1] = 1;
  return { buttons, table: currentTableData };
};

return (
  <div className=" table-responsive">
    <table
      className={`table table-hover table-striped table-borderless ${props.className}`}
    >
      <thead>
        <tr>
          {props.columns.map((th) => (
            <th key={th.title} className="col-1" scope="col">
              {th.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.data.length > 0 &&
          handlePagination().table.map((row, i) => {
            return (
              <tr key={row.project}>
                {props.columns.map((td) => {
                  const key = td.key ? row[td.key] : i + 1;
                  return <td>{key}</td>;
                })}
              </tr>
            );
          })}
      </tbody>
    </table>
    {!props.rowsCount ? (
      ""
    ) : (
      <div className="py-4">
        <div>
          <ul className="pagination pagination-sm gap-2 justify-content-center">
            {props.data.length > 0 &&
              handlePagination().buttons.map((btn, i) => {
                return (
                  <li key={i} className="page-item">
                    <button
                      onClick={() => State.update({ currentPage: i + 1 })}
                      className={`page-link btn ${
                        btn ? "text-bg-secondary" : "text-bg-light"
                      } border-dark`}
                    >
                      {i + 1}
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    )}
  </div>
);

// const props = {
//   data: [],
//   columns: [
//     { title: "id" }, //if key does not provided , rows will be ascending numbers
//     { title: "title", key: "key in data" },
//   ],
//   rowsCount: 2, // if zero or null , the whole table will be render
//   className: "table-bordered",
// };
