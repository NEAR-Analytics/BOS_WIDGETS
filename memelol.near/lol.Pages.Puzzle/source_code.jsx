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

      &.my-puzzles {
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

const Piece = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border: 3px solid #fff;
  background-color: ${(p) => (p.filled ? "transparent" : "#fff")};
  background-image: url(${(p) =>
    p.filled
      ? ""
      : "https://ipfs.near.social/ipfs/bafkreibvtnvcudgncx3dwx2hnh7xyhbddyagx7tewmrdrq5jcejz5kr7jm"});
  background-size: 40px;
  background-repeat: no-repeat;
  background-position: 28px;
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
  padding: 25px;
  background: #fff;
  text-align: center;
  border: 3px solid black;
  border-radius: 20px;
  box-shadow: 0px 20px 30px 0px rgba(0, 0, 0, 0.25);

  h1 {
    line-height: 1rem;
  }

  h3 {
    width: 100px;
  }

  .puzzle-img {
    width: 300px;
    height: 300px;
    border-radius: 20px;
    background: url(${(p) => p.src});
    background-repeat: no-repeat;
    background-size: cover;
  }
`;

const PUZZLE_PIECES = 9;
const PUZZLE_ROWS = 3;
const PUZZLE_COLS = 3;

const [puzzles, setPuzzles] = useState({
  puzzles: [],
});

const fetchPuzzles = () => {
  //const puzzles = Near.view(contractName, "get_user_puzzles");

  setPuzzles([
    ["00", "01", "03", "08"],
    ["10", "11", "12", "13", "14", "15", "16"],
    ["20", "21", "22", "23", "24", "25", "26", "27", "28"],
    [],
    ["50", "52", "53", "58"],
    [],
    ["77"],
    [],
    ["80", "82"],
  ]);
};

const images = [
  "https://upload.wikimedia.org/wikipedia/ru/thumb/7/78/Trollface.svg/1280px-Trollface.svg.png",
  "https://i.pinimg.com/736x/dc/3c/36/dc3c366671b195dbe22c14625ef764bb.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuRnae3eMwO8xKVvOr7UcF55qYJBGfNCOvyA&usqp=CAU",
  "https://e1.pngegg.com/pngimages/118/845/png-clipart-memes-troll-face-thumbnail.png",
  "https://images.freeimages.com/vhq/images/previews/e69/yaoming-meme-129631.png?fmt=webp&w=500",
  "https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg",
  "https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg",
  "https://e7.pngegg.com/pngimages/865/664/png-clipart-rage-face-troll-face-people-troll-face.png",
  "https://assets.stickpng.com/images/580b585b2edbce24c47b2a2f.png",
];

const canWithdraw = (pieces) => pieces.length === PUZZLE_PIECES;

fetchPuzzles();

return (
  <Container className="d-flex flex-column gap-4">
    <Navigation />
    <Section className="p-0 position-relative banner-img">
      <Overlay color="rgb(89 110 255 / 80%)">
        <div className="wrapper d-flex align-items-center gap-3 justify-content-center">
          <div className="mint-section">
            <h1 className="font">Complete a Puzzle 🧩</h1>
            <div className="mint-rules">
              <h5>
                1. Use your <b>$LOL</b> to mint a puzzle piece.
              </h5>
              <h5>2. Complete a puzzle.</h5>
              <h5>3. Withdraw reward.</h5>
              <h5>4. Share your results.</h5>
            </div>
            <Widget
              src="memelol.near/widget/lol.Components.MintBox"
              props={{
                contractName,
                methodName: "mint_puzzle",
                title: "Mint Puzzle",
                canMint: true,
              }}
            />
          </div>
        </div>
        <Snow />
      </Overlay>
    </Section>

    <Section className="p-0">
      <Overlay color="rgb(255 242 158 / 90%)">
        <div className="text-center font mb-5">
          <h1>Your Puzzles</h1>
        </div>
        <div className="d-flex flex-wrap gap-4 justify-content-center">
          {puzzles.map((puzzle, i) => (
            <Card src={images[i]}>
              <div className="d-flex justify-content-center gap-4 flex-column align-items-center">
                <div className="puzzle-img d-flex flex-column">
                  {[...Array(PUZZLE_COLS).keys()].map((col) => (
                    <div className="d-flex">
                      {[...Array(PUZZLE_ROWS).keys()].map((row) => (
                        <Piece
                          filled={puzzle.includes(
                            `${i}${PUZZLE_COLS * col + row}`,
                          )}
                        />
                      ))}
                    </div>
                  ))}
                </div>

                <div className="w-75 d-flex flex-column gap-1">
                  <div className="d-flex align-items-center justify-content-between">
                    <small>Completed:</small>
                    <b className="font">
                      {puzzle.length} / {PUZZLE_COLS * PUZZLE_ROWS}
                    </b>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <small>Reward:</small>
                    <Token size={20}>
                      <h4>100000</h4>
                    </Token>
                  </div>
                </div>

                <Button
                  className={`button ${
                    !canWithdraw(puzzle) || !context.accountId ? "disabled" : ""
                  }`}
                  onClick={() => {}}
                >
                  <span>Withdraw</span>
                  <i className="bi bi-cash-stack" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Overlay>
    </Section>

    <Section
      className="d-flex flex-column align-items-center justify-content-center"
      color="#efefef"
    >
      <div className="text-center font mt-2">
        <h1>Puzzle FAQ</h1>
      </div>
      <div className="d-flex my-4 flex-column w-100 gap-2">
        {content.FAQ.puzzle.map((faq, index) => (
          <Widget
            src="memelol.near/widget/lol.Components.FAQ"
            props={{ faq, index }}
          />
        ))}
      </div>
    </Section>
  </Container>
);
