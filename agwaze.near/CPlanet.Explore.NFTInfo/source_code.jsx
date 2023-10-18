const Root = styled.div`

`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 400px;
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
`

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    width: 80%;
    max-width: 700px;
    align-items: center;
`

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
`

const PriceSec = styled.div`
    h1 {
        color: #000;
        font-family: Helvetica Neue;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 160%; /* 25.6px */
        margin-bottom: 0;
    }    
    span {
        color: rgba(17, 17, 15, 0.60);
        font-family: Helvetica Neue;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 160%; /* 19.2px */
    }
`

const Image = styled.div`
    width: 45px;
    height: 45px;
    border-radius: 22.5px;
    background: #000;
`

initState({
  tab: "INFO",
});

const borderStyle = () => {
  return {};
};
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
        <Row>
            <ImageSec>
                <Image>
                </Image>
                <div>
                    <p>Listed by @CryptoBabe</p>
                    <span>06 Feb 2022 12:30:39 PM</span>
                </div>
            </ImageSec>
            <PriceSec>
                <h1>20 MATIC</h1>
                <span>22.65</span>
            </PriceSec>
        </Row>
    </Body>
  </Root>
);
