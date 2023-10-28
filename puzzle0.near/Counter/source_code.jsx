const [count, setCount] = useState(0);
const [page, setPage] = useState(0);
const [payment, setPayment] = useState(0);

let cost_per_item = 0.05;

const getTotalRewards = () => {
  return count * cost_per_item;
};

const getBitcoinRewards = () => {
  return ((count * cost_per_item) / bitcoinPrice()) * 100000000;
};

function bitcoinPrice() {
  const response = fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
  );
  console.log(response);
  const bitcoinPrice = response.body.bitcoin.usd;
  return bitcoinPrice;
}

function handleStartNew() {
  setCount(0); // Reset count to zero when Start New is clicked
  setPage(1); // Move to the next page after resetting the count
}

function Page() {
  switch (page) {
    case 0: {
      return (
        <div>
          <h1>Start A Recycling Session</h1>
          <button onClick={() => handleStartNew()}>Start New</button>
        </div>
      );
    }
    case 1: {
      return (
        <div>
          <h1>Recycling for Bitcoin</h1>
          <p>Insert Can or Bottle</p>
          <p>Count: {count}</p>
          <button onClick={() => setCount(count + 1)}>+</button>
          <button onClick={() => setPage(page - 1)} disabled={page === 0}>
            Back
          </button>
          <button onClick={() => setPage(page + 1)} disabled={count === 0}>
            Next
          </button>
        </div>
      );
    }
    case 2: {
      return (
        <div>
          <h2>Summary + Choose Payment</h2>
          <p>Recycling Count: {count}</p>
          <p>Price Per Recycled Item: ${cost_per_item} </p>
          <p>Bottle Refund Amount: ${getTotalRewards()}</p>
          <p>Bitcoin Price: ${bitcoinPrice()}</p>
          <p>BTC Rewards Amount: {getBitcoinRewards()} Satoshis</p>
          <p>Select Payment Type:</p>
          <button onClick={() => setPage(page + 1)}>Cash</button>
          <button onClick={() => setPage(page + 2)}>Bitcoin</button>
        </div>
      );
    }
    case 3: {
      return (
        <div>
          <h2>Cash</h2>
          <p>Bottle Refund Amount: ${getTotalRewards()}</p>
          <p>Printing Receipt</p>
          <button onClick={() => setPage(0)}>Complete</button>
        </div>
      );
    }
    case 4: {
      return (
        <div>
          <h2>Bitcoin</h2>
          <p>BTC Rewards Amount: {getBitcoinRewards()} Satoshis</p>
          <p>Displaying LNURL</p>
          <a href="https://imgur.com/PnpEJTj">
            <img
              src="https://i.imgur.com/PnpEJTjb.png"
              title="source: imgur.com"
            />
          </a>
          <p></p>
          <button onClick={() => setPage(0)}>Print</button>
        </div>
      );
    }
  }
}

return (
  <div>
    <Page />
  </div>
);
