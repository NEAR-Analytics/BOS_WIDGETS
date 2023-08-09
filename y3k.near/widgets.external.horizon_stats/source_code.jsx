let maa_raw_data = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/5d822809-9597-46f9-a6da-6c4e1aa36aa0/data/latest",
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);

const maa = maa_raw_data.body || [];

let daa_raw_data = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/a58db294-b9d0-44d6-9bf5-cfafbc67e847/data/latest",
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);

const daa_data = daa_raw_data.body || [];

let maa_avg_raw_data = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/c493c7b1-cfcc-4aee-ad79-869b4ed8ca90/data/latest",
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);

const maa_avg_data = maa_avg_raw_data.body || [];

let daa_avg_raw_data = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/c493c7b1-cfcc-4aee-ad79-869b4ed8ca90/data/latest",
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);

const daa_avg_data = daa_avg_raw_data.body || [];

return (
  <div class="container">
    <div class="row">
      <div class="col">
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body text-center">
            <div className="display-2">
              {maa[maa.length - 1]["Active Users"]}
            </div>{" "}
            {/* Large Number */}
            <h6 className="card-subtitle mb-2 text-muted">MAA</h6>
          </div>
        </div>
      </div>
      <div class="col">
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body text-center">
            <div className="display-2">
              {daa_data[daa_data.length - 1]["Active Users"]}
            </div>{" "}
            <h6 className="card-subtitle mb-2 text-muted">DAA</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
);
