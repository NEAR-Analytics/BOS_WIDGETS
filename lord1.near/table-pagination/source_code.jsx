if (!props.data || !props.columns) {
  return "column and data props are required.";
}

const data = props.data || [];
const columns = props.columns;
const withoutSearchBar = props.withoutSearchBar;
State.init({
  currentPage: 1,
  searchValue: "",
  sort: null, // { name: "asc", key: "star" } //asc -desc
});
const rowsCount = props.rowsCount || 5;
const totalPages = Math.ceil(data.length / rowsCount);

const themeColor = props.themeColor;
const handleSearch = (event) => {
  const value = event.target.value;
  State.update({ searchValue: value });
};
const handlePagination = () => {
  if (!rowsCount) return { table: sortedDate(data) };
  const currentPage = state.currentPage;
  const totalPages = Math.ceil(data.length / rowsCount);
  const currentTableData = sortedDate(data)
    .filter((row) =>
      Object.values(row).some((value) =>
        value.toString().includes(state.searchValue)
      )
    )
    .slice((currentPage - 1) * rowsCount, rowsCount * currentPage);
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
  --bs-table-hover-bg:${themeColor?.table_pagination?.input_bg};


`;
const sortedDate = (data) => {
  if (!state.sort) return data;
  const sorted = data.sort((a, b) => {
    if (state.sort.name === "asc") {
      return typeof a[state.sort.key] === "number"
        ? (b[state.sort.key] ?? 0) - (a[state.sort.key] ?? 0)
        : (b[state.sort.key] ?? "").localeCompare(a[state.sort.key] ?? "");
    }
    return typeof a[state.sort.key] === "number"
      ? (a[state.sort.key] ?? 0) - (b[state.sort.key] ?? 0)
      : (a[state.sort.key] ?? "").localeCompare(b[state.sort.key] ?? "");
  });
  return sorted;
};
const handleSort = (key) => {
  if (state.sort && state.sort.key === key) {
    if (state.sort.name === "asc") {
      State.update({ sort: { name: "desc", key } });
    } else {
      State.update({ sort: null });
    }
  } else {
    State.update({ sort: { name: "asc", key } });
  }
};

const onHandelId = (id) => {
  let customId = "";
  if (id.length > 20) {
    customId += id.substring(0, 3);
    customId += "...";
    customId += id.substring(id.length - 3);
    return customId;
  } else {
    return id;
  }
};
const formatNumber = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2).replace(/\.0$/, "") + " b";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2).replace(/\.0$/, "") + " m";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2).replace(/\.0$/, "") + " k";
  }

  if (num < 0 && num > 0.0001) {
    return (Math.round(num * 1000) / 1000).toFixed(3) + "";
  }

  return num;
};

const triangleState = (key) => {
  if (!state.sort) return;
  return (
    state.sort.key === key &&
    (state.sort.name === "asc" ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "rotate(180deg)" }}
        width="8"
        height="8"
        viewBox="0 0 24 24"
      >
        <path d="M23.677 18.52c.914 1.523-.183 3.472-1.967 3.472h-19.414c-1.784 0-2.881-1.949-1.967-3.472l9.709-16.18c.891-1.483 3.041-1.48 3.93 0l9.709 16.18z" />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="8"
        viewBox="0 0 24 24"
      >
        <path d="M23.677 18.52c.914 1.523-.183 3.472-1.967 3.472h-19.414c-1.784 0-2.881-1.949-1.967-3.472l9.709-16.18c.891-1.483 3.041-1.48 3.93 0l9.709 16.18z" />
      </svg>
    ))
  );
};

const buttonsIcons = (
  <ul
    className="pagination pagination-sm gap-2 mb-0 "
    style={{ height: 56, padding: 12 }}
  >
    <li className="page-item">
      <button
        onClick={() => {
          State.update({ currentPage: 1 });
        }}
        className="page-link btn"
        style={{
          width: 42,
          height: 32,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
          color: themeColor?.table_pagination?.btn_color ?? "#000",
          borderColor: themeColor?.table_pagination?.btn_border ?? "#000",
          color: themeColor?.table_pagination?.btn_color ?? "#000",
          backgroundColor: btn
            ? themeColor?.table_pagination?.btn_bg_active ?? "gray"
            : themeColor?.table_pagination?.btn_bg ?? "transparent",
        }}
      >
        <span
          style={{ fontSize: "0.6rem" }}
          className="w-25 d-inline-block fw-light"
        >
          1
        </span>
        <svg
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.3292 12L11.2692 11.06L8.21589 8L11.2692 4.94L10.3292 4L6.32923 8L10.3292 12Z"
            fill={themeColor?.table_pagination?.btn_color ?? "#000"}
          />
        </svg>
        <svg
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.3292 12L11.2692 11.06L8.21589 8L11.2692 4.94L10.3292 4L6.32923 8L10.3292 12Z"
            fill={themeColor?.table_pagination?.btn_color ?? "#000"}
          />
        </svg>
      </button>
    </li>
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
          borderColor: themeColor?.table_pagination?.btn_border ?? "#000",
          color: themeColor?.table_pagination?.btn_color ?? "#000",
          backgroundColor: btn
            ? themeColor?.table_pagination?.btn_bg_active ?? "gray"
            : themeColor?.table_pagination?.btn_bg ?? "transparent",
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
            fill={themeColor?.table_pagination?.btn_color ?? "#000"}
          />
        </svg>
      </button>
    </li>
    <li className="page-item">
      <button
        onClick={() => {
          const page = state.currentPage;
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
          borderColor: themeColor?.table_pagination?.btn_border ?? "#000",
          color: themeColor?.table_pagination?.btn_color ?? "#000",
          backgroundColor: btn
            ? themeColor?.table_pagination?.btn_bg_active ?? "gray"
            : themeColor?.table_pagination?.btn_bg ?? "transparent",
        }}
      >
        {state.currentPage}
      </button>
    </li>
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
          borderColor: themeColor?.table_pagination?.btn_border ?? "#000",
          color: themeColor?.table_pagination?.btn_color ?? "#000",
          backgroundColor: btn
            ? themeColor?.table_pagination?.btn_bg_active ?? "gray"
            : themeColor?.table_pagination?.btn_bg ?? "transparent",
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
            fill={themeColor?.table_pagination?.btn_color ?? "#000"}
          />
        </svg>
      </button>
    </li>

    <li className="page-item">
      <button
        onClick={() => {
          State.update({ currentPage: totalPages });
        }}
        className="page-link btn"
        style={{
          width: 42,
          height: 32,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
          color: themeColor?.table_pagination?.btn_color ?? "#000",
          borderColor: themeColor?.table_pagination?.btn_border ?? "#000",
          color: themeColor?.table_pagination?.btn_color ?? "#000",
          backgroundColor: btn
            ? themeColor?.table_pagination?.btn_bg_active ?? "gray"
            : themeColor?.table_pagination?.btn_bg ?? "transparent",
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
            fill={themeColor?.table_pagination?.btn_color ?? "#000"}
          />
        </svg>
        <svg
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.20923 4L5.26923 4.94L8.32256 8L5.26923 11.06L6.20923 12L10.2092 8L6.20923 4Z"
            fill={themeColor?.table_pagination?.btn_color ?? "#000"}
          />
        </svg>

        <span
          style={{ fontSize: "0.6rem" }}
          className="w-25 d-inline-block fw-light"
        >
          {totalPages}
        </span>
      </button>
    </li>
  </ul>
);

return (
  <div className="pb-2">
    <div
      className="table-responsive"
      style={{
        backgroundColor: themeColor?.table_pagination?.table_bg,
      }}
    >
      <Table
        className={`table table-hover table-striped table-borderless ${props.className}`}
      >
        <thead>
          <tr>
            {columns.map((th, i) => (
              <th
                onClick={() => handleSort(th.key)}
                key={th.title}
                className="col-1"
                style={{
                  fontSize: 12,
                  width: `${th.width}%`,
                  verticalAlign: "middle",
                }}
                scope="col"
              >
                <div className="d-flex align-items-center pointer gap-2">
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
                  {triangleState(th.key)}
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
                            fontSize: 14,
                            textAlign: td.align,
                            verticalAlign: "middle",
                          }}
                        >
                          {td.profile ? (
                            <div
                              style={{
                                display: "flex",
                                gap: 10,
                                alignItems: "center",
                              }}
                            >
                              <Link
                                href={`/mob.near/widget/ProfilePage?accountId=${key}`}
                              >
                                <Widget
                                  src="mob.near/widget/ProfileImage"
                                  props={{ accountId: key }}
                                  style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 50,
                                  }}
                                />
                              </Link>
                            </div>
                          ) : td.link ? (
                            <a
                              className="d-inline-block"
                              target="_blank"
                              href={`${td.beforehref}${key}${td.afterhref}`}
                              style={{
                                "text-decoration": "none",
                              }}
                            >
                              {td.hyperlink === "yes" ? (
                                `${onHandelId(key)}`
                              ) : (
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12.9167 5.25001L12.9167 1.75001M12.9167 1.75001H9.41674M12.9167 1.75001L7.66675 7M6.50008 1.75H5.21675C4.23666 1.75 3.74661 1.75 3.37226 1.94074C3.04298 2.10852 2.77527 2.37623 2.60749 2.70552C2.41675 3.07986 2.41675 3.56991 2.41675 4.55V9.45C2.41675 10.4301 2.41675 10.9201 2.60749 11.2945C2.77527 11.6238 3.04298 11.8915 3.37226 12.0593C3.74661 12.25 4.23666 12.25 5.21675 12.25H10.1167C11.0968 12.25 11.5869 12.25 11.9612 12.0593C12.2905 11.8915 12.5582 11.6238 12.726 11.2945C12.9167 10.9201 12.9167 10.4301 12.9167 9.45V8.16667"
                                    stroke="#806ce1"
                                    stroke-width="2.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              )}
                            </a>
                          ) : td.explain ? (
                            key.length > 30 ? (
                              <div className="accordion-item">
                                <span
                                  id={`head${i}`}
                                  className="accordion-button"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target={`#collaps${i}`}
                                  aria-expanded="true"
                                  aria-controls={`collaps${i}`}
                                >
                                  <span className="p-2">
                                    <svg
                                      width="15"
                                      height="15"
                                      viewBox="0 0 31 32"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M18.0833 13.4167L27.125 4.375M27.125 4.375H19.375M27.125 4.375V12.125M12.9167 18.5833L3.875 27.625M3.875 27.625H11.625M3.875 27.625L3.875 19.875"
                                        stroke="#806ce1"
                                        stroke-width="2.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                    </svg>
                                  </span>
                                </span>
                                <div
                                  id={`collaps${i}`}
                                  className="accordion-collapse collapse"
                                  aria-labelledby={`head${i}`}
                                  data-bs-parent={`#accordion${i}`}
                                >
                                  <div className="accordion-body">{key}</div>
                                </div>
                                <div
                                  id={`collaps${i}`}
                                  className="accordion-collapse collapse show"
                                  aria-labelledby={`head${i}`}
                                  data-bs-parent={`#accordion${i}`}
                                >
                                  <div className="accordion-body">
                                    {key.substring(0, 15) + " ..."}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <span>{key}</span>
                            )
                          ) : td.round ? (
                            formatNumber(key)
                          ) : td.short ? (
                            onHandelId(key)
                          ) : td.pic ? (
                            <img
                              style={{
                                marginBottom: "1rem",
                                borderRadius: "15%",
                              }}
                              height="40"
                              width="40"
                              layout="intrinsic"
                              src={key}
                            />
                          ) : td.progress ? (
                            <td className="align-middle ">
                              <Widget
                                src="lord1.near/widget/progress-bar"
                                props={{
                                  inside: key.split("-")[0],
                                  total: key.split("-")[1],
                                  currTheme: "#806ce1",
                                  widgetBarWidth: td.width,
                                  backgroundcolor: "#d2cafa",
                                  gradiantcolorleft: "#806ce1",
                                  gradiantcolorright: "#EA1179",
                                  visibilitydivision: "visible",
                                  visibilitypercent: td.percent,
                                }}
                              />
                            </td>
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
    <div>
      {!withoutSearchBar && (
        <div className="row p-0 m-0 my-2">
          <input
            className="col-8 col-sm-6"
            type="text"
            placeholder="Search..."
            color={themeColor?.table_pagination?.btn_color}
            onChange={handleSearch}
            style={{
              height: "30px",
              borderRadius: "50px",
              "margin-left": "2px",
              "margin-top": "2px",
              "margin-buttom": "2px",
              backgroundColor: themeColor?.table_pagination?.input_bg,
              color: themeColor?.table_pagination?.btn_color,
              border: `0.5px solid ${
                themeColor?.table_pagination?.btn_border ?? "#000"
              }`,
            }}
          />
        </div>
      )}
      {!rowsCount || totalPages === 1 ? (
        ""
      ) : (
        <div
          className="d-flex justify-content-center"
          style={{
            backgroundColor: themeColor?.table_pagination?.table_bg,
          }}
        >
          <div>{buttonsIcons}</div>
        </div>
      )}
    </div>
  </div>
);

// const props = {
//   data: [],
//   columns: [
//     { title: "id" }, //if key does not provided , rows will be ascending numbers
//     { title: "title", key: "key in data" ,description:"here is a",position:"top/right/buttom/left",
//      link: "yes",
//     hyperlink :"yes"
//      beforehref: "https://near.social/mob.near/widget/ProfilePage?accountId=",
//      afterhref: "",
//      colors: "green" ,
//      "explain":"yes",
//      "profile":"yes" ,
//      "short":yes,
//      "progress": "yes",
//      "width": "100%",
//      "percent": "hidden" or visible},

//   ],
//    withoutSearchBar : true,
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

// data for test
// const props = {
//   data: [
//     {
//       rank: 3690,
//       function: "upvote",
//       SINGER: "robert.near",
//       time: "2023-09-07 00:00:00.000",
//       status: "✅",
//       fee: 0.0029,
//       target: "kazanderdad.near",
//       total: 1,
//     },
//     {
//       rank: 3689,
//       function: "upvote",
//       SINGER: "igris.near",
//       time: "2023-09-07 00:00:00.000",
//       status: "❌",
//       fee: 0.0011,
//       target:
//         "983dcdc8e0d80d1f8938118161e1ec08be6557809afccd5ec396354f28a2ce78",
//       total: 0,
//     },
//     {
//       rank: 3688,
//       function: "upvote",
//       SINGER: "igris.near",
//       time: "2023-09-07 00:00:00.000",
//       status: "✅",
//       fee: 0.0013,
//       target:
//         "983dcdc8e0d80d1f8938118161e1ec08be6557809afccd5ec396354f28a2ce78",
//       total: 1,
//     },
//     {
//       rank: 3687,
//       function: "upvote",
//       SINGER: "klaynramos.near",
//       time: "2023-09-07 00:00:00.000",
//       status: "✅",
//       fee: 0.0019,
//       target: "larkim.near",
//       total: 1,
//     },
//     {
//       rank: 3686,
//       function: "remove upvote",
//       SINGER: "klaynramos.near",
//       time: "2023-09-07 00:00:00.000",
//       status: "✅",
//       fee: 0.0006,
//       target: "larkim.near",
//       total: 1,
//     },
//     {
//       rank: 3685,
//       function: "upvote",
//       SINGER: "lcuric.near",
//       time: "2023-09-07 00:00:00.000",
//       status: "✅",
//       fee: 0.0009,
//       target: "chefsale.near",
//       total: 1,
//     },
//     {
//       rank: 3684,
//       function: "upvote",
//       SINGER: "ftdgoodluck.near",
//       time: "2023-09-07 00:00:00.000",
//       status: "✅",
//       fee: 0.0049,
//       target: "iamgalt.near",
//       total: 1,
//     },
//   ],
//   columns: [
//     { title: "Number", key: "rank", colors: "#806ce1" },
//     {
//       title: "Status",
//       key: "status",
//     },
//     { title: "Timestamp", key: "time" },
//     {
//       title: "Signer",
//       key: "SINGER",
//       link: "yes",
//       beforehref: "https://near.social/mob.near/widget/ProfilePage?accountId=",
//       hyperlink: "yes",
//     },
//     { title: "Function ", key: "function" },
//     {
//       title: "Target",
//       key: "target",
//       link: "yes",
//       beforehref: "https://near.social/mob.near/widget/ProfilePage?accountId=",
//       hyperlink: "yes",
//     },
//     { title: "Fee(Near)", key: "fee" },
//   ],
//   rowsCount: 3,
// };
