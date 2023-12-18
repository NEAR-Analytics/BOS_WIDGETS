const boxStyle = {
  padding: "15px",
  margin: "0px",
  display: "inline-block",
  backgroundColor: "#0D1282",
  color: "#fff",
  cursor: "pointer",
  float: "left",
  display: "block",
};

const createPostBoxStyle = {
  ...boxStyle,
  backgroundColor: "#fff",
};

const navbarContainerStyle = {
  margin: "0px",
  display: "flex",
  backgroundColor: "#0D1282",
};

const heapHeapHoorayBoxStyle = {
  ...boxStyle,
  fontFamily: "Verdana, sans-serif", // Different background color for "Heapheap Hooray"
  fontSize: "20px",
};

const [isFocused, setIsFocused] = useState(false);

const inputStyle = {
  fontSize: "20px",
  color: "#000", // Text color
  backgroundColor: "white",
  border: `${isFocused ? "2px" : "1px"} solid black`, // Border changes to black when focused
  padding: "10px", // Adjust padding as needed
};

const handleMouseEnter = (e) => {
  e.target.style.color = "gray";
};

const handleMouseLeave = (e) => {
  e.target.style.color = "white";
};

const [title, setTitle] = useState("");
const [content, setContent] = useState("");

const abi = fetch(
  `https://gist.githubusercontent.com/idea2547/2e993b25c45e150d14d1e0077de47e6d/raw/337986ada07a870838a6a977f6d48176fb995353/gistfile1.txt`
);

const TutorContract = new ethers.Contract(
  "0x1D7098360A9e77A58C4D38df9261335bD74d44d5",
  abi.body,
  Ethers.provider().getSigner()
);

const handleCreatePost = () => {
  try {
    TutorContract.createPost(content, title).then((transactionHash) => {
      console.log(transactionHash);
    });
    // State.createPost({ _content: content, _title: title });
  } catch (error) {
    console.error("Error creating post:", error.message);
  }
};

return (
  <div
    style={{
      fontFamily: "Verdana",
      backgroundColor: "#fff",
      color: "#000",
      height: "100vh",
    }}
  >
    <ul style={navbarContainerStyle}>
      <li style={heapHeapHoorayBoxStyle}>
        <a
          href="theerin_petch.near/widget/callContract"
          style={{ textDecoration: "none", color: "#fff" }}
        >
          Heapheap Hooray
        </a>
      </li>
    </ul>
    <div style={{ padding: "4%" }}>
      <div>
        <div style={{ marginBottom: "5%" }}>
          <label for="postTitle" style={{ fontSize: "20px" }}>
            Post Title:
          </label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            placeholder="Your Title"
            style={inputStyle}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          ></input>
        </div>

        <div>
          <label for="postContent" style={{ fontSize: "20px" }}>
            Post Content:
          </label>
        </div>
        <div>
          <textarea
            id="postContent"
            name="postContent"
            placeholder=" Your Content"
            rows="8"
            style={{ width: "100%", fontSize: "20px" }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <div class="text-end mt-3">
            <div class="mb-2">
              <button
                type="button"
                class="btn btn-primary"
                style={{
                  fontSize: "20px",
                  backgroundColor: "#0D1282",
                  color: "white",
                  transition: "color 0.3s ease-in-out",
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleCreatePost}
              >
                Submit Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
