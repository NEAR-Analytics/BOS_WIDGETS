const findHashtags = (str) => {
  const regexp = /\B\#\w\w+\b/g;
  let match;
  let tags = [];
  while ((match = regexp.exec(str)) !== null) {
    tags.push(match[0]);
  }
  return tags;
};
const respBlock = fetch("https://api.nearblocks.io/v1/stats");

// 1 days
const newBlock1Days = Math.round(
  parseInt(respBlock.body.stats[0].block) -
    (1 * 24 * 3600) / parseInt(respBlock.body.stats[0].avg_block_time)
);

let BlockHeightPost1Days = [];
const getBlockHeight1daysPost = Social.index("post", "main", {
  from: newBlock1Days,
  limit: 99999,
});
getBlockHeight1daysPost.forEach((item) => {
  BlockHeightPost1Days.push({
    accountId: item.accountId,
    blockHeight: item.blockHeight,
  });
});

let post1days = [];
BlockHeightPost1Days.forEach((item) => {
  const post = Social.get(`${item.accountId}/post/main`, item.blockHeight);
  if (post) {
    post1days.push(JSON.parse(post).text);
  }
});

let tagCount1Days = {};
post1days.forEach((item) => {
  const tags = findHashtags(item);
  if (tags.length > 0) {
    tags.forEach((tag) => {
      if (tagCount1Days[tag]) {
        tagCount1Days[tag] = tagCount1Days[tag] + 1;
      } else {
        tagCount1Days[tag] = 1;
      }
    });
  }
});
let entries1days = Object.entries(tagCount1Days);
let post1daySorted = entries1days.sort((b, a) => a[1] - b[1]);

return (
  <>
    <div>
      <b> Trending :</b>
      <br></br>
      {post1daySorted &&
        post1daySorted
          .filter((item, index) => index <= 20)
          .map((item) => (
            <a href={`https://near.social/?hashtag=${item[0]}`}>
              {item[0]}-{item[1]}
            </a>
          ))}
    </div>
  </>
);
