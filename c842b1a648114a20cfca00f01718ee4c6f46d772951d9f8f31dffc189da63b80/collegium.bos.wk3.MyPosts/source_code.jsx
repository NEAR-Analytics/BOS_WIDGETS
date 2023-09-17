const account_id = context.accountId ?? props.accountId;

State.init({
  isInit: false,
  posts: [],
});

const getMyPosts = () => {
  asyncFetch(
    "https://queryapi-hasura-graphql-24ktefolwq-ew.a.run.app/v1/graphql",
    {
      method: "POST",
      headers: { "x-hasura-role": "nearpavel_near" },
      body: JSON.stringify({
        query: `query MyPosts {
          nearpavel_near_social_posts_posts(where: {account_id: {_eq: "${account_id}"}}, order_by: {block_timestamp: desc}) {
          account_id
          block_height
          block_timestamp
          content
          receipt_id
        }
      }`,
      }),
    }
  ).then((postRes) => {
    if (postRes.body.errors === undefined) {
      State.update({
        isInit: true,
        posts: postRes.body.data.nearpavel_near_social_posts_posts,
      });
    }
  });
};

if (state.isInit === false) {
  getMyPosts();
}

const Post = state.posts.map((post, index) => {
  const content = JSON.parse(post.content);
  const block_timestamp = new Date(post.block_timestamp / 1000000);
  const { year, month, day, hours, minutes, seconds } = {
    year: block_timestamp.getFullYear(),
    month: (block_timestamp.getMonth() + 1).toString().padStart(2, "0"),
    day: block_timestamp.getDate().toString().padStart(2, "0"),
    hours: block_timestamp.getHours().toString().padStart(2, "0"),
    minutes: block_timestamp.getMinutes().toString().padStart(2, "0"),
  };

  return (
    <>
      <div style={{ padding: "15px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>No.{state.posts.length - index}</h2>
          <h3>
            {year}-{month}-{day} {hours}:{minutes}
          </h3>
        </div>
        <div
          style={{
            padding: "15px 15px 0 15px",
            border: "solid 1px #bbb",
            borderRadius: "3px",
            borderWidth: "0 0 0 4px",
          }}
        >
          <Markdown text={content.text} />
        </div>
      </div>
      <hr />
    </>
  );
});

return (
  <div>
    {state.isInit === false ? (
      <h1>Load Your Posts...</h1>
    ) : (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Posts: {Post.length}</h1>
        </div>
        <hr />
        {Post.length === 0 ? <h2>Can not found your post</h2> : Post}
      </div>
    )}
  </div>
);
