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
    background:
      "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(210,202,250,0.01) 0%, rgba(210,202,250,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
  },
  card: {
    card_bg: "rgb(255, 255, 255)",
    tabSelect_bg: "#e6e6e7",
    tabSelect_text_color: "#000",
    tabSelect_input_bg: "rgb(210, 202, 250)",
    tabSelect_btn_active_bg: "rgb(210, 202, 250)",
    text_color: "rgba(0,0,0,1)",
  },
};

State.init({
  value: "acceleration",
  light: true,
  tab: "trending",
});
const themeColor = state.light ? lightColors : darkColors;
const handelLight = () => {
  const isLight = state.light;
  State.update({ light: !isLight });
};

const main = {};
const linkStyle = {
  "text-decoration": "none",
  display: "inline-block",
};
const time = {
  float: "right",
  color: themeColor.card?.text_color,
};
const like = {
  "border-radius": "1000px",
  color: themeColor.card?.text_color,
};
const toptip = {
  "font-size": "15px",
  color: "#e7ad06",
  "box-shadow": "0 0px 20px rgba(36, 6, 231, 0.2)",
  "border-radius": "1000px",
  "min-width": "min-content",
  "aspect-ratio": "1",
  border: "2px outset  #e7d106",
};
const avatar = {
  "border-radius": "13px",
  border: "2px solid lightgray",
  width: "100%",
  height: "100%",
};

const screen = {
  "border-radius": "13px",
  border: "2px solid lightgray",
  width: "100%",
  height: "10%",
  minHeight: "10%",
};
const box = {
  height: "280px",
  "margin-top": "3.5%",
  float: "left",
  padding: "0.5%",
  "@media (min-width: 1000px)": {
    height: "380px",
  },
};
const innerbox = {
  "box-shadow": "0 20px 20px rgba(128, 117, 226, 0.15)",
  "font-size": "12px",
  "border-top": "1px solid  lightgray",
  "border-left": "1px solid  lightgray",
  "border-right": "1px solid  lightgray",

  height: "280px",
  padding: "2%",
  "border-radius": "13px",
  "@media (min-width: 1000px)": {
    height: "380px",
  },
};

const insidebox = {
  "font-size": "15px",
  "padding-bottom": "10px",
  "border-radius": "13px",
  width: "100%",
  "max-height": "50%",
  "margin-bottom": "10px",
};
const middlebox = {
  "font-size": "13px",
  "border-radius": "13px",
  width: "100%",
  "max-height": "35%",
  "margin-top": "10px",
  "padding-top": "2.5%",
  "padding-bottom": "0.5%",
};
const middownbox = {
  "font-size": "10px",
  color: themeColor.card?.text_color,
  "border-radius": "13px",
  width: "100%",
  height: "35px",
  "margin-top": "0.5%",
  "margin-bottom": "3%",
};
const downbox = {
  "font-size": "10px",
  width: "100%",
  "max-height": "5%",
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
  Trending: "trending",
  New: "new",
  Alltime: "greatest",
};
2;
const origTab = () =>
  image.nft.contractId || image.nft.tokenId
    ? Tab.New
    : !image.ipfs_cid && image.url
    ? Tab.Alltime
    : Tab.Trending;

const setTab = (tab) => State.update({ tab });

let buttonbar = (
  <Container>
    <ul className="tabContent">
      <li className="tab-item">
        <button
          className={`${state.tab === Tab.Trending ? "active" : ""}`}
          aria-current="page"
          onClick={() => setTab(Tab.Trending)}
        >
          Trending
        </button>
      </li>
      <li className="tab-item">
        <button
          className={`${state.tab === Tab.New ? "active" : ""}`}
          aria-current="page"
          onClick={() => setTab(Tab.New)}
        >
          New
        </button>
      </li>

      <li className="tab-item">
        <button
          className={`${state.tab === Tab.Alltime ? "active" : ""}`}
          aria-current="page"
          onClick={() => setTab(Tab.Alltime)}
        >
          Alltime
        </button>
      </li>
      <input
        className="form-input"
        placeholder="Page Number"
        type="text"
        value={state.memo}
      />
    </ul>
  </Container>
);

// page finder (number)
initState({ memo });

const dats = {
  memo: parseInt(state.memo),
};
let page;
if (!dats.memo) {
  page = 1;
} else {
  page = dats.memo;
}

let pageto = page * 12 - 12;
//  apifetch

let type = state.tab;
const data = fetch(
  `https://flipsidecrypto.xyz/api/discover/get?d_sort=${type}&d_project=near&d_page=${page}`
);

let tableRows = [];
for (let i = 0; i < data.body.dashboards.length; i++) {
  const frank = data.body.dashboards[i];

  //some avatarUrl are Null , so replace Nulls with the avatar below
  let avatarUrl;
  if (frank.avatarUrl) {
    avatarUrl = frank.avatarUrl;
  } else {
    avatarUrl = "https://s2.coinmarketcap.com/static/img/coins/64x64/6535.png";
  }
  // shorten the title that are more than 28 char
  let title;
  if (frank.title.length > 28) {
    title = frank.title.substring(0, 28) + "...";
  } else {
    title = frank.title;
  }

  // shorten the descriptions that are more than 70 char
  let description;
  if (frank.description.length > 70) {
    description = frank.description.substring(0, 70) + "...";
  } else if (frank.description.length < 1) {
    description =
      "No description found, please open the dashboard to see more information.";
  } else {
    description = frank.description;
  }

  // some screenshotUrl are Null, so replace the image below with Null
  let screenshotUrl;
  if (frank.screenshotUrl) {
    screenshotUrl = frank.screenshotUrl;
  } else {
    screenshotUrl = "https://i.postimg.cc/GtQ9pFK3/sdsdad.png";
  }

  //some usernames are long, use this part to substring the first part and last part of usernames (4 first char+...+last 4 char)
  let username;
  if (frank.username.length > 15) {
    username =
      frank.username.substring(0, 4) + "..." + frank.username.substring(38, 42);
  } else if (frank.username.length < 1) {
    username =
      "No description found, please open the dashboard to see more information.";
  } else {
    username = frank.username;
  }

  //make the Single digit to double digit (just for number < 10 )
  let number;
  if (i + pageto + 1 <= 9) {
    number = "0" + (pageto + i + 1);
  } else {
    number = pageto + i + 1;
  }

  // turn data into (month + year) format
  let date = new Date(frank.createdAt);
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
  let month = monthNames[date.getMonth()];
  let year = date.getFullYear();
  let createdAt;
  createdAt = month + " " + year;

  tableRows.push(
    <div className="col-md-6 col-lg-4">
      <div
        style={{
          boxShadow: "2px 10px 20px rgba(128, 117, 226, 0.2)",
          backgroundColor: themeColor.card?.card_bg,
        }}
        className="p-2 rounded-3"
      >
        <div className="">
          <div>
            <div className="d-flex" style={{ height: "50px" }}>
              <a
                style={linkStyle}
                href={`https://flipsidecrypto.xyz/${frank.username}`}
                target="_blank"
                className="flex-grow-1"
              >
                <span
                  style={{ width: "50px" }}
                  className="d-inline-block h-100"
                >
                  <img style={avatar} src={`${avatarUrl}`}></img>
                </span>

                {username}
              </a>
              <span
                className="d-inline-flex justify-content-center align-items-center"
                style={toptip}
              >
                {number}
              </span>
            </div>
            <div className="py-2">
              <img style={screen} src={`${screenshotUrl}`}></img>
            </div>
          </div>
        </div>
        <div>
          <div style={middlebox}>
            <a style={linkStyle} href={`${frank.url}`} target="_blank">
              {title}
            </a>
          </div>
        </div>
        <div style={middownbox}>
          <div style={discription} scope="col">
            {description}
          </div>
        </div>
        <div style={downbox} className="container">
          <div className="row">
            <div className="col-4 " style={like}>
              <i>💗 {parseInt(frank.totalLikes)}</i>
            </div>

            <div className="col-8">
              <i style={time}>{createdAt}</i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
55;
let tbl = (
  <div className="row gy-5">
    {pageNumber}
    {tableRows}
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
      src="lord1.near/widget/sidebar"
      props={{
        headerIcon:
          "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/flipsides.png",
        headerText: "Flipside",
        footerIcon:
          "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/house-solid.svg",
        footerText: "",
        headerLink: "test",
        footerLink: "test",
        links: [
          {
            text: "Home",
            link: "../../lord1.near/widget/home",
            title: "Home Page",
            image:
              "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/windows.svg",
          },
          {
            text: "Dashboards",
            title: "Dashboard",
            link: "../../lord1.near/widget/Flipside-Home-page",
            image:
              "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/users-solid.svg",
          },
          {
            text: "Contracts",
            link: "../../leslug.near/widget/NearContractVisualizerV2",
            image:
              "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/people-arrows-solid.svg",
            title: "Top NEAR projects profiler",
          },
          {
            text: "Im human",
            link: "../../lord1.near/widget/im-human",
            title: "I Am Human SBT tracker",
            image:
              "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/1309168682.svg",
          },
          {
            text: "NDC",
            link: "../../lord1.near/widget/NDC",
            title: "NDC tracker",

            image:
              "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/icons8-home.svg",
          },
          {
            text: "Election",
            link: "../../lord1.near/widget/election",
            title: "Election tracker",

            image:
              "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/svgexport-9.svg",
          },
        ],
        backgroundColor: themeColor?.sideBar?.sideBar_bg,
        textcolor: themeColor?.sideBar?.sideBar_color,

        className: "align-self-start",
        activeIcon: "Home",
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
          height: "200px",
          align: "center",
          description:
            "Access the most reliable blockchain data, for free. Discover analyses on leading protocols from expert analysts.",
          brand: "Flipside",
          fontsize: "100",
          fontweight: "25px",
          afterbrand: "Crypto",
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
          <div>{tbl}</div>
        </div>
      </div>
      <div style={{ width: "100%", height: "85px" }}></div>
      <Widget
        src="lord1.near/widget/footer"
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
