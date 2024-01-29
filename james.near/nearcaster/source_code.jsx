const [apiKey, setApiKey] = useState("");

const [farData, setFarData] = useState(null);
const [error, setError] = useState(null);
const [isLoading, setIsLoading] = useState(false);

const data = fetch("https://cc28c3.hubs.neynar.com:2281");

const headers = {
  method: "GET",
  headers: {
    api_key: `${apiKey}`,
    target_fid: 195725,
    viewer_fid: 235259,
  },
};

function fetchData() {
  const promise = asyncFetch(
    "https://api.neynar.com/v2/farcaster/followers/relevant",
    { headers }
  );

  promise.then((res) => {
    setFarData(res.body);
  });
}

return (
  <>
    <div className="m-3">
      <h3 className="mb-2">Social Hub</h3>
      <h5 className="mb-2">Farcaster Social Graph</h5>
      <input
        type="text"
        placeholder="Neynar API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
      <button className="btn btn-outline-success mt-3" onClick={fetchData}>
        Get Data
      </button>
    </div>
    <div className="m-3">
      <p>{JSON.stringify(farData)}</p>
    </div>
  </>
);
