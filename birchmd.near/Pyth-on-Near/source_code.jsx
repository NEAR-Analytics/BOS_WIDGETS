initState({
  priceId: "c415de8d2eba7db216527dff4b60e8f3a5311c740dadb233e13e12547e226750",
  price: null,
  vaa: null,
});

const setPriceId = (priceId) => {
  State.update({ priceId });
};

const getPrice = () => {
  const priceId = state.priceId;
  const response = fetch(
    "https://xc-mainnet.pyth.network/api/latest_price_feeds?binary=true&ids[]=" +
      priceId
  );
  const price = JSON.stringify(response.body[0].price);
  const vaa = response.body[0].vaa;
  console.log(JSON.stringify(response));
  State.update({ price, vaa });
};

const publishPrice = () => {
  const response = Near.call(
    "pyth.birchmd.near",
    "update_price_feeds",
    {
      vaas: [state.vaa],
      fee: "1",
    },
    300000000000000
  );
  console.log(JSON.stringify(response));
};

return (
  <>
    <select id="selectPair" onChange={(e) => setPriceId(e.target.value)}>
      <option value="c415de8d2eba7db216527dff4b60e8f3a5311c740dadb233e13e12547e226750">
        NEAR/USD
      </option>
      <option value="ff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace">
        ETH/USD
      </option>
      <option value="c96458d393fe9deb7a7d63a0ac41e2898a67a7750dbd166673279e06c868df0a">
        ETH/BTC
      </option>
    </select>
    <div>Price: {state.price}</div>
    <div>
      <button onClick={getPrice}>Refresh</button>
    </div>
    <div>
      <button onClick={publishPrice}>Publish on-chain</button>
    </div>
  </>
);
