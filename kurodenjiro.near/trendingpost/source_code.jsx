//2 scan all post from hashtag
//3 scan all comment from post
// 4 scan all like from post
// 5 scan all retweet from post
const respBlock = fetch("https://api.nearblocks.io/v1/stats");

const newBlock = Math.round(
  parseInt(respBlock.body.stats[0].block) -
    (30 * 24 * 3600) / parseInt(respBlock.body.stats[0].avg_block_time)
);
const newBlock3Days = Math.round(
  parseInt(respBlock.body.stats[0].block) -
    (3 * 24 * 3600) / parseInt(respBlock.body.stats[0].avg_block_time)
);
const newBlock7Days = Math.round(
  parseInt(respBlock.body.stats[0].block) -
    (7 * 24 * 3600) / parseInt(respBlock.body.stats[0].avg_block_time)
);
const allPost = Social.index("hashtag", "near", {
  from: newBlock,
  limit: 300,
  order: "asc",
});

let postEngagement = [];

if (allPost.length > 0) {
  allPost.forEach((item) => {
    const allComment = Social.index(
      "comment",
      {
        type: "social",
        path: `${item.accountId}/post/main`,
        blockHeight: item.blockHeight,
      },
      {
        limit: 9999,
        order: "desc",
      }
    );
    const allLike = Social.index("like", {
      type: "social",
      path: `${item.accountId}/post/main`,
      blockHeight: item.blockHeight,
    });
    const allRepost = Social.index(
      "repost",
      {
        type: "social",
        path: `${item.accountId}/post/main`,
        blockHeight: item.blockHeight,
      },
      {
        limit: 9999,
        order: "desc",
      }
    );

    const allComment3Days = Social.index(
      "comment",
      {
        type: "social",
        path: `${item.accountId}/post/main`,
        blockHeight: item.blockHeight,
      },
      {
        from: newBlock3Days,
        limit: 9999,
        order: "asc",
      }
    );
    const allLike3Days = Social.index(
      "like",
      {
        type: "social",
        path: `${item.accountId}/post/main`,
        blockHeight: item.blockHeight,
      },
      {
        from: newBlock3Days,
        limit: 9999,
        order: "asc",
      }
    );
    const allRepost3Days = Social.index(
      "repost",
      {
        type: "social",
        path: `${item.accountId}/post/main`,
        blockHeight: item.blockHeight,
      },
      { from: newBlock3Days, limit: 9999, order: "asc" }
    );

    const allComment7Days = Social.index(
      "comment",
      {
        type: "social",
        path: `${item.accountId}/post/main`,
        blockHeight: item.blockHeight,
      },
      {
        from: newBlock7Days,
        limit: 9999,
        order: "asc",
      }
    );
    const allLike7Days = Social.index(
      "like",
      {
        type: "social",
        path: `${item.accountId}/post/main`,
        blockHeight: item.blockHeight,
      },
      {
        from: newBlock7Days,
        limit: 9999,
        order: "asc",
      }
    );
    const allRepost7Days = Social.index(
      "repost",
      {
        type: "social",
        path: `${item.accountId}/post/main`,
        blockHeight: item.blockHeight,
      },
      { from: newBlock7Days, limit: 9999, order: "asc" }
    );

    const res = fetch(
      `https://api.near.social/time?blockHeight=${item.blockHeight}`
    );
    const dateCreated = res.body;

    if (allComment.length + allLike.length + allRepost.length > 0) {
      postEngagement.push({
        accountId: item.accountId,
        blockHeight: item.blockHeight,
        allLike: allLike.length,
        allComment: allComment.length,
        allRepost: allRepost.length,
        EP:
          (allComment.length * 3 + allLike.length + allRepost.length * 2) /
            Math.floor(
              (Date.now() - new Date(dateCreated)) / 1000 / (3600 * 24)
            ) || 0,
        EP3D:
          (allComment3Days.length * 3 +
            allLike3Days.length +
            allRepost3Days.length * 2) /
            3 || 0,
        EP7D:
          (allComment7Days.length * 3 +
            allLike7Days.length +
            allRepost7Days.length * 2) /
            7 || 0,
        dateCreated: dateCreated,
      });
    }
  });
}

const compare = (b, a) => {
  if (a.EP < b.EP) {
    return -1;
  }
  if (a.EP > b.EP) {
    return 1;
  }
  return 0;
};
const sort = postEngagement.sort(compare);
return (
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Post ID</th>
          <th scope="col">Account ID</th>
          <th scope="col">EP. </th>
          <th scope="col">EP. 3Days </th>
          <th scope="col">EP. 7Days </th>
          <th scope="col">Comment</th>
          <th scope="col">LIKES</th>
          <th scope="col">REPOST</th>
          <th scope="col">Created.</th>
        </tr>
      </thead>
      <tbody>
        {sort.map((item) => (
          <tr>
            <th scope="row">
              <a
                href={`https://near.social/mob.near/widget/MainPage.N.Post.Page?accountId=${item.accountId}&blockHeight=${item.blockHeight}`}
              >
                {item.blockHeight}
              </a>
            </th>
            <td maxWidth="100px">
              {item.accountId.includes(".near")
                ? item.accountId
                : item.accountId.slice(0, 7) +
                  "..." +
                  item.accountId.slice(
                    item.accountId.length - 10,
                    item.accountId.length - 1
                  )}
            </td>
            <td>{item.EP && item.EP.toFixed(4)}</td>
            <td>{item.EP3D && item.EP3D.toFixed(4)}</td>
            <td>{item.EP7D && item.EP7D.toFixed(4)}</td>
            <td>{item.allComment}</td>
            <td>{item.allLike}</td>
            <td>{item.allRepost}</td>
            <td>
              {new Date(item.dateCreated).toLocaleString("en-GB", {
                hour12: false,
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
