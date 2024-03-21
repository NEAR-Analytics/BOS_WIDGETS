const number = Near.view("near-deutsch.testnet", "get_num", {}, "");

// you need to first check that the value was obtained
if (number === null) return "Loading...";

return (
    <div>
      <div>The value of the counter is: {number}</div>
    </div>
);