const themeColor = props.themeColor;
const generaltheme = {
  height: "110px",
  align: "center",
  description: "Explore the status of your SBTS on Near ecosystem.",
  brand: "Im Human Explorer 👋",
  fontsize: "100",
  fontweight: "25px",
  afterbrand: "",
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};

const queryHashes = [{ id: 1, hash: "cbcc0950-c11a-46c5-9e86-72eb9cc9566f" }];

State.init({
  singer: "",
  data: null,
  filteredData: [],
  isLoading: false,
  error: [],
});

const inputHandler = ({ target }) => {
  const singer = target.value.toLowerCase().trim();
  State.update({ singer: singer });
};
const onHandelDate = (inputDate) => {
  let date = new Date(inputDate);
  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let day = date.getDate();
  let month = monthNames[date.getMonth()];
  let year = date.getFullYear();
  let createdAt;
  createdAt = day + " " + month + " " + year;
  return createdAt;
};

const handleData = () => {
  if (!state.singer.length) {
    State.update({ error: [...state.error, "please insert an address"] });
    return;
  }
  if (state.data === state.singer) {
    State.update({ error: [...state.error, "please insert a new address"] });
    return;
  }
  const result = fetchData(queryHashes[0].hash);
  if (result.isLoading) {
    State.update({ isLoading: true, filterData: [] });
  }
  if (result.error) {
    const errors = state.error;
    errors.push(`error message is : "${result.error}"`);
    State.update({ error: errors, isLoading: false });
  }
  if (result.data) {
    const filteredData = filterData(result.data);

    State.update({ data: state.singer, filteredData, isLoading: false });
  }
};

const filterData = (data) => {
  return data.filter((row) => row.SINGER === state.singer);
};

const fetchData = (hash) => {
  const data = fetch(
    `https://api.flipsidecrypto.com/api/v2/queries/${hash}/data/latest`,
    {
      subscribe: true,
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    }
  );
  const result = {
    data: (data && data.body) || null,
    error: (data && !data.ok && (data.status || data.error)) || null,
    isLoading: !data && !error,
  };
  return result;
};
if (state.isLoading) {
  handleData();
}

if (state.error.length > 0) {
  function hide() {
    const errors = state.error;
    errors.shift();
    if (errors.length > 0) setTimeout(hide, 2500);
    State.update({ error: errors });
  }
  setTimeout(hide, 2500);
}

const Input = styled.input`
color:${themeColor?.search_sbt?.input_text_color};
background-color:${themeColor?.search_sbt?.input_bg};
border: 1px solid ${themeColor?.search_sbt?.input_border};
&:focus{
  background-color:${themeColor?.search_sbt?.input_bg};
  color:${themeColor?.search_sbt?.input_text_color};
border: 1px solid ${themeColor?.search_sbt?.input_border};
};
&:hover{
  background-color:${themeColor?.search_sbt?.input_bg_hover}
};

`;
const Button = styled.button`
    color: ${themeColor?.search_sbt?.search_btn_text};
    font-size: 16px;
    padding: 0.5rem 1rem;
    font-weight: 400;
    background-color: ${themeColor?.search_sbt?.search_btn_bg};
    &:hover {background-color: ${themeColor?.search_sbt?.search_btn_bg_hover}};
    border: 1px solid ${themeColor?.search_sbt?.search_btn_bg};
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
    min-height: calc(1.5em + 1rem + 2px);
    border-radius: 40px;
    line-height: 29px;
    letter-spacing: 0.01em;
`;
const Table = styled.table`
  --bs-table-color: ${themeColor?.search_sbt?.table_color};
  --bs-table-bg: ${themeColor?.search_sbt?.table_bg};
  --bs-table-border-color: ${themeColor?.search_sbt?.table_border_color};
  --bs-table-accent-bg: ${themeColor?.search_sbt?.table_accent_bg};
  --bs-table-striped-color: ${themeColor?.search_sbt?.table_striped_color};
  --bs-table-striped-bg:${themeColor?.search_sbt?.table_striped_bg};
  --bs-table-hover-color: ${themeColor?.search_sbt?.table_hover_color};
  --bs-table-hover-bg:${themeColor?.search_sbt?.table_hover_bg}
`;
return (
  <div className="container-fluid py-2 rounded-4">
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      {state.error.length > 0 &&
        state.error.map((er) => (
          <div
            className="toast show align-items-center text-bg-danger border-0"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="d-flex">
              <div className="toast-body">{er}</div>
            </div>
          </div>
        ))}
    </div>
    <div
      className="shadow-sm  rounded-4"
      style={{ background: themeColor?.search_sbt?.card_bg }}
    >
      <Widget src="lord1.near/widget/header-dynamic" props={generaltheme} />
    </div>
    <div className="search py-4">
      <div className="row">
        <div className="col-8 ">
          <Input
            onBlur={inputHandler}
            defaultValue={state.singer}
            type="input"
            className="form-control form-control-lg rounded-4"
            id="address"
            placeholder="jlw.near"
          />
        </div>
        <div className="col-4 col-lg-auto">
          <Button
            disabled={state.isLoading}
            onClick={handleData}
            className="btn-lg"
            type="button"
          >
            {state.isLoading ? (
              <div className="text-center px-4">
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              "search"
            )}
          </Button>
        </div>
      </div>
    </div>

    <div
      style={{ background: themeColor?.search_sbt?.card_bg }}
      className={`shadow-sm rounded h-100 `}
    >
      {!state.isLoading && state.data && (
        <div
          style={{ backgroundColor: themeColor?.search_sbt?.table_bg }}
          className="table-responsive"
        >
          <Table
            style={{}}
            className="table table-hover table-striped table-borderless "
          >
            <thead>
              <tr>
                <th className="col-1 align-middle" scope="col">
                  User
                </th>
                <th className="col-1 align-middle" scope="col">
                  SBT
                </th>
                <th className="col-1 align-middle" scope="col">
                  Class
                </th>
                <th className="col-1 align-middle" scope="col">
                  Token Id
                </th>
                <th className="col-1 align-middle" scope="col">
                  Issuer
                </th>
                <th className="col-1 align-middle" scope="col">
                  Issue date
                </th>
                <th className="col-1 align-middle" scope="col">
                  Expire date
                </th>
                <th className="col-1 align-middle" scope="col">
                  Date to deadline
                </th>
                <th className="col-1 align-middle" scope="col">
                  Tx Link
                </th>
              </tr>
            </thead>
            <tbody>
              {state.filteredData.length === 0 && (
                <tr>
                  <td className="text-center p-4" colspan="10">
                    No same signer
                  </td>
                </tr>
              )}
              {state.filteredData.length >= 1 &&
                state.filteredData.map((row) => {
                  return (
                    <tr key={row.TX_HASH}>
                      <td className="align-middle ">
                        <Link
                          href={`/mob.near/widget/ProfilePage?accountId=${row.SINGER}`}
                        >
                          <Widget
                            src="mob.near/widget/ProfileImage"
                            props={{ accountId: row.SINGER }}
                          />
                        </Link>
                      </td>
                      <td className="align-middle" style={{ color: "#806ce1" }}>
                        {row.SBT_CLASS}
                      </td>
                      <td className="align-middle">{row.CLASS}</td>
                      <td className="align-middle" style={{ color: "#EA1179" }}>
                        {row.TOKEN_ID}
                      </td>
                      <td className="align-middle" style={{ color: "#806ce1" }}>
                        {row.SIGNER_ID}
                      </td>
                      <td className="align-middle" style={{ color: "#806ce1" }}>
                        {onHandelDate(row.ISSUED_AT)}
                      </td>
                      <td
                        className="align-middle "
                        style={{ color: "#806ce1" }}
                      >
                        {onHandelDate(row.EXPIRES_AT)}
                      </td>
                      <td className="align-middle ">
                        <Widget
                          src="lord1.near/widget/progress-bar"
                          props={{
                            inside: `${row.DURATION}` - `${row.TO_DEADLINE}`,
                            total: `${row.DURATION}`,
                            currTheme: "#806ce1",
                            widgetBarWidth: "100",
                            backgroundcolor: "#d2cafa",
                            gradiantcolorleft: "#806ce1",
                            gradiantcolorright: "#EA1179",
                            visibilitydivision: "visible",
                            visibilitypercent: "hidden",
                          }}
                        />
                      </td>
                      <td className="align-middle text-center">
                        <a
                          className="d-inline-block"
                          href={`https://nearblocks.io/txns/${row.TX_HASH}`}
                          target="_blank"
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
                              stroke="#806ce1"
                              stroke-width="2.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </a>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  </div>
);
// const props = {
//   themeColor: {
//     dynamic_header: {
//       afterbrandcolor: "#789efb",
//       color1brand: "#000",
//       color2brand: "#806ce1",
//       colordescription: "#806ce1",
//       background:
//         "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
//     },
//     search_sbt: {
//       card_bg: "rgb(49, 62, 89)",
//       search_btn_bg: "rgb(49,62,89)",
//       search_btn_bg_hover: "rgba(49,62,89,0.8)",
//       search_btn_text: "rgb(255,255,255)",
//       input_bg: "rgb(49,62,89)",
//       input_bg_hover: "rgba(49,62,89,0.8)",
//       input_text_color: "rgb(255,255,255)",
//       input_border: "rgba(49,62,89,0.8)",
//       table_bg: "transparent",
//       table_color: "rgb(255,255,255)",
//       table_border_color: "",
//       table_accent_bg: "",
//       table_striped_color: "rgb(255,255,255)",
//       table_striped_bg: "",
//       table_hover_color: "rgb(255,255,255)",
//       table_hover_bg: "",
//     },
//   },
// };
