const { assets, content, contractName } = props;
const { format, Token } = VM.require(`memelol.near/widget/lol.Utils`);
const { Snow } = VM.require(`memelol.near/widget/lol.Components.Snow`);
const { Navigation } = VM.require(
  `memelol.near/widget/lol.Components.Navigation`,
);
const { Button } = VM.require(`memelol.near/widget/lol.Components.Button`);

const Container = styled.div`
  width: 100%;
  height: max-content;
  overflow: hidden;
`;

const InfoSection = styled.div`
  flex-direction: row;

  .btn {
    width: 100%;
    max-width: 400px;
    padding: 15px 25px 15px 50px;

    @media screen and (max-width: 786px) {
      max-width: 100%;
    }
  }

  @media screen and (max-width: 786px) {
    flex-direction: column;
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

  &.prize-img {
    border-radius: 20px;
    width: 100%;
    height: 100%;
    background-image: url(${assets.bannerPrize});
    background-size: contain;
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

  .wrapper {
    width: 100%;
    flex-direction: row;

    @media screen and (max-width: 786px) {
      width: 100%;
      flex-direction: column;
    }

    .mint-section {
      box-shadow: 0px 20px 30px 0px rgba(0, 0, 0, 0.5);
      width: 100%;
      max-width: 600px;
      background: rgb(255 255 255 / 90%);
      display: flex;
      flex-direction: column;
      gap: 2rem;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 2rem;
      border: 3px solid black;
      border-radius: 20px;
      z-index: 2;

      @media screen and (max-width: 786px) {
        max-width: 100%;
      }

      &.my-stats {
        max-width: 300px;
        background: rgb(255 214 255 / 90%);

        @media screen and (max-width: 786px) {
          max-width: 100%;
        }
      }

      .mint-rules {
        display: flex;
        flex-direction: column;
        box-shadow: 0px 20px 30px 0px rgba(0, 0, 0, 0.2);
        border: 3px solid black;
        border-radius: 20px;
        padding: 1.5rem;
        gap: 0.1rem;
        text-align: left;
        background: rgb(148 182 255 / 30%);
      }
    }
  }

  .winners-list {
    margin: 2rem 0;
    width: 75%;
    z-index: 2;

    @media screen and (max-width: 786px) {
      width: 100%;
    }
  }

  .stat {
    width: 25%;
    margin: 0;
    flex-direction: column;

    @media screen and (max-width: 786px) {
      flex-direction: row;
      margin: 10px;
      justify-content: space-between;
      width: 100%;
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

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  background: #fff;
  text-align: center;
  border: 3px solid black;
  border-radius: 20px;
  width: 210px;
  height: 345px;
  box-shadow: 0px 20px 30px 0px rgba(0, 0, 0, 0.25);

  h1 {
    line-height: 1rem;
  }

  h3 {
    width: 100px;
  }

  .meme {
    width: 130px;
    height: 130px;
  }

  .avaliability {
    background: ${(props) => props.color};
    border-top: 3px solid black;
    border-radius: 0 0 18px 18px;
  }
`;

const [stats, setStats] = useState({
  participants: 0,
  receivedNear: 0,
  boxes: [],
  boxesLeft: 0,
  receivedLoL: 0,
  startDate: 1704531600000,
});

const Stats = ({ text, value, near }) => (
  <div className="stat d-flex gap-1 align-items-center">
    <div>
      <h4>{text}</h4>
    </div>
    {near != undefined ? (
      <Token near={near} size={25}>
        <h3 className="font">{format(value)}</h3>
      </Token>
    ) : (
      <h3 className="font">{format(value)}</h3>
    )}
  </div>
);

const receivedNear = (boxes, rewards) => {
  if (!boxes) return 0;

  const totalBoxes = [4449, 5000, 500, 50, 1];
  const total = totalBoxes
    .map((box, i) => box * rewards[i])
    .reduce((a, b) => a + b, 0);
  const available = boxes
    .map((box, i) => box * rewards[i])
    .reduce((a, b) => a + b, 0);

  return total - available;
};

const receivedLol = (stats) =>
  format(
    new Big(stats[0] || 0)
      .minus(new Big(stats[1] || 0))
      .minus(new Big(stats[2] || 0))
      .toNumber(),
    24,
  );

const fetchStats = () => {
  const stats = Near.view(contractName, "get_total_stats");

  setStats({
    participants: stats[0],
    boxes: stats[1],
    boxesLeft: stats[2],
    receivedNear: receivedNear(stats[1], stats[5]),
    receivedLoL: receivedLol(stats[4]),
    startDate: stats[6]
      ? new Big(stats[6] || 0).div(1000 * 1000).toNumber()
      : 0,
  });
};

fetchStats();

return (
  <Container className="d-flex flex-column gap-4">
    <Navigation />
    <InfoSection className="d-flex gap-3">
      <Section
        className="d-flex justify-content-center align-items-center gap-3"
        color="#efefef"
      >
        <h3 className="font pb-2">Mint is ended</h3>
      </Section>
    </InfoSection>
    <Section className="p-0 position-relative banner-img">
      <Overlay color="rgb(89 110 255 / 80%)">
        <div className="wrapper d-flex align-items-center gap-3 justify-content-center">
          <div className="mint-section">
            <h1 className="font">NEW YEAR MINT 🎉</h1>
            <div className="mint-rules">
              <h5>1. Mint Boxes.</h5>
              <h5>
                2. Receive <b>LOL</b> and/or <b>NEAR</b> rewards.
              </h5>
              <h5>3. Share your results.</h5>
              <h5>
                4. Trade <b>LOL{"<>"}NEAR</b> after quest ends.
              </h5>
            </div>
            <Widget
              src="memelol.near/widget/lol.Components.MintBox"
              props={{
                contractName,
                methodName: "open_box",
                title: "Mint Box",
                canMint: false,
              }}
            />
          </div>
          <Widget
            src={`memelol.near/widget/lol.Components.MyStats`}
            props={{ contractName, transactionHashes: props.transactionHashes }}
          />
        </div>
        <Snow />
      </Overlay>
    </Section>

    <Section className="p-0 prize-img">
      <Overlay color="rgb(255 242 158 / 90%)">
        <div className="text-center font mb-5">
          <h1>Limited Prizes 🎁</h1>
        </div>
        {content.prizes && (
          <div className="d-flex flex-wrap gap-4 justify-content-center">
            {content.prizes.map((prize, i) => (
              <div key={`prize-${i}`}>
                <Card color={prize.color}>
                  <div className="d-flex p-2 pt-4 flex-column align-items-center">
                    <img className="meme" src={prize.src} />
                    <div className="d-flex flex-column gap-1">
                      <span className="font">Reward</span>

                      {prize.amountNear ? (
                        <>
                          <Token near size={40}>
                            <h2>{prize.amountNear}</h2>
                          </Token>
                          <Token size={25}>
                            <h4>{prize.amountLoL}</h4>
                          </Token>
                        </>
                      ) : (
                        <Token size={40}>
                          <h3>{prize.amountLoL}</h3>
                        </Token>
                      )}
                    </div>
                  </div>
                  <div className="avaliability d-flex p-2 flex-column justify-content-between">
                    <h5 className={"nowrap"}>
                      <small>Available:</small> <b>{format(stats.boxes[i])}</b>
                    </h5>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}
      </Overlay>
    </Section>
    <Section
      className="d-flex p-4 flex-wrap align-items-center justify-content-center"
      color="rgb(255 177 255)"
    >
      <Stats text="Participants" value={stats.participants} />
      <Stats text="Boxes Left" value={stats.boxesLeft} />
      <Stats near={true} text="Near Collected" value={stats.receivedNear} />
      <Stats near={false} text="LOL Collected" value={stats.receivedLoL} />
    </Section>
    <Section className="p-0 notbad-img">
      <Overlay color="rgb(148 182 255 / 90%)">
        <div className="text-center font">
          <h1>TOP Winners</h1>
        </div>
        <Widget
          src="memelol.near/widget/lol.Components.Leaderboard"
          props={{ contractName, assets }}
        />
      </Overlay>
    </Section>
    <Section
      className="d-flex flex-column align-items-center justify-content-center"
      color="#efefef"
    >
      <div className="text-center font mt-2">
        <h1>Mint FAQ</h1>
      </div>
      <div className="d-flex my-4 flex-column w-100 gap-2">
        {content.FAQ.box.map((faq, index) => (
          <Widget
            src="memelol.near/widget/lol.Components.FAQ"
            props={{ faq, index }}
          />
        ))}
      </div>
    </Section>
  </Container>
);
