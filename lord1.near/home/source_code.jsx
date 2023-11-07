State.init({
  value: "acceleration",
  light: true,
});
const handelLight = () => {
  let bool = state.light;
  State.update({ light: !bool });
  console.log(bool);
};
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
const ParentDiv = styled.div`
width:85%;
margin:1rem auto;
min-height:160px;
max-height:300px;
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
return (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      background: `${state.light ? "rgb(241,242,245)" : "rgb(25,33,50)"}`,
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
            image:
              "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/windows.svg",
          },
          {
            text: "Dashboards",
            link: "../../lord1.near/widget/Flipside-Home-page",
            image:
              "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/users-solid.svg",
          },
          {
            text: "Contracts",
            link: "../../leslug.near/widget/NearContractVisualizerV2",
            title: "Top NEAR projects profiler",

            image:
              "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/people-arrows-solid.svg",
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
        backgroundColor: `${state.light ? "#d2cafa" : "rgb(49,62,89)"}`,
        textcolor: "#fff",
      }}
    />
    <div style={{ marginLeft: "6rem" }}>
      <div
        style={{
          backgroundColor: `${state.light ? "#d2cafa" : "rgb(49,62,89)"}`,
          borderRadius: "15px",
          display: "flex",
          justifyContent: "space-between",
          padding: ".5rem",
          marginBottom: "1rem",
        }}
      >
        <Widget
          src="efiz.near/widget/marquee"
          props={{
            text: "Broaden your horizon with Flipside",
            fontFamily: "Arial",
            fontSize: "20px",
            backgroundColor: `${state.light ? "#d2cafa" : "rgb(49,62,89)"}`,
            height: "60px",
            width: "100%",
            textColor: `${state.light ? "#391b86" : "#fff"}`,
          }}
        />

        <img
          onClick={handelLight}
          Width={30}
          src="https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/lightmode.svg"
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <ParentDiv>
            <h5 style={{ color: `${state.light ? "#806ce1" : "#d2cafa"}` }}>
              {" "}
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
              Flipside Data App Dashboards
            </h5>
            <h2
              style={{
                textAlign: "center",
                "font-weight": "bold",
                color: `${state.light ? "black" : "#fff"}`,
              }}
            >
              107.1k
            </h2>{" "}
          </ParentDiv>
          <ParentDiv>
            <h5 style={{ color: `${state.light ? "#806ce1" : "#d2cafa"}` }}>
              {" "}
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
              Analysts on Flipside
            </h5>
            <h2
              style={{
                textAlign: "center",
                "font-weight": "bold",
                color: `${state.light ? "black" : "#fff"}`,
              }}
            >
              48.3k
            </h2>
          </ParentDiv>
        </div>
        <Widget
          src="lord1.near/widget/slider"
          props={{
            project: "near",
            backgroundColor: `${state.light ? "#d2cafa" : "rgb(49,62,89)"}`,
            likeColor: `${state.light ? "#fff" : "#fff"}`,
            titleColor: `${state.light ? "#2e345a" : "#ebeeff"}`,
            linkColor: `${state.light ? "#806ce1" : "#806ce1"}`,
            textColor: `${state.light ? "#ebeeff" : "#ebeeff"}`,
          }}
        />
      </div>{" "}
      <div style={{ width: "100%", height: "85px" }}></div>
      <Container>
        <div>
          <Title></Title>
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
                    Best in Class Data for 20+ blockchains
                  </h5>
                </Trigger>
              </Header>
              <Content style={{ color: `${state.light ? "black" : "#fff"}` }}>
                Use Livequery and enjoy high speed
                <a
                  href="https://flipsidecrypto.xyz/"
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
                    Join the Flipside Community
                  </h5>
                </Trigger>
              </Header>
              <Content style={{ color: `${state.light ? "black" : "#fff"}` }}>
                Learn and earn at the same time
                <a
                  href="https://discord.com/invite/ZmU3jQuu6W"
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
                    NEAR Analytics Challenges
                  </h5>
                </Trigger>
              </Header>
              <Content style={{ color: `${state.light ? "black" : "#fff"}` }}>
                Earn Near token by solving bounties{" "}
                <a
                  href="https://v2.metricsdao.xyz/app/challenges"
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
              "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/OIG%20(10).jpeg"
            }
            alt="credits"
            className={state.value === "acceleration" ? "open" : ""}
          />

          <img
            src={
              "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/OIG.rGHz_S8.jpeg"
            }
            alt="backers"
            className={state.value === "ecosystem" ? "open" : ""}
          />
          <img
            src={
              "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/OIG%20(8).jpeg"
            }
            alt="backers"
            className={state.value === "education" ? "open" : ""}
          />
        </ImgContainer>
      </Container>
      <div style={{ width: "100%", height: "85px" }}></div>
      <Widget
        src="lord1.near/widget/tabs"
        props={{
          backgroundColor: `${state.light ? "#d2cafa" : "rgb(49,62,89)"}`,
          textColor: `${state.light ? "#fff" : "#fff"}`,
          headerColor: `${state.light ? "#806ce1" : "#806ce1"}`,
          numberColor: `${state.light ? "#fff" : "#fff"}`,
        }}
      />
      <div style={{ width: "100%", height: "85px" }}></div>
      <h4
        style={{
          color: `${state.light ? "black" : "#fff"}`,
          marginBottom: "20px",
        }}
      >
        Recent Flipside related components
      </h4>
      <Widget
        src="lord1.near/widget/recent-widgets"
        props={{
          idColor: "#806ce1",
          widgetNameColor: `${state.light ? "rgb(49,62,89)" : "#fff"}`,
          dateColor: "#806ce1",
          tabelBackground: `${
            state.light ? "rgb(241,242,245)" : "rgb(49,62,89)"
          }`,
          evenBackground: `${state.light ? "#fff" : "rgb(25,33,50)"}`,
          hoverBackground: `${state.light ? "#d2cafa" : "rgb(55,72,107)"}`,
        }}
      />
      <div style={{ width: "100%", height: "85px" }}></div>
      <Widget
        src="lord1.near/widget/footer"
        props={{
          beBackground: "#fff",
          titlenelowBackground: `${state.light ? "#806ce1" : "#806ce1"}`,
          titleBackground: `${state.light ? "#fff" : "#fff"}`,
          svgBackground: "#806ce1",
          fromBackground: `${state.light ? "#d2cafa" : "rgb(55,72,107)"}`,
          toBackground: `${state.light ? "#d2cafa" : "rgb(55,72,107)"}`,
          belowBackground: `${state.light ? "#806ce1" : "#d2cafa"}`,
        }}
      />
    </div>
  </div>
);
