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
    background:
      "radial-gradient(circle, rgb(49,62,89) 0%, rgba(230,230,231,0.01) 0%, rgb(49,62,89) 100%, rgb(49,62,89) 100%, rgb(49,62,89) 100%, rgba(46,52,90,1) 100%);",
  },
  card: {
    card_bg: "rgb(49,62,89)",
    tabSelect_bg: "#192132",
    tabSelect_text_color: "#fff",
    tabSelect_input_bg: "rgb(49,62,89)",
    tabSelect_btn_active_bg: "rgb(49,62,89)",
    text_color: "rgba(255,255,255,1)",
  },
  form: {
    placeholdercolor: "rgb(210, 202, 250)",
    inputbackgroundcolor: "#394869",
    inputcolor: "rgb(210, 202, 250)",
    labelcolor: "#789efb",
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
const lightColors = {
  page_bg: "rgb(241,242,245)",
  horizen_bg: "#391b86",
  header_bg: "rgb(210, 202, 250)",
  sideBar: {
    sideBar_bg: "rgb(210, 202, 250)",
    sideBar_color: "#fff",
  },
  form: {
    placeholdercolor: "",
    inputbackgroundcolor: "#d2cafa",
    inputcolor: "",
    labelcolor: "#789efb",
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
  card: {
    card_bg: "rgb(255, 255, 255)",
    tabSelect_bg: "#e6e6e7",
    tabSelect_text_color: "#000",
    tabSelect_input_bg: "rgb(210, 202, 250)",
    tabSelect_btn_active_bg: "rgb(210, 202, 250)",
    text_color: "rgba(0,0,0,1)",
  },
  sbt_area: {
    section_bg: "rgb(235, 231, 253)",
    card_bg: "rgb(235, 231, 253)",
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

State.init({
  value: "acceleration",
  light: true,
  tab: "growth",
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
  growth: "growth",
  member: "member",
  donation: "donation",
};

const setTab = (tab) => State.update({ tab });

let buttonbar = (
  <Container>
    <ul className="tabContent">
      <li className="tab-item">
        <button
          className={`${state.tab === Tab.growth ? "active" : ""}`}
          aria-current="page"
          onClick={() => setTab(Tab.growth)}
        >
          Join Forefront Community
        </button>
      </li>
      <li className="tab-item">
        <button
          className={`${state.tab === Tab.member ? "active" : ""}`}
          aria-current="page"
          onClick={() => setTab(Tab.member)}
        >
          Community members
        </button>
      </li>
      <li className="tab-item">
        <button
          className={`${state.tab === Tab.donation ? "active" : ""}`}
          aria-current="page"
          onClick={() => setTab(Tab.donation)}
        >
          Donate to Forefront
        </button>
      </li>
    </ul>
  </Container>
);

return (
  <div
    className="d-flex"
    style={{
      background: themeColor?.page_bg,
    }}
  >
    <Widget
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
        activeIcon: "Discover",
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
      <div className="d-flex justify-content-center">{buttonbar}</div>

      <div style={{ width: "100%", height: "45px" }}></div>

      <div>
        <div className="content">
          {state.tab === "growth" && (
            <Widget
              src="forefront_tak.near/widget/Forefront.Widget.Community.Form"
              props={{ themeColor: themeColor }}
            />
          )}
          {state.tab === "member" && (
            <Widget
              src="forefront_tak.near/widget/Forefront.Widget.Community.Members"
              props={{ themeColor: themeColor }}
            />
          )}
          {state.tab === "donation" && (
            <Widget
              src="forefront_tak.near/widget/Forefront.Widget.Community.Donation"
              props={{ themeColor: themeColor }}
            />
          )}
        </div>
      </div>
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
