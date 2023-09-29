const accountId = context.accountId;

const homepage = accountId
  ? Social.get(`${accountId}/settings/near.social/homepage`)
  : undefined;

if (homepage === null) {
  return "Loading";
}

// Simulated article data for preview
const articlePreviews = [
  {
    title: "Article 1",
    content: "This is the content of Article 1.",
  },
  {
    title: "Article 2",
    content: "This is the content of Article 2.",
  },
  // Add more articles as needed
];

return (
  <div style={{ display: "flex" }}>
    {/* Left Side - Article Previews */}
    <div style={{ flex: 1 }}>
      {articlePreviews.map((article, index) => (
        <div key={index}>
          <h2>{article.title}</h2>
          <p>{article.content}</p>
        </div>
      ))}
    </div>

    {/* Right Side - Widget */}
    <div style={{ flex: 2 }}>
      <Widget src={homepage ?? "mob.near/widget/N"} props={props} />
    </div>
  </div>
);
