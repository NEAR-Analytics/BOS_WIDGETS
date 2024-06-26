const keys = props.keys ?? [
  "wrap.near",
  "aurora",
  "2260fac5e5542a773aa44fbcfedf7c193bc2c599.factory.bridge.near",
  "aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near",
  "linear-protocol.near",
  "4691937a7508860f876c9c0a2a617e7d9e945d4b.factory.bridge.near",
];

const tokenColors = [
  "red",
  "#3b0380",
  "blue",
  "black",
  "blue",
  "green",
  "pink",
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

const Col = styled.div`
    flex: 10;
    text-align: center;
    border-radius: 400px;
    padding: 15px;
    margin: 40px;
    background-color: #f5f5f5;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 2px solid ${(props) => props.color};
  `;

const Logo = styled.img`
    border-radius: %;
    width: 55px;70
    height: auto;
  `;

const LogoLink = styled.a`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: inherit;
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
      background-color: #f0f0f0;
      transform: scale(1.1);
    }
  `;

const CoinPrices = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @media (max-width: 768px) {
      .col {
        flex: 1;
        margin: 5px;
        width: 100%;
      }
    }
  `;

const fetchPrices = async () => {
  // Fetch priceData and assetsData here...

  // Existing code for processing data...

  let newPrices = keys.map((asset, index) => {
    // Existing code for mapping assets...

    return (
      <Col key={assetAccountId} color={tokenColors[index]}>
        <LogoLink
          href={`${checkPriceLink}${linkToken[index]}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Logo src={tokenImg[index]} alt={assetName} />
          <div>{assetName}</div>
          <div>${price}</div>
        </LogoLink>
      </Col>
    );
  });

  State.update({ prices: newPrices });

  // Schedule the next fetch after 10 seconds
  setTimeout(fetchPrices, 10000);
};

if (!state.prices) {
  fetchPrices();
}

return (
  <CoinPrices className="container">
    <div className="row">
      {state.prices.length === 0 ? (
        <div>Loading...</div>
      ) : (
        state.prices.map((token, index) => token)
      )}
    </div>
  </CoinPrices>
);
