import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Big from "big.js";

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
    // Fetch priceData and assetsData here...

    // Existing code for processing data...

    let newPrices = assetsData.map((asset, index) => {
      // Existing code for mapping assets...

      return (
        <div
          className="col"
          key={assetAccountId}
          style={{
            backgroundColor: "#f5f5f5",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <LogoLink
            href={`${checkPriceLink}${linkToken[index]}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Logo src={tokenImg[index]} alt={assetName} />
            <div>{assetName}</div>
            <div>${price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}</div>
          </LogoLink>
        </div>
      );
    });

    setPrices(newPrices);

    // Schedule the next fetch after 10 seconds
    setTimeout(fetchPrices, 10000);
  };

  useEffect(() => {
    fetchPrices(); // Fetch prices on initial render
  }, []);

  const Logo = styled.img`
    border-radius: 50%;
    width: 45px;
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

    .col {
      flex: 1;
      text-align: center;
      border-radius: 5px;
      margin: 10px;
    }

    @media (max-width: 768px) {
      .col {
        flex: 1;
        margin: 5px;
        width: 100%;
      }
    }
  `;

  return (
    <CoinPrices className="container">
      <div className="row">
        {prices.length === 0 ? (
          <div>Loading...</div>
        ) : (
          prices.map((token, index) => token)
        )}
      </div>
      <OpenWebAcademyNod>👀 A nod to Open Web Academy 👀</OpenWebAcademyNod>
    </CoinPrices>
  );
};

const OpenWebAcademyNod = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
`;

export default DATAPrice;
