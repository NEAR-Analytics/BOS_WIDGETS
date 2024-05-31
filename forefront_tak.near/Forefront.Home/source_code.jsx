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
    table_striped_bg: "rgb(46 58 84)",
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
    table_striped_bg: "#e6e6e7",
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
    "#F79BD3",
    "#A084E8",
    "#6F61C0",
    "#241468",
    "#9F0D7F",
  ],
};
const queryHashes = [
  { id: 1, hash: "4037ccf7-3b5d-4fcd-811d-21e133f4adc3" }, // RECENT
  { id: 2, hash: "bdb3eb6e-6b0e-400c-b970-0591ec7d4a67" }, // PARTNERS
  { id: 3, hash: "0d29ffea-c8fa-43e2-9d0e-801fc197e339" }, // POWERED BY
  { id: 4, hash: "395306cd-87b2-4f3b-b118-51238a93a14f" }, // supported projects
];

State.init({
  value: "acceleration",
  light: true,
  //   -----
  data: [],
  isLoading: true,
  error: [],
});
const themeColor = state.light ? lightColors : darkColors;
const handelLight = () => {
  const isLight = state.light;
  State.update({ light: !isLight });
};

// -----------------------

const handleData = () => {
  const data = {};
  const errors = [];
  queryHashes.forEach(({ hash, id }) => {
    const result = fetchData(hash);
    if (result.error) errors.push(`hash${id} : ${result.error}`);
    data[`hash${id}`] = {
      ...result,
      id,
    };
  });

  if (Object.values(data).every((d) => !d.isLoading)) {
    State.update({
      data: data,
      error: [...state.error, ...errors],
      isLoading: false,
    });
  }
};

const convertData = (data) => {
  if (typeof data !== "string") {
    return data;
  }
  let converted;
  try {
    converted = JSON.parse(data);
  } catch (er) {
    converted = data;
  }
  return converted;
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
    data: (data && convertData(data.body)) || null,
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

// -------------------------

const onHandelTitle = (titleInput) => {
  let title;
  if (titleInput.length > 40) {
    return (title = titleInput.substring(0, 40) + "...");
  } else {
    return titleInput;
  }
};
const onHandelId = (id) => {
  let customId = "";
  if (id.length > 15) {
    customId += id.substring(0, 3);
    customId += "...";
    customId += id.substring(id.length - 3);
    return customId;
  } else {
    return id;
  }
};

const ThemeSwitchContainer = styled.label`

  --toggle-size: 30px;
  --container-width: 5.625em;
  --container-height: 2.5em;
  --container-radius: 6.25em;
  --container-light-bg: #3D7EAE;
  --container-night-bg: #1D1F2C;
  --circle-container-diameter: 3.375em;
  --sun-moon-diameter: 2.125em;
  --sun-bg: #ECCA2F;
  --moon-bg: #C4C9D1;
  --spot-color: #959DB1;
  --circle-container-offset: calc((var(--circle-container-diameter) - var(--container-height)) / 2 * -1);
  --stars-color: #fff;
  --clouds-color: #F3FDFF;
  --back-clouds-color: #AACADF;
  --transition: .5s cubic-bezier(0, -0.02, 0.4, 1.25);
  --circle-transition: .3s cubic-bezier(0, -0.02, 0.35, 1.17);

  position: relative;
  display: inline-block;
  font-size: var(--toggle-size);
  
  & *,
  & *::before,
  & *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: inherit;
  }

  .theme-switch__container {
    width: var(--container-width);
    height: var(--container-height);
    background-color: var(--container-light-bg);
    border-radius: var(--container-radius);
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0em -0.062em 0.062em rgba(0, 0, 0, 0.25), 0em 0.062em 0.125em rgba(255, 255, 255, 0.94);
    transition: var(--transition);
    position: relative;

    &::before {
      content: "";
      position: absolute;
      z-index: 1;
      inset: 0;
      box-shadow: 0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset, 0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset;
      border-radius: var(--container-radius);
    }
  }

  .theme-switch__checkbox {
    display: none;
  }

  .theme-switch__circle-container {
    width: var(--circle-container-diameter);
    height: var(--circle-container-diameter);
    background-color: rgba(255, 255, 255, 0.1);
    position: absolute;
    left: var(--circle-container-offset);
    top: var(--circle-container-offset);
    border-radius: var(--container-radius);
    box-shadow: inset 0 0 0 3.375em rgba(255, 255, 255, 0.1), inset 0 0 0 3.375em rgba(255, 255, 255, 0.1), 0 0 0 0.625em rgba(255, 255, 255, 0.1), 0 0 0 1.25em rgba(255, 255, 255, 0.1);
    display: flex;
    transition: var(--circle-transition);
    pointer-events: none;

    &:hover {
      left: calc(var(--circle-container-offset) + 0.187em);
    }
  }

  .theme-switch__sun-moon-container {
    pointer-events: auto;
    position: relative;
    z-index: 2;
    width: var(--sun-moon-diameter);
    height: var(--sun-moon-diameter);
    margin: auto;
    border-radius: var(--container-radius);
    background-color: var(--sun-bg);
    box-shadow: 0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset, 0em -0.062em 0.062em 0em #a1872a inset;
    filter: drop-shadow(0.062em 0.125em 0.125em rgba(0, 0, 0, 0.25)) drop-shadow(0em 0.062em 0.125em rgba(0, 0, 0, 0.25));
    overflow: hidden;
    transition: var(--transition);
  }

  .theme-switch__moon {
    transform: translateX(100%);
    width: 100%;
    height: 100%;
    background-color: var(--moon-bg);
    border-radius: inherit;
    box-shadow: 0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset, 0em -0.062em 0.062em 0em #969696 inset;
    transition: var(--transition);
    position: relative;

    .theme-switch__spot {
      position: absolute;
      top: 0.75em;
      left: 0.312em;
      width: 0.75em;
      height: 0.75em;
      border-radius: var(--container-radius);
      background-color: var(--spot-color);
      box-shadow: 0em 0.0312em 0.062em rgba(0, 0, 0, 0.25) inset;
    }

    &:nth-of-type(2) {
      width: 0.375em;
      height: 0.375em;
      top: 0.937em;
      left: 1.375em;
    }

    &:nth-last-of-type(3) {
      width: 0.25em;
      height: 0.25em;
      top: 0.312em;
      left: 0.812em;
    }
  }

  .theme-switch__clouds {
    width: 1.25em;
    height: 1.25em;
    background-color: var(--clouds-color);
    border-radius: var(--container-radius);
    position: absolute;
    bottom: -0.625em;
    left: 0.312em;
    box-shadow: 0.937em 0.312em var(--clouds-color), -0.312em -0.312em var(--back-clouds-color), 1.437em 0.375em var(--clouds-color), 0.5em -0.125em var(--back-clouds-color), 2.187em 0 var(--clouds-color), 1.25em -0.062em var(--back-clouds-color), 2.937em 0.312em var(--clouds-color), 2em -0.312em var(--back-clouds-color), 3.625em -0.062em var(--clouds-color), 2.625em 0em var(--back-clouds-color), 4.5em -0.312em var(--clouds-color), 3.375em -0.437em var(--back-clouds-color), 4.625em -1.75em 0 0.437em var(--clouds-color), 4em -0.625em var(--back-clouds-color), 4.125em -2.125em 0 0.437em var(--back-clouds-color);
    transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);
  }

  .theme-switch__stars-container {
    position: absolute;
    color: var(--stars-color);
    top: -100%;
    left: 0.312em;
    width: 2.75em;
    height: auto;
    transition: var(--transition);

    &:hover {
      top: 50%;
      transform: translateY(-50%);
    }
  }

  /* Actions */

  .theme-switch__checkbox:checked + .theme-switch__container {
    background-color: var(--container-night-bg);
  }

  .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__circle-container {
    left: calc(100% - var(--circle-container-offset) - var(--circle-container-diameter));
  }

  .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__circle-container:hover {
    left: calc(100% - var(--circle-container-offset) - var(--circle-container-diameter) - 0.187em);
  }

  .theme-switch__circle-container:hover {
    left: calc(var(--circle-container-offset) + 0.187em);
  }

  .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__moon {
    transform: translate(0);
  }

  .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__clouds {
    bottom: -4.062em;
  }

  .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__stars-container {
    top: 50%;
    transform: translateY(-50%);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  padding: 0;
  align-items: flex-start;
  gap: 1.375rem;
  margin: 1rem 0;

  & > div {
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    & > div {
      width: 100%;
      align-items: center;
    }
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1.5rem;

  @media screen and (max-width: 768px) {
    align-items: center;
  }

  & > span {
    display: flex;
    padding: 0.4375rem 1.125rem;
    align-items: flex-start;
    gap: 0.625rem;
    border-radius: 6px;
    background: var(--ui-elements-dark, #11181c);
    color: var(--ui-elements-white, #fff);
    font-size: 1rem;
    font-family: "Mona Sans";
    font-weight: 600;
    letter-spacing: 0.01rem;
  }

  & > h2 {
    color: #000;
    font-size: 2rem;
    font-family: FK Grotesk;
    font-weight: 700;
    line-height: 2.5rem;
    letter-spacing: 0.02rem;

    @media screen and (max-width: 768px) {
      text-align: center;
    }
  }
`;

const Accordion = styled("Accordion.Root")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1.875rem;
  align-self: stretch;
`;

const Item = styled("Accordion.Item")`
  transition: all 0.3s ease-in-out;

  &[data-state="open"] {
    display: flex;
    padding: 0.75rem 1.5rem 1rem 1.5rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.1875rem;
    align-self: stretch;
    border-radius: 12px;
    background: var(--ui-elements-white,${
      state.light ? "#fff" : "rgb(49,62,89)"
    });
    box-shadow: -8px 40px 59px -28px rgba(16, 24, 40, 0.14),
      -2px 2px 14px -1px rgba(0, 0, 0, 0.13);
  }

  &[data-state="closed"] {
    display: flex;
    padding: 0.75rem 1.5rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.1875rem;
    align-self: stretch;
  }
`;

const Header = styled("Accordion.Header")``;

const Trigger = styled("Accordion.Trigger")`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.9375rem;
  align-self: stretch;
  transition: all 0.3s ease-in-out;
  background: transparent;
  border: none;
  color: var(--ui-elements-black, #000);

  &:hover {
    cursor: pointer;
    color: #006adc;
  }

  & > h3 {
    font-size: 1.1875rem;
    font-family: FK Grotesk;
    font-weight: 700;
    letter-spacing: 0.01188rem;
  }
`;

const slideDown = styled.keyframes`
  from {
    height: 0;
  }
  to {
    height: var(--radix-accordion-content-height);
  }
`;

const slideUp = styled.keyframes`
  from {
    height: var(--radix - accordion - content - height);
  }
  to {
    height: 0;
  }
`;

const Content = styled("Accordion.Content")`
  display: flex;
  padding: 0rem 0rem 0rem 3.125rem;
  align-items: center;
  gap: 0.625rem;
  flex: 1 0 0;
  align-self: stretch;
  color: var(--black, #000);
  font-size: 0.875rem;
  font-family: "Mona Sans";
  line-height: 140%;
  letter-spacing: 0.00875rem;

  &[data-state="closed"] {
    display: none;
    animation: ${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1);
  }

  &[data-state="open"] {
    animation: ${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1);
  }
`;

const ImgContainer = styled.div`
   position: relative;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
    border-radius:25px;
  box-shadow: -8px 40px 59px -28px rgba(16, 24, 40, 0.14),
      -2px 2px 14px -1px rgba(0, 0, 0, 0.13);
  & > img {
    width:100%;
    height:100%;
    position: absolute;
    inset: 0 0 0 50%;
    transform: translateX(-50%);
    transition: opacity 300ms cubic-bezier(0.87, 0, 0.13, 1);
    opacity: 0;
    object-fit: cover;
    overflow: hidden;

    &.open {
      opacity: 1!important;
    }
  }
`;
const imageSectionStyle = {
  width: "75px",
  height: "75px",
  borderRadius: "25%",
  "box-shadow": "rgb(210, 202, 250) 0px 0px 10px",
};
const ParentDiv = styled.div`
width:100%;
margin:1rem auto;
min-height:160px;
// max-height:300px;
background: ${state.light ? "#fff" : "rgb(49,62,89)"};
border-radius:25px;
padding:15px 25px;
box-shadow: "0px 0px 10px -1px  #806ce1";
@media only screen and (max-width: 1000px) {
  
 width:85%
  
}
@media only screen and (max-width: 770px) {
x{
  color: rgb(245, 245, 245);
}
 width:85%
  
}
>p{font-size:15px}
`;
// -------------------------

const CardIsLoading = (queryId) =>
  state.data?.[`hash${queryId}`]?.isLoading && (
    <div
      className="d-flex flex-column gap-1"
      style={{
        padding: "60px 12px",
      }}
    >
      <Widget
        src={`easypoll-v0.ndc-widgets.near/widget/Common.Spinner`}
        props={{
          ...themeColor.spinnerColors,
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
  state.data?.[`hash${queryId}`]?.error && (
    <div className="d-flex justify-content-center align-items-center h-100 p-4 pb-1">
      An error occurred for this section
    </div>
  );

const TableParent = styled.table`
  font-family: Arial, Helvetica, sans-serif;
  border: none;
  width: 100%;
    background:${themeColor.table_pagination.table_bg};
    td,  th {
    border: none;

    padding: 8px;
    font-size:13px
    }
 tr:nth-child(even){background-color:${themeColor.table_pagination.table_striped_bg};}

 tr:hover {background-color:${themeColor.table_pagination.table_hover_bg};  
  transform:scale(1.01);
 transition:1s all;}

 th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color:rgb(246, 246, 246);;
  color: white;
}`;

return (
  <div
    className="d-flex"
    style={{
      background: themeColor?.page_bg,
    }}
  >
    {/*################ side bar #################*/}
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
        activeIcon: "Home",
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
        activeIcon: "Home",
      }}
    />
    {/*################ main bar #################*/}
    <div style={{ minWidth: "80%" }} className=" flex-grow-1  px-2">
      {/*################ header #################*/}
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
      {/*################ content #################*/}
      <div className="d-flex justify-content-end align-items-center p-4">
        <Widget
          src="forefront_tak.near/widget/Forefront.Home.Slider"
          props={{
            project: "near",
            backgroundColor: `${
              state.light ? "rgb(41 0 78)" : "rgb(49,62,89)"
            }`,
            titleColor: `${state.light ? "#fff" : "#ebeeff"}`,
            linkColor: `${state.light ? "#8b76f3" : "#806ce1"}`,
            textColor: `${state.light ? "#d2cafa" : "#ebeeff"}`,
          }}
        />
      </div>
      <div style={{ width: "100%", height: "45px" }}></div>

      <Container>
        <div>
          <Accordion
            defaultValue="acceleration"
            value={state.value}
            onValueChange={(value) => State.update({ value: value })}
          >
            <Item value="acceleration">
              <Header>
                <Trigger>
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 31 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.45837 16.0007C6.45837 11.0071 10.5065 6.95898 15.5 6.95898M21.3124 10.1882L15.4999 16.0007M28.4167 16.0007C28.4167 23.1343 22.6337 28.9173 15.5 28.9173C8.36636 28.9173 2.58337 23.1343 2.58337 16.0007C2.58337 8.86697 8.36636 3.08398 15.5 3.08398C22.6337 3.08398 28.4167 8.86697 28.4167 16.0007ZM16.7917 16.0007C16.7917 16.714 16.2134 17.2923 15.5 17.2923C14.7867 17.2923 14.2084 16.714 14.2084 16.0007C14.2084 15.2873 14.7867 14.709 15.5 14.709C16.2134 14.709 16.7917 15.2873 16.7917 16.0007Z"
                      stroke="#d2cafa"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <h5 style={{ color: `${state.light ? "black" : "#fff"}` }}>
                    Best Analytical dashboard
                  </h5>
                </Trigger>
              </Header>
              <Content style={{ color: `${state.light ? "black" : "#fff"}` }}>
                Use dashboards for free
                <a
                  href="https://near.social/forefront_tak.near/widget/Forefront.Discover"
                  target="_blank"
                  style={{ color: "#806ce1" }}
                  li
                >
                  Click here.
                </a>
              </Content>
            </Item>
            <Item value="education">
              <Header>
                <Trigger>
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 31 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.9584 19.2298V15.3476C21.9584 15.1157 21.9584 14.9998 21.9231 14.8975C21.8919 14.807 21.8409 14.7246 21.7739 14.6562C21.6982 14.5788 21.5945 14.527 21.3872 14.4233L15.5 11.4798M5.16671 12.7714V21.5633C5.16671 22.0437 5.16671 22.2839 5.24165 22.4942C5.3079 22.6801 5.41587 22.8484 5.55728 22.9861C5.71724 23.1418 5.9356 23.2419 6.37229 23.442L14.639 27.2309C14.9557 27.3761 15.1141 27.4487 15.2791 27.4773C15.4253 27.5027 15.5748 27.5027 15.721 27.4773C15.886 27.4487 16.0444 27.3761 16.3611 27.2309L24.6278 23.442C25.0645 23.2419 25.2828 23.1418 25.4428 22.9861C25.5842 22.8484 25.6922 22.6801 25.7584 22.4942C25.8334 22.2839 25.8334 22.0437 25.8334 21.5633V12.7714M2.58337 11.4798L15.0379 5.25249C15.2074 5.16776 15.2921 5.1254 15.3809 5.10873C15.4597 5.09396 15.5404 5.09396 15.6191 5.10873C15.708 5.1254 15.7927 5.16776 15.9622 5.25249L28.4167 11.4798L15.9622 17.707C15.7927 17.7918 15.708 17.8341 15.6191 17.8508C15.5404 17.8656 15.4597 17.8656 15.3809 17.8508C15.2921 17.8341 15.2074 17.7918 15.0379 17.707L2.58337 11.4798Z"
                      stroke="#d2cafa"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <h5 style={{ color: `${state.light ? "black" : "#fff"}` }}>
                    Analytical components
                  </h5>
                </Trigger>
              </Header>
              <Content style={{ color: `${state.light ? "black" : "#fff"}` }}>
                Fascinating UI/UX
                <a
                  href="https://near.social/forefront_tak.near/widget/Forefront.Discover"
                  target="_blank"
                  style={{ color: "#806ce1" }}
                  li
                >
                  Click here.
                </a>
              </Content>
            </Item>

            <Item value="ecosystem">
              <Header>
                <Trigger>
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 35 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.2297 5C26.2668 5 25.3727 5.48004 24.8683 6.26919L19.4336 14.0275C19.2566 14.2832 19.3285 14.6279 19.5944 14.7982C19.8099 14.9363 20.0951 14.9192 20.2914 14.7568L25.6409 10.2954C25.7298 10.2185 25.8668 10.2263 25.9468 10.3118C25.9831 10.351 26.0023 10.4016 26.0023 10.4535V24.4218C26.0023 24.5372 25.9053 24.6298 25.7853 24.6298C25.7209 24.6298 25.6601 24.6027 25.6194 24.555L9.44873 5.94299C8.92282 5.34472 8.14951 5 7.33472 5H6.76955C5.23996 5 4 6.19227 4 7.66303V27.3363C4 28.807 5.23996 29.9993 6.76955 29.9993C7.73249 29.9993 8.62653 29.5192 9.13096 28.7301L14.5656 20.9718C14.7427 20.7161 14.6708 20.3714 14.4049 20.2011C14.1893 20.063 13.9042 20.0801 13.7079 20.2424L8.35839 24.7039C8.26951 24.7808 8.13247 24.7729 8.05248 24.6875C8.01618 24.6483 7.99692 24.5977 7.99766 24.5457V10.5746C7.99766 10.4592 8.0947 10.3667 8.21469 10.3667C8.2784 10.3667 8.33988 10.3937 8.38062 10.4414L24.549 29.057C25.0757 29.6546 25.849 29.9993 26.6631 30H27.2282C28.7578 30.0007 29.9985 28.8092 30 27.3384V7.66303C29.9993 6.19227 28.7593 5 27.2297 5Z"
                      fill="#d2cafa"
                    />
                  </svg>
                  <h5 style={{ color: `${state.light ? "black" : "#fff"}` }}>
                    Analytical Reports
                  </h5>
                </Trigger>
              </Header>
              <Content style={{ color: `${state.light ? "black" : "#fff"}` }}>
                Check out our twitter page for more insights.
                <a
                  href="https://twitter.com/Forefront_Tak"
                  target="_blank"
                  style={{ color: "#806ce1" }}
                  li
                >
                  Click here.
                </a>
              </Content>
            </Item>
          </Accordion>
        </div>
        <ImgContainer>
          <img
            src={
              "https://ipfs.near.social/ipfs/bafkreiaopodecbsf64d5aqxa67gc67lnh5ped5qw42vbpldciwpwpwubhy"
            }
            alt="credits"
            className={state.value === "acceleration" ? "open" : ""}
          />

          <img
            src={
              "https://ipfs.near.social/ipfs/bafybeiewt7iccfti67s2gkrsxfk5qw7pcrv43v5ljp7pyg7psfbc4kzbxu"
            }
            alt="backers"
            className={state.value === "ecosystem" ? "open" : ""}
          />
          <img
            src={
              "https://ipfs.near.social/ipfs/bafkreicsutynhsqpvmd74oz4oh5cr6ytw2v6qo3m2yi62brfnvgish4mni"
            }
            alt="backers"
            className={state.value === "education" ? "open" : ""}
          />
        </ImgContainer>
      </Container>
      <div style={{ width: "100%", height: "85px" }}></div>

      <ParentDiv>
        <h5
          className="mb-4"
          style={{ color: `${state.light ? "#806ce1" : "#d2cafa"}` }}
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 31 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.625 14.7083L15.5 18.5833L28.4167 5.66667M20.6667 4.375H10.075C7.9048 4.375 6.81969 4.375 5.99079 4.79735C5.26166 5.16886 4.66886 5.76166 4.29735 6.49079C3.875 7.31969 3.875 8.4048 3.875 10.575V21.425C3.875 23.5952 3.875 24.6803 4.29735 25.5092C4.66886 26.2383 5.26166 26.8311 5.99079 27.2026C6.81969 27.625 7.9048 27.625 10.075 27.625H20.925C23.0952 27.625 24.1803 27.625 25.0092 27.2026C25.7383 26.8311 26.3311 26.2383 26.7026 25.5092C27.125 24.6803 27.125 23.5952 27.125 21.425V16"
              stroke="#806ce1"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Powered by
        </h5>
        <div className="row row-cols-auto g-4">
          {CardIsLoading(1)}
          {CardHasError(1)}
          {state.data["hash" + 3]?.data &&
            state.data["hash" + 3].data.map((data) => (
              <div className="col">
                <img
                  title={data.title}
                  style={imageSectionStyle}
                  src={data.screenshotUrl}
                />
                <div className="col">
                  <i
                    style={{
                      color: `${state.light ? "rgb(41, 0, 78)" : "#d2cafa"}`,
                    }}
                  >
                    {data.title}
                  </i>
                </div>{" "}
              </div>
            ))}
        </div>
      </ParentDiv>
      <ParentDiv>
        <h5
          className="mb-4"
          style={{ color: `${state.light ? "#806ce1" : "#d2cafa"}` }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.4167 17.125V15.5417C17.4167 14.0661 16.4075 12.8263 15.0417 12.4748M12.2708 3.10518C13.4313 3.57495 14.25 4.7127 14.25 6.04167C14.25 7.37063 13.4313 8.50838 12.2708 8.97815M13.4583 17.125C13.4583 15.6495 13.4583 14.9118 13.2173 14.3298C12.8959 13.5539 12.2794 12.9374 11.5035 12.616C10.9216 12.375 10.1838 12.375 8.70833 12.375H6.33333C4.85785 12.375 4.12011 12.375 3.53816 12.616C2.76224 12.9374 2.14577 13.5539 1.82438 14.3298C1.58333 14.9118 1.58333 15.6495 1.58333 17.125M10.6875 6.04167C10.6875 7.79057 9.26973 9.20833 7.52083 9.20833C5.77193 9.20833 4.35416 7.79057 4.35416 6.04167C4.35416 4.29276 5.77193 2.875 7.52083 2.875C9.26973 2.875 10.6875 4.29276 10.6875 6.04167Z"
              stroke="#806ce1"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Partners & Supporters
        </h5>
        <div className="row row-cols-auto g-4">
          {CardIsLoading(1)}
          {CardHasError(1)}
          {state.data["hash" + 2]?.data &&
            state.data["hash" + 2].data.map((data) => (
              <div className="col">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip> {data.title} </Tooltip>}
                >
                  <img
                    title={data.title}
                    style={imageSectionStyle}
                    src={data.screenshotUrl}
                  />
                </OverlayTrigger>
              </div>
            ))}
        </div>
      </ParentDiv>
      <ParentDiv>
        <h5
          className="mb-4"
          style={{ color: `${state.light ? "#806ce1" : "#d2cafa"}` }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.4167 17.125V15.5417C17.4167 14.0661 16.4075 12.8263 15.0417 12.4748M12.2708 3.10518C13.4313 3.57495 14.25 4.7127 14.25 6.04167C14.25 7.37063 13.4313 8.50838 12.2708 8.97815M13.4583 17.125C13.4583 15.6495 13.4583 14.9118 13.2173 14.3298C12.8959 13.5539 12.2794 12.9374 11.5035 12.616C10.9216 12.375 10.1838 12.375 8.70833 12.375H6.33333C4.85785 12.375 4.12011 12.375 3.53816 12.616C2.76224 12.9374 2.14577 13.5539 1.82438 14.3298C1.58333 14.9118 1.58333 15.6495 1.58333 17.125M10.6875 6.04167C10.6875 7.79057 9.26973 9.20833 7.52083 9.20833C5.77193 9.20833 4.35416 7.79057 4.35416 6.04167C4.35416 4.29276 5.77193 2.875 7.52083 2.875C9.26973 2.875 10.6875 4.29276 10.6875 6.04167Z"
              stroke="#806ce1"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Supported projects
        </h5>
        <div className="row row-cols-auto g-4">
          {CardIsLoading(1)}
          {CardHasError(1)}
          {state.data["hash" + 4]?.data &&
            state.data["hash" + 4].data.map((data) => (
              <div className="col">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip> {data.title} </Tooltip>}
                >
                  <img
                    title={data.title}
                    style={imageSectionStyle}
                    src={data.screenshotUrl}
                  />
                </OverlayTrigger>
              </div>
            ))}
        </div>
      </ParentDiv>

      <div style={{ width: "100%", height: "85px" }}></div>
      <h4
        style={{
          color: `${state.light ? "black" : "#fff"}`,
          marginBottom: "20px",
        }}
      >
        Recent components or dashboards
      </h4>
      <TableParent>
        {CardIsLoading(1)}
        {CardHasError(1)}
        {state.data["hash" + 1]?.data &&
          state.data["hash" + 1].data.map((data) => {
            return (
              <tr>
                <td>
                  <Link
                    href={"/mob.near/widget/ProfilePage?accountId=lord1.near"}
                  >
                    <Widget
                      src="mob.near/widget/ProfileImage"
                      props={{ accountId: "forefront_tak.near" }}
                    />
                  </Link>
                </td>
                <td>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: themeColor.table_pagination.table_color,
                    }}
                    href={"/mob.near/widget/ProfilePage?accountId=lord1.near"}
                  >
                    {onHandelId(data.performer)}
                  </Link>
                </td>
                <td style={{ color: themeColor.table_pagination.table_color }}>
                  {data.type}
                </td>
                <td style={{ color: themeColor.table_pagination.table_color }}>
                  {onHandelTitle(data.title)}
                </td>
                <td style={{ color: themeColor.table_pagination.table_color }}>
                  {data.createdAt}
                </td>
                <td>
                  <a href={data.Url}>
                    <svg
                      width="35"
                      height="35"
                      viewBox="0 0 35 35"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.9167 5.25001L12.9167 1.75001M12.9167 1.75001H9.41674M12.9167 1.75001L7.66675 7M6.50008 1.75H5.21675C4.23666 1.75 3.74661 1.75 3.37226 1.94074C3.04298 2.10852 2.77527 2.37623 2.60749 2.70552C2.41675 3.07986 2.41675 3.56991 2.41675 4.55V9.45C2.41675 10.4301 2.41675 10.9201 2.60749 11.2945C2.77527 11.6238 3.04298 11.8915 3.37226 12.0593C3.74661 12.25 4.23666 12.25 5.21675 12.25H10.1167C11.0968 12.25 11.5869 12.25 11.9612 12.0593C12.2905 11.8915 12.5582 11.6238 12.726 11.2945C12.9167 10.9201 12.9167 10.4301 12.9167 9.45V8.16667"
                        stroke="#806ce1"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </a>
                </td>
              </tr>
            );
          })}
      </TableParent>
      {/*################ footer #################*/}
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
    </div>
  </div>
);
