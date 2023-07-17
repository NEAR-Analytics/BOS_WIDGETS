const ButtonContainer = styled.div`
    padding: 5px;
    background: rgb(14, 14, 30);
    font-family: "Pixel Emulator", "Press Start 2P", Courier new, monospace;
    color: #f8f8f8;
    text-shadow: 2px 0 0 #000, 0 2px 0 #000;
    text-align: center;
	max-width: 100%;
	margin: 0 auto;
	font-family: 'Maven Pro', sans-serif;
    text-align: center;
`;

const ButtonText = styled.span`
    background: rgba(30, 40, 70, 1);
	display: inline-block;
	position: relative;
	text-align: center;
	font-size: 1rem;
	padding: 1rem;
	font-family: cursive;
	text-decoration: none;
	color: white;
	box-shadow: inset -4px -4px 0px 0px rgb(32, 41, 55);

    :hover{
        background: rgba(255,255,255,.5);
	    box-shadow: inset -6px -6px 0px 0px rgb(32, 41, 55);
    }

    :focus{
        background: rgba(255,255,255,.5);
	    box-shadow: inset -6px -6px 0px 0px rgb(32, 41, 55);
    }

    :active{
        box-shadow: inset 4px 4px 0px 0px rgb(32, 41, 55);
    }

    :before{
        content: '';
	    position: absolute;
	    width: 100%;
	    height: 100%;
	    box-sizing: content-box;
        top: -6px;
	    left: 0;
	    border-top: 6px black solid;
	    border-bottom: 6px black solid;
    }

    :after{
        content: '';
	    position: absolute;
	    width: 100%;
	    height: 100%;
	    box-sizing: content-box;
        top: -6px;
	    left: 0;
	    border-top: 6px black solid;
	    border-bottom: 6px black solid;
    }
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
        height: "58vh",
        padding: ".6rem",
      }}
    >
      {data ? (
        <>
          {data.map((button) => {
            return (
              <a href={button.link}>
                <ButtonContainer className="col">
                  <ButtonText className="w-100">{button.title}</ButtonText>
                </ButtonContainer>
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
