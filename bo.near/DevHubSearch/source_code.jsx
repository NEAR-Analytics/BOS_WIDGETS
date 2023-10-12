const QUERYAPI_ENDPOINT = `https://near-queryapi.api.pagoda.co/v1/graphql/`;

State.init({
  data: [],
});

const query = `query DevhubPostsQuery {
  bo_near_devhub_v15_posts_with_latest_snapshot(
    limit: 10
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
      const data =
        result.body.data.bo_near_devhub_v15_posts_with_latest_snapshot;
      State.update({ data });
      console.log(data);
    }
  }
});

const renderData = (a) => {
  return <div key={JSON.stringify(a)}>{JSON.stringify(a)}</div>;
};
const renderedData = state.data.map(renderData);

return <div>{renderedData}</div>;
