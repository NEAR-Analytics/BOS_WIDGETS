const QUERYAPI_ENDPOINT = `https://near-queryapi.api.pagoda.co/v1/graphql/`;

const queryName =
  props.queryName ?? `bo_near_devhub_v15_posts_with_latest_snapshot`;

State.init({
  data: [],

  author: null,
  title: null,
  content: null,

  limit: 10,
  offset: 0,
});

const query = `query DevhubPostsQuery($limit: Int = 10, $offset: Int = 0, $where: ${queryName}_bool_exp = {}) {
  ${queryName}(
    limit: $limit
    offset: $offset
    order_by: {block_height: desc}
    where: $where
  ) {
    post_id
  }
}
`;

function fetchGraphQL(operationsDoc, operationName, variables) {
  return asyncFetch(QUERYAPI_ENDPOINT, {
    method: "POST",
    headers: { "x-hasura-role": `bo_near` },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });
}

function search() {
  let where = {};
  if (state.author) {
    where = { author_id: { _eq: state.author }, ...where };
  }
  if (state.content) {
    where = { description: { _like: `%${state.content}%` }, ...where };
  }
  if (state.title) {
    where = { name: { _like: `%${state.tilte}%` }, ...where };
  }
  console.log("searching for", where);
  fetchGraphQL(query, "DevhubPostsQuery", {
    limit: state.limit,
    offset: state.offset,
    where,
  }).then((result) => {
    if (result.status === 200) {
      console.log("search success");
      if (result.body.data) {
        const data = result.body.data[queryName];
        State.update({ data });
        console.log("found:");
        console.log(data);
      }
    } else {
      console.error("error:", result.body);
    }
  });
}

const renderData = (a) => {
  return (
    <Widget
      src={`devgovgigs.near/widget/gigs-board.entity.post.Post`}
      props={{ id: a.post_id }}
      key={a.post_id}
    />
  );
};
const renderedData = state.data.map(renderData);

return (
  <div>
    <div>
      <input
        placeholder="author"
        onChange={(e) => State.update({ author: e.target.value })}
      ></input>
      <input
        placeholder="title"
        onChange={(e) => State.update({ title: e.target.value })}
      ></input>
      <input
        placeholder="content"
        onChange={(e) => State.update({ content: e.target.value })}
      ></input>
      <button onClick={search}>search</button>
    </div>
    <div>{renderedData}</div>
  </div>
);
