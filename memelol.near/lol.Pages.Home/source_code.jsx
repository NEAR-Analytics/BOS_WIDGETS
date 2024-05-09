const { assets, content, contractName } = props;
const { format, Token } = VM.require(`memelol.near/widget/lol.Utils`);
const { Snow } = VM.require(`memelol.near/widget/lol.Components.Snow`);
const { Navigation } = VM.require(
  `memelol.near/widget/lol.Components.Navigation`
);
const { Button } = VM.require(`memelol.near/widget/lol.Components.Button`);

const TOKENOMIC = [
  {
    title: "In Circulation",
    color: "rgb(89 110 255 / 90%)",
    value: 558.52,
    sub: [
      { title: "Marketing spends", value: 31.12 },
      {
        title: "LP amount",
        value: 231.14,
        icon: (
          <i title="Locked Pool" className="bi bi-database-fill-lock ml-2" />
        ),
      },
      { title: "Community funds", value: 296.26 },
    ],
  },
  { title: "Burned Amount", color: "rgb(0 0 0 / 40%)", value: 218.48 },
];

const totalSupply = TOKENOMIC.map((v) => v.value).reduce((a, b) => a + b, 0);

const Container = styled.div`
  width: 100%;
  height: max-content;
  overflow: hidden;

  .buy-token {
    width: 300px;

    div {
      padding: 12px 25px;
    }

    &:hover {
      text-decoration: none;
    }

    @media screen and (max-width: 786px) {
      width: 100%;
    }
  }

  .infos {
    @media screen and (max-width: 786px) {
      flex-direction: column;
    }
  }
`;

const Section = styled.div`
  padding: 1rem 3rem;
  border: 3px solid black;
  border-radius: 20px;
  width: 100%;
  background: ${(props) => props.color};
  justify-content: center;

  &.banner-img {
    border-radius: 20px;
    width: 100%;
    background-image: url(${assets.banner});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  &.notbad-img {
    border-radius: 20px;
    width: 100%;
    height: 100%;
    background-image: url(${assets.notbad});
    background-size: 200px 200px;
    background-position: center;
  }

  .header {
    position: relative;
    justify-content: space-between;
    width: 700px;

    @media screen and (max-width: 786px) {
      width: 100%;
    }

    img {
      position: relative;
      width: 160px !important;
      height: 160px !important;
      z-index: 109;

      @media screen and (max-width: 786px) {
        width: 110px !important;
        height: 110px !important;
      }
    }

    .running-block {
      position: absolute;
      left: 117px;
      top: 15px;
      overflow: hidden;
      width: 465px;
      z-index: 110;

      @media screen and (max-width: 786px) {
        left: 85px;
        width: 170px;
      }
    }
  }

  .pl {
    padding-left: 27px;
  }

  &.info {
    display: flex;
    text-align: center;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem 1.5rem;
    height: 300px;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: 3.5rem;
    }

    small {
      line-height: 2rem;
    }

    .small {
      font-size: 14px;
      margin-top: 1rem;
      font-style: italic;
      line-height: 1.5rem;
    }
  }

  .wrapper {
    width: 50%;
    flex-direction: row;

    @media screen and (max-width: 786px) {
      width: 100%;
      flex-direction: column;
    }
  }

  @media screen and (max-width: 786px) {
    padding: 1rem;
  }
`;

const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  border-radius: 18px;
  padding: 3rem;
  background-color: ${(props) => props.color};

  @media screen and (max-width: 786px) {
    padding: 2rem;
  }
`;

const Img = styled.img`
  border-radius: 20px;
  height: 300px;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  box-shadow: 0px 20px 30px 0px rgba(0, 0, 0, 0.2);
  border: 3px solid black;

  @media screen and (max-width: 786px) {
    width: 100%;
  }
`;

const LOL = styled.div`
  white-space: nowrap;
  font-size: 6rem;
  font-weight: 800;
  color: white;
  text-shadow: 3px 3px 10px black;
  letter-spacing: 5px;

  -webkit-animation: scrolling 1s linear infinite;
  animation: scrolling 1s linear infinite;

  @keyframes scrolling {
    0% {
      transform: translateX(${(p) => (p.delay % 2 == 0 ? "-100%" : "-201%")});
      -webkit-transform: translateX(
        ${(p) => (p.delay % 2 == 0 ? "-100%" : "-201%")}
      );
    }
    100% {
      transform: translateX(0%);
      -webkit-transform: translateX(0%);
    }
  }

  @media screen and (max-width: 786px) {
    font-size: 4rem;
  }
`;

const ProgressBlock = styled.div`
  border-radius: 50px;
  height: 50px;
  width: 100%;
  display: flex;
  border: 3px solid black;
  padding: 5px;
  background: white;
`;

const Bar = styled.div`
  width: ${(p) => p.width}%;
  text-align: center;
  background: ${(p) => p.color};

  &:first-child {
    border-radius: 50px 0 0 50px;
  }
  &:last-child {
    border-radius: 0 50px 50px 0;
  }
`;

const Progress = ({ values }) => (
  <ProgressBlock className="d-flex w-100">
    {values.map((bar) => (
      <Bar
        width={parseFloat((bar.value / totalSupply) * 100)}
        color={bar.color}
      />
    ))}
  </ProgressBlock>
);

return (
  <Container className="d-flex flex-column gap-4">
    <Navigation />
    <div className="d-flex gap-3">
      <Section
        className="d-flex justify-content-center align-items-center text-center gap-3"
        color="rgb(255 242 158 / 90%)"
      >
        <h3>
          <b>
            100% Decentrilized <span className="px-2">•</span> Community Owned{" "}
            <span className="px-2">•</span> Built on BOS
            <span className="px-2">•</span> Meme Coin
          </b>
        </h3>
      </Section>
    </div>
    <Section className="p-0 position-relative banner-img">
      <Overlay color="rgb(89 110 255 / 80%)">
        <div className="wrapper d-flex flex-column align-items-center gap-4 justify-content-center">
          <div className="header d-flex align-items-center">
            <img src="https://ipfs.near.social/ipfs/bafkreiaf4ztsvri5e5slfbzmjpu5mccgjy555m6liuq3updthosjdade54" />
            <div className="running-block d-flex">
              {[...Array(10).keys()].map((i) => (
                <LOL className="font" delay={i}>
                  {i % 2 == 0 ? "L" : "0"}
                </LOL>
              ))}
            </div>
            <img
              style={{ transform: "scale(-1, 1)" }}
              src="https://ipfs.near.social/ipfs/bafkreiaf4ztsvri5e5slfbzmjpu5mccgjy555m6liuq3updthosjdade54"
            />
          </div>
          <a
            className="buy-token"
            href="https://app.ref.finance/#memelol.near|near"
          >
            <Button className="w-100 button justify-content-center">
              Buy $LOL
            </Button>
          </a>
        </div>
      </Overlay>
    </Section>

    <Section className="p-0 notbad-img">
      <Overlay color="rgb(255 242 158 / 95%)">
        <h1 className="font text-center mb-4">Tokenomics</h1>
        <h3 className="text-center mb-2">
          <b>Decentrilized on 100%</b>
        </h3>
        <Progress values={TOKENOMIC} />
        <div className="d-flex w-100 flex-column gap-2 my-4 px-3">
          {TOKENOMIC.slice(0, 2).map((t) => (
            <>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex gap-2 align-items-center">
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      border: "3px solid black",
                      backgroundColor: t.color,
                    }}
                  />
                  <small>{t.title}</small>
                </div>
                <h3 className="font">{t.value}M</h3>
              </div>
              {t.sub &&
                t.sub.map((t) => (
                  <div className="pl d-flex justify-content-between align-items-center">
                    <small>
                      {t.title} {t.icon}
                    </small>

                    <small>{t.value}M</small>
                  </div>
                ))}
            </>
          ))}
          <div style={{ background: "#000", height: "3px" }} className="my-2" />
          <div className="d-flex justify-content-between align-ittems-center">
            <small>
              <b>Total Supply</b>
            </small>
            <h3 className="font">{totalSupply}M</h3>
          </div>
        </div>
      </Overlay>
    </Section>
  </Container>
);
