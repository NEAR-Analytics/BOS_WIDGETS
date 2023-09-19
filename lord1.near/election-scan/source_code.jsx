const themeColor = lightColors;
// const themeColor = props.themeColor;
const generaltheme = {
  height: "110px",
  align: "center",
  description: "Tracking the activity in Election process.",
  brand: "Election Scan",
  fontsize: "100",
  fontweight: "25px",
  afterbrand: "🏦",
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

const queryHashes = [{ id: 1, hash: "2286f370-240d-4e62-a301-3331ec2e2ef0" }];

State.init({
  filter: "",
  data: [],
  filteredData: [],
  isLoading: true,
  error: [],
});

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
const handleData = () => {
  const data = {};
  const errors = [];
  queryHashes.forEach(({ hash, id }) => {
    const result = fetchData(hash);
    if (result.error) errors.push(`hash${id} : ${result.error}`);
    data[`hash${id}`] = {
      ...result,
      id,
    };
  });

  if (Object.values(data).every((d) => !d.isLoading)) {
    State.update({
      data: data,
      filteredData: data.hash1.data,
      error: [...state.error, ...errors],
      isLoading: false,
    });
  }
};
const inputHandler = ({ target }) => {
  const filter = target.value.toLowerCase().trim();
  State.update({ filter: filter });
};

const filterData = () => {
  if (!state.filter.length) {
    State.update({ error: [...state.error, "please insert an address"] });
    return;
  }
  if (state.data === state.filter) {
    State.update({ error: [...state.error, "please insert a new address"] });
    return;
  }

  const filteredData = state.data.hash1?.data?.filter((row) =>
    Object.values(row)
      .join()
      .toLocaleLowerCase()
      .includes(state.filter.toLocaleLowerCase())
  );
  State.update({ filteredData: filteredData || [] });
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

return (
  <div
    style={{ backgroundColor: themeColor.page_bg }}
    className="container-fluid py-2"
  >
    <div className="pl-2">
      <div
        style={{ background: themeColor?.sbt_area?.section_bg }}
        className="shadow-sm rounded-2 overflow-auto"
      >
        <Widget src="lord1.near/widget/header-dynamic" props={generaltheme} />

        <div className="search w-100 pl-4 py-4">
          <div className="row">
            <div className="col-8 ">
              <Input
                onBlur={inputHandler}
                defaultValue={state.filter}
                type="input"
                className="form-control form-control-lg rounded-4"
                id="address"
                placeholder="address/hash/time/function ..."
              />
            </div>
            <div className="col-4 col-lg-auto">
              <Button
                disabled={state.isLoading}
                onClick={filterData}
                className="btn-lg"
                type="button"
                style={{ "margin-left": "1%" }}
              >
                {state.isLoading ? (
                  <div className="text-center px-4">
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    >
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
        <div className="w-100 p-2" style={{ "border-radius": "100px" }}>
          <Widget
            src="lord1.near/widget/table-pagination"
            props={{
              themeColor: { table_pagination: themeColor.table_pagination },
              data: state.filteredData,
              columns: [
                { title: "Number", key: "rank", colors: "#806ce1" },
                {
                  title: "Status",
                  key: "status",
                },
                { title: "Timestamp", key: "time" },
                {
                  title: "Signer",
                  key: "SINGER",
                  link: "yes",
                  beforehref:
                    "https://near.social/mob.near/widget/ProfilePage?accountId=",
                  hyperlink: "yes",
                },
                { title: "Function ", key: "function" },
                {
                  title: "Target",
                  key: "target",
                  explain: "yes",
                },
                {
                  title: "Info",
                  key: "PROP",
                  explain: "yes",
                },
                { title: "Fee(Near)", key: "fee" },

                {
                  title: "Hash",
                  key: "trxs",
                  link: "yes",
                  beforehref: "https://nearblocks.io/txns/",
                  afterhref: "",
                },
              ],
              rowsCount: 20,
            }}
          />
        </div>
      </div>
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
//     tab_sbt: {
//       backgroundColor: "rgb(49,62,89)",
//       textColor: "#fff",
//       headerColor: "#806ce1",
//       numberColor: "#fff",
//     },
//     sbt_area: {
//       section_bg: "rgba(25,33,80)",
//       card_bg: "rgb(49, 62, 89)",
//       card_title_color: "#806ce1",
//     },
//   },
// };
