const darkColors = {
  page_bg: "rgb(25,33,50)",
  horizen_bg: "#fff",
  header_bg: "rgb(49,62,89)",
  sideBar: {
    sideBar_bg: "rgb(49,62,89)",
    sideBar_color: "#fff",
  },
  footer: {
    titlenelowBackground: "#806ce1",
    titleBackground: "#fff",
    fromBackground: "rgb(55,72,107)",
    toBackground: "rgb(55,72,107)",
    belowBackground: "rgb(210, 202, 250)",
  },
  dynamic_header: {
    afterbrandcolor: "",
    color1brand: "#fff",
    color2brand: "rgb(210, 202, 250)",
    colordescription: "rgb(210, 202, 250)",
    background: "radial-gradient(circle, #313E59 0%, #313E59 214%);",
  },

  sbt_area: {
    section_bg: "transparent",
    card_bg: "rgb(49, 62, 89)",
    card_title_color: "#806ce1",
  },
  table_pagination: {
    table_bg: "rgb(49,62,89)",
    table_color: "rgb(255,255,255)",
    table_border_color: "",
    table_accent_bg: "",
    table_striped_color: "rgb(255,255,255)",
    table_striped_bg: "",
    table_hover_color: "rgb(255,255,255)",
    table_hover_bg: "",
    btn_border: "rgb(25,33,50)",
    btn_bg: "rgb(49,62,89)",
    btn_bg_active: "rgb(25,33,50)",
    btn_color: "#fff",
    input_bg: "#2f3b54",
  },
  card: {
    tabSelect_bg: "rgb(46 58 84)",
    tabSelect_text_color: "#fff",
    tabSelect_btn_active_bg: "#192132",
  },

  chart: {
    title: "rgb(255,255,255)",
    subtitle: "rgba(255,255,255,0.7)",
    xAxis: "rgb(255,255,255)",
    yAxis: "rgb(255,255,255)",
    legend: "rgba(255,255,255,0.7)",
    legendHover: "rgb(255,255,255)",
    rangeSelector: {
      labels: "rgba(255,255,255,0.7)",
      inputColor: "rgb(255,255,255)",
      btn_bg: "rgba(25,33,50,0.3)",
      btn_color: "rgba(255,255,255,0.7)",
      btn_hover_bg: "rgba(25,33,50,0.5)",
      btn_hover_color: "rgba(255,255,255,0.8)",
      btn_active_bg: "rgba(25,33,50,0.8)",
      btn_active_color: "rgb(255,255,255)",
    },
  },
  spinnerColors: ["#6F61C0", "#241468"],
  chartColor: [
    "#F79BD3",
    "#A084E8",
    "#EA1179",
    "#6F61C0",
    "#241468",
    "#9F0D7F",
    "#D16BA5",
    "#B178A6",
    "#AA4498",
    "#882D9E",
    "#C71585",
    "#DA70D6",
    "#DB7093",
    "#9932CC",
    "#BA55D3",
    "#800080",
    "#8A2BE2",
    "#9400D3",
    "#DDA0DD",
    "#E6E6FA",
  ],
};
const lightColors = {
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
    background: "linear-gradient(62deg, #d2cafa 0%, #E0C3FC 100%);",
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
  card: {
    tabSelect_bg: "#e6e6e7",
    tabSelect_text_color: "#000",
    tabSelect_btn_active_bg: "rgb(210, 202, 250)",
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
    "#6F61C0",
    "#241468",
    "#9F0D7F",
    "#D16BA5",
    "#B178A6",
    "#AA4498",
    "#882D9E",
    "#C71585",
    "#DA70D6",
    "#DB7093",
    "#9932CC",
    "#BA55D3",
    "#800080",
    "#8A2BE2",
    "#9400D3",
    "#DDA0DD",
    "#E6E6FA",
  ],
};

State.init({
  value: "acceleration",
  light: true,
  tab: "leaderboard",
});
const themeColor = state.light ? lightColors : darkColors;
const handelLight = () => {
  const isLight = state.light;
  State.update({ light: !isLight });
};

const Container = styled.div`
  .tabContent{
    display:inline-flex;
    align-items:center;
    background: ${themeColor.card?.tabSelect_bg};
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 50px;
    padding:3px 4px;
    list-style-type:none;
    color: "red";
  }
  .tab-item .active{
    background:${themeColor.card?.tabSelect_btn_active_bg};
  }
  .tab-item button{
    background-color:transparent;
    border-radius: 50px;
    font-weight: 500;
    font-size: 14px;
    color:${themeColor.card?.tabSelect_text_color};
    height:45px;
    padding:0px 22px;
    border:none;
              

  }
  .uploadButton .btn{
    background: #052119;
    border-radius: 50px;
    font-weight: 500;
    font-size: 14px;
    color:inherit;
    border:none;

  }
  .title{
     font-weight: 500;
     font-size: 16px;
     color: inherit;
     margin-bottom:10px;

   }
   .form-input{
     display:block;
     background: ${themeColor.card?.tabSelect_input_bg};
     border: 0.5px solid rgba(255, 255, 255, 0.3);
     border-radius: 50px;
     height: 47px;
     width:100%;
     color: inherit;
     padding:0 20px
     
   }
   .form-input:focus-visible{
    outline:none;

   }
`;

const Tab = {
  leaderboard: "leaderboard",
};
const setTab = (tab) => State.update({ tab });

let buttonbar = (
  <Container>
    <ul className="tabContent">
      <li className="tab-item">
        <button
          className={`${state.tab === Tab.leaderboard ? "active" : ""}`}
          aria-current="page"
          onClick={() => setTab(Tab.leaderboard)}
        >
          Leaderboard
        </button>
      </li>
    </ul>
  </Container>
);

const leaderboard = (
  <div
    className="w-100"
    style={{ display: state.tab === "leaderboard" ? "" : "none" }}
  >
    <Widget
      src="forefront_tak.near/widget/Forefront.Widget.Network.Leaderboard"
      props={{
        themeColor,
      }}
    />
  </div>
);

return (
  <div
    className="d-flex"
    style={{
      background: themeColor?.page_bg,
    }}
  >
    <Widget
      className="bg-primary"
      src="lord1.near/widget/sidebar"
      props={{
        headerIcon:
          "https://i.near.social/magic/large/https://near.social/magic/img/account/forefront_tak.near",
        headerText: "Forefront",
        footerIcon:
          "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/house-solid.svg",
        footerText: "",
        headerLink: "test",
        footerLink: "test",
        links: [
          {
            text: "Home",
            link: "../../forefront_tak.near/widget/Forefront.Home",
            title: "Homepage",

            image:
              "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/windows.svg",
          },
          {
            text: "Discover",
            link: "../../forefront_tak.near/widget/Forefront.Discover",
            title: "Discover",
            image:
              "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/users-solid.svg",
          },
          {
            text: "Feed",
            link: "../../forefront_tak.near/widget/Forefront.Feed",
            title: "Feed",

            image:
              "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/icons8-home.svg",
          },
        ],
        backgroundColor: `${state.light ? "#d2cafa" : "rgb(49,62,89)"}`,
        textcolor: "#fff",
        className: "align-self-start",
        activeIcon: "Platform",
      }}
    />
    <div style={{ minWidth: "80%" }} className=" flex-grow-1  px-2">
      <div
        style={{
          backgroundColor: themeColor?.header_bg,
          borderRadius: "15px",
          display: "flex",
          justifyContent: "space-between",
          padding: ".5rem",
          marginBottom: "1rem",
        }}
      >
        <div className="flex-grow-1">
          <Widget
            src="efiz.near/widget/marquee"
            props={{
              text: "Welcome to Forefront Tak",
              fontFamily: "Arial",
              fontSize: "20px",
              backgroundColor: themeColor?.header_bg,
              height: "30px",
              width: "100%",
              textColor: themeColor?.horizen_bg,
            }}
          />
        </div>
        <div
          style={{
            flexBasis: "30px",
          }}
          onClick={handelLight}
        >
          <Widget
            src="lord1.near/widget/dark-light"
            props={{
              theme: state.light ? "light" : "dark",
              variableStyles: "--toggle-size: 15px;",
            }}
          />
        </div>
      </div>

      <Widget
        src="lord1.near/widget/header-dynamic"
        props={{
          height: "150px",
          align: "center",
          description: "Explore the analytical stats of different blockchains",
          brand: "Blockchain",
          fontsize: "100",
          fontweight: "25px",
          afterbrand: "Stats",
          afterbrandcolor:
            themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
          fontbrand: " Arial, sans-serif",
          color1brand: themeColor?.dynamic_header?.color1brand || "#000",
          color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
          colordescription:
            themeColor?.dynamic_header?.colordescription || "#806ce1",
          fontsubtitle: " Arial, sans-serif",
          background:
            themeColor?.dynamic_header?.background ||
            "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
        }}
      />
      <div style={{ width: "100%", height: "45px" }}></div>

      <div>
        <div className="content">
          <div>{buttonbar}</div>
          <div>
            {tvl}
            {leaderboard}
            {retention}
          </div>
        </div>
      </div>
      <div style={{ width: "100%", height: "85px" }}></div>
      <Widget
        src="forefront_tak.near/widget/Forefront.Footer"
        props={{
          beBackground: "#fff",
          titlenelowBackground: themeColor?.footer?.titlenelowBackground,
          titleBackground: themeColor?.footer?.titleBackground,
          svgBackground: "#806ce1",
          fromBackground: themeColor?.footer?.fromBackground,
          toBackground: themeColor?.footer?.toBackground,
          belowBackground: themeColor?.footer?.belowBackground,
        }}
      />
    </div>
  </div>
);
