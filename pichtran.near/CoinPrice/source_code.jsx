const DATAPrice = (props) => {
  const keys = props.keys ?? [
    "wrap.near",
    "aurora",
    "2260fac5e5542a773aa44fbcfedf7c193bc2c599.factory.bridge.near",
    "aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near",
    "linear-protocol.near",
    "4691937a7508860f876c9c0a2a617e7d9e945d4b.factory.bridge.near",
  ];

  const tokenColors = [
    "green",
    "#3b0380",
    "orange",
    "red",
    "green",
    "white",
    "blue",
  ];

  const checkPriceLink = "https://www.coingecko.com/en/coins/";

  const linkToken = [
    "near",
    "ethereum",
    "bitcoin",
    "aurora-near",
    "inear-protocol",
    "woo-network",
  ];

  const tokenImg = [
    "https://ipfs.near.social/ipfs/bafkreigy3uyyaianaeohczuys2bvwvfm6c6wtahbn5mwl6do5bk4w2fnni",
    "https://ipfs.near.social/ipfs/bafkreibddakqw35thdstr7vb2zohixpjth4ff26xciu2otxftjbifhnfpa",
    "https://ipfs.near.social/ipfs/bafkreihyafuo35nm3mifpmzsc546vco5bkj243mti3wmgwuzx663rkv7dy",
    "https://ipfs.near.social/ipfs/bafkreihc7fmdrxhzfozf6es5tujsvyqtgfq4nroctgptufmfyzkhrcuham",
    "https://ipfs.near.social/ipfs/bafkreiht5axwgfoptyf2b7o2omyfvdgxwsdtxg4rie3ivknj752ryjyqqy",
    "https://ipfs.near.social/ipfs/bafkreidggzeg2jomuhw5o7b2vqwf4jsgk6fof5dzgcep6kxpqnt6x45i3i",
  ];

  const [prices, setPrices] = useState([]);

  const fetchPrices = () => {
    let priceData = Near.view("priceoracle.near", "get_price_data", {});
    let assetsData = Near.view("oracle-prices.near", "get_config", { keys });

    let priceDataPrepared = [];
    priceData.prices.map(
      (data) => (priceDataPrepared[data.asset_id] = data.price)
    );

    let newPrices = assetsData.map((asset, index) => {
      let assetAccountId = asset[0];
      let assetName = asset[1].token_name;
      let assetDecimals = asset[1].decimals;

      let assetPrice = priceDataPrepared[assetAccountId];
      let price = new Big(assetPrice.multiplier).div(
        new Big(10).pow(assetPrice.decimals - assetDecimals)
      );
      const Logo = styled.img`
  border-radius:50%;
  width: 45px; 
  height: auto;
  
`;

      const Div0019 = styled.div`
    display: inline-block; 
  cursor: pointer;
  margin: 0 auto;
  position: relative;
  text-decoration: none;
  font-weight: 600;
  border-radius: 6px;
  overflow: hidden;
  padding: 3px;
  isolation: isolate;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(115deg, #4fcf70, #fad648, #a767e5, #12bcfe, #44ce7b);
    background-size: 200% 100%;
    animation: gradientMove 1.5s linear infinite;
    border-radius: 6px;
  }

  span {
    position: relative;
    display: inline-block;
    padding: 1rem 1.5rem;
    font-size: 1.1rem;
    background: #000;
    border-radius: 3px;
    height: 100%;
    z-index: 1;
    text-decoration: none;
  }
  
  @keyframes gradientMove {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }`;

      const LogoLink = styled.a`
  top: 20px;
  left: 20px;
  background-color: none;


   &:hover {
    & > ${Logo} {
      animation: tilt 1s ease infinite;
    }
  }

  @keyframes tilt {
    0% { transform: rotateZ(0deg); }
    25% { transform: rotateZ(-5deg); }
    50% { transform: rotateZ(5deg); }
    75% { transform: rotateZ(-5deg); }
    100% { transform: rotateZ(5deg); }
  }
`;
      return (
        <div
          class="col"
          key={assetAccountId}
          style={{ color: tokenColors[index] }}
        >
          <Div0019>
            <span>
              <LogoLink
                href={`${checkPriceLink}${linkToken[index]}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  transition: "background-color 0.3s, transform 0.3s",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f0f0f0";
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <Logo
                  src={tokenImg[index]}
                  alt={assetName}
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />

                <div>{assetName}</div>

                <div>
                  ${price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                </div>
              </LogoLink>
            </span>
          </Div0019>
        </div>
      );
    });

    setPrices(newPrices);
  };

  useEffect(() => {
    fetchPrices();

    const intervalId = setInterval(fetchPrices, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const H5 = styled.h5`
    font-family: Century Gothic, CenturyGothic, AppleGothic, sans-serif;
    color: black;
    
  `;

  const CoinPrices = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .col {
      flex: 1;
      padding: 10px;
      text-align: center;
      border-radius: 5px;
      margin: 5px; /* Added margin for better spacing */
    }

    h5 {
      font-family: Century Gothic, CenturyGothic, AppleGothic, sans-serif;
      color: black;
      text-align: center;
      margin:10px;
    }

    @media (max-width: 768px) {
      /* Adjust styles for smaller screens */
      .col {
        flex: 1;
        margin: 5px;
        width: 100%; /* Full width on smaller screens */
      }
    }
  `;

  return (
    <CoinPrices class="container">
      <div
        class="row"
        style={{
          padding: "10px",
        }}
      >
        {prices}
      </div>
    </CoinPrices>
  );
};
return <DATAPrice />;
