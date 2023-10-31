const { content: contentRaw, account_id: author, block_timestamp } = props;

let content = "bad content";
console.log(contentRaw);
try {
  content = JSON.parse(contentRaw).text;
} catch (e) {
  console.log("error parsing content", e);
}

// debugger;

return (
  <div style={{ display: "flex", flexDirection: "column", maxWidth: "100%" }}>
    <div style={{ display: "flex", flexDirection: "row", columnGap: "0.5rem" }}>
      <span>{author}</span>
      <span>{new Date(block_timestamp / 1000000).toLocaleString()}</span>
    </div>
    <Widget
      src="bwetest.near/widget/Posts.Markdown"
      props={{ content }}
      // id={post.receipt_id}
    />
  </div>
);
