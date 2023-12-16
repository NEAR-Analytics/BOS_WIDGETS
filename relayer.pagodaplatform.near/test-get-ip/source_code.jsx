const getIp = async () => {
  console.log("getIp");
  asyncFetch("https://httpbin.org/ip").then((res) => {
    console.log("res", res.body.origin);
  });
};

return (
  <div>
    <button onClick={() => getIp()}>GET IPs</button>
  </div>
);
