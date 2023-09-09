function isSupportTensorflow() {
  try {
    const X_testTensor = tf.tensor2d([
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ]);

    return (
      <h4>
        Your version of the Near VM support that Version of the recomendation
        system
      </h4>
    );
  } catch (e) {
    return (
      <h4>
        Your version of the Near VM dont support that Version of the
        recomendation system
      </h4>
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
    `https://recommendation-system-near-social.onrender.com/models/${"vlmoon.near"}/model.json`
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
  const followings = fetchFollowingsRecursive("vlmoon.near", 2);

  console.log(`Followings ${JSON.stringify(followings)}`);

  // // Map posts to features
  const postsWithFeatures = posts.map((post) =>
    mapPostToFeatures(post, followings, "vlmoon.near")
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
    <h2>Hackathon Report</h2>
    <div>
      First of all I want to say thanks to the Near Team and Sponsors for making
      this event happens, you are did a good job.
    </div>
    <h2>Setup</h2>
    <div>
      In order to run this code, you must clone the viewer -
      https://github.com/NearSocial/viewer And in this project in package.json
      file set up
    </div>
    <h2>My Story</h2>
    <div>
      When I decided to choose the topic of a Recommendation System for the
      hackathon, I understood that it wouldn't be a simple task for me. To make
      this idea a reality, I had to dive into various aspects. Initially, I
      considered a basic approach, where I would calculate a post's score based
      on the involvement of followers and the followers of followers. However,
      it became apparent that this approach wasn't suitable because we all have
      unique preferences. A one-size-fits-all algorithm wouldn't suffice. Given
      my background in Machine Learning and AI, I began researching how I could
      tackle this problem using these algorithms. I found that many
      recommendation systems rely on large vector databases and a single model
      that predicts recommendations based on user actions and those of their
      connections. While this is effective in traditional web projects (Web
      2.0), it isn't ideal for Web 3.0, where decentralization and user control
      over data are paramount. To address this, I aimed to create a system that
      could work on the client-side, avoiding the need for a heavyweight
      server-side model. However, this approach presented its own set of
      challenges. Distributing training and prediction functions across
      different machines can yield inconsistent results. To mitigate this, I
      decided to create a separate server responsible for training the model and
      saving it. Clients would fetch the model and execute predictions. This
      server-based approach was adopted to simplify development and deployment.
      While this approach is a step towards decentralization, it still comes
      with trade-offs. Decentralization often requires sacrificing some aspects
      of performance, usability, and accuracy for the sake of data privacy. As I
      began implementing this idea, I encountered several challenges. One major
      hurdle was understanding how to run a TensorFlow (TF) model inside a
      virtual machine (VM). I partially resolved this issue, but it involved a
      somewhat brute force approach. In future versions of the VM, I hope to see
      standardized methods for extending widget functionality and handling
      dependencies. Another challenge was determining the exact algorithm to use
      for creating a lightweight, fast, and client-executable model. My current
      algorithm involves precalculating certain data before making predictions,
      such as user involvement. To achieve my vision of a lightweight
      recommendation system, I've identified two key challenges to address:
      enabling the VM to work seamlessly with TensorFlow JS and developing a
      machine learning algorithm for client-side prediction. This approach may
      involve a combination of supervised learning and reinforcement learning.
      In conclusion, I'd like to express my gratitude to the creators of Near
      Social and all other developers who have contributed to this platform.
      It's a fantastic, innovative idea, and I believe it represents the future
      of Web 3.0. I'm eager to continue improving this platform by adding more
      functionality to the VM and implementing my ideas. I'd also welcome
      collaboration or advice from others who share this vision and want to help
      make it a reality. Together, we can turn this dream into a practical
      solution.
    </div>
    <h4>Github of edited VM verison</h4>
    <p>
      https://github.com/vlmoon99/VM/commit/23b8d083166c702dc4e4af7afe1880275de07292#diff-4255535b3b5add42e1263cb0dc4529cd5c802aed92a979e507d39648e3bb335e
    </p>
    <h4>
      Github of the Backend (Simple backend for train the tf model and send it
      to the client)
    </h4>
    <p>https://github.com/vlmoon99/recommendation_system_near_social_backend</p>
    <button onClick={loadModel}>Click to load</button>
    <h1>TF Model Loaded status {state.modelWasLoaded}</h1>
    <button onClick={predictTest}>Click to predict</button>
    <div>FEEDS : {renderedData}</div>
  </>
);
