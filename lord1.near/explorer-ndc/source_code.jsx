const themeColor = props.themeColor;
const generaltheme = {
  height: "110px",
  align: "center",
  description: "Explore the status of your NDC activity.",
  brand: "NDC Explorer",
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

const firsttheme = {
  height: "110px",
  align: "center",
  description: `Track the activity of (${state.singer}) in NDC process`,
  brand: "NDC Scan",
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
const commenttheme = {
  height: "90px",
  align: "center",
  description: "",
  brand: "Comment",
  fontsize: "75",
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
const thirdtheme = {
  height: "90px",
  align: "center",
  description: "",
  brand: "Nomination",
  fontsize: "50",
  fontweight: "25px",
  afterbrand: "Staus",
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
const fifththeme = {
  height: "80px",
  align: "left",
  description: `How many votes did (${state.singer}) receive from other`,
  brand: "",
  fontsize: "30",
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
const sixththeme = {
  height: "80px",
  align: "left",
  description: `How many votes have (${state.singer}) cast for other candidates as a voter`,
  brand: "",
  fontsize: "75",
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
const sevenththeme = {
  height: "80px",
  align: "center",
  description: `Compilation of individuals who have left comments for (${state.singer})`,
  brand: "",
  fontsize: "75",
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
const eighttheme = {
  height: "80px",
  align: "center",
  description: `How many comments have (${state.singer}) left for other candidates as a commentator`,
  brand: "",
  fontsize: "75",
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
//----------------------------------------------------------------------------------
const queryHashes = [
  { id: 1, hash: "a75b60b8-49b0-48f5-a3a1-d3f3cc96b132" },
  { id: 2, hash: "a331ed99-2a7e-4d59-91c9-67c871359b28" },
  { id: 3, hash: "98c8ae5f-30be-4fd7-accb-afc2a8d4733f" },
  { id: 4, hash: "a86c2445-382b-446c-a726-9913224a51b9" },
  { id: 5, hash: "ce4cf0bc-4bd0-4805-b4a8-0824d672a177" },
  { id: 6, hash: "9953720b-a659-4209-880d-e2748f821a30" },
  { id: 7, hash: "1939ea72-42be-4124-ab0a-a553434cbdbf" },
  { id: 8, hash: "9855982e-4730-4fc5-b5a2-55a422f7fe6f" },
];

State.init({
  singer: "",
  data: null,
  filteredData: [],
  secondfilteredData: [],
  thirdfilteredData: [],
  fourthfilteredData: [],
  fifthfilteredData: [],
  sixthfilteredData: [],
  seventhfilteredData: [],
  eightfilteredData: [],

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
  //-----------------------------------------------
  const secondresult = fetchData(queryHashes[1].hash);
  if (secondresult.isLoading) {
    State.update({ isLoading: true, secondfilterData: [] });
  }
  if (secondresult.error) {
    const errors = state.error;
    errors.push(`error message is : "${secondresult.error}"`);
    State.update({ error: errors, isLoading: false });
  }
  if (secondresult.data) {
    const secondfilteredData = secondfilterData(secondresult.data);

    State.update({ data: state.singer, secondfilteredData, isLoading: false });
  }
  //-----------------------------------------------
  const thirdresult = fetchData(queryHashes[2].hash);
  if (thirdresult.isLoading) {
    State.update({ isLoading: true, thirdfilterData: [] });
  }
  if (thirdresult.error) {
    const errors = state.error;
    errors.push(`error message is : "${thirdresult.error}"`);
    State.update({ error: errors, isLoading: false });
  }
  if (thirdresult.data) {
    const thirdfilteredData = thirdfilterData(thirdresult.data);

    State.update({ data: state.singer, thirdfilteredData, isLoading: false });
  }
  //--------------------------------------------------------------------------
  const fourthresult = fetchData(queryHashes[3].hash);
  if (fourthresult.isLoading) {
    State.update({ isLoading: true, fourthfilterData: [] });
  }
  if (fourthresult.error) {
    const errors = state.error;
    errors.push(`error message is : "${fourthresult.error}"`);
    State.update({ error: errors, isLoading: false });
  }
  if (fourthresult.data) {
    const fourthfilteredData = fourthfilterData(fourthresult.data);

    State.update({ data: state.singer, fourthfilteredData, isLoading: false });
  }
  //--------------------------------------------------------------------------
  const fifthresult = fetchData(queryHashes[4].hash);
  if (fifthresult.isLoading) {
    State.update({ isLoading: true, fifthfilterData: [] });
  }
  if (fifthresult.error) {
    const errors = state.error;
    errors.push(`error message is : "${fifthresult.error}"`);
    State.update({ error: errors, isLoading: false });
  }
  if (fifthresult.data) {
    const fifthfilteredData = fifthfilterData(fifthresult.data);

    State.update({ data: state.singer, fifthfilteredData, isLoading: false });
  }
  //--------------------------------------------------------------------------
  const sixthresult = fetchData(queryHashes[5].hash);
  if (sixthresult.isLoading) {
    State.update({ isLoading: true, sixthfilterData: [] });
  }
  if (sixthresult.error) {
    const errors = state.error;
    errors.push(`error message is : "${sixthresult.error}"`);
    State.update({ error: errors, isLoading: false });
  }
  if (sixthresult.data) {
    const sixthfilteredData = sixthfilterData(sixthresult.data);

    State.update({ data: state.singer, sixthfilteredData, isLoading: false });
  }
  //--------------------------------------------------------------------------
  const seventhresult = fetchData(queryHashes[6].hash);
  if (seventhresult.isLoading) {
    State.update({ isLoading: true, seventhfilterData: [] });
  }
  if (seventhresult.error) {
    const errors = state.error;
    errors.push(`error message is : "${seventhresult.error}"`);
    State.update({ error: errors, isLoading: false });
  }
  if (seventhresult.data) {
    const seventhfilteredData = seventhfilterData(seventhresult.data);

    State.update({ data: state.singer, seventhfilteredData, isLoading: false });
  }
  //--------------------------------------------------------------------------
  const eightresult = fetchData(queryHashes[7].hash);
  if (eightresult.isLoading) {
    State.update({ isLoading: true, eightfilterData: [] });
  }
  if (eightresult.error) {
    const errors = state.error;
    errors.push(`error message is : "${eightresult.error}"`);
    State.update({ error: errors, isLoading: false });
  }
  if (eightresult.data) {
    const eightfilteredData = eightfilterData(eightresult.data);

    State.update({ data: state.singer, eightfilteredData, isLoading: false });
  }
};
//------------------------------------------------------------------------------------------------
//1
const filterData = (data) => {
  return data.filter((row) => row.SINGER === state.singer);
};

//------------------------------------------------------------------------------------------------
//2
const secondfilterData = (data) => {
  return data.filter((row) => row.SINGER === state.singer);
};

//----------------------------------------------------------------------------------------------
//3
const thirdfilterData = (data) => {
  return data.filter((row) => row.SINGER === state.singer);
};
//------------------------------------------------------------------------------------------------
//4
const fourthfilterData = (data) => {
  return data.filter((row) => row.SINGER === state.singer);
};
//------------------------------------------------------------------------------------------------
//5
const fifthfilterData = (data) => {
  return data.filter((row) => row.SINGER === state.singer);
};
//------------------------------------------------------------------------------------------------

//6
const sixthfilterData = (data) => {
  return data.filter((row) => row.SINGER === state.singer);
};
//------------------------------------------------------------------------------------------------
//7
const seventhfilterData = (data) => {
  return data.filter((row) => row.SINGER === state.singer);
};
//------------------------------------------------------------------------------------------------
//7
const eightfilterData = (data) => {
  return data.filter((row) => row.SINGER === state.singer);
};
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
let fifth = (
  <div className="row w-100 py-4 g-4">
    <div className=" col-12 col-md-12">
      <Widget
        src="mob.near/widget/ProfileLarge"
        props={{ accountId: state.singer }}
      />
    </div>
  </div>
);
let fourth = (
  <div className=" col-12 col-md-12">
    <span className=" col-12 col-md-4">
      <div
        style={{ background: themeColor?.sbt_area?.card_bg }}
        className="w-100 mx-auto shadow-sm rounded-4"
      >
        <h6
          style={{ color: themeColor?.sbt_area?.card_title_color }}
          className="pt-4 ps-4"
        >
          <i>Activity of ({state.singer})</i>
        </h6>
        <Widget
          src="lord1.near/widget/Pie-chart"
          props={getPieProps(
            state.secondfilteredData,
            ["function", "total"],
            themeColor.chartColor,
            {
              title: "",
              type: "pie",
              connector: true,
              legend: true,
            }
          )}
        />
      </div>
    </span>
    <span className=" col-12 col-md-8">
      <div
        style={{ background: themeColor?.sbt_area?.card_bg }}
        className="shadow-sm rounded-2"
      >
        <Widget
          src="lord1.near/widget/mix-chart"
          props={getMixProps(
            state.fourthfilteredData,
            "timestamp",
            [
              {
                key: "upvote",
                seriesName: "upvote",
                type: "column",
                id: 1,
              },
              {
                key: "nominatation",
                seriesName: "nominatation",
                type: "column",
                id: 1,
              },
              {
                key: "comment",
                seriesName: "comment",
                type: "column",
                id: 1,
              },
              {
                key: "new",
                seriesName: "new",
                type: "column",
                id: 1,
              },
              {
                key: "remove comment",
                seriesName: "remove comment",
                type: "column",
                id: 1,
              },
              {
                key: "update end time",
                seriesName: "update end time",
                type: "column",
                id: 1,
              },
              {
                key: "remove upvote",
                seriesName: "remove upvote",
                type: "column",
                id: 1,
              },
              {
                key: "self revoke",
                seriesName: "self revoke",
                type: "column",
                id: 1,
              },
              {
                key: "total",
                seriesName: "total",
                type: "spline",
                id: 2,
              },
              {
                key: "trxs",
                seriesName: "trxs",
                type: "spline",
                id: 1,
              },
            ],
            themeColor.chartColor,
            {
              title: "Daily NDC Activity",
              subtitle: `Number of daily transactions for (${state.singer})`,
              stacking: "normal",
            }
          )}
        />
      </div>
    </span>{" "}
  </div>
);
let third = (
  <div
    style={{ background: themeColor?.sbt_area?.card_bg }}
    className="shadow-sm rounded-2 overflow-auto"
  >
    <Widget src="lord1.near/widget/header-dynamic" props={thirdtheme} />

    <Widget
      src="lord1.near/widget/table-pagination"
      props={{
        themeColor: { table_pagination: themeColor.table_pagination },
        data: state.thirdfilteredData,
        rowsCount: "",
        columns: [
          {
            title: "Timestamp",
            key: "timestamp",
            description: "Nomination Timestamp",
          },
          {
            title: "Nominee",
            key: "SINGER",
            link: "yes",
            beforehref:
              "https://near.social/mob.near/widget/ProfilePage?accountId=",
            afterhref: "",
            hyperlink: "yes",
          },

          { title: "House", key: "house" },
          {
            title: "Revoked",
            key: "is_revoked",
            colors: "#806ce1",
          },
        ],
      }}
    />
    <div className="row w-100 py-4 g-4">
      <div className=" col-12 col-md-6">
        <div
          style={{ background: themeColor?.sbt_area?.card_bg }}
          className="w-100 mx-auto shadow-sm rounded-4"
        >
          {" "}
          <Widget src="lord1.near/widget/header-dynamic" props={fifththeme} />
          <Widget
            src="lord1.near/widget/table-pagination"
            props={{
              themeColor: { table_pagination: themeColor.table_pagination },
              data: state.fifthfilteredData,
              rowsCount: "5",
              columns: [
                {
                  title: "Voter",
                  key: "voter",
                  link: "yes",
                  beforehref:
                    "https://near.social/mob.near/widget/ProfilePage?accountId=",
                  afterhref: "",
                  hyperlink: "yes",
                },
                {
                  title: "Number",
                  key: "number",
                  description: "Number of Votes",
                },
                {
                  title: "Action",
                  key: "title",
                },
              ],
            }}
          />{" "}
        </div>
      </div>
      <div className=" col-12 col-md-6">
        <div
          style={{ background: themeColor?.sbt_area?.card_bg }}
          className="w-100 mx-auto shadow-sm rounded-4"
        >
          {" "}
          <Widget src="lord1.near/widget/header-dynamic" props={sixththeme} />
          <Widget
            src="lord1.near/widget/table-pagination"
            props={{
              themeColor: { table_pagination: themeColor.table_pagination },
              data: state.sixthfilteredData,
              rowsCount: "5",
              columns: [
                {
                  title: "Candidate",
                  key: "candidate",
                  link: "yes",
                  beforehref:
                    "https://near.social/mob.near/widget/ProfilePage?accountId=",
                  hyperlink: "yes",
                },
                {
                  title: "Number",
                  key: "number",
                  description: "Number of votes ",
                },
                {
                  title: "Action",
                  key: "title",
                },
              ],
            }}
          />{" "}
        </div>
      </div>
    </div>
    <div className="row w-100 py-4 g-4">
      <div className=" col-12 col-md-6">
        <div
          style={{ background: themeColor?.sbt_area?.card_bg }}
          className="w-100 mx-auto shadow-sm rounded-4"
        >
          {" "}
          <Widget src="lord1.near/widget/header-dynamic" props={sevenththeme} />
          <Widget
            src="lord1.near/widget/table-pagination"
            props={{
              themeColor: { table_pagination: themeColor.table_pagination },
              data: state.seventhfilteredData,
              rowsCount: "5",
              columns: [
                {
                  title: "Commentator",
                  key: "voter",
                  description: "voter ",
                  link: "yes",
                  beforehref:
                    "https://near.social/mob.near/widget/ProfilePage?accountId=",
                  hyperlink: "yes",
                },
                {
                  title: "Number",
                  key: "number",
                  description: "Number of comments ",
                },
                {
                  title: "Action",
                  key: "title",
                },
              ],
            }}
          />{" "}
        </div>
      </div>
      <div className=" col-12 col-md-6">
        <div
          style={{ background: themeColor?.sbt_area?.card_bg }}
          className="w-100 mx-auto shadow-sm rounded-4"
        >
          {" "}
          <Widget src="lord1.near/widget/header-dynamic" props={eighttheme} />
          <Widget
            src="lord1.near/widget/table-pagination"
            props={{
              themeColor: { table_pagination: themeColor.table_pagination },
              data: state.eightfilteredData,
              rowsCount: "5",
              columns: [
                {
                  title: "Commentator",
                  key: "voter",
                  link: "yes",
                  beforehref:
                    "https://near.social/mob.near/widget/ProfilePage?accountId=",
                  afterhref: "",
                  hyperlink: "yes",
                },
                {
                  title: "Number",
                  key: "number",
                  description: "Number of comments ",
                },
                {
                  title: "Action",
                  key: "title",
                },
              ],
            }}
          />{" "}
        </div>
      </div>
    </div>
  </div>
);

let second = (
  <div
    style={{ background: themeColor?.sbt_area?.card_bg }}
    className="shadow-sm rounded-2 overflow-auto"
  >
    <Widget src="lord1.near/widget/header-dynamic" props={firsttheme} />
    <Widget
      src="lord1.near/widget/table-pagination"
      props={{
        themeColor: { table_pagination: themeColor.table_pagination },
        data: state.secondfilteredData,
        rowsCount: 10,
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
            link: "yes",
            beforehref:
              "https://near.social/mob.near/widget/ProfilePage?accountId=",
            hyperlink: "yes",
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
      }}
    />
  </div>
);

let first = (
  <div
    style={{ background: themeColor?.sbt_area?.card_bg }}
    className="shadow-sm rounded-2 overflow-auto"
  >
    <Widget src="lord1.near/widget/header-dynamic" props={commenttheme} />
    <Widget
      src="lord1.near/widget/table-pagination"
      props={{
        themeColor: { table_pagination: themeColor.table_pagination },
        data: state.filteredData,
        rowsCount: 10,
        columns: [
          {
            title: "ID",
            key: "id",
            description: "Comment Id",
            colors: "#806ce1",
          },

          { title: "Timestamp", key: "date" },
          {
            title: "Signer",
            key: "SINGER",
            link: "yes",
            beforehref:
              "https://near.social/mob.near/widget/ProfilePage?accountId=",
            hyperlink: "yes",
          },
          { title: "Deleted ", key: "status" },
          {
            title: "Target",
            key: "candidate",
            link: "yes",
            beforehref:
              "https://near.social/mob.near/widget/ProfilePage?accountId=",
            hyperlink: "yes",
          },
          {
            title: "Comment text",
            key: "comment",
            explain: "yes",
          },

          {
            title: "Hash",
            key: "tx_hash",
            link: "yes",
            beforehref: "https://nearblocks.io/txns/",
            afterhref: "",
          },
        ],
      }}
    />
  </div>
);

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
      style={{ background: themeColor?.search_sbt?.section_bg }}
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
          {fifth}
          {third}
          {fourth}
          {second}
          {first}
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
