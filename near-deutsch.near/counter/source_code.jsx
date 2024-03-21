const number = Near.view("counter.near-deutsch.testnet", "get_num", {}, "", true);

// you need to first check that the value was obtained
if (number === null) return "Loading...";

return (
    <div>
      <div>The value of the counter is: ${number}</div>
    </div>
);