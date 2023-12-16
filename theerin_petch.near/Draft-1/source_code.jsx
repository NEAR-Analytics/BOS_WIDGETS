// Define the Comment component
const postsData = [
  {
    posting_text: "Post 1 content",
    datetime: "2023-12-16 08:00:00",
    votingPoints: 10,
  },
  {
    posting_text: "Post 2 content",
    datetime: "2023-12-17 09:00:00",
    votingPoints: 15,
  },
];

return (
  <div className="posts">
    <h1>All Posts</h1>
    {postsData.map((post, index) => (
      <div key={index} className="post-box">
        <div className="post">
          <h2>{post.posting_text}</h2>
          <p>Posted at: {post.datetime}</p>
        </div>
        <div className="voting">
          <p>Voting Points: {post.votingPoints}</p>
          <button onClick={() => console.log("Vote")}>Vote</button>
        </div>
      </div>
    ))}
  </div>
);
