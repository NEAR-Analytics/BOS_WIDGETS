const z = () => {
  console.log("calling");
  const y = fetch("https://near-pickem.vercel.app/api/url");
  return y;
};

return <button onClick={() => z}> Get counter {y.count}</button>;
