const styles = {
  bannerImage: {
    width: "6%",
    height: "auto",
    margin: "0",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "left",
  alignItems: "left",
  backgroundColor: "#90EE90",
};
const paragraph = {
  fontSize: "30px",
  color: "black",
  textAlign: "left",
  margin: "20px 0",
  marginLeft: "10px",
};

const paragraph1 = {
  fontSize: "60px",
  color: "	#8B4000",
  textAlign: "center",
  margin: "20px 0",
  marginLeft: "10px",
};

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
    "black",
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

  const fetchPrices = async () => {
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
        border-radius: 50%;
        width: 45px;
        height: auto;
      `;

      const LogoLink = styled.a`
        top: 20px;
        left: 20px;
        background-color: none;

        padding: 10px;
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
          className="col"
          key={assetAccountId}
          style={{ color: tokenColors[index] }}
        >
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

            <div>${price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}</div>
          </LogoLink>
        </div>
      );
    });

    setPrices(newPrices);

    // Schedule the next fetch after 10 seconds
    setTimeout(fetchPrices, 3000);
  };

  useEffect(() => {
    fetchPrices(); // Fetch prices on initial render
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
      text-align: center;
      border-radius: 5px;
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

if (!DATAPrice) {
  return "Loading...";
}

function Banner() {
  return (
    <div className="banner-container" style={containerStyle}>
      <p style={paragraph1}>
        <div style={containerStyle}>
          <img
            src="https://i.ibb.co/YNw7Ckv/photo-2022-06-15-12-02-28.jpg"
            alt="photo-2022-06-15-12-02-28"
            style={styles.bannerImage}
          />
        </div>{" "}
        LIVE CRYPTO PRICE{" "}
      </p>

      <h1>
        {" "}
        Welcome to our site we will let you know about the current market price
        of your famous cryptocurrencies. Track everything on one page.{" "}
      </h1>
      <br />
      <br />
    </div>
  );
}

function App() {
  return (
    <div>
      <Banner />
      <DATAPrice />;
    </div>
  );
}
return <App />;
