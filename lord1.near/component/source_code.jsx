const themeColor = props.themeColor;
const general_theme = {
  height: "110px",
  align: "center",
  description: "Explore the status of your Component activity.",
  brand: "Component Explorer",
  fontsize: "100",
  fontweight: "25px",
  afterbrand: "🖥️",
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

const developer_activity_theme = {
  height: "90px",
  align: "center",
  description: "",
  brand: "Developer' Activity",
  fontsize: "50",
  fontweight: "25px",
  afterbrand: "Status",
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

const table_componentList_theme = {
  height: "80px",
  align: "left",
  description: "",
  brand: "Component",
  fontsize: "25px",
  fontweight: "25px",
  afterbrand: "List",
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
const table_starSent_theme = {
  height: "80px",
  align: "left",
  description: "",
  brand: "Star ",
  fontsize: "25px",
  fontweight: "25px",
  afterbrand: "Sent",
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

const table_received_theme = {
  height: "80px",
  align: "left",
  description: "",
  brand: " ",
  fontsize: "25px",
  fontweight: "25px",
  afterbrand: "Received",
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
const table_starReceived_theme = {
  height: "80px",
  align: "left",
  description: "",
  brand: "Star ",
  fontsize: "25px",
  fontweight: "25px",
  afterbrand: "Received",
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
const queryHashes = [
  { id: 1, hash: "4a3e0435-a756-47e4-996a-5f5fc790b504" },
  { id: 2, hash: "ed99d1a8-f3a2-4613-b94c-4ac5f9160c88" },
  { id: 3, hash: "4fd2820b-b877-46f5-bdf1-b0c3cd9f64a6" },
  { id: 4, hash: "c7a65d89-6b47-44b2-b0d5-b080594e3af5" },
  { id: 5, hash: "ee065234-4fea-4c86-98a8-294238a86b04" }, //
  { id: 6, hash: "6e049a37-5a2b-4828-88bb-616ab9477c21" }, //
  { id: 7, hash: "87d193b0-5cd4-4d6d-ab2d-6ace1016d611" },
  { id: 8, hash: "87d193b0-5cd4-4d6d-ab2d-6ace1016d611" }, //
  { id: 9, hash: "5fcb3937-cb3c-440c-896f-3ce6748fceff" },
  { id: 10, hash: "ed99d1a8-f3a2-4613-b94c-4ac5f9160c88" },
  { id: 11, hash: "fbd78c9a-d988-4ff0-b14c-501276bba85f" }, //
  { id: 12, hash: "4a3e0435-a756-47e4-996a-5f5fc790b504" },
];

State.init({
  singer: "",
  data: null,
  componentListTableData: [],
  starSentTableData: [],
  starReceivedTableData: [],
  receivedTableData: [],

  tab: "first",
  isLoading: false,
  error: [],
});
//---------------------------------------------------------------------------------------

const inputHandler = ({ target }) => {
  const singer = target.value.toLowerCase().trim();
  State.update({ singer: singer });
};
//---------------------------------------------------------------------------------------

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

//------------------------------------------------------------------------------------------------
//1
const handleData = () => {
  if (!state.singer.length) {
    State.update({ error: [...state.error, "please insert an address"] });
    return;
  }
  if (state.data === state.singer) {
    State.update({ error: [...state.error, "please insert a new address"] });
    return;
  }

  //--------------------------------------------------------------------------
  const componentListTableResult = fetchData(queryHashes[5].hash);
  if (componentListTableResult.isLoading) {
    State.update({ isLoading: true, componentListTableFilterData: [] });
  }
  if (componentListTableResult.error) {
    const errors = state.error;
    errors.push(`error message is : "${componentListTableResult.error}"`);
    State.update({ error: errors, isLoading: false });
  }
  if (componentListTableResult.data) {
    const componentListTableData = componentListTableFilterData(
      componentListTableResult.data
    );

    State.update({
      data: state.singer,
      componentListTableData,
      isLoading: false,
    });
  }
  //--------------------------------------------------------------------------
  const starSentTableResult = fetchData(queryHashes[6].hash);
  if (starSentTableResult.isLoading) {
    State.update({ isLoading: true, starSentTableFilterData: [] });
  }
  if (starSentTableResult.error) {
    const errors = state.error;
    errors.push(`error message is : "${starSentTableResult.error}"`);
    State.update({ error: errors, isLoading: false });
  }
  if (starSentTableResult.data) {
    const starSentTableData = starSentTableFilterData(starSentTableResult.data);

    State.update({ data: state.singer, starSentTableData, isLoading: false });
  }
  //-----------------------------------------------
  const starReceivedTableResult = fetchData(queryHashes[8].hash);
  if (starReceivedTableResult.isLoading) {
    State.update({ isLoading: true, starReceivedTableFilterData: [] });
  }
  if (starReceivedTableResult.error) {
    const errors = state.error;
    errors.push(`error message is : "${starReceivedTableResult.error}"`);
    State.update({ error: errors, isLoading: false });
  }
  if (starReceivedTableResult.data) {
    const starReceivedTableData = starReceivedTableFilterData(
      starReceivedTableResult.data
    );

    State.update({
      data: state.singer,
      starReceivedTableData,
      isLoading: false,
    });
  } //-----------------------------------------------
  const receivedTableResult = fetchData(queryHashes[11].hash);
  if (receivedTableResult.isLoading) {
    State.update({ isLoading: true, receivedTableFilterData: [] });
  }
  if (receivedTableResult.error) {
    const errors = state.error;
    errors.push(`error message is : "${receivedTableResult.error}"`);
    State.update({ error: errors, isLoading: false });
  }
  if (receivedTableResult.data) {
    const receivedTableData = receivedTableFilterData(receivedTableResult.data);

    State.update({
      data: state.singer,
      receivedTableData,
      isLoading: false,
    });
  }
};
//------------------------------------------------------------------------------------------------

//6
const componentListTableFilterData = (data) => {
  return data.filter((row) => row.SINGER === state.singer);
};
//------------------------------------------------------------------------------------------------
//7
const starSentTableFilterData = (data) => {
  return data.filter((row) => row.SINGER === state.singer);
};
//------------------------------------------------------------------------------------------------
//8
const starReceivedTableFilterData = (data) => {
  return data.filter((row) => row.SINGER === state.singer);
};
//------------------------------------------------------------------------------------------------
//11
const receivedTableFilterData = (data) => {
  return data.filter((row) => row.SINGER === state.singer);
};
//------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------
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
//-------------------------------------------------------------------------------------------------

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

const getMixProps = (data, dateKey, serieses, colors, chartOption) => {
  data = data || [];
  serieses = serieses || [{ key: "", seriesName: "", type: "", id: 1 }];
  colors = colors || [];
  chartOption = chartOption || {};

  const dataFormat = serieses.map((series) => {
    const dataFormated = data.map((d) => [d[dateKey] * 1000, d[series.key]]);
    return {
      data: dataFormated,
      name: series.seriesName,
      type: series.type,
      axisId: series.id,
    };
  });
  const props = {
    series: dataFormat,
    colors: colors,
    chartOption: {
      title: "chart title",
      subtitle: "chart subtitle",
      legend: true,
      stacking: "false",
      ...chartOption,
    },
    overrideOptions: {
      plotOptions: {
        column: {
          stacking: "false",
        },
        series: {
          dataGrouping: { enabled: false },
        },
      },
    },
    themeColor: { chart: themeColor.chart },
    spinnerColors: themeColor.spinnerColors,
  };
  return props;
};

const getPieProps = (data, [key, value], colors, chartOption) => {
  data = data || [];
  colors = colors || [];
  chartOption = chartOption || {};

  const groupedData = {};
  for (const item of data) {
    const keyValue = item[key];
    const valueValue = item[value];

    if (groupedData[keyValue]) {
      groupedData[keyValue] += valueValue;
    } else {
      groupedData[keyValue] = valueValue;
    }
  }

  const dataFormat = Object.entries(groupedData).map(
    ([groupKey, groupValue]) => [groupKey, groupValue]
  );

  const props = {
    data: dataFormat,
    colors: colors,
    chartOption: {
      title: "chart title",
      type: "pie",
      legend: false,
      connector: false,
      ...chartOption,
    },
    themeColor: { chart: themeColor.chart },
    spinnerColors: themeColor.spinnerColors,
  };
  return props;
};
const noData = <div className="w-100 py-4 text-center">No data available</div>;
let firstSection = (
  <div className="row w-100 py-4 g-4">
    <div
      style={{ backgroundColor: themeColor.sbt_area?.section_bg }}
      className=" col-12 col-md-12"
    >
      <Widget
        src="mob.near/widget/ProfileLarge"
        props={{ accountId: state.singer }}
      />
    </div>
  </div>
);

let secondSection = (
  <div
    style={{ background: themeColor?.sbt_area?.section_bg }}
    className="shadow-sm rounded-2 overflow-auto"
  >
    <Widget
      src="lord1.near/widget/header-dynamic"
      props={developer_activity_theme}
    />
    <div className="w-100 mx-auto shadow-sm rounded-4 overflow-auto px-2 mb-2">
      <Widget
        props={{ singer: state.singer }}
        src="lord1.near/widget/component-tab"
      />
    </div>
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <Widget
            src="lord1.near/widget/header-dynamic"
            props={table_componentList_theme}
          />
          <div
            style={{ background: themeColor?.sbt_area?.card_bg }}
            className="w-100 mx-auto shadow-sm rounded-4 overflow-auto"
          >
            {state.componentListTableData.length > 0 ? (
              <Widget
                src="lord1.near/widget/table-pagination"
                props={{
                  themeColor: {
                    table_pagination: themeColor.table_pagination,
                  },
                  data: state.componentListTableData,
                  rowsCount: "5",
                  columns: [
                    {
                      title: "Component Name",
                      key: "widget",
                    },
                    {
                      title: "Total Tnxs",
                      key: "total_trxs",
                    },
                    {
                      title: "Build Tnxs",
                      key: "build",
                    },
                    {
                      title: "Update Tnxs",
                      key: "update",
                    },
                    {
                      title: "Star Received",
                      key: "star",
                    },
                    {
                      title: "UnStar Received",
                      key: "unstar",
                    },
                    {
                      title: "Link",
                      key: "widget",
                      link: "yes",
                      beforehref: `https://bos.flipsidecrypto.xyz/${state.singer}/widget/`,
                      hyperlink: "no",
                    },
                  ],
                }}
              />
            ) : (
              noData
            )}
          </div>
        </div>
        <div className="col-md-4">
          <Widget
            src="lord1.near/widget/header-dynamic"
            props={table_starSent_theme}
          />
          <div
            style={{ background: themeColor?.sbt_area?.card_bg }}
            className="w-100 mx-auto shadow-sm rounded-4 overflow-auto"
          >
            {state.starSentTableData.length > 0 ? (
              <Widget
                src="lord1.near/widget/table-pagination"
                props={{
                  themeColor: {
                    table_pagination: themeColor.table_pagination,
                  },
                  data: state.starSentTableData,
                  rowsCount: "5",
                  columns: [
                    {
                      title: "Action",
                      key: "action",
                    },
                    {
                      title: "Receiver",
                      key: "target",
                      link: "yes",
                      beforehref:
                        "https://near.social/mob.near/widget/ProfilePage?accountId=",
                      hyperlink: "yes",
                    },

                    {
                      title: "Widget",
                      key: "widget",
                      link: "yes",
                      beforehref: `https://bos.flipsidecrypto.xyz/${state.target}/widget/`,
                      hyperlink: "no",
                    },
                  ],
                }}
              />
            ) : (
              noData
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

let thirdSection = (
  <div
    style={{ background: themeColor?.sbt_area?.section_bg }}
    className="shadow-sm rounded-2 overflow-auto"
  >
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <Widget
            src="lord1.near/widget/header-dynamic"
            props={table_received_theme}
          />
          <div
            style={{ background: themeColor?.sbt_area?.card_bg }}
            className="w-100 mx-auto shadow-sm rounded-4 "
          >
            {state.receivedTableData.length > 0 ? (
              <Widget
                src="lord1.near/widget/table-pagination"
                props={{
                  themeColor: {
                    table_pagination: themeColor.table_pagination,
                  },
                  data: state.receivedTableData,
                  rowsCount: "5",
                  columns: [
                    {
                      title: "Voter",
                      key: "VOTER",
                      link: "yes",
                      beforehref:
                        "https://near.social/mob.near/widget/ProfilePage?accountId=",
                      afterhref: "",
                      hyperlink: "yes",
                    },
                    {
                      title: "Candidate",
                      key: "SINGER",
                      description: "Candidate",
                      link: "yes",
                      beforehref:
                        "https://near.social/mob.near/widget/ProfilePage?accountId=",
                      afterhref: "",
                      hyperlink: "yes",
                    },
                  ],
                }}
              />
            ) : (
              noData
            )}
          </div>
        </div>
        <div className="col-md-4">
          <Widget
            src="lord1.near/widget/header-dynamic"
            props={table_starReceived_theme}
          />
          <div
            style={{ background: themeColor?.sbt_area?.card_bg }}
            className="w-100 mx-auto shadow-sm rounded-4 overflow-auto"
          >
            {state.starReceivedTableData.length > 0 ? (
              <Widget
                src="lord1.near/widget/table-pagination"
                props={{
                  themeColor: {
                    table_pagination: themeColor.table_pagination,
                  },
                  data: state.starReceivedTableData,
                  rowsCount: "5",
                  columns: [
                    {
                      title: "Sender",
                      key: "singer",
                      link: "yes",
                      beforehref:
                        "https://near.social/mob.near/widget/ProfilePage?accountId=",
                      hyperlink: "yes",
                    },
                    {
                      title: "Action",
                      key: "action",
                    },

                    {
                      title: "Widget",
                      key: "widget",
                      link: "yes",
                      beforehref: `https://bos.flipsidecrypto.xyz/${state.SINGER}/widget/`,
                      hyperlink: "no",
                    },
                  ],
                }}
              />
            ) : (
              noData
            )}
          </div>
        </div>
      </div>
    </div>
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
          {firstSection}
          {secondSection}
          {thirdSection}
          <Widget
            src="lord1.near/widget/component-chart1"
            props={{
              singer: state.singer,
              themeColor,
            }}
          />
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
