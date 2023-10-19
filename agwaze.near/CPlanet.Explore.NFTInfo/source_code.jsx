const arrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
  >
    <path
      d="M1.13672 1C4.20751 1 5.92918 1 8.99997 1V9"
      stroke="black"
      stroke-width="1.3478"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.99883 1L1 8.7377"
      stroke="black"
      stroke-width="1.3478"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const Root = styled.div``;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 400px;
    padding: 30px 0 0 30px;
    h4 {
        color: #000;
        text-align: center;
        font-family: Helvetica Neue;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        cursor: pointer;
        line-height: 160%; /* 25.6px */
    }
`;

const Body = styled.div`
    margin-top: 23px;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    width: 80%;
    max-width: 700px;
    margin-bottom: 10px;
    align-items: center;
`;

const ImageSec = styled.div`
    display: flex;
    align-items: center;
    div {
        margin-left: 10px;
        p {
        color: #000;
        font-family: Helvetica Neue;
        font-size: 14px;
        font-style: normal;
        margin-bottom: 0;
        font-weight: 400;
        line-height: 17px; /* 121.429% */
     }
     span {
        color: rgba(0, 0, 0, 0.85);
        font-family: Helvetica Neue;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 160%; /* 19.2px */
     }
    }
`;

const PriceSec = styled.div`
    h1 {
        color: #000;
        font-family: Helvetica Neue;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 160%; /* 25.6px */
        margin-bottom: 0;
        display: flex;
        gap: 4px;
    }    
    span {
        color: rgba(17, 17, 15, 0.60);
        font-family: Helvetica Neue;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 160%; /* 19.2px */
    }
`;

const Image = styled.div`
    width: 45px;
    height: 45px;
    border-radius: 22.5px;
    background: #000;
`;

const About = styled.div`
  padding-left: 30px;
  h1 {
    overflow: hidden;
    color: #000;
    text-overflow: ellipsis;
    font-family: Helvetica Neue;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
  }
  a {
    display: flex;
    border-radius: 32px;
    border: 1px solid #000;
    display: flex;
    padding: 4px 12px;
    align-items: center;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    margin-top: 8px;
    gap: 8px;
    width: max-content;
    h2 {
      color: #000;
      font-family: Helvetica Neue;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      margin-bottom: 0;
      line-height: normal;
    }
  }
  a:hover {
    opacity: 0.5;
  }
   p {
    color: #000;
    font-family: Helvetica Neue;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    margin-top: 8px;
    line-height: 148%;
   }
`;

const TabHeight = styled.div`
  height: 280px;
  overflow-y: scroll;
  margin-bottom: 20px;
`;

const getUsdValue = (price) => {
  const res = fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=near&vs_currencies=usd`
  );
  if (res.ok) {
    const multiplyBy = Object.values(res?.body)[0]?.usd;
    const value = multiplyBy * price > 0 ? price : 0;
    return value !== "NaN" ? `$${value}` : 0;
  }
};

const profile = props.profile ?? Social.getr(`${props.owner}/profile`);

initState({
  tab: "HISTORY",
});

return (
  <Root>
    <Header>
      <h4
        onClick={() => State.update({ tab: "INFO" })}
        style={
          state.tab === "INFO"
            ? {
                borderBottom: "3px solid black",
              }
            : {}
        }
      >
        Info
      </h4>
      <h4
        onClick={() => State.update({ tab: "HISTORY" })}
        style={
          state.tab === "HISTORY"
            ? {
                borderBottom: "3px solid black",
              }
            : {}
        }
      >
        History
      </h4>
      <h4
        onClick={() => State.update({ tab: "OFFERS" })}
        style={
          state.tab === "OFFERS"
            ? {
                borderBottom: "3px solid black",
              }
            : {}
        }
      >
        Offers
      </h4>
      <h4
        onClick={() => State.update({ tab: "ATTRIBUTES" })}
        style={
          state.tab === "ATTRIBUTES"
            ? {
                borderBottom: "3px solid black",
              }
            : {}
        }
      >
        Attributes
      </h4>
    </Header>
    <Body>
      <TabHeight>
        {state.tab === "HISTORY" &&
          props.transactions &&
          props?.transactions?.map((data, index) => (
            <Row key={data}>
              <ImageSec>
                <Image></Image>

                <div>
                  <p>
                    {data.type} by @{data?.from?.id}
                  </p>
                  <span>06 Feb 2022 12:30:39 PM</span>
                </div>
              </ImageSec>
              <PriceSec>
                <h1>
                  <Widget
                    src="agwaze.near/widget/GenaDrop.NearLogo"
                    props={{ width: 10 }}
                  />
                  {(data.price / 1000000000000000000000000).toFixed(2)}
                </h1>
                <span>
                  {getUsdValue(
                    (data.price / 1000000000000000000000000).toFixed(2)
                  )}
                </span>
              </PriceSec>
            </Row>
          ))}
      </TabHeight>
      <About>
        <h1>ABOUT THE ARTIST</h1>
        <a
          href={`#/agwaze.near/widget/GenaDrop.Profile.Main?accountId=${props.owner}`}
        >
          {arrow}
          <h2>View Artist Page</h2>
        </a>
        <p>
          {profile.description
            ? profile.description
            : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi utaliquip ex ea commodo consequat."}
        </p>
      </About>
    </Body>
  </Root>
);
