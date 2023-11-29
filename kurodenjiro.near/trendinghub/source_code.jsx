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

const newBlock = Math.round(
  parseInt(respBlock.body.stats[0].block) -
    (30 * 24 * 3600) / parseInt(respBlock.body.stats[0].avg_block_time)
);
const newBlock1Days = Math.round(
  parseInt(respBlock.body.stats[0].block) -
    (1 * 24 * 3600) / parseInt(respBlock.body.stats[0].avg_block_time)
);
const newBlock3Days = Math.round(
  parseInt(respBlock.body.stats[0].block) -
    (3 * 24 * 3600) / parseInt(respBlock.body.stats[0].avg_block_time)
);
const newBlock7Days = Math.round(
  parseInt(respBlock.body.stats[0].block) -
    (7 * 24 * 3600) / parseInt(respBlock.body.stats[0].avg_block_time)
);
const allPost = Social.get("*/post/main/", "final");

const tagCountAll = {};
const tagCount1Days = {};
const tagCount3Days = {};
const tagCount7Days = {};
Object.keys(allPost).forEach((item) => {
  const tags = findHashtags(JSON.parse(allPost[item].post.main).text);
  if (tags.length > 0) {
    tags.forEach((tag) => {
      tagCountAll[tag] = 0;
      tagCount1Days[tag] = 0;
      tagCount3Days[tag] = 0;
      tagCount7Days[tag] = 0;
    });
  }
});
Object.keys(tagCountAll).forEach((tag) => {
  const countAllPost = Social.index("hashtag", tag.replace("#", ""), {
    from: newBlock,
    limit: 999,
    order: "asc",
  });
  const count1DaysPost = Social.index("hashtag", tag.replace("#", ""), {
    from: newBlock1Days,
    limit: 999,
    order: "asc",
  });
  const count3DaysPost = Social.index("hashtag", tag.replace("#", ""), {
    from: newBlock3Days,
    limit: 999,
    order: "asc",
  });
  const count7DaysPost = Social.index("hashtag", tag.replace("#", ""), {
    from: newBlock7Days,
    limit: 999,
    order: "asc",
  });
  tagCountAll[tag] = countAllPost.length || 0;
  tagCount1Days[tag] = count1DaysPost.length || 0;
  tagCount3Days[tag] = count3DaysPost.length || 0;
  tagCount7Days[tag] = count7DaysPost.length || 0;
});

let entriesALL = Object.entries(tagCountAll);
let allPostSorted = entriesALL.sort((b, a) => a[1] - b[1]);

let entries1 = Object.entries(tagCount1Days);
let day1PostSorted = entries1.sort((b, a) => a[1] - b[1]);

let entries3 = Object.entries(tagCount3Days);
let day3PostSorted = entries3.sort((b, a) => a[1] - b[1]);

let entries7 = Object.entries(tagCount7Days);
let day7PostSorted = entries7.sort((b, a) => a[1] - b[1]);

return (
  <>
    <div>
      ALL POST
      {allPostSorted &&
        allPostSorted
          .filter((item, index) => index <= 10)
          .map((item) => (
            <p>
              {item[0]}-{item[1]}
            </p>
          ))}
    </div>
    <a>----------------------------------</a>
    <div>
      Trend Now
      {day1PostSorted &&
        day1PostSorted
          .filter((item, index) => index <= 10)
          .map((item) => (
            <p>
              {item[0]}-{item[1]}
            </p>
          ))}
    </div>
    <a>----------------------------------</a>
    <div>
      Trend in 3 Day
      {day3PostSorted &&
        day3PostSorted
          .filter((item, index) => index <= 10)
          .map((item) => (
            <p>
              {item[0]}-{item[1]}
            </p>
          ))}
    </div>
    <a>----------------------------------</a>
    <div>
      Trend in 7 Day
      {day7PostSorted &&
        day7PostSorted
          .filter((item, index) => index <= 10)
          .map((item) => (
            <p>
              {item[0]}-{item[1]}
            </p>
          ))}
    </div>
  </>
);
