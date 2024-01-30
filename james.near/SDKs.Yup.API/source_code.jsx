const [postId, setPostId] = useState(12294);

const [postData, setPostData] = useState(null);
const [error, setError] = useState(null);
const [isLoading, setIsLoading] = useState(false);

function fetchData() {
  let promise = asyncFetch(`https://api.yup.io/posts/post/${postId}`);

  promise.then((data) => {
    setPostData(data);
  });
}

return (
  <>
    <div className="m-3">
      <h3 className="m-2 mt-3">Social Hub</h3>
      <h5 className="m-2 mt-3">Yup API Call ~ Example</h5>
      <div className="m-2">
        <input
          type="text"
          placeholder="input specific post ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
        />
      </div>
      <div className="m-2">
        <button className="btn btn-outline-success mt-2" onClick={fetchData}>
          Get Data
        </button>
      </div>
    </div>
    <div className="m-3">
      <p className="m-3">{postData && JSON.stringify(postData)}</p>
    </div>
  </>
);
