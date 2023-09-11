if (!props.data || !props.columns) {
  return "column and data props are required.";
}

const data = props.data || [];
const columns = props.columns;

State.init({ currentPage: 1, searchValue: "" });
const rowsCount = props.rowsCount || 5;
const themeColor = props.themeColor;
const handleSearch = (event) => {
  const value = event.target.value;
  State.update({ searchValue: value });
};
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
  --bs-table-hover-bg:${themeColor?.table_pagination?.table_hover_bg};
  --bs-table-hover-bg:${themeColor?.table_pagination?.columntextcolor};
  border-radius: 8px;
  background: #F5F1F1;
  margin: 0;
`;

const Button = styled.button`
  padding: 4px 16px;
  border-radius: 6px;
  background: var(--Dark, #121212);
  text-transform: capitalize;
  font-weight: 600;
  font-size: 12px;
  color: #FFF;
`;

const onHandelId = (id) => {
  let customId = "";
  if (id.length > 15) {
    customId += id.substring(0, 3);
    customId += "...";
    customId += id.substring(id.length - 3);
    return customId;
  } else {
    return id;
  }
};

return (
  <div className="table-responsive" style={{ backgroundColor: "#FAFAFA" }}>
    <div style={{ borderRadius: 8, border: "1px solid #AAA" }}>
      <Table
        className={`table table-hover table-striped table-borderless ${props.className}`}
      >
        <thead>
          <tr>
            {columns.map((th) => (
              <th
                key={th.title}
                className="col-1"
                style={{
                  fontSize: 12,
                  width: `${th.width}%`,
                  verticalAlign: "middle",
                }}
                scope="col"
              >
                <div>
                  {th.description ? (
                    <OverlayTrigger
                      placement={th.position || "top"}
                      overlay={<Tooltip>{th.description}</Tooltip>}
                    >
                      <span>{th.title}</span>
                    </OverlayTrigger>
                  ) : (
                    <span>{th.title}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 &&
            handlePagination()
              .table.filter((row) =>
                Object.values(row).some((value) =>
                  value.toString().includes(state.searchValue)
                )
              )
              .map((row, i) => {
                return (
                  <tr key={row.key}>
                    {columns.map((td) => {
                      const key = td.key ? row[td.key] : i + 1;
                      return (
                        <td
                          style={{
                            color:
                              td.colors ||
                              themeColor?.table_pagination?.columntextcolor,
                            fontSize: 12,
                            textAlign: td.align,
                            verticalAlign: "middle",
                          }}
                        >
                          {td.project ? (
                            <div
                              style={{
                                display: "flex",
                                gap: 10,
                                alignItems: "center",
                              }}
                            >
                              <img
                                style={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: 50,
                                }}
                                src={row.avatar}
                              />
                              {key}
                            </div>
                          ) : td.link ? (
                            <a
                              className="d-inline-block"
                              target={key ? "_blank" : ""}
                              href={key ? key : "#"}
                              style={{
                                "text-decoration": "none",
                              }}
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12.9167 5.25001L12.9167 1.75001M12.9167 1.75001H9.41674M12.9167 1.75001L7.66675 7M6.50008 1.75H5.21675C4.23666 1.75 3.74661 1.75 3.37226 1.94074C3.04298 2.10852 2.77527 2.37623 2.60749 2.70552C2.41675 3.07986 2.41675 3.56991 2.41675 4.55V9.45C2.41675 10.4301 2.41675 10.9201 2.60749 11.2945C2.77527 11.6238 3.04298 11.8915 3.37226 12.0593C3.74661 12.25 4.23666 12.25 5.21675 12.25H10.1167C11.0968 12.25 11.5869 12.25 11.9612 12.0593C12.2905 11.8915 12.5582 11.6238 12.726 11.2945C12.9167 10.9201 12.9167 10.4301 12.9167 9.45V8.16667"
                                  stroke={key ? "#806ce1" : "gray"}
                                  stroke-width="2.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </a>
                          ) : td.button ? (
                            <Button>{key}</Button>
                          ) : (
                            key
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
        </tbody>
      </Table>
    </div>

    {/* <input
      type="text"
      placeholder="Search..."
      onChange={handleSearch}
      style={{
        width: "20%",
        height: "30px",
        borderRadius: "50px",
        "margin-left": "2px",
      }}
    />*/}

    {!rowsCount ? (
      ""
    ) : (
      <div className="d-flex justify-content-end">
        <div>
          <ul
            className="pagination pagination-sm gap-2 mb-0 "
            style={{ height: 56, backgroundColor: "white", padding: 12 }}
          >
            <li className="page-item">
              <button
                onClick={() => {
                  const page = state.currentPage - 1;
                  if (page > 0) State.update({ currentPage: page });
                }}
                className="page-link btn"
                style={{
                  width: 32,
                  height: 32,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 8,
                  color: themeColor?.table_pagination?.btn_color ?? "#000",
                }}
              >
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.3292 12L11.2692 11.06L8.21589 8L11.2692 4.94L10.3292 4L6.32923 8L10.3292 12Z"
                    fill="black"
                  />
                </svg>
              </button>
            </li>
            {data.length > 0 &&
              handlePagination().buttons.map((btn, i) => {
                return (
                  <li key={i} className="page-item">
                    <button
                      onClick={() => State.update({ currentPage: i + 1 })}
                      className="page-link btn"
                      style={{
                        width: 32,
                        height: 32,
                        padding: 6,
                        borderRadius: 8,
                        background:
                          state.currentPage === i + 1 ? "#121212" : "#fff",
                        borderColor:
                          themeColor?.table_pagination?.btn_border ?? "#000",
                        color: state.currentPage === i + 1 ? "#fff" : "#000",
                      }}
                    >
                      {i + 1}
                    </button>
                  </li>
                );
              })}
            <li className="page-item">
              <button
                onClick={() => {
                  const page = state.currentPage + 1;
                  if (handlePagination().buttons.length >= page)
                    State.update({ currentPage: page });
                }}
                className="page-link btn"
                style={{
                  width: 32,
                  height: 32,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 8,
                  color: themeColor?.table_pagination?.btn_color ?? "#000",
                }}
              >
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.20923 4L5.26923 4.94L8.32256 8L5.26923 11.06L6.20923 12L10.2092 8L6.20923 4Z"
                    fill="black"
                  />
                </svg>
              </button>
            </li>
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
//     { title: "title", key: "key in data" ,description:"here is a",position:"top/right/buttom/left",
//    link: "yes",
//      beforehref: "https://near.social/mob.near/widget/ProfilePage?accountId=",
//      afterhref: "",
//      colors: "green"},

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
//       columntextcolor: ""
//     },
//   },
// };
