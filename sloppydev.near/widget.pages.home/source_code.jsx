const { Hero } = VM.require("commons.near/widget/home.Hero") || {
  Hero: () => <></>,
};
const { Exosystem } = VM.require("commons.near/widget/home.Exosystem") || {
  Exosystem: () => <></>,
};
const { Build } = VM.require("commons.near/widget/home.Build") || {
  Build: () => <></>,
};
const { Cards } = VM.require("commons.near/widget/home.Cards") || {
  Cards: () => <></>,
};
const { Footer } = VM.require("commons.near/widget/home.Footer") || {
  Footer: () => <></>,
};
const { Impact } = VM.require("commons.near/widget/home.Impact") || {
  Impact: () => <></>,
};
const { Modal, Button } = VM.require("buildhub.near/widget/components") || {
  Modal: () => <></>,
  Button: () => <></>,
};
const poppinsCss = fetch(
  "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
).body;
const rokkittCss = fetch(
  "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Rokkitt:ital,wght@0,100..900;1,100..900&display=swap"
);
const LeftColumnDripi =
  "https://ipfs.near.social/ipfs/bafkreicgueg4wurjzzdrcxoyi25uvwenbzarc6qahesvvvsfl25qpri2g4";
const ColumnModelR =
  "https://ipfs.near.social/ipfs/bafkreigxmtnllskqbzgm4ghcutgk55dfeu4dqu5es52nyv72tkff2gwsxy";
const ColumnModelL =
  "https://ipfs.near.social/ipfs/bafkreihu25a4aj3mi3kfvqwvn3q5wjrubq3nxbmpunnbiftltvlnt2u4yq";
const TopArch =
  "https://ipfs.near.social/ipfs/bafkreiftibkjr3teps4va7wd7chhlohhxa7fp3n35l5twu3o3olizvvelu";
const ScrollMask =
  "https://ipfs.near.social/ipfs/bafkreidi2yppuhqqv6b3acddqrddvldadibclg3cvcgbsqroj5lwmtgpvi";
const MiddleArc =
  "https://ipfs.near.social/ipfs/bafkreifs53iepsuuglzcffvzhgvcrcp2hlq4ustyhowlw55sssdp754hte";
const BuilderCircle =
  "https://ipfs.near.social/ipfs/bafybeif433aznu7345ynen2ixcyg7ygewbwkuc6y3bxstxbybpcw6hopla";
const Glow =
  "https://ipfs.near.social/ipfs/bafkreiez5qynxwerwizviolzcaxuq7qz7fgj4jt5x4onc2fyr5zb5tg6m4";
const GlowCenter =
  "https://ipfs.near.social/ipfs/bafybeid732rhjdehigkonncc5ojayufvfca4rrsyuwv6t3embwdsqmyrqy";
const Blocks =
  "https://ipfs.near.social/ipfs/bafkreidojwecmxrsaknl5n5qydr3y4hqckpgvhtr3wszuopeiqy45ccs5e";
const BigCircle =
  "https://ipfs.near.social/ipfs/bafkreiarw4c44ujtvvjq3rfw5oi5fdtq2vdvnctss7pzpti5riybun4ecu";
const SmallCircle =
  "https://ipfs.near.social/ipfs/bafkreigjute34d7gk366enhqubqkafy5e7dn6giqhpr5ibisvzjfk2ilrm";
const Eclipse =
  "https://ipfs.near.social/ipfs/bafkreihhrxl4haseaevansbeg3wcxn7jr2f2rfd3jzzdyqqlq3vinuy6wa";
const EclipseCenter =
  "https://ipfs.near.social/ipfs/bafkreifddwbqkpvocgkatructumeng3irjefne6fxvk3wuc5gbrg7zh34i";
const fetchedWords = fetch(
  "https://raw.githubusercontent.com/saadiqbal-dev/words/main/words.json"
).body;
if (!fetchedWords) {
  return "";
}
const words = JSON.parse(fetchedWords);
function divideArrayIntoThreeParts(arr) {
  const length = arr.length;
  const partSize = Math.floor(length / 3);
  const remainder = length % 3;
  const part1End = partSize + (remainder > 0 ? 1 : 0);
  const part2End = part1End + partSize + (remainder > 1 ? 1 : 0);
  const part1 = arr.slice(0, part1End);
  const part2 = arr.slice(part1End, part2End);
  const part3 = arr.slice(part2End);
  return [part1, part2, part3];
}
const [words1, words2, words3] = divideArrayIntoThreeParts(words);
const HomeContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: black;
  color: white;
  min-height: 100vh;
  overflow: clip;
  button {
    z-index: 5;
  }
  ${rokkittCss}
  ${poppinsCss}
`;
const ScrollMaskImg = styled.img`
  pointer-events: none;
  position: absolute;
  width: 100%;
  top: 180px;
  right: 0;
  z-index: 2;
`;
const TopArcImg = styled.img`
  pointer-events: none;
  position: absolute;
  width: 100%;
  opacity: 0.5;
  top: -80px;
`;
const MiddleArcImg = styled.img`
  pointer-events: none;
  position: absolute;
  width: 100%;
  top: 280px;
`;
const BuilderCircleImg = styled.img`
  pointer-events: none;
  position: absolute;
  width: 45%;
  top: -400px;
  right: 0;
  transform: translateY(50%);
`;
const GlowImg = styled.img`
  pointer-events: none;
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
`;
const BlockImg = styled.img`
  position: absolute;
  pointer-events: none;
  width: 70%;
  bottom: -50%;
  right: 0;
  /* transform: translateY(-50%); */
  z-index: 0;
`;
const BigCircleImg = styled.img`
  position: absolute;
  pointer-events: none;
  right: 0;
`;
const SmallCircleImg = styled.img`
  position: absolute;
  pointer-events: none;
  width: 30%;
  right: 0;
  bottom: -800px;
`;
const GlowCircle = styled.img`
  position: absolute;
  pointer-events: none;
  width: 50%;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
`;
const EclipseTop = styled.img`
  position: absolute;
  pointer-events: none;
  right: 0;
  top: 0;
  width: 30%;
  z-index: 1;
`;
const EclipseTopCenter = styled.img`
  position: absolute;
  pointer-events: none;
  right: 0;
  bottom: 0;
  width: 8%;
`;
const LeftColumnDripi_Img = styled.img`
  position: absolute;
  width: 20%;
`;
const ColumnModelR_Img = styled.img`
  position: absolute;
  top: 800px;
  z-index: 0;
  width: 40%;
  opacity: 0.4;
  left: -100px;
`;
const ColumnModelL_Img = styled.img`
  position: absolute;
  z-index: 1;
  top: 800px;
  width: 20%;
  opacity: 0.4;
`;
const ComingSoonBanner = styled.div`
  z-index: 3;
  position: absolute;
  display: flex;
  align-items: start;
  justify-content: center;
  padding: 48px;
  width: 95%;
  height: 250px;
  flex-shrink: 0;
  border-radius: 50px;
  border: 5px solid #000;
  background: linear-gradient(
      178deg,
      rgba(0, 0, 0, 0) 25.86%,
      rgba(0, 0, 0, 0.52) 101.16%
    ),
    rgba(124, 104, 134, 0.74);
  top: 30px;
  left: 32px;
  h3 {
    color: rgba(62, 46, 46, 0.79) !important;
    font-family: "Rokkitt", serif;
    font-size: 60px;
    font-style: normal;
    font-weight: 800;
    line-height: 156%; /* 93.6px */
    margin-top: -50px;
  }
  @media screen and (max-width: 768px) {
    h3 {
    }
    top: 32px;
    left: 20px;
  }
`;
const Scroll = styled.div`
  position: relative;
  z-index: 2;
  padding: 48px;
  border: none;
  border-radius: 50px !important;
  overflow: clip;
  h2 {
    font-size: 44px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    letter-spacing: -1.76px;
    span {
      background: linear-gradient(87deg, #eca227 39.02%, #fc8119 108.97%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 44px;
      font-style: normal;
      font-weight: 500;
      line-height: 120%;
      letter-spacing: -1.76px;
    }
  }
`;
const emailSubmitted = Storage.get("emailSubmitted");
const [showModal, setShowModal] = useState(false);
const [word, setWord] = useState(false);
const handleWordClick = (selectedWord) => {
  setShowModal((prev) => {
    return !prev;
  });
  // const filteredWord = words.filter((word) => word.Term === selectedWord);
  setWord(selectedWord);
};
return (
  <HomeContainer>
    <TopArcImg src={TopArch} />
    <div className="position-relative">
      <ScrollMaskImg src={ScrollMask} />
      <Hero />
      <GlowImg src={Glow} />
      <ColumnModelL_Img src={ColumnModelL} />
      <ColumnModelR_Img src={ColumnModelR} />
    </div>
    <MiddleArcImg src={MiddleArc} />
    <Scroll>
      <ComingSoonBanner>
        <h3>Coming Soon!</h3>
      </ComingSoonBanner>
      <h2>
        helpful <span>terms</span>
      </h2>
      <Widget
        src="commons.near/widget/home.hero.ScrollingText"
        props={{
          direction: "normal",
          words: words1,
          handleWordClick,
        }}
      />
      <Widget
        src="commons.near/widget/home.hero.ScrollingText"
        props={{
          direction: "reverse",
          words: words2,
          handleWordClick,
        }}
      />
      <Widget
        src="commons.near/widget/home.hero.ScrollingText"
        props={{
          direction: "normal",
          words: words3,
          handleWordClick,
        }}
      />
    </Scroll>
    <div>
      <ColumnModelL_Img src={ColumnModelL} />
      <ColumnModelR_Img src={ColumnModelR} />
      {/* <LeftColumnDripi_Img src={LeftColumnDripi} /> */}
    </div>
    <Widget src="commons.near/widget/home.CTA" loading={""} />
    {emailSubmitted !== "" ? (
      <>
        <div className="position-relative z-3 ">
          <Exosystem />
          <BuilderCircleImg src={BuilderCircle} />
        </div>
        <div className="z-1 position-relative ">
          <BigCircleImg src={BigCircle} />
          <SmallCircleImg src={SmallCircle} />
          <Build />
          <BlockImg src={Blocks} />
        </div>
        <div className="position-relative">
          <GlowCircle src={GlowCenter} />
          <Cards />
          <EclipseTop src={Eclipse} />
          <EclipseTopCenter src={EclipseCenter} />
        </div>
        <Impact />
      </>
    ) : (
      <div
        style={{
          zIndex: "1",
          padding: "48px",
          display: "flex",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <h1>
          Only those who can enter a valid email get to see the magic below.
          Think you have what it takes?
        </h1>
      </div>
    )}
    <Footer />
    <Modal
      open={showModal}
      // title={"Add or Challenge Definition"}
      onOpenChange={() => {
        setShowModal((prev) => {
          return !prev;
        });
      }}
    >
      <Button
        variant="primary"
        style={{
          pointerEvents: "none",
          borderRadius: "25px",
        }}
      >
        {word.Term}
      </Button>
      <div>{word.Definition}</div>
      <br />
      <div
        style={{
          display: "flex",
          gap: "16px",
        }}
      >
        {" "}
        <Button type="icon">
          <i className="bi bi-plus"></i>
        </Button>
        <Button variant="primary">Challenge</Button>
      </div>
    </Modal>
  </HomeContainer>
);
