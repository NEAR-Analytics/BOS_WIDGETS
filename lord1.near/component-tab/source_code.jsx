const hash = "fe16224c-e176-4479-a40f-2e720e1b8cdf";
const themeColor = props.themeColor || {
  page_bg: "rgb(241,242,245)",
  horizen_bg: "#391b86",
  header_bg: "rgb(210, 202, 250)",
  sideBar: {
    sideBar_bg: "rgb(210, 202, 250)",
    sideBar_color: "#fff",
  },
  footer: {
    titlenelowBackground: "#806ce1",
    titleBackground: "#fff",
    fromBackground: "rgb(210, 202, 250)",
    toBackground: "rgb(210, 202, 250)",
    belowBackground: "#806ce1",
  },
  dynamic_header: {
    afterbrandcolor: "#789efb",
    color1brand: "#000",
    color2brand: "#806ce1",
    colordescription: "#806ce1",
    background:
      "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
  },
  search_sbt: {
    section_bg: "rgb(235, 231, 253)",
    card_bg: "",
    search_btn_bg: "rgb(210, 202, 250)",
    search_btn_bg_hover: "rgba(210, 202, 250,0.8)",
    search_btn_text: "rgb(0,0,0)",
    input_bg: "rgba(210, 202, 250,0.2)",
    input_bg_hover: "rgba(210, 202, 250,0.4)",
    input_text_color: "rgb(0,0,0)",
    input_border: "rgba(210, 202, 250,0.4)",
    table_bg: "transparent",
    table_color: "rgb(0,0,0)",
    table_border_color: "",
    table_accent_bg: "",
    table_striped_color: "rgb(0,0,0)",
    table_striped_bg: "",
    table_hover_color: "rgb(0,0,0)",
    table_hover_bg: "",
  },
  sbt_info: {
    section_bg: "rgb(235, 231, 253)",
    card_bg: "rgb(255, 255, 255)",
    card_title_color: "#806ce1",
    card_content_color: "#000",
  },
  tab_sbt: {
    backgroundColor: "rgb(210, 202, 250)",
    textColor: "#fff",
    headerColor: "#806ce1",
    numberColor: "#fff",
  },
  sbt_area: {
    section_bg: "rgb(235, 231, 253)",
    card_bg: "rgb(255, 255, 255)",
    card_title_color: "#806ce1",
  },
  table_pagination: {
    table_bg: "rgb(255,255,255)",
    table_color: "rgb(0,0,0)",
    table_border_color: "",
    table_accent_bg: "",
    table_striped_color: "rgb(0,0,0)",
    table_striped_bg: "",
    table_hover_color: "rgb(0,0,0)",
    table_hover_bg: "",
    btn_border: "#806ce1",
    btn_bg: "#fff",
    btn_bg_active: "rgb(235, 231, 253)",
    btn_color: "#000",
  },
  component_tab: {
    card: "red",
    text_title: "green",
    text: "yellow",
    backgroundColor: "#391b86",
  },
  chart: {
    title: "rgba(0,0,0,1)",
    subtitle: "rgba(0,0,0,0.7)",
    xAxis: "rgba(0,0,0,1)",
    yAxis: "rgba(0,0,0,1)",
    legend: "rgba(0,0,0,0.7)",
    legendHover: "rgba(0,0,0,1)",
    rangeSelector: {
      labels: "rgba(0,0,0,0.7)",
      inputColor: "rgba(0,0,0,0.5)",
      btn_bg: "rgba(0,0,0,0.3)",
      btn_color: "rgba(0,0,0,0.8)",
      btn_hover_bg: "rgba(0,0,0,0.4)",
      btn_hover_color: "rgba(0,0,0,1)",
      btn_active_bg: "rgb(235, 231, 253)",
      btn_active_color: "rgba(0,0,0,1)",
    },
  },
  spinnerColors: ["#6F61C0", "#241468"],
  chartColor: [
    "#F79BD3",
    "#A084E8",
    "#EA1179",
    "#F79BD3",
    "#A084E8",
    "#6F61C0",
    "#241468",
    "#9F0D7F",
  ],
};
const columnNamesFinall = [
  "Transactions",
  "Components",
  "History (day)",
  "Stars Received",
];

const columnImg = {
  nomination:
    "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/chart-line-solid.svg",
  transactions:
    "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/heart-solid.svg",
  fee: "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/house.svg",
  active_users:
    "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/file-contract-solid.svg",
};
State.init({
  searchedSinger: "",
  data: [],
  isLoading: true,
  error: [],
});
const checkNewSinger = () => {
  if (state.searchedSinger === props.singer) {
    return;
  } else {
    State.update({ searchedSinger: props.singer, isLoading: true });
  }
};
checkNewSinger();
const handleData = () => {
  const result = fetchData(hash);
  if (result.isLoading) {
    State.update({ isLoading: true, data: [] });
  }
  if (result.error) {
    const errors = state.error;
    errors.push(`error message is : "${result.error}"`);
    State.update({ error: errors, isLoading: false });
  }
  if (result.data) {
    const signerData = result.data.find(
      ({ singer }) => singer === state.searchedSinger
    );
    State.update({ data: signerData ? [signerData] : [], isLoading: false });
  }
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

const formatNumber = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2).replace(/\.0$/, "") + "b";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2).replace(/\.0$/, "") + "m";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2).replace(/\.0$/, "") + "k";
  }
  return num;
};

const noData = <div className="w-100 py-4 text-center">No data available</div>;

const ParentDiv = styled.div`
color:${themeColor.component_tab.text};
flex-basis:23%;
padding:1rem;
min-height:150px;
max-height:300px;
background:${themeColor.component_tab.backgroundColor};
border-radius:25px;
transition:0.3s all;
box-shadow: "0px 0px 10px -1px  #806ce1";
&:hover{
  transform:scale(1.1);
  opacity:0.9
}

@media only screen and (max-width: 770px) {
 flex-basis:50%
}
>p{font-size:15px}
`;
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
  createdAt = day + "th " + month + " " + year;
  return createdAt;
};

return (
  <div className="d-flex flex-wrap justify-content-around gap-1">
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
    {state.data.length > 0 ? (
      <>
        <ParentDiv>
          <OverlayTrigger
            key="top"
            overlay={
              <Tooltip>
                Total number of transactions that include both build and update
                transactions, and your rank in terms of the number of dev
                transactions among other developers
              </Tooltip>
            }
          >
            <div
              style={{
                display: "flex",
                flexWrap: "nowrap",
                color: themeColor.component_tab.text_title,
              }}
            >
              <img
                style={{ marginRight: "10px" }}
                width={20}
                src={columnImg.nomination}
              />
              <h5 style={{ color: props.headerColor }}>
                {columnNamesFinall[0]}
              </h5>
            </div>
          </OverlayTrigger>
          <h4 style={{ color: themeColor.component_tab.text_title }}>
            {formatNumber(state.data[0].total_trxs)}
          </h4>
          <Widget
            src={"rubycop.near/widget/NDC.StyledComponents"}
            props={{ Tag: { title: "" } }}
          />

          <p>
            <div>
              Build Transactions:
              <span style={{ color: props.numberintextColor }}>
                {formatNumber(state.data[0].build_trxs)}
              </span>
            </div>
            <div>
              Update Transactions:
              <span style={{ color: props.numberintextColor }}>
                {formatNumber(state.data[0].update_trxs)}
              </span>
            </div>
            <Widget
              src={"rubycop.near/widget/NDC.StyledComponents"}
              props={{ Tag: { title: "", className: props.dark } }}
            />
            Your Rank 👉
            <span style={{ color: props.numberintextColor }}>
              {formatNumber(state.data[0].widget_rank)}
            </span>
          </p>
        </ParentDiv>
        <ParentDiv>
          <OverlayTrigger
            key="top"
            overlay={
              <Tooltip>
                How many components have you developed, what is your rank based
                on the number of components, and are you considered an active
                developer (among the top 50 most active)
              </Tooltip>
            }
          >
            <div
              style={{
                display: "flex",
                flexWrap: "nowrap",
                color: themeColor.component_tab.text_title,
              }}
            >
              <img
                style={{ marginRight: "10px" }}
                width={20}
                src={columnImg.fee}
              />
              <h6 style={{ color: props.headerColor }}>
                {columnNamesFinall[1]}
              </h6>
            </div>
          </OverlayTrigger>

          <h4 style={{ color: themeColor.component_tab.text_title }}>
            {formatNumber(state.data[0].widget)}
          </h4>
          <Widget
            src={"rubycop.near/widget/NDC.StyledComponents"}
            props={{ Tag: { title: "", className: props.dark } }}
          />
          <p>
            <div>
              Total Components:
              <span style={{ color: props.numberintextColor }}>
                {formatNumber(state.data[0].widget)}
              </span>
            </div>
            <div>
              Active dev or not :
              <span style={{ color: props.numberintextColor }}>
                {formatNumber(state.data[0].active_or_not)}
              </span>
            </div>
            <Widget
              src={"rubycop.near/widget/NDC.StyledComponents"}
              props={{ Tag: { title: "", className: props.dark } }}
            />
            Your Rank 👉
            <span style={{ color: props.numberintextColor }}>
              {formatNumber(state.data[0].widget_rank)}
            </span>
          </p>
        </ParentDiv>
        <ParentDiv>
          <OverlayTrigger
            key="top"
            overlay={
              <Tooltip>
                When did you first start your development activity, how many
                days have you been active, and what is your rank based on your
                dev history
              </Tooltip>
            }
          >
            <div
              style={{
                display: "flex",
                flexWrap: "nowrap",
                color: themeColor.component_tab.text_title,
              }}
            >
              <img
                style={{ marginRight: "10px" }}
                width={20}
                src={columnImg.active_users}
              />
              <h6 style={{ color: props.headerColor }}>
                {columnNamesFinall[2]}
              </h6>
            </div>
          </OverlayTrigger>

          <h4 style={{ color: themeColor.component_tab.text_title }}>
            {formatNumber(state.data[0].days)}
          </h4>
          <Widget
            src={"rubycop.near/widget/NDC.StyledComponents"}
            props={{ Tag: { title: "", className: props.dark } }}
          />
          <p>
            <div>
              Active Since:
              <span style={{ color: props.numberintextColor }}>
                {onHandelDate(state.data[0].min_date)}
              </span>
            </div>
            <div>
              Active Days:
              <span style={{ color: props.numberintextColor }}>
                {formatNumber(state.data[0].active_date)}
              </span>
            </div>
            <Widget
              src={"rubycop.near/widget/NDC.StyledComponents"}
              props={{ Tag: { title: "", className: props.dark } }}
            />
            Your Rank 👉
            <span style={{ color: props.numberintextColor }}>
              {formatNumber(state.data[0].days_rank)}
            </span>
          </p>
        </ParentDiv>
        <ParentDiv>
          <OverlayTrigger
            key="top"
            overlay={
              <Tooltip>Number of stars received or sent in total</Tooltip>
            }
          >
            <div
              style={{
                display: "flex",
                flexWrap: "nowrap",
                color: themeColor.component_tab.text_title,
              }}
            >
              <img
                style={{ marginRight: "10px" }}
                width={20}
                src={columnImg.transactions}
              />
              <h6 style={{ color: props.headerColor }}>
                {columnNamesFinall[3]}
              </h6>
            </div>
          </OverlayTrigger>

          <h4 style={{ color: themeColor.component_tab.text_title }}>
            {formatNumber(state.data[0].stars_received)}
          </h4>
          <Widget
            src={"rubycop.near/widget/NDC.StyledComponents"}
            props={{ Tag: { title: "", className: props.dark } }}
          />
          <p>
            <div>
              Star Received:
              <span style={{ color: props.numberintextColor }}>
                {formatNumber(state.data[0].stars_received)}
              </span>
            </div>
            <div>
              Star Sent:
              <span style={{ color: props.numberintextColor }}>
                {formatNumber(state.data[0].stars_sent)}
              </span>
            </div>
            <Widget
              src={"rubycop.near/widget/NDC.StyledComponents"}
              props={{ Tag: { title: "", className: props.dark } }}
            />
            Your Rank 👉
            <span style={{ color: props.numberintextColor }}>
              {formatNumber(state.data[0].stars_received_rank)}
            </span>
          </p>
        </ParentDiv>
      </>
    ) : (
      noData
    )}
  </div>
);
//{
//  "backgroundColor": "#d2cafa",
//  "textColor": "#806ce1",
//  "headerColor": "#806ce1",
//  "numberColor": "#fff",
//  "numberintextColor": "#fff",
//  "dark": "dark" or ""
//}
