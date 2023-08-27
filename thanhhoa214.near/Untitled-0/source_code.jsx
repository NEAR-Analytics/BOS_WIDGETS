function reportUptime() {
  asyncFetch("https://rpc.mainnet.near.org/status").then((res) => {
    const uptime = res.body.uptime_sec;
    Near.call("uptime.near", "reportUptime", { uptime });
  });
}

return <button onClick={reportUptime}>Report Uptime</button>;
