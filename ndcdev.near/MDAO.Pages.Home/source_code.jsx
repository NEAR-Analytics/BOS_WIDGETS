let { assets, content } = VM.require(`ndcdev.near/widget/MDAO.Config`);

assets = assets.home;
content = content.home;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: max-content;
  overflow: hidden;

  h3 {
    font-size: 2rem;
    font-weight: 400;
  }

  h4 {
    font-size: 1.5rem;
    font-weight: 300;
  }
`;

const HeroSection = styled.div`
  background: linear-gradient(
    96deg,
    #fdefb1 -19.42%,
    #e1c4fe 49.87%,
    #95c3fe 98.55%
  );
  height: 600px;
  padding: 3rem;

  @media screen and (max-width: 786px) {
    padding: 2rem;
    text-align: center;
  }

  h1 {
    font-size: 5.2rem;
    font-weight: 600;
    margin-bottom: 0;
    @media screen and (max-width: 786px) {
      font-size: 3rem;
    }
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 300;
    max-width: 800px;
    margin-bottom: 0;
  }

  h4 {
    font-size: 1.5rem;
    font-weight: 400;
    margin-bottom: 0;
  }

  img {
    width: 500px;
    height: 500px;
    @media screen and (max-width: 786px) {
      display: none;
    }
  }

  .hero-buttons {
    flex-direction: row;

    @media screen and (max-width: 786px) {
      flex-direction: column;
    }
  }

  a.btn {
    border-radius: 10px;
    background: #000;
    box-shadow: 0px 20px 30px 0px rgba(0, 0, 0, 0.25);
    color: #f0f0f0;
    font-size: 24px;
    font-weight: 400;
    padding: 15px 25px;
    min-width: 300px;

    &:hover {
      color: #fff;
      text-decoration: none;
    }

    @media screen and (max-width: 786px) {
      width: 100%;
    }

    &.btn-secondary {
      background: transparent;
      color: #000;
      background-image: none;
      border: 2px solid #000;
    }
  }
`;

const InfoSection = styled.div`
  padding: 5rem 3rem;

  @media screen and (max-width: 786px) {
    padding: 2rem;
    text-align: center;
  }

  h2 {
    font-size: 3rem;
    font-weight: 600;
    width: 70%;

    @media screen and (max-width: 786px) {
      width: 100%;
    }
  }

  .circle {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 1px solid #151718;
  }

  .item {
    width: 280px;
    height: 375px;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0px 30px 80px 0px rgba(0, 0, 0, 0.1);

    .header {
      border-radius: 10px 10px 0px 0px;
      background: rgba(237, 209, 241, 0.2);

      h4 {
        margin: 10px 0 0 0;
      }
    }

    p {
      font-size: 16px;
      font-weight: 300;
      margin: 0;
    }

    @media screen and (max-width: 786px) {
      width: 100%;
    }

    a.btn-primary {
      border-radius: 10px;
      border: 2px solid #e6cde6;
      background: rgba(252, 248, 246, 0);
      font-size: 18px;
      font-weight: 400;
      color: #151718;
      padding: 5px 15px;

      div {
        width: 80%;
      }

      &:hover {
        text-decoration: none;
      }

      @media screen and (max-width: 786px) {
        width: 100%;
      }
    }
  }
`;

const ConnectSection = styled.div`
  color: white;
  background: #151718;
  padding: 5rem 3rem;

  @media screen and (max-width: 786px) {
    padding: 2rem;
    text-align: center;
  }

  h2,
  h3,
  h4 {
    color: white;
  }

  h2 {
    font-size: 3rem;
    font-weight: 600;
    width: 70%;

    @media screen and (max-width: 786px) {
      font-size: 2.7rem;
      width: 100%;
    }
  }

  .title {
    width: 75%;

    @media screen and (max-width: 786px) {
      width: 100%;
    }

    p {
      max-width: 800px;
      @media screen and (max-width: 786px) {
        width: 100%;
      }
    }
  }

  h4.bold {
    font-weight: 600;
  }

  div.img {
    @media screen and (max-width: 786px) {
      display: none;
    }
  }

  .item {
    width: 350px;
    border-radius: 10px;
    border: 2px solid #f0ddce;
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0px 30px 80px 0px rgba(0, 0, 0, 0.1);

    .color-text {
      background: linear-gradient(
        270deg,
        #efdcd1 -1.69%,
        #e0c6f7 43.78%,
        #adc3fb 99.83%
      );
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    p {
      font-size: 16px;
      font-weight: 300;
      margin: 0;
    }

    @media screen and (max-width: 786px) {
      width: 100%;
    }
  }
`;

const SupportSection = styled.div`
  padding: 5rem 3rem 7rem 3rem;
  background: linear-gradient(
    258deg,
    rgba(162, 195, 254, 0.5) 0%,
    rgba(225, 197, 252, 0.5) 28.72%,
    rgba(241, 220, 210, 0.5) 100%
  );

  @media screen and (max-width: 786px) {
    padding: 2rem 2rem 4rem 2rem;
    text-align: center;
  }

  h2 {
    font-size: 32px;
    font-weight: 600;
  }

  .items {
    gap: 2rem;

    @media screen and (max-width: 786px) {
      gap: 4rem;
    }
  }

  .item {
    width: 370px;
    height: 370px;
    border-radius: 50%;
    background: #151718;
    box-shadow: 0px 30px 50px 0px rgba(0, 0, 0, 0.25);

    @media screen and (max-width: 786px) {
      width: 300px;
      height: 300px;
    }

    .inner {
      color: white;
      width: 350px;
      height: 350px;
      border-radius: 50%;
      border: 2px solid #f0ddcf;

      @media screen and (max-width: 786px) {
        width: 270px;
        height: 270px;
      }
    }
  }
`;

const STATUS = {
  GOOD: ["Yes", "Approved", "Yes, include in special request"],
  BAD: ["No"],
};

const Badge = styled.div`
  border-radius: 20px;
  padding: 3px 10px;
  font-size: 14px;
  width: max-content;
  background: ${(props) =>
    STATUS.GOOD.includes(props.status)
      ? "rgb(89, 230, 146)"
      : STATUS.BAD.includes(props.status)
      ? "rgb(255, 121, 121)"
      : "rgb(53 53 53)"};
  color: ${(props) =>
    STATUS.GOOD.includes(props.status)
      ? "rgb(9, 52, 46)"
      : STATUS.BAD.includes(props.status)
      ? "rgb(52, 9, 9)"
      : "rgb(145 145 145)"};
`;

const Info = ({ title, desc, icon }) => (
  <div className="item d-flex flex-column gap-2 justify-content-between">
    <div className="header gap-3 p-4 text-center">
      {icon}
      <h4>{title}</h4>
    </div>
    <div className="p-4 text-center">
      <p>{desc}</p>
    </div>
    <div className="px-5 pb-4">
      <a href="" className="text-center btn-primary d-flex justify-content-end">
        <div className="d-flex justify-content-between">
          <span>Read More</span>
          <i className="bi bi-chevron-right" />
        </div>
      </a>
    </div>
  </div>
);

const Connect = ({ item }) => (
  <div className="item d-flex flex-column gap-2 justify-content-between align-items-center">
    <h4 className="bold color-text px-4 pt-4 text-center">{item[1].v}</h4>
    <Badge status={item[4].v}>{item[4].v || "No status yet"}</Badge>
    <div className="pt-2 pb-4 text-center">
      <div>
        <b>Created at</b>: {item[3].f}
      </div>
      <a href={item[2].v} className="color-text">
        <span className="mr-4">Learn More</span>
        <i className="bi bi-chevron-right" />
      </a>
    </div>
  </div>
);

const Support = ({ title, items }) => (
  <div>
    <h2 className="text-center mb-5">{title}</h2>
    <div className="item d-flex justify-content-center align-items-center">
      <div className="inner d-flex flex-column justify-content-center align-items-center">
        {items.map((i) => (
          <Link to={i.href}>{i.title}</Link>
        ))}
      </div>
    </div>
  </div>
);

if (!content || !assets) return <Widget src="flashui.near/widget/Loading" />;
let infoCounter = 0;

return (
  <Container>
    <HeroSection className="d-flex justify-content-between align-items-center gap-3">
      <div className="d-flex flex-column gap-5">
        <h1>{content.heroTitle}</h1>
        <h3>{content.heroDesc}</h3>
        <div className="hero-buttons d-flex gap-3">
          <Link
            to={"/ndcdev.near/widget/MDAO.App?page=info"}
            className="text-center btn btn-secondary d-flex justify-content-between"
          >
            <span>Read More</span>
            <i className="bi bi-chevron-right" />
          </Link>

          <Link
            className="text-center btn d-flex justify-content-between"
            to={`/ndcdev.near/widget/MDAO.App?page=createProposal`}
          >
            <span>Create Proposal / Report</span>
            <i className="bi bi-plus" />
          </Link>
        </div>
      </div>
      <img src={assets.hero} />
    </HeroSection>

    <InfoSection className="d-flex flex-column gap-5">
      <h4>{content.info.name}</h4>
      <h2>{content.info.title}</h2>
      <div className="d-flex flex-wrap gap-4 justify-content-center">
        {content.info.sections?.map(({ title, desc, icon }) => (
          <Info title={title} desc={desc} icon={icon} />
        ))}
      </div>
    </InfoSection>

    <ConnectSection className="d-flex flex-column gap-5">
      <h4>{content.connect.name}</h4>
      <div className="d-flex justify-content-between w-100">
        <div className="d-flex flex-column gap-3 title">
          <div>
            <h2>{content.connect.title1}</h2>
            <p>{content.connect.desc}</p>
          </div>
          <div>
            <h4 className="bold">{content.connect.title2}</h4>
          </div>
        </div>
        <div className="img">
          <img src={assets.puzzle} className="w-100" />
        </div>
      </div>
      <div className="d-flex flex-wrap gap-5 justify-content-center">
        <Widget
          src="ndcdev.near/widget/MDAO.Components.Communities"
          props={{ limit: 3, theme: "dark" }}
        />
      </div>
      <div>
        <h4 className="bold">
          <a href={"/ndcdev.near/widget/MDAO.App?page=communities"}>
            <span className="mr-4">Browse More</span>
            <i className="bi bi-chevron-right" />
          </a>
        </h4>
      </div>
    </ConnectSection>

    <InfoSection className="d-flex flex-column gap-5">
      <h4>{content.participate.name}</h4>
      <h2>{content.participate.title}</h2>
      <div className="d-flex gap-4 justify-content-between">
        {content.participate.items?.map((section) => (
          <div className="d-flex flex-column gap-2">
            {section.map(({ title, href }) => (
              <h5 className="d-flex gap-2">
                <div className="circle d-flex justify-content-center align-items-center">
                  {(infoCounter += 1)}
                </div>
                <a href={href}>{title}</a>
              </h5>
            ))}
          </div>
        ))}
      </div>
    </InfoSection>

    <SupportSection className="d-flex flex-column gap-5">
      <h4>{content.support.name}</h4>
      <div className="items d-flex flex-wrap justify-content-center">
        {content.support.items.map((item) => (
          <Support title={item.title} items={item.values} />
        ))}
      </div>
    </SupportSection>
  </Container>
);
