const postDetail = {
  title: "Titanic is so good but . . .",
  content: "Titanic is sick, but why Jack died, he could just get on the door!",
  author: "James Cameron",
  datetime: "1995-10-20 10:00",
  votingPoints: 50,
};

const postId = props.location.state
  ? props.location.state.data
  : "No data received";

// const postId = 6;

console.log("PostIdType:", typeof postId);
console.log("PostId:", postId);

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

const searchPostBoxStyle = {
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

const Comment = ({ comments }) => {
  const commentBoxStyle = {
    width: "97%", // Adjust the width as needed
    margin: "0px",
    marginLeft: "1%",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid transparent", // Transparent main border
    borderBottom: "1px solid #ccc", // Visible right border
  };

  const votingSectionStyle = {
    width: "20%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  };

  const buttonStyle = {
    padding: "10px 15px",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    outline: "none",
    marginLeft: "15%",
  };
  return (
    <div style={commentBoxStyle}>
      <div className="comment">
        <div>{comments.comment}</div>
        <div style={{ color: "#333", fontSize: "12px" }}>{comments.author}</div>
        <div className="comment-info">
          <p style={{ color: "#333", fontSize: "12px" }}>
            Commented at: {comments.datetime}
          </p>
        </div>
      </div>

      <div style={votingSectionStyle}>
        <p style={{ margin: "10px", fontSize: "20px", color: "#0D1282" }}>
          {comments.votingPoints}
        </p>
        <button
          type="button"
          style={buttonStyle}
          className="btn btn-success vote-btn"
          onClick={() => console.log("Vote")}
        >
          Vote
        </button>
      </div>
    </div>
  );
};

const abi = fetch(
  `https://gist.githubusercontent.com/idea2547/6918a9564618da24aab88d248db2b520/raw/d2d666c37c852ab2a7119d7bcf53dd89fe2cf9c9/gistfile1.txt`
);

const TutorContract = new ethers.Contract(
  "0xE0602E0eAAd2fF151395D884196910FEaeFAa1cC",
  abi.body,
  Ethers.provider().getSigner()
);

TutorContract.posts([postId]).then((result) => {
  // console.log(result); //
  State.update({
    author: result[0],
    content: result[1],
    title: result[2],
    votingPoints: Big(result[3]).toNumber(),
    postId: Big(result[4]).toNumber(),
  });
  // Update state or perform other actions with the result
});

const [commentData, setCommentData] = useState([]);

useEffect(() => {
  const fetchData = () => {
    try {
      // Get postIdCounter from the contract
      const commentCounter = 6;
      console.log(commentCounter);
      // Fetch posts from the contract
      const fetchedComments = [];
      for (let i = 0; i <= commentCounter; i++) {
        TutorContract.comments([i]).then((result) => {
          console.log(result); //
          State.update({});
          // Update state or perform other actions with the result
          console.log("-----------------");
          if (Big(result[2]).toNumber() == postId) {
            let com = {
              comment: result[1],
              votingPoints: Big(result[3]).toNumber(),
              author: result[0],
              datetime: "2023-10-19 19:00",
            };
            console.log(com);
            fetchedComments.push(com);
          }
        });
      }

      setCommentData(fetchedComments);
    } catch (error) {
      console.error("Error fetching posts from the contract:", error);
    }
  };

  fetchData();
}, []);
console.log("data", commentData);

const [sortOption, setSortOption] = useState("mostVoted");
const [sortedComments, setSortedComments] = useState([]);

useEffect(() => {
  // Sort by most voted initially
  const sortedByVote = [...commentData].sort(
    (a, b) => b.votingPoints - a.votingPoints
  );
  setSortedComments(sortedByVote);
}, []); // Empty dependency array ensures the effect runs only once, on mount

const handleSortChange = (option) => {
  setSortOption(option);

  if (option === "mostRecent") {
    // Sort by most recent
    const sortedByRecent = [...commentData].sort((a, b) => {
      const dateA = new Date(a.datetime);
      const dateB = new Date(b.datetime);

      console.log(dateA, dateB); // Log parsed dates for debugging

      return dateB - dateA;
    });
    setSortedComments(sortedByRecent);
  } else if (option === "mostVoted") {
    // Sort by most voted
    const sortedByVote = [...commentData].sort(
      (a, b) => b.votingPoints - a.votingPoints
    );
    setCommentData(sortedByVote);
  }
};

const votingSectionStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
};

const handleVotePost = () => {
  try {
    TutorContract.vote(state.postId, 1).then((transactionHash) => {
      console.log(transactionHash);
    });
    // State.createPost({ _content: content, _title: title });
  } catch (error) {
    console.error("Error creating post:", error.message);
  }
};

const [commentContent, setCommentContent] = useState("");

const handleComment = () => {
  try {
    TutorContract.createComment(state.postId, commentContent).then(
      (transactionHash) => {
        console.log(transactionHash);
      }
    );
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
      height: "100h",
    }}
  >
    <ul style={navbarContainerStyle}>
      <li style={heapHeapHoorayBoxStyle}>Heapheap Hooray</li>
      <li style={boxStyle}>
        <a href="#" style={{ textDecoration: "none", color: "#fff" }}>
          Create Post
        </a>
      </li>
      <li style={searchPostBoxStyle}>
        <a href="#" style={{ textDecoration: "none", color: "#000" }}>
          Search Post
        </a>
      </li>
      <li style={boxStyle}>
        <a href="#" style={{ textDecoration: "none", color: "#fff" }}>
          My Post
        </a>
      </li>
    </ul>
    <div style={{ padding: "4%" }}>
      <h2>{state.title}</h2>
      <div>
        <p style={{ fontSize: "20px" }}>{state.content}</p>
      </div>
      <div
        style={{ textAlign: "right", marginBottom: "2%", marginRight: "1%" }}
      >
        <div style={{ color: "#333", fontSize: "13px" }}>by {state.author}</div>
        <div style={{ color: "#333", fontSize: "13px" }}>
          on {postDetail.datetime}
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ marginRight: "1%", color: "#333", fontSize: "13px" }}>
          Love this post?
        </div>
        <div
          style={{
            marginBottom: "0.5%",
            marginRight: "1%",
            color: "#333",
            fontSize: "13px",
          }}
        >
          let's vote it to grow our community!
        </div>
        <div class="votePostContainer" style={votingSectionStyle}>
          <div style={{ fontSize: "30px" }}>{state.votingPoints}</div>
          <button
            type="button"
            className="btn btn-success vote-btn"
            id="votePostBtn"
            style={{
              marginLeft: "2%",
              marginRight: "1%",
              backgroundColor: "#0D1282",
              color: "white",
              padding: "10px 15px",
            }}
            onClick={handleVotePost}
          >
            Vote Post
          </button>
        </div>
      </div>

      <div className="mt-3">
        <label htmlFor="sortOptions" className="form-label">
          Sort By:
        </label>
        <select
          id="sortOptions"
          className="form-select"
          onChange={(e) => handleSortChange(e.target.value)}
          value={sortOption}
          style={{
            backgroundColor: "white",
            color: "#333",
            border: "1px solid",
            width: "30%",
          }}
        >
          <option value="mostRecent">Most Recent</option>
          <option value="mostVoted">Most Voted</option>
        </select>
      </div>

      <div id="commentsContainer" style={{ marginTop: "5%" }}>
        <h4>Comments</h4>
        {commentData.map((comment, index) => (
          <Comment key={index} comments={comment} />
        ))}
      </div>

      <div class="comments-section" style={{ marginTop: "5%" }}>
        <div class="mb-3">
          <label for="commentContent" class="form-label">
            Your Comment:
          </label>
          <textarea
            id="postContent"
            name="postContent"
            placeholder=" Share your though"
            rows="4"
            style={{ width: "100%", fontSize: "15px" }}
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{
            marginLeft: "auto",
            display: "block",
            backgroundColor: "#0D1282",
            color: "white",
          }}
          onClick={handleComment}
        >
          Submit Comment
        </button>
      </div>
    </div>
  </div>
);
