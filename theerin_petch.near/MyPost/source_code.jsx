const historyPosts = [
  {
    title: "Post 1 I'm wondering when I can go to bed",
    datetime: "2023-12-16 08:00:00",
    votingPoints: 10,
    author: "0x1",
  },
  {
    title: "Post 2 I'm here with minimal React, such a FUN time,init?",
    datetime: "2023-12-17 09:00:00",
    votingPoints: 15,
    author: "0x1",
  },
];

const memberPoints = 10;

const Post = ({ post }) => {
  const postBoxStyle = {
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
    color: "#0D1282",
    fontSize: "13px",
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
    <div style={postBoxStyle}>
      <div className="comment">
        <div>{post.title}</div>
        <div style={{ color: "#333", fontSize: "12px" }}>{post.author}</div>
        <div className="comment-info">
          <p style={{ color: "#333", fontSize: "12px" }}>
            Posted at: {post.datetime}
          </p>
        </div>
      </div>

      <div style={votingSectionStyle}>
        <p style={{ margin: "10px", fontSize: "20px", color: "#0D1282" }}>
          {post.votingPoints}
        </p>
        Vote(s)
      </div>
    </div>
  );
};

const pageStyle = {
  fontFamily: "Verdana , san-serif", // Example font family
  backgroundColor: "#FFFFFF", // Example background color
  padding: "4%", // Example padding
  color: "#000", // Example text color
};

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

const myPostBoxStyle = {
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
  fontFamily: "Verdana , sans-serif", // Different background color for "Heapheap Hooray"
  fontSize: "20px",
};

return (
  <div>
    <ul style={navbarContainerStyle}>
      <li style={heapHeapHoorayBoxStyle}>Heapheap Hooray</li>
      <li style={boxStyle}>
        <a
          href="https://bos.gg/teama.near/widget/CreatePost"
          style={{ textDecoration: "none", color: "#fff" }}
        >
          Create Post
        </a>
      </li>
      <li style={boxStyle}>
        <a
          href="https://bos.gg/theerin_petch.near/widget/Draft-1"
          style={{ textDecoration: "none", color: "#fff" }}
        >
          Search Post
        </a>
      </li>
      <li style={myPostBoxStyle}>
        <a href="#" style={{ textDecoration: "none", color: "#000" }}>
          My Post
        </a>
      </li>
    </ul>
    <div style={pageStyle}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ marginBottom: "2.5%" }}>History Post:</h3>
        <h6 style={{ color: "#0D1282" }}>Member Points: {memberPoints}</h6>
      </div>

      {historyPosts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  </div>
);
