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
  tab: "dashboard",
});
const themeColor = state.light ? lightColors : darkColors;
const handelLight = () => {
  const isLight = state.light;
  State.update({ light: !isLight });
};

const { Feed } = VM.require("devs.near/widget/Module.Feed");
const { ButtonLink } = VM.require(
  "forfront_tak.near/widget/home-feed-ButtonLink"
);

ButtonLink || (ButtonLink = () => <></>);
Feed = Feed || (() => <></>);

const { type, hashtag } = props;
type = hashtag;
hashtag = type;

const tab = "idea";

const { Post } = VM.require("buildhub.near/widget/components");
Post = Post || (() => <></>);

function formatDate(date) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

const feeds = {
  idea: {
    label: "Idea",
    icon: "bi-lightbulb",
    name: "data",
    hashtag: "data",
    template: ``,
  },
};

const [activeFeed, setActiveFeed] = useState(tab);
const [template, setTemplate] = useState("What did you have in mind?");

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
            title: "Dashboards",
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

      {context.accountId ? (
        activeFeed !== "bookmarks" ? (
          <Widget
            src="buildhub.near/widget/Compose"
            props={{
              feed: feeds[activeFeed],
              template: feeds[activeFeed].template,
            }}
          />
        ) : (
          <Widget src="buildhub.near/widget/Bookmarks" />
        )
      ) : (
        <Widget src="buildhub.near/widget/components.login-now" props={props} />
      )}
      {activeFeed !== "bookmarks" && (
        <Feed
          index={[
            {
              action: "hashtag",
              key: feeds[activeFeed].hashtag,
              options: {
                limit: 10,
                order: "desc",
              },
              cacheOptions: {
                ignoreCache: true,
              },
            },
          ]}
          Item={(p) => (
            <Post
              accountId={p.accountId}
              blockHeight={p.blockHeight}
              noBorder={true}
            />
          )}
        />
      )}
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
