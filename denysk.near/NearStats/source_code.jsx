const data = fetch("https://front.near-staking.com/api/near", {
  subscribe: true,
  method: "GET",
  headers: {
    Accept: "*/*",
  },
});

console.log(data);

if (data !== null && data.ok === false) {
  return (
    <div className="text-bg-light rounded-4 p-3 mb-3">
      <p>houston we have a problem, wen mon ser?</p>
    </div>
  );
} else {
  return (
    <div className="text-bg-light rounded-4 p-3 mb-3">
      {data !== null ? (
        <p>
          <div class="d-flex clearfix flex-wrap flex-column flex-sm-row">
            <div class="p-2">
              <div>Average Block Time (ABT) Now</div>
              <small>last 30 seconds</small>
              <span class="text-success h3">
                <b>{JSON.parse(data.body.avg_block_time).toFixed(2)}</b> sec
              </span>
            </div>
            <div class="p-2">
              <div>TPS Now</div>
              <span class="text-success h3">
                <b>{JSON.parse(data.body.tps).toFixed(2)}</b>
              </span>
              <div>in around the block: </div>
              <b>{JSON.parse(data.body.tps_block)}</b>
            </div>
          </div>
          <div class="d-flex clearfix flex-wrap flex-column flex-sm-row">
            <div class="p-2">
              <div>ABT 30D High</div>
              <span class="h5">
                <b>{JSON.parse(data.body.block_time_high).toFixed(2)}</b> sec
              </span>
            </div>
            <div class="p-2">
              <div>ABT 30D Low</div>
              <span class="h5">
                <b>{JSON.parse(data.body.block_time_low).toFixed(2)}</b> sec
              </span>
            </div>
          </div>
          <div class="p-2">
            <small>
              widget sponsored by{" "}
              <a
                target="_blank"
                style={{ color: "inherit" }}
                variant="caption"
                rel="nofollow"
                href="https://www.nearweek.com"
              >
                <b>NEARWEEK</b>
              </a>
            </small>
          </div>
        </p>
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  );
}
