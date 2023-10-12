const QUERYAPI_ENDPOINT = `https://near-queryapi.api.pagoda.co/v1/graphql/`;

const queryName =
  props.queryName ?? `bo_near_devhub_v15_posts_with_latest_snapshot`;

State.init({
  data: [],

  author: null,
  title: null,
  content: null,
});

const query = `query DevhubPostsQuery($limit: Int = 10, $offset: Int = 0, $where: ${props.queryName}_bool_exp = {}) {
  ${queryName}(
    limit: $limit
    offset: $offset
    order_by: {block_height: desc}
    where: $where
  ) {
    author_id
    block_height
    description
    editor_id
    labels
    name
    parent_id
    post_id
    post_type
    sponsorship_supervisor
    sponsorship_token
    sponsorship_amount
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

fetchGraphQL(query, "DevhubPostsQuery", {}).then((result) => {
  if (result.status === 200) {
    if (result.body.data) {
      const data = result.body.data[queryName];
      State.update({ data });
      console.log(data);
    }
  } else {
    console.error("error", result.body);
  }
});

const renderData = (a) => {
  return <div key={JSON.stringify(a)}>{JSON.stringify(a)}</div>;
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
      <button
        onClick={() => {
          console.log(state.author);
        }}
      >
        search
      </button>
    </div>
    <div>{renderedData}</div>
  </div>
);
