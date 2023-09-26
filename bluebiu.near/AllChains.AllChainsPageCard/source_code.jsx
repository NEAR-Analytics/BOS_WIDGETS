const Card = styled.div`
  border-radius: 16px;
  grid-row-start: auto;
  break-inside: avoid;
  margin-bottom: 24px;
  position: relative;
  .cardNew {
    display: ${props.new ? "block" : "none"};
    position: absolute;
    top: -16px;
    right: 30px;
    z-index: 1;
    .cardNew-bottom {
      margin-top: -8px;
      margin-left: 6px;
    }
  }
  .coming {
    display: ${props.opacity ? "block" : "none"};
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 14px;
    color: #fff;
    padding: 4px 8px;
    background: #5f627c;
    border-radius: 6px;
    z-index: 2;
  }
`;

const CardItem = styled.div`
  opacity: ${props.opacity ? 0.6 : 1};
  padding: 20px;
  background: ${props.bgColor};
  background-image: url(${props.bannerIcon});
  border-radius: ${props.opacity || props.isDeposit ? "16px" : "16px 16px 0 0"};
  background-repeat: no-repeat;
  background-position: right center;
  background-repeat: no-repeat;
  position: relative;
  .cardSrc {
    font-size: 14px;
    margin-bottom: 36px;
    span {
      margin-left: 4px;
    }
  }
  .list {
    display: flex;
  }
  @media (max-width: 900px) {
    margin-bottom: 4px;
    .cardSrc {
      font-size: 14px;
      margin-bottom: 20px;
    }
  }
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 700;
  display: flex;
  margin-bottom: 6px;
  a{
    color: inherit;
    text-decoration: none;
    display: inherit;
    width: 100%;
  }
  @media (max-width: 900px) {
    font-size: 26px;
  }
`;

const TitleIcon = styled.div`
  opacity: 0.6;
  margin-left: 6px;
  padding: 4px 6px;
  font-size: 14px;
  border-radius: 8px;
  background: rgba(13, 13, 13, 0.3);
  color: rgba(255, 255, 255, 1);
  margin-top: 9px;
  height: 24px;
  line-height: 18px;
  font-weight: 500;
  @media (max-width: 900px) {
    font-size: 14px;
    margin-top: 6px;
  }
`;

const Item = styled.div`
  font-size: 16px;
  flex: auto;
  p {
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
  }
  span {
    color: rgba(255, 255, 255, 1);
  }
  @media (max-width: 900px) {
    font-size: 14px;
  }
`;

const CardChilden = styled.div`
  opacity: ${props.opacity ? 0.6 : 1};
  background: #373a53;
  padding: ${props.opacity ? "0" : "0 0 2px 0"};
  border-radius: 0 0 16px 16px;
  display: ${(props) => (props.isDeposit ? "none" : "block")};
  .CardChilden-item {
    margin-bottom: 0;
    padding: 15px 0 15px 20px;
    display: flex;
    :hover {
      background: #3f4361;
    }
    .item-icon {
      margin-right: 8px;
      img {
        width: 60px;
        height: 60px;
      }
    }
    .item-text {
      margin-top: 6px;
      h3 {
        font-size: 18px;
        font-weight: 500;
      }
      .itemTag {
        display: inline-block;
        white-space: nowrap;
        span {
          color: #000000;
          margin-right: 6px;
          padding: 2px 10px;
          font-size: 12px;
          border-radius: 30px;
        }
      }
    }
  }
  @media (max-width: 900px) {
    display: block;
    .CardChilden-item {
      display: flex;
      width: 100%;
      overflow: hidden;
      .item-icon {
        img {
          width: 46px;
          height: 46px;
        }
      }
      .item-text {
        margin-top: 2px;
        h3 {
          font-size: 16px;
          color: #979abe;
          margin-bottom: 2px;
        }
      }
      &:last-child {
      margin-bottom: 0;
     }
    }
  }
`;

const getBackgroundColor = (content) => {
  if (content === "Bridge") {
    return "rgba(227, 233, 157, 1)";
  } else if (content === "Dexes") {
    return "rgba(172, 252, 237, 1)";
  } else if (content === "Lending") {
    return "rgba(173, 255, 181, 1)";
  } else if (content === "Liquid-staking") {
    return "rgba(193, 191, 255, 1)";
  } else if (content === "Staking") {
    return "rgba(193, 191, 255, 1)";
  } else if (content === "Yield") {
    return "rgba(249, 181, 230, 1)";
  } else if (content === "Liquidity Manage") {
    return "rgba(170, 214, 255, 1)";
  } else {
    return "rgba(26, 46, 51, 0.25)";
  }
};

const leftIcon = (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1 9L9 1M9 1H3.28571M9 1V7.09524" stroke="white" />
  </svg>
);

return (
  <Card>
    <div className="coming">Coming</div>
    <div className="cardNew">
      <div className="cardNew-top">
        <img
          src="https://ipfs.near.social/ipfs/bafkreidjip52w6q66phs4h4grhrjzusx2w7ai3bhgrpbhfsenls2nvx5dq"
          alt=""
        />
      </div>
      <div className="cardNew-bottom">
        <img
          src="https://ipfs.near.social/ipfs/bafkreidysuq44l5rmkqyqgnoyqhebtr3vr6qktup3kzc77adzxpurpishu"
          alt=""
        />
      </div>
    </div>
    <CardItem isDeposit={props.isDeposit}>

      {props.pathUrl ? (
        <Title>
          <a href={props.pathUrl}>
            {props.title}
            <TitleIcon>
              <span>Mainnet</span>
            </TitleIcon>
          </a>
        </Title>
      ) : (
        <Title>
          <span> {props.title}</span>
          <TitleIcon>
            <span>Mainnet</span>
          </TitleIcon>
        </Title>
      )
      }


      <a
        className="cardSrc"
        style={{
          textDecoration: "none",
          color: "white",
        }}
        href={"https://" + props.src}
        target="_blank"
      >
        {props.src}
        <span>{leftIcon}</span>
      </a>
      <div className="list">
        <Item>
          <p>Chain ID</p>
          <span>{props.chainId}</span>
        </Item>
        <Item>
          <p>Technology</p>
          <span>{props.technology}</span>
        </Item>
        <Item>
          <p>Native Token</p>
          <span>{props.token}</span>
        </Item>
      </div>
    </CardItem>
    <CardChilden isDeposit={props.isDeposit}>
      {props.childen &&
        props.childen.map((item, index) => (


          <>
            {item.widgetSrc ? (
              <a
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
                href={item.widgetSrc}
              >
                <div key={index} className="CardChilden-item">
                  <div className="item-icon">
                    <img src={item.icon} alt="" />
                  </div>
                  <div className="item-text">
                    <h3>{item.name}</h3>
                    <div className="itemTag">
                      {item.tags &&
                        item.tags.map((key) => (
                          <span
                            key={key}
                            style={{ background: getBackgroundColor(key) }}
                          >
                            {key}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </a>
            ) : (
              <>
                <div key={index} className="CardChilden-item">
                  <div className="item-icon">
                    <img src={item.icon} alt="" />
                  </div>
                  <div className="item-text">
                    <h3>{item.name}</h3>
                    <div className="itemTag">
                      {item.tags &&
                        item.tags.map((key) => (
                          <span
                            key={key}
                            style={{ background: getBackgroundColor(key) }}
                          >
                            {key}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </>
            )}

          </>



        ))}
    </CardChilden>
  </Card>
);
