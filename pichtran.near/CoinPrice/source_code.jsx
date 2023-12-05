const DATAPrice = (props) => {
  const keys = props.keys ?? [
    "wrap.near",
    "aurora",
    "2260fac5e5542a773aa44fbcfedf7c193bc2c599.factory.bridge.near",
    "aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near",
    "linear-protocol.near",
    "4691937a7508860f876c9c0a2a617e7d9e945d4b.factory.bridge.near",
    "17208628f84f5d6ad33f0da3bbbeb27ffcb398eac501a31bd6ad2011e36133a1",
  ];

  const tokenColors = [
    "green",
    "black",
    "orange",
    "red",
    "green",
    "black",
    "blue",
  ];

  const tokenImg = [
    "https://ipfs.near.social/ipfs/bafkreigy3uyyaianaeohczuys2bvwvfm6c6wtahbn5mwl6do5bk4w2fnni",
    "https://ipfs.near.social/ipfs/bafkreibddakqw35thdstr7vb2zohixpjth4ff26xciu2otxftjbifhnfpa",
    "https://ipfs.near.social/ipfs/bafkreihyafuo35nm3mifpmzsc546vco5bkj243mti3wmgwuzx663rkv7dy",
    "https://ipfs.near.social/ipfs/bafkreihc7fmdrxhzfozf6es5tujsvyqtgfq4nroctgptufmfyzkhrcuham",
    "https://ipfs.near.social/ipfs/bafkreiht5axwgfoptyf2b7o2omyfvdgxwsdtxg4rie3ivknj752ryjyqqy",
    "https://ipfs.near.social/ipfs/bafkreidggzeg2jomuhw5o7b2vqwf4jsgk6fof5dzgcep6kxpqnt6x45i3i",
    "https://ipfs.near.social/ipfs/bafkreihqkrr325occ7g7opo7csdhd7mp2nusfiqit4saa26agwyuc6754a",
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

      return (
        <div
          class="col"
          key={assetAccountId}
          style={{ color: tokenColors[index] }}
        >
          <img
            src={tokenImg[index]}
            alt={assetName}
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
          <div>{assetName}</div>
          <div>${price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}</div>
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
      border: 3px solid black;
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
          border: "5px solid black",
          borderRadius: "5px",
          padding: "10px",
        }}
      >
        {prices}
      </div>
    </CoinPrices>
  );
};
return <DATAPrice />;
