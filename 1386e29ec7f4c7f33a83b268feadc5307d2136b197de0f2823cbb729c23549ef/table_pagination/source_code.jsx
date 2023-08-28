if (!props.data || !props.columns) {
  return "column and data props are required.";
}
State.init({ currentPage: 1 });
const data = props.data || [];
const rowsCount = props.rowsCount || null;
const themeColor = props.themeColor;

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
const Table = styled.table`
  --bs-table-color: ${themeColor?.table_pagination?.table_color};
  --bs-table-bg: ${themeColor?.table_pagination?.table_bg};
  --bs-table-border-color: ${themeColor?.table_pagination?.table_border_color};
  --bs-table-accent-bg: ${themeColor?.table_pagination?.table_accent_bg};
  --bs-table-striped-color: ${themeColor?.table_pagination?.table_striped_color};
  --bs-table-striped-bg: ${themeColor?.table_pagination?.table_striped_bg};
  --bs-table-hover-color: ${themeColor?.table_pagination?.table_hover_color};
  --bs-table-hover-bg:${themeColor?.table_pagination?.table_hover_bg}
`;
return (
  <div className="table-responsive">
    <Table
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
    </Table>
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
                      className="page-link btn"
                      style={{
                        borderColor:
                          themeColor?.table_pagination?.btn_border ?? "#000",
                        color:
                          themeColor?.table_pagination?.btn_color ?? "#000",
                        backgroundColor: btn
                          ? themeColor?.table_pagination?.btn_bg_active ??
                            "gray"
                          : themeColor?.table_pagination?.btn_bg ??
                            "transparent",
                      }}
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
//   themeColor: {
//     table_pagination: {
//       table_bg: "rgb(25,33,50)",
//       table_color: "rgb(255,255,255)",
//       table_border_color: "",
//       table_accent_bg: "",
//       table_striped_color: "rgb(255,255,255)",
//       table_striped_bg: "",
//       table_hover_color: "rgb(255,255,255)",
//       table_hover_bg: "",
//       btn_border: "#fff",
//       btn_bg: "rgba(49, 62, 89,0.5)",
//       btn_bg_active: "rgb(25,33,50)",
//       btn_color: "#fff",
//     },
//   },
// };
