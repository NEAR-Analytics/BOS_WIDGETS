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
  align: "center",
  description: `( Star:${
    state.result.hash5?.data[0]?.stars_sent || "0"
  }  | UnStar:${state.result.hash5?.data[0]?.unstars_sent || "0"} )`,
  brand: "Un/Star ",
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

const table_starReceived_theme = {
  height: "80px",
  align: "center",
  description: `( Star:${
    state.result.hash5?.data[0]?.stars_received || "0"
  }  | UnStar:${state.result.hash5?.data[0]?.unstars_received || "0"} )`,
  brand: "Un/Star ",
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
const table_creditSent_theme = {
  height: "80px",
  align: "left",
  description: "",
  brand: "Using",
  fontsize: "25px",
  fontweight: "25px",
  afterbrand: "Imports",
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
const table_creditSentTab1_theme = {
  height: "80px",
  align: "center",
  description: `${state.result.hash6?.data[0]?.source_widget || "0"}`,
  brand: `widgets`,
  fontsize: "15px",
  fontweight: "10px",
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
const table_creditSentTab2_theme = {
  height: "80px",
  align: "center",
  description: `${state.result.hash6?.data[0]?.source_account || "0"}`,
  brand: `Devs`,
  fontsize: "15px",
  fontweight: "10px",
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
const table_creditReceived_theme = {
  height: "80px",
  align: "left",
  description: "",
  brand: "Used ",
  fontsize: "25px",
  fontweight: "25px",
  afterbrand: "Imports",
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
const table_creditReceivedTab1_theme = {
  height: "80px",
  align: "center",
  description: `${state.result.hash7?.data[0]?.destination_widget || "0"}`,
  brand: `widgets`,
  fontsize: "15px",
  fontweight: "10px",
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
const table_creditReceivedTab2_theme = {
  height: "80px",
  align: "center",
  description: `${state.result.hash7?.data[0]?.source_account || "0"}`,
  brand: `Devs`,
  fontsize: "15px",
  fontweight: "10px",
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
//----------------------------------------------------------------------------------
const queryHashes = [
  { id: "0", hash: "5fcb3937-cb3c-440c-896f-3ce6748fceff" }, // table_starReceived_theme
  { id: "1", hash: "87d193b0-5cd4-4d6d-ab2d-6ace1016d611" }, // table_starSent_theme
  { id: "2", hash: "6e049a37-5a2b-4828-88bb-616ab9477c21" }, // table_componentList_theme
  { id: "3", hash: "a113783a-564f-41b1-8384-3782db3ea43c" }, // table_creditReceived_theme
  { id: "4", hash: "7400ea51-97ba-4773-b125-6c77a6933f35" }, // table_creditSent_theme
  { id: "5", hash: "122b23ee-f084-4d88-b4b7-359b222390da" }, // ( Star: 50 | UnStar: 45 )
  { id: "6", hash: "f4e1ed6d-6c3c-46d8-83b9-cea408143e99" }, // Credit Sent
  { id: "7", hash: "374c971f-b1cb-453a-ae6f-92ddfe5eaa8b" }, // Credit Received
];

State.init({
  result: {},
  singer: "",
  data: null,
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

const runQueries = () => {
  queryHashes.forEach(({ hash, id }) => {
    if (state.result["hash" + id]?.isDone) return;
    const result = fetchData(hash);
    if (result.isLoading) {
      State.update({
        isLoading: true,
        result: { ...state.result, ["hash" + id]: { loading: true } },
      });
    }
    if (result.error) {
      const errors = state.error;
      errors.push(`query ${id} : "${result.error}"`);
      State.update({
        error: errors,
        result: {
          ...state.result,
          ["hash" + id]: {
            loading: false,
            error: true,
            data: null,
            isDone: true,
          },
        },
      });
    }

    if (result.data) {
      const filteredData = result.data.filter(
        (row) => row.SINGER === state.data
      );
      State.update({
        result: {
          ...state.result,
          ["hash" + id]: {
            loading: false,
            error: false,
            data: filteredData,
            isDone: true,
          },
        },
      });
    }
  });
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
  State.update({ data: state.singer, result: {}, isLoading: true });
  runQueries();
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
const isAllDataLoaded = () => {
  const resultArr = Object.entries(state.result);

  if (resultArr.length === 0) return false;
  return resultArr.every((query) => {
    return !query[1].loading;
  });
};
if (isAllDataLoaded()) {
  State.update({ isLoading: false });
}
if (state.isLoading) {
  runQueries();
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
  color: ${themeColor?.search_sbt?.input_text_color};
  background-color: ${themeColor?.search_sbt?.input_bg};
  border: 1px solid ${themeColor?.search_sbt?.input_border};
  &:focus {
    background-color: ${themeColor?.search_sbt?.input_bg};
    color: ${themeColor?.search_sbt?.input_text_color};
    border: 1px solid ${themeColor?.search_sbt?.input_border};
  }
  &:hover {
    background-color: ${themeColor?.search_sbt?.input_bg_hover};
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
  <div className="py-4 ">
    <div style={{ backgroundColor: themeColor.sbt_area?.section_bg }}>
      <Widget
        src="mob.near/widget/ProfileLarge"
        props={{
          accountId: state.data,
          themeColor: {
            profile_large: themeColor.profile_large,
          },
        }}
      />
    </div>
  </div>
);

let secondSection = (
  <div className="mb-4">
    <div
      style={{ background: themeColor?.sbt_area?.section_bg }}
      className="rounded-2"
    >
      <Widget
        className="w-100"
        src="lord1.near/widget/header-dynamic"
        props={developer_activity_theme}
      />
      <div className="w-100 mx-auto shadow-sm rounded-4  p-2 mb-2">
        <Widget
          src="lord1.near/widget/component-tab"
          props={{
            singer: state.data,
            backgroundColor: themeColor?.tab_sbt?.backgroundColor || "#d2cafa",
            textColor: themeColor?.tab_sbt?.textColor || "#fff",
            headerColor: themeColor?.tab_sbt?.headerColor || "#806ce1",
            numberColor: themeColor?.tab_sbt?.numberColor || "#fff",
            numberintextColor:
              themeColor?.tab_sbt?.numberintextColor || "#806ce1",
            dark: themeColor?.tab_sbt?.dark || "dark",
          }}
        />
      </div>
    </div>

    <div>
      <div className="row">
        <div className=" col-lg-8">
          <div
            style={{ background: themeColor?.sbt_area?.section_bg }}
            className="rounded-2 pb-1"
          >
            <Widget
              src="lord1.near/widget/header-dynamic"
              props={table_componentList_theme}
            />
            <div
              style={{ background: themeColor?.sbt_area?.card_bg }}
              className=" m-2 shadow-sm rounded-4 overflow-auto p-1"
            >
              {state.result["hash" + 2]?.data?.length > 0 ? (
                <Widget
                  src="lord1.near/widget/table-pagination"
                  props={{
                    themeColor: {
                      table_pagination: themeColor.table_pagination,
                    },
                    data: state.result["hash" + 2].data,
                    rowsCount: "16",
                    columns: [
                      {
                        title: "Component Name",
                        key: "widget",
                      },
                      {
                        title: "Total Tnxs",
                        key: "total_trxs",
                        description:
                          "Total number of BOS development transactions for each component",
                      },

                      {
                        title: "Update Tnxs",
                        key: "update",
                        description:
                          "The number of transactions resulting in component updates",
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
                        beforehref: `https://bos.flipsidecrypto.xyz/${state.data}/widget/`,
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
        <div className="col-lg-4">
          <div className="row">
            <div className="col-md col-lg-12">
              <div
                style={{ background: themeColor?.sbt_area?.section_bg }}
                className="rounded-2 pb-1"
              >
                <Widget
                  src="lord1.near/widget/header-dynamic"
                  props={table_starSent_theme}
                />

                <div
                  style={{ background: themeColor?.sbt_area?.card_bg }}
                  className="m-2 shadow-sm rounded-4 overflow-auto"
                >
                  {state.result["hash" + 1]?.data?.length > 0 ? (
                    <Widget
                      src="lord1.near/widget/table-pagination"
                      props={{
                        themeColor: {
                          table_pagination: themeColor.table_pagination,
                        },
                        data: state.result["hash" + 1].data,
                        rowsCount: "5",
                        columns: [
                          {
                            title: "Sender",
                            key: "SINGER",
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
            <div className="col-md col-lg-12">
              <div
                style={{ background: themeColor?.sbt_area?.section_bg }}
                className="rounded-2 pb-1"
              >
                <Widget
                  src="lord1.near/widget/header-dynamic"
                  props={table_starReceived_theme}
                />
                <div
                  style={{ background: themeColor?.sbt_area?.card_bg }}
                  className="m-2 shadow-sm rounded-4 overflow-auto"
                >
                  {state.result["hash" + 0]?.data?.length > 0 ? (
                    <Widget
                      src="lord1.near/widget/table-pagination"
                      props={{
                        themeColor: {
                          table_pagination: themeColor.table_pagination,
                        },
                        data: state.result["hash" + 0].data,
                        rowsCount: "5",
                        columns: [
                          {
                            title: "Sender",
                            key: "singers",
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
                            title: "Receiver",
                            key: "SINGER",
                            link: "yes",
                            beforehref:
                              "https://near.social/mob.near/widget/ProfilePage?accountId=",
                            hyperlink: "yes",
                          },
                          {
                            title: "Widget",
                            key: "widget",
                            link: "yes",
                            beforehref: `https://bos.flipsidecrypto.xyz/${state.data}/widget/`,
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
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-6">
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>
                    <div>
                      The number of imports executed from other people's
                      widgets. For example, you import widgets from other
                      developers to use in your own widget.
                    </div>
                  </Tooltip>
                }
              >
                <div>
                  <Widget
                    src="lord1.near/widget/header-dynamic"
                    props={table_creditSent_theme}
                  />{" "}
                </div>
              </OverlayTrigger>
            </div>
            <div className="col-md-3">
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>
                    <div>
                      The number of non-personal widgets that you import to use
                      in your own widgets.
                    </div>
                    <div>Personal widget imports are not considered.</div>
                  </Tooltip>
                }
              >
                <div>
                  <Widget
                    src="lord1.near/widget/header-dynamic"
                    props={table_creditSentTab1_theme}
                  />{" "}
                </div>
              </OverlayTrigger>
            </div>{" "}
            <div className="col-md-3">
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>
                    <div>
                      The number of developers whose widgets you have imported
                      to use in your own widgets.
                    </div>
                  </Tooltip>
                }
              >
                <div>
                  <Widget
                    src="lord1.near/widget/header-dynamic"
                    props={table_creditSentTab2_theme}
                  />{" "}
                </div>
              </OverlayTrigger>
            </div>{" "}
          </div>
          <div
            style={{ background: themeColor?.sbt_area?.card_bg }}
            className="m-1 shadow-sm rounded-4 overflow-auto"
          >
            {state.result["hash" + 4]?.data?.length > 0 ? (
              <Widget
                src="lord1.near/widget/table-pagination"
                props={{
                  themeColor: {
                    table_pagination: themeColor.table_pagination,
                  },
                  data: state.result["hash" + 4].data,
                  rowsCount: "5",
                  columns: [
                    {
                      title: "Your' widget",
                      key: "destination_widget",
                      link: "yes",
                      beforehref: `https://bos.flipsidecrypto.xyz/${state.data}/widget/`,
                      hyperlink: "yes",
                      description:
                        "the widget (of yours) in which other developers' widgets are imported there",
                    },
                    {
                      title: "Developer' widget",
                      key: "source_widget",
                      description:
                        "The widget that is imported into your widget",
                    },

                    {
                      title: "Developer",
                      key: "source_account",
                      link: "yes",
                      beforehref: `https://near.social/mob.near/widget/ProfilePage?accountId=`,
                      hyperlink: "yes",
                      description:
                        "the developer who you have used their widget",
                    },
                  ],
                }}
              />
            ) : (
              noData
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-6">
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>
                    <div>
                      The widgets (your widgets) that other developers import to
                      use in their widgets.
                    </div>
                  </Tooltip>
                }
              >
                <div>
                  <Widget
                    src="lord1.near/widget/header-dynamic"
                    props={table_creditReceived_theme}
                  />{" "}
                </div>
              </OverlayTrigger>
            </div>
            <div className="col-md-3">
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>
                    <div>
                      The number of widgets (your widgets) that other developers
                      import to use in their widgets.
                    </div>
                  </Tooltip>
                }
              >
                <div>
                  <Widget
                    src="lord1.near/widget/header-dynamic"
                    props={table_creditReceivedTab1_theme}
                  />{" "}
                </div>
              </OverlayTrigger>
            </div>{" "}
            <div className="col-md-3">
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>
                    <div>
                      How many developers have imported your widgets to use in
                      their own widgets?
                    </div>
                  </Tooltip>
                }
              >
                <div>
                  <Widget
                    src="lord1.near/widget/header-dynamic"
                    props={table_creditReceivedTab2_theme}
                  />{" "}
                </div>
              </OverlayTrigger>
            </div>{" "}
          </div>
          <div
            style={{ background: themeColor?.sbt_area?.card_bg }}
            className="m-1 shadow-sm rounded-4 overflow-auto"
          >
            {state.result["hash" + 3]?.data?.length > 0 ? (
              <Widget
                src="lord1.near/widget/table-pagination"
                props={{
                  themeColor: {
                    table_pagination: themeColor.table_pagination,
                  },
                  data: state.result["hash" + 3].data,
                  rowsCount: "5",
                  columns: [
                    {
                      title: "Your widget",
                      key: "source_widget",
                      link: "yes",
                      beforehref: `https://bos.flipsidecrypto.xyz/${state.data}/widget/`,
                      hyperlink: "yes",
                      description:
                        "the widgets from you that are imported into other people's widgets.",
                    },
                    {
                      title: "Developer' widget",
                      key: "destination_widget",
                      description:
                        "the widgets in which your widgets are imported",
                    },

                    {
                      title: "Developer",
                      key: "source_account",
                      link: "yes",
                      beforehref: `https://near.social/mob.near/widget/ProfilePage?accountId=`,
                      hyperlink: "yes",
                      description:
                        "The developers who have imported your widget into their own widgets",
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
console.log("theme", themeColor);
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
      className={`h-100 `}
    >
      {!state.isLoading && state.data && (
        <div
          style={{ backgroundColor: themeColor?.search_sbt?.table_bg }}
          className=""
        >
          {firstSection}
          {secondSection}

          {thirdSection}
          <div style={{ width: "100%", height: "20px" }}></div>

          <Widget
            src="lord1.near/widget/component-chart1"
            props={{
              singer: state.data,
              themeColor: themeColor,
            }}
          />
        </div>
      )}
    </div>
  </div>
);
