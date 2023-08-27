const GRAPHQL_ENDPOINT =
  props.GRAPHQL_ENDPOINT ||
  "https://queryapi-hasura-graphql-24ktefolwq-ew.a.run.app";

State.init({
  posts: [],
});

const createQuery = () => {
  const indexerQueries = `
  query GetMyFeed {
    dataplatform_near_social_feed_posts(order_by: {block_height: desc}) {
      account_id
      block_timestamp
      content
      comments{account_id,block_height}
      post_likes{account_id,block_height}
    }
  }
`;
  return indexerQueries;
};

function fetchGraphQL(operationsDoc, operationName, variables) {
  return asyncFetch(`${GRAPHQL_ENDPOINT}/v1/graphql`, {
    method: "POST",
    headers: { "x-hasura-role": "dataplatform_near" },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });
}

fetchGraphQL(createQuery(type), queryName, {}).then((result) => {
  if (result.status === 200 && result.body) {
    if (result.body.errors) {
      console.log("error:", result.body.errors);
      return;
    }
    let data = result.body.data;
    if (data) {
      const newPosts = data.dataplatform_near_social_feed_posts;
      State.update({
        posts: [...newPosts],
      });
    }
  }
});

const renderData = (a) => {
  return <div key={JSON.stringify(a)}>{JSON.stringify(a)}</div>;
};

const renderedData = state.posts.map(renderData);

return { renderedData };
