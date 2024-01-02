const themeColor = props.themeColor;
const API_KEY = "6d48c4c0-eb41-4e4b-ae4d-ba1148f01fb8";

const general_theme = {
  height: "110px",
  align: "center",
  description: "Explore the status of your activity.",
  brand: "Jupiter Wrapped",
  fontsize: "100",
  fontweight: "25px",
  afterbrand: "🌐",
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

//----------------------------------------------------------------------------------
//tabs ######
const tabs = {
  transaction: "Transaction",
};
const setTab = (tab) => State.update({ tab });
// ----------------------
State.init({
  singer: "",
  interval: "week",
  isLoading: false,
  searchedSinger: null,
  searchedInterval: null,
  tab: tabs.transaction,
  result: {},
  error: [],
});
//---------------------------------------------------------------------------------------

const inputHandler = ({ target }) => {
  const singer = target.value.trim();
  State.update({ singer: singer });
};

const selectHandler = ({ target }) => {
  const interval = target.value.toLowerCase();
  State.update({ interval });
};
//------------------------------------------------------------------------------------------------

const handleSearchedSinger = () => {
  if (!state.singer.length) {
    State.update({ error: [...state.error, "please insert an address"] });
    return;
  }
  if (
    state.searchedSinger === state.singer &&
    state.searchedInterval === state.interval
  ) {
    State.update({
      error: [
        ...state.error,
        "please insert new address or select new interval",
      ],
    });
    return;
  }
  State.update({
    searchedSinger: state.singer,
    searchedInterval: state.interval,
    result: {},
    isLoading: true,
  });
  setTimeout(() => {
    State.update({ isLoading: false });
  }, 10000);
};
//-------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------

// error managment #######################
if (state.error.length > 0) {
  function hide() {
    const errors = state.error;
    errors.shift();
    if (errors.length > 0) setTimeout(hide, 2500);
    State.update({ error: errors });
  }
  setTimeout(hide, 2500);
}
// ui elements ##################################
// tabs container --------------------------------------------

const Container = styled.div`
  && {
    text-align: left;
  }
  .tabContent {
    display: inline-flex;
    align-items: left;
    background: rgba(26, 46, 51, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    padding: 3px 4px;
    list-style-type: none;
    margin: 0 auto;
    flex-wrap: wrap;
    justify-content: center;
  }
  .tab-item .active {
    background: #304352;
  }
  .tab-item button {
    background-color: transparent;
    border-radius: 8px;
    font-weight: 500;
    font-size: 14px;
    color: #fff;
    height: 30px;
    padding: 0 22px;
    border: none;
  }
`;
//--------------------
const Input = styled.input`
  flex-grow: 4 !important;
  color: ${themeColor?.search_sbt?.input_text_color};
  background-color: ${themeColor?.search_sbt?.input_bg};
  &:hover {
    background-color: ${themeColor?.search_sbt?.input_bg_hover};
  }
  &:focus {
    background-color: ${themeColor?.search_sbt?.input_bg};
    color: ${themeColor?.search_sbt?.input_text_color};
    border: 1px solid ${themeColor?.search_sbt?.input_border};
  }
  &:disabled {
    background-color: ${themeColor?.search_sbt?.input_bg_hover};
    color: ${themeColor?.search_sbt?.input_text_color};
    border: 1px solid ${themeColor?.search_sbt?.input_border};
  }
  &::placeholder {
    color: ${themeColor?.search_sbt?.input_text_color};
  }
  &:placeholder-shown {
    opacity: 0.5;
  }
`;
const Dropdown = styled.select`
  cursor: pointer;
  color: ${themeColor?.search_sbt?.input_text_color};
  background-color: ${themeColor?.search_sbt?.input_bg};
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
  &:hover {
    background-color: ${themeColor?.search_sbt?.input_bg_hover};
  }
  &:focus {
    background-color: ${themeColor?.search_sbt?.input_bg};
    color: ${themeColor?.search_sbt?.input_text_color};
    border: 1px solid ${themeColor?.search_sbt?.input_border};
  }
  &:disabled {
    background-color: ${themeColor?.search_sbt?.input_bg_hover};
    color: ${themeColor?.search_sbt?.input_text_color};
    border: 1px solid ${themeColor?.search_sbt?.input_border};
    cursor: default;
  }
`;
const Button = styled.button`
  color: ${themeColor?.search_sbt?.search_btn_text};
  font-size: 16px;
  padding: 0.5rem 1rem;
  font-weight: 400;
  background-color: ${themeColor?.search_sbt?.search_btn_bg};
  &:hover {
    background-color: ${themeColor?.search_sbt?.search_btn_bg_hover};
  }
  border: 1px solid ${themeColor?.search_sbt?.search_btn_bg};
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
  min-height: calc(1.5em + 1rem + 2px);
  border-radius: 40px;
  line-height: 29px;
  letter-spacing: 0.01em;
`;

const Transaction = (
  <div
    className="w-100"
    style={{ display: state.tab === tabs.transaction ? "" : "none" }}
  >
    <Widget
      src="lord1.near/widget/wrapped-transaction-jupiter"
      props={{
        themeColor,
        singer: state.searchedSinger,
        interval: state.searchedInterval,
        API_KEY,
      }}
    />
  </div>
);

return (
  <div
    style={{ backgroundColor: themeColor.page_bg }}
    className="container-fluid py-2 rounded-4"
  >
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      {state.error.length > 0 &&
        state.error.map((er) => (
          <div
            key={er}
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
      style={{ background: themeColor?.search_sbt?.section_bg }}
    >
      <Widget src="lord1.near/widget/header-dynamic" props={general_theme} />
    </div>
    <div className="search py-4">
      <div className="row">
        <div className="col-sm-8 mb-3">
          <div className="input-group gap-2">
            <Input
              onBlur={inputHandler}
              defaultValue={state.singer}
              disabled={state.isLoading}
              type="input"
              className="form-control form-control-lg rounded-4 rounded-end"
              id="address"
              placeholder="Solana Address:"
            />
            <Dropdown
              onChange={selectHandler}
              value={state.interval}
              disabled={state.isLoading}
              className="form-select rounded-4 rounded-start mw-25"
            >
              <option value="day">Day</option>
              <option selected value="week">
                Week
              </option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </Dropdown>
          </div>
        </div>
        <div className="text-center col-sm-4 col-md-auto">
          <Button
            disabled={state.isLoading}
            onClick={handleSearchedSinger}
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
    <div>
      {state.searchedSinger && (
        <>
          <div className="w-100 d-flex justify-content-center mb-2">
            <Container>
              <ul className="tabContent">
                {Object.values(tabs).map((tab) => (
                  <li key={tab} className="tab-item">
                    <button
                      className={`${state.tab === tab ? "active" : ""}`}
                      aria-current="page"
                      onClick={() => setTab(tab)}
                    >
                      {tab}
                    </button>
                  </li>
                ))}
              </ul>
            </Container>
          </div>
          <div className="w-100">
            <div>{Transaction}</div>
          </div>
        </>
      )}
    </div>
  </div>
);
