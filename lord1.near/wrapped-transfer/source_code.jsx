const APIKEY = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";
const themeColor = props.themeColor;
const singer = props.singer;

const queries = [
  {
    id: "incoming-near",
    query: "incoming-near",
  },
  {
    id: "incoming-token",
    query: "incoming-token",
  },
  {
    id: "outgoing-near",
    query: "outgoing-near",
  },
  {
    id: "outgoing-token",
    query: "outgoing-token",
  },
];
// --------------------------

State.init({
  searchedSinger: "",
  result: {},
  isLoading: false,
  error: [],
});

// -----------------------------

const checkNewSinger = () => {
  if (state.searchedSinger === singer) {
    return;
  } else {
    State.update({
      searchedSinger: singer,
      result: {},
      isLoading: true,
      error: [],
    });
  }
};
checkNewSinger();

// --------------------------

// handle hashed data #############################
const handleHasedData = ({ query, id }) => {
  if (state.result["query" + id].isDone) return;
  const result = fetchData(query);
  if (result.isLoading) {
    State.update({
      isLoading: true,
      result: {
        ...state.result,
        ["query" + id]: { isLoading: true, error: false, data: null },
      },
    });
  }
  if (result.error) {
    const errors = state.error;
    errors.push(`query (${id}): ${result.error}`);
    State.update({
      error: errors,
      result: {
        ...state.result,
        ["query" + id]: {
          isLoading: false,
          error: true,
          data: null,
          isDone: true,
        },
      },
    });
  }
  if (result.data) {
    State.update({
      result: {
        ...state.result,
        ["query" + id]: {
          isLoading: false,
          error: false,
          data: result.data,
          isDone: true,
        },
      },
    });
  }
};
const fetchData = (query) => {
  const data = fetch(
    `https://api.pikespeak.ai/account/${query}/${state.searchedSinger}`,
    {
      subscribe: true,
      headers: {
        "x-api-key": APIKEY,
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

// ------------------------------------------------------
const isAllDataLoaded = () => {
  const resultArr = Object.entries(state.result);
  if (resultArr.length === 0) return false;
  return resultArr.every((query) => {
    return !query[1].isLoading;
  });
};

if (isAllDataLoaded()) {
  State.update({ isLoading: false });
}

if (state.isLoading) {
  queries.forEach((query) => handleHasedData(query));
}

// ----------------------------------------------

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

// -------------------

const sentnear = {
  height: "90px",
  align: "center",
  description: "",
  brand: "Incoming ",
  fontsize: "25px",
  fontweight: "25px",
  afterbrand: "NEAR",
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
const recievenear = {
  height: "90px",
  align: "center",
  description: "",
  brand: "Outgoing  ",
  fontsize: "25px",
  fontweight: "25px",
  afterbrand: "NEAR",
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
const senttoken = {
  height: "90px",
  align: "center",
  description: "",
  brand: "Outgoing   ",
  fontsize: "25px",
  fontweight: "25px",
  afterbrand: "Tokens",
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
const recievetoken = {
  height: "90px",
  align: "center",
  description: "",
  brand: "Incoming  ",
  fontsize: "25px",
  fontweight: "25px",
  afterbrand: "Tokens",
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

// dom sections ##############################################
const noData = <div className="w-100 py-4 text-center"> No data available</div>;

const CardIsLoading = (queryId) =>
  state.result?.[`query${queryId}`]?.isLoading && (
    <div
      className="d-flex flex-column gap-1"
      style={{
        padding: "60px 12px",
      }}
    >
      <Widget
        src={`easypoll-v0.ndc-widgets.near/widget/Common.Spinner`}
        props={{
          ...spinnerColors,
        }}
      />
      <span
        style={{
          fontWeight: "bold",
          fontsize: 15,
          color: "#4f46e5",
          textAlign: "center",
        }}
      >
        Loading...
      </span>
    </div>
  );
const CardHasError = (queryId) =>
  state.result?.[`query${queryId}`]?.error && (
    <div className="d-flex justify-content-center align-items-center h-100 p-4 pb-1">
      An error occurred for this section
    </div>
  );

// ==============

const Incoming_near = (
  <div
    className="my-4 shadow-sm  rounded-4"
    style={{ background: themeColor?.sbt_area?.section_bg }}
  >
    <Widget src="lord1.near/widget/header-dynamic" props={sentnear} />
    <div className="row w-100 pb-2 px-2 mx-0">
      <div
        style={{ background: themeColor?.sbt_area?.card_bg }}
        className="shadow-sm rounded-2 overflow-auto"
      >
        {CardIsLoading("incoming-near")}
        {CardHasError("incoming-near")}
        {state.result["query" + "incoming-near"]?.data && (
          <Widget
            src="lord1.near/widget/table-pagination"
            props={{
              themeColor: { table_pagination: themeColor.table_pagination },
              data: state.result["query" + "incoming-near"]?.data,
              rowsCount: 5,
              columns: [
                { title: "Sender", key: "sender", colors: "#806ce1" },
                { title: "Count", key: "count" },
                { title: "Amount", key: "amount", round: "yes" },
              ],
            }}
          />
        )}
      </div>
    </div>
  </div>
);
const Incoming_token = (
  <div
    className="my-4 shadow-sm  rounded-4"
    style={{ background: themeColor?.sbt_area?.section_bg }}
  >
    <Widget src="lord1.near/widget/header-dynamic" props={recievenear} />
    <div className="row w-100 pb-2 px-2 mx-0">
      <div
        style={{ background: themeColor?.sbt_area?.card_bg }}
        className="shadow-sm rounded-2 overflow-auto"
      >
        {CardIsLoading("outgoing-near")}
        {CardHasError("outgoing-near")}
        {state.result["query" + "outgoing-near"]?.data && (
          <Widget
            src="lord1.near/widget/table-pagination"
            props={{
              themeColor: { table_pagination: themeColor.table_pagination },
              data: state.result["query" + "outgoing-near"]?.data,
              rowsCount: 5,
              columns: [
                { title: "Receiver", key: "receiver", colors: "#806ce1" },
                { title: "Count", key: "count" },
                { title: "Amount", key: "amount", round: "yes" },
              ],
            }}
          />
        )}
      </div>
    </div>
  </div>
);
const Outgoing_near = (
  <div
    className="my-4 shadow-sm  rounded-4"
    style={{ background: themeColor?.sbt_area?.section_bg }}
  >
    <Widget src="lord1.near/widget/header-dynamic" props={recievetoken} />
    <div className="row w-100 pb-2 px-2 mx-0">
      <div
        style={{ background: themeColor?.sbt_area?.card_bg }}
        className="shadow-sm rounded-2 overflow-auto"
      >
        {" "}
        {CardIsLoading("incoming-token")}
        {CardHasError("incoming-token")}
        {state.result["query" + "incoming-token"]?.data && (
          <Widget
            src="lord1.near/widget/table-pagination"
            props={{
              themeColor: { table_pagination: themeColor.table_pagination },
              data: state.result["query" + "incoming-token"]?.data,
              rowsCount: 5,
              columns: [
                { title: "Sender", key: "sender", colors: "#806ce1" },
                { title: "Count", key: "count" },
                { title: "Amount", key: "amount", round: "yes" },
                { title: "Contract", key: "contract" },
              ],
            }}
          />
        )}
      </div>
    </div>
  </div>
);
const Outgoing_token = (
  <div
    className="my-4 shadow-sm  rounded-4"
    style={{ background: themeColor?.sbt_area?.section_bg }}
  >
    <Widget src="lord1.near/widget/header-dynamic" props={senttoken} />
    <div className="row w-100 pb-2 px-2 mx-0">
      <div
        style={{ background: themeColor?.sbt_area?.card_bg }}
        className="shadow-sm rounded-2 overflow-auto"
      >
        {CardIsLoading("outgoing-token")}
        {CardHasError("outgoing-token")}
        {state.result["query" + "outgoing-token"]?.data && (
          <Widget
            src="lord1.near/widget/table-pagination"
            props={{
              themeColor: { table_pagination: themeColor.table_pagination },
              data: state.result["query" + "outgoing-token"]?.data,
              rowsCount: 5,
              columns: [
                { title: "Sender", key: "sender", colors: "#806ce1" },
                { title: "Count", key: "count" },
                { title: "Amount", key: "amount", round: "yes" },
                { title: "Contract", key: "contract" },
              ],
            }}
          />
        )}
      </div>
    </div>
  </div>
);
return (
  <>
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
    <div className="row">
      <div className="col-md-6">{Incoming_near}</div>
      <div className="col-md-6">{Incoming_token}</div>
      <div className="col-md-6">{Outgoing_near}</div>
      <div className="col-md-6">{Outgoing_token}</div>
    </div>
  </>
);
