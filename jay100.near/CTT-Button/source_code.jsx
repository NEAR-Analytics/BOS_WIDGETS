const cssFont = fetch(
  "https://fonts.googleapis.com/css?family=Press+Start+2P"
).body;

const Pixel = styled.div`
  background: aliceblue;
  width: 100%;
  font-size: 1.3rem;
  font-weight: 10rem;
  color: white;
  height: auto;
  margin: 10px;
  position: relative;
  display: inline-block;
  vertical-align: top;
  text-transform: uppercase;
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  line-height: 0;
  image-rendering: optimizeSpeed;
  image-rendering: -moz-crisp-edges; /* Firefox */
  image-rendering: -o-crisp-edges; /* Opera */
  image-rendering: -webkit-optimize-contrast; /* Webkit (non-standard naming) */
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */
  border-style: solid;
  border-width: 20px;
  border-image: url(https://i.imgur.com/sREM8Yn.png) 20 / 10 / 0 stretch;
  :active {
    top: 2px;
  }
  transition: all 0.2s ease-in-out;
  :hover{
    transform: scale(1.1);
   }
`;
const PixelText = styled.p`
  font-family: "Pixel Emulator", "Press Start 2P", "Courier new", "monospace";
  ${cssFont}
  font-size: 1.1rem;
  display: inline-block;
  vertical-align: top;
  position: relative;
  width: 100%;
  text-align: center;
  line-height: 1.5rem;
  margin: -20px;
  transition: all 0.2s ease-in-out 0s;
  padding: 1.5rem;
  background: radial-gradient(
        circle at 0px 0px,
        rgba(204, 0, 0, 0) 14px,
        rgb(0, 0, 0) 15px
      )
      left top / 50% 50% no-repeat,
    radial-gradient(
        circle at 100% 0px,
        rgba(204, 0, 0, 0) 14px,
        rgb(0, 0, 0) 15px
      )
      right top,
    radial-gradient(
        circle at 100% 100%,
        rgba(204, 0, 0, 0) 14px,
        rgb(0, 0, 0) 15px
      )
      right bottom,
    radial-gradient(
        circle at 0px 100%,
        rgba(204, 0, 0, 0) 14px,
        rgb(0, 0, 0) 15px
      )
      left bottom;
  background-repeat: no-repeat;
`;
const PixelContainer = styled.div`
  display: flex;
  width: 75%;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

const GameButton = () => {
  const data = props
    ? [
        { title: "Play Now", link: "https://pd.marmaj.org/chainteam" },
        { title: "TestNet", link: "https://pd-testnet.marmaj.org/chainteam" },
        {
          title: "Wiki",
          link: "https://github.com/MarmaJFoundation/chainteamtactics-wiki/wiki",
        },
        { title: "NFT", link: "https://mitntbase.xyz/" },
        {
          title: "Mobile",
          link: "https://pd-testnet.marmaj.org/chainteam/mainnet-ws.html",
        },
      ]
    : null;

  return (
    <div
      style={{
        backgroundColor: "rgb(12, 12, 31)",
        height: "100%",
        padding: ".6rem",
      }}
    >
      {data ? (
        <>
          {data.map((button) => {
            return (
              <a href={button.link}>
                <div className="row">
                  <div className="col-12">
                    <PixelContainer>
                      <Pixel>
                        <PixelText>{button.title}</PixelText>{" "}
                      </Pixel>{" "}
                    </PixelContainer>{" "}
                  </div>
                </div>
              </a>
            );
          })}
        </>
      ) : (
        <>
          <h1>No Data</h1>
        </>
      )}
    </div>
  );
};

return (
  <>
    <GameButton />
  </>
);
