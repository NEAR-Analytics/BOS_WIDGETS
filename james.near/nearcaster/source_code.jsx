const [apiKey, setApiKey] = useState("DEC72E1F-9F06-4913-BC69-48748E1D39F3");
const [viewerId, setViewerId] = useState(235259);
const [targetId, setTargetId] = useState(195725);

const [farData, setFarData] = useState(null);
const [error, setError] = useState(null);
const [isLoading, setIsLoading] = useState(false);

const headers = {
  method: "GET",
  headers: {
    api_key: `${apiKey}`,
  },
};

function fetchData() {
  const params = {
    target_fid: targetId, // 195725
    viewer_fid: viewerId, // 235259
  };

  console.log(params);

  const urlSearchParams = Object.keys(params)
    .map((param) => `${param}=${params[param]}`)
    .join("&");

  console.log(urlSearchParams);

  let promise = asyncFetch(
    `https://api.neynar.com/v2/farcaster/followers/relevant?${urlSearchParams}`,
    headers
  );

  promise.then((data) => {
    setFarData(data);
  });
}

return (
  <>
    <div className="m-3">
      <h3 className="m-2">Social Hub</h3>
      <h5 className="m-2 mt-3">Farcaster Social Graph</h5>
      <div className="m-2">
        <input
          type="text"
          placeholder="Neynar API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      </div>
      <h5 className="m-2 mt-3">Target FID</h5>
      <div className="m-2">
        <input
          type="text"
          placeholder="whose profile you are looking at"
          value={targetId}
          onChange={(e) => setTargetId(e.target.value)}
        />
      </div>
      <h5 className="m-2 mt-3">Viewer FID</h5>
      <div className="m-2">
        <input
          type="text"
          placeholder="who is looking at the profile"
          value={viewerId}
          onChange={(e) => setViewerId(e.target.value)}
        />
      </div>
      <div className="m-2">
        <button className="btn btn-outline-success mt-2" onClick={fetchData}>
          Get Data
        </button>
      </div>
    </div>
    <div className="m-3">
      <p className="m-3">{farData && JSON.stringify(farData)}</p>
    </div>
  </>
);
