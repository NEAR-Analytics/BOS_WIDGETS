let y = { count: 0 };
function z() {
  console.log("calling");
  y = fetch("https://near-pickem.vercel.app/api/url");
  console.log(y);
  return y;
}

return <button onClick={() => z()}> Get counter: {y.count}</button>;
