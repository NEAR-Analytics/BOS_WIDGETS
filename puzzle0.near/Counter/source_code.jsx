const [count, setCount] = useState(0);
const [page, setPage] = useState(0);
const [payment, setPayment] = useState(0);

let cost_per_item = 0.05;

const Button0024 = styled.button`
  font-size: 16px;
  font-weight: 700;
  color: #ff7576;
  background-color: #2b3044;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 12px 24px;
  position: relative;
  line-height: 24px;
  border-radius: 9px;
  box-shadow: 0px 1px 2px #2b3044, 0px 4px 16px #2b3044;
  transform-style: preserve-3d;
  transform: scale(var(--s, 1)) perspective(600px)
    rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  perspective: 600px;
  transition: transform 0.1s;

  .sp {
    background: linear-gradient(
      90deg,
      #866ee7,
      #ea60da,
      #ed8f57,
      #fbd41d,
      #2cca91
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    display: block;
  }

  &:active {
    transition: 0.3s;
    transform: scale(0.93);
  }
`;

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
          <Button0024 onClick={() => handleStartNew()}>Start New</Button0024>
        </div>
      );
    }
    case 1: {
      return (
        <div>
          <h1>Recycling for Bitcoin</h1>
          <p>Insert Can or Bottle</p>
          <p>Count: {count}</p>
          <Button0024 onClick={() => setCount(count + 1)}>+</Button0024>
          <Button0024 onClick={() => setPage(page - 1)} disabled={page === 0}>
            Back
          </Button0024>
          <Button0024 onClick={() => setPage(page + 1)} disabled={count === 0}>
            Next
          </Button0024>
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
          <Button0024 onClick={() => setPage(page + 1)}>Cash</Button0024>
          <Button0024 onClick={() => setPage(page + 2)}>Bitcoin</Button0024>
        </div>
      );
    }
    case 3: {
      return (
        <div>
          <h2>Cash</h2>
          <p>Bottle Refund Amount: ${getTotalRewards()}</p>
          <p>Printing Receipt</p>
          <Button0024 onClick={() => setPage(0)}>Complete</Button0024>
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
          <Button0024 onClick={() => setPage(0)}>Print</Button0024>
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
