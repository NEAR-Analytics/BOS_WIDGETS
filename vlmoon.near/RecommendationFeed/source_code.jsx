function isSupportTensorflow() {
  try {
    const X_testTensor = tf.tensor2d([
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ]);

    return (
      <h1>
        Your version of the Near VM support that Version of the recomendation
        system{" "}
      </h1>
    );
  } catch (e) {
    return (
      <h1>
        Your version of the Near VM dont support that Version of the
        recomendation system{" "}
      </h1>
    );
  }
}

function getFeedByAccountIdQuery(accountId, limit, offset) {
  if (!limit) {
    limit = 15;
  }
  if (!offset) {
    offset = 0;
  }
  const whereClause = accountId
    ? `where: { account_id: { _eq: "${accountId}" } }`
    : "";
  const indexerQuery = `
      query GetFeedByAccountId {
          dataplatform_near_social_feed_posts(order_by: { block_height: desc }, limit: ${limit}, offset: ${offset} ${whereClause}) {
              id
              account_id
              block_timestamp
              content
              comments {
                  account_id
                  block_height
              }
              post_likes {
                  account_id
                  block_height
              }
          }
      }
    `;
  return indexerQuery;
}

function getAllPostQuery(limit, offset) {
  if (!limit) {
    limit = 15;
  }
  if (!offset) {
    offset = 0;
  }

  const indexerQuery = `
      query GetAllPostQuery {
          dataplatform_near_social_feed_posts(order_by: { block_height: desc }, limit: ${limit}, offset: ${offset}) {
              id
              account_id
              block_timestamp
              content
              comments {
                  account_id
                  block_height
              }
              post_likes {
                  account_id
                  block_height
              }
          }
      }
    `;
  return indexerQuery;
}

function getFollowingsById(accountId) {
  const url = "https://api.near.social/index";
  const headers = { "Content-Type": "application/json" };

  const payload = {
    action: "graph",
    key: "follow",
    options: {
      order: "desc",
      accountId: accountId,
    },
  };

  const response = fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payload),
  });
  const accountIds = response.body.map((item) => item.value.accountId);
  return accountIds ?? ["no data"];
}

function fetchFollowingsRecursive(
  accountId,
  depth,
  visited,
  interested_account_ids
) {
  if (!interested_account_ids) {
    interested_account_ids = [];
  }

  if (!visited) {
    visited = new Set();
  }

  if (depth <= 0 || visited.has(accountId)) {
    return [];
  }

  // Fetch followings of the current account
  console.log(`accountId ${accountId}`);
  let followings;
  try {
    followings = getFollowingsById(accountId).slice(0, 20);
  } catch (e) {
    console.log(`Error ${JSON.stringify(e)}`);
    followings = [];
  }

  // Add the current account to the visited set
  visited.add(accountId);

  // Recursively fetch followings of followings
  const followingLists = followings.map((following) => {
    if (!visited.has(following)) {
      const followingFollowings = fetchFollowingsRecursive(
        following,
        depth - 1,
        visited
      );
      return [following, ...followingFollowings];
    }
    return [];
  });

  // Flatten and filter the lists of followings, removing duplicates
  const allFollowings = followingLists.flat().filter((following) => {
    return (
      !visited.has(following) && !interested_account_ids.includes(following)
    );
  });

  return allFollowings;
}

function fetchPostsRecursive(accountId, depth, limit, offset) {
  if (depth === 0) {
    return [];
  }

  // // Fetch and extract posts for the current account

  const operationsDoc = getFeedByAccountIdQuery(accountId, limit, offset);
  const operationName = "GetFeedByAccountId";
  const response = fetchGraphQL(operationsDoc, operationName, {});

  if (!response) {
    response.body.data.dataplatform_near_social_feed_posts = [];
  }

  const postsData = response.body.data.dataplatform_near_social_feed_posts;
  // const postEntries = [];
  const postEntries = Array.isArray(postsData)
    ? postsData.map((post) => ({
        id: post.id,
        account_id: post.account_id,
        block_timestamp: post.block_timestamp,
        content: post.content,
        comments: Array.isArray(post.comments)
          ? post.comments.map((comment) => comment.account_id)
          : [],
        post_likes: Array.isArray(post.post_likes)
          ? post.post_likes.map((like) => like.account_id)
          : [],
      }))
    : [];

  // Fetch followings of the current account
  const followings = getFollowingsById(accountId);

  // Recursively fetch posts from followings of followings
  let posts = [...postEntries];
  for (const following of followings) {
    const followingPosts = fetchPostsRecursive(
      following,
      depth - 1,
      limit,
      offset
    );
    posts = posts.concat(followingPosts);
  }

  return posts;
}

function mapPostToFeatures(post, followings, targetId) {
  const engagement_score = calculateEngagementScore(post, followings);
  const target_id_like = post.post_likes.includes(targetId) ? 20 : 0;
  const target_id_comment = post.comments.includes(targetId) ? 20 : 0;

  const followerEngagements = followings.map((followerId) => {
    const followerEngagement = calculateEngagementScore(post, [followerId]);
    return followerEngagement;
  });

  const totalFollowerEngagement = followerEngagements.reduce(
    (sum, engagement) => sum + engagement,
    0
  );
  const avg_engagement_followers =
    followings.length > 0 ? totalFollowerEngagement / followings.length : 0;

  return {
    engagement_score,
    avg_engagement_followers,
    target_id_like,
    target_id_comment,
  };
}

function calculateEngagementScore(post, followings) {
  const { comments, post_likes } = post;
  let engagement_score = 0;

  followings.forEach((followerId) => {
    if (post_likes.includes(followerId)) {
      engagement_score += 2; // Increment engagement score for likes
    }

    if (comments.includes(followerId)) {
      engagement_score += 2; // Increment engagement score for comments
    }
  });

  return engagement_score;
}

const GRAPHQL_ENDPOINT =
  props.GRAPHQL_ENDPOINT ||
  "https://queryapi-hasura-graphql-24ktefolwq-ew.a.run.app";

State.init({
  feeds: ["no feed"],
  modelWasLoaded: "no",
});

function fetchGraphQL(operationsDoc, operationName, variables) {
  return fetch(`${GRAPHQL_ENDPOINT}/v1/graphql`, {
    method: "POST",
    headers: { "x-hasura-role": "dataplatform_near" },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });
}

function loadModel() {
  tf.loadModel(
    "recomendation",
    `https://recommendation-system-near-social.onrender.com/models/${context.accountId}/model.json`
  ).then((res) => {
    console.log("Model was loaded");
    State.update({
      modelWasLoaded: "yes",
    });
  });
}

function predictTest() {
  //Step 1 - +
  const posts = fetchGraphQL(
    getAllPostQuery(500, 0),
    queryName,
    {}
  ).body.data.dataplatform_near_social_feed_posts.map((post) => ({
    id: post.id,
    account_id: post.account_id,
    block_timestamp: post.block_timestamp,
    content: post.content,
    comments: post.comments.map((comment) => comment.account_id),
    post_likes: post.post_likes.map((like) => like.account_id),
  }));

  //Step 2
  const followings = fetchFollowingsRecursive(context.accountId, 2);

  console.log(`Followings ${JSON.stringify(followings)}`);

  // // Map posts to features
  const postsWithFeatures = posts.map((post) =>
    mapPostToFeatures(post, followings, context.accountId)
  );

  // Extract features for prediction
  const featuresForPrediction = postsWithFeatures.map((post) => [
    post.engagement_score,
    post.avg_engagement_followers,
    post.target_id_like,
    post.target_id_comment,
  ]);

  const X_testTensor = tf.tensor2d(featuresForPrediction);

  tf.predict("recomendation", X_testTensor).then((result) => {
    const predictionArray = Object.entries(result).map(([index, value]) => ({
      index: Number(index),
      value,
    }));

    predictionArray.sort((a, b) => b.value - a.value);

    const topN = 100;
    const topPredictions = predictionArray.slice(0, topN);

    // Filter allPosts based on top predictions
    const filteredPosts = topPredictions.map(
      (prediction) => posts[prediction.index]
    );

    State.update({
      feeds: [...filteredPosts],
    });
  });
}

const renderData = (a) => {
  return <div key={JSON.stringify(a)}>{JSON.stringify(a)}</div>;
};

const renderedData = state.feeds.map(renderData);

return (
  <>
    {isSupportTensorflow()}
    <button onClick={loadModel}>Click to load</button>
    <h1>TF Model Loaded status {state.modelWasLoaded}</h1>
    <button onClick={predictTest}>Click to predict</button>
    <div>FEEDS : {renderedData}</div>
  </>
);
