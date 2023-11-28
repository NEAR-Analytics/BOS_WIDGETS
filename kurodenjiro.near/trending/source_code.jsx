State.init({ hastag });
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

let allPost = Social.get("*/post/main/", "final");

let tagCountAll = {};
let tagCount1Days = {};
Object.keys(allPost).forEach((item) => {
  const tags = findHashtags(JSON.parse(allPost[item].post.main).text);
  if (tags.length > 0) {
    tags.forEach((tag) => {
      tagCountAll[tag] = 0;
      tagCount1Days[tag] = 0;
    });
  }
});

Object.keys(tagCountAll).forEach((tag) => {
  const count1DaysPost = Social.index("hashtag", tag.replace("#", ""), {
    from: newBlock,
    limit: 999,
    order: "asc",
  });

  tagCountAll[tag] = countAllPost.length || 0;
  tagCount1Days[tag] = count1DaysPost.length || 0;
  console.log(tag.replace("#", ""));
  State.update({ hastag: tagCount1Days });
});

console.log(state.hastag);
return (
  <>
    <div>
      {state.hastag &&
        Object.keys(state.hastag)
          .filter((item, index) => state.hastag[item] !== 0)
          .map((item) => (
            <a
              style={{
                fontSize:
                  state.hastag[item] < 10
                    ? state.hastag[item] + 10 + "px"
                    : state.hastag[item] + "px" || state.hastag[item] > 60
                    ? "60px"
                    : state.hastag[item] + "px",
              }}
              href={`https://near.social/?hashtag=${item.replace("#", "")}`}
            >
              {item}
            </a>
          ))}
    </div>
  </>
);
