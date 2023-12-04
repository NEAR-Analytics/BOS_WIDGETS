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

// 3 days
const newBlock3Days = Math.round(
  parseInt(respBlock.body.stats[0].block) -
    (3 * 24 * 3600) / parseInt(respBlock.body.stats[0].avg_block_time)
);

let BlockHeightPost3Days = [];
const getBlockHeight3daysPost = Social.index("post", "main", {
  from: newBlock3Days,
  limit: 99999,
});

if (!getBlockHeight3daysPost) {
  return "Loading...";
}
getBlockHeight3daysPost.forEach((item) => {
  BlockHeightPost3Days.push({
    accountId: item.accountId,
    blockHeight: item.blockHeight,
  });
});

let post3days = [];
BlockHeightPost3Days.forEach((item) => {
  const post = Social.get(`${item.accountId}/post/main`, item.blockHeight);
  if (post) {
    post3days.push(JSON.parse(post).text);
  }
});

let tagCount3Days = {};
post3days.forEach((item) => {
  const tags = findHashtags(item);
  if (tags.length > 0) {
    tags.forEach((tag) => {
      if (tagCount3Days[tag]) {
        tagCount3Days[tag] = tagCount3Days[tag] + 1;
      } else {
        tagCount3Days[tag] = 1;
      }
    });
  }
});
let entries3days = Object.entries(tagCount3Days);
let post3daySorted = entries3days.sort((b, a) => a[1] - b[1]);
const Wrapper = styled.div`
--red:#ff3860;--red-dark:#ff1443;--red-light:#ff5c7c;--blue:#498afb;--blue-dark:#2674fa;--blue-light:#6ca0fc;--orange:#fa8142;--orange-dark:#f96a1f;--orange-light:#fb9865;--green:#09c372;--green-dark:#07a15e;--green-light:#0be586;--purple:#9166cc;--purple-dark:#7d4bc3;--purple-light:#a481d5;--yellow:#ffdd57;--yellow-dark:#ffd633;--yellow-light:#ffe47a;--pink:#ff4088;--pink-dark:#ff1c72;--pink-light:#ff649e;--gray0:#f8f8f8;--gray1:#dbe1e8;--gray2:#b2becd;--gray3:#6c7983;--gray4:#454e56;--gray5:#2a2e35;--gray6:#12181b;--nav-width:4em;--font-body:"sofia-pro",sans-serif;--font-head:"sofia-pro",sans-serif;--font-code:"attribute-mono",monospace;--font-size:20px;--max-width-bp:768px;--orange-pink:linear-gradient(to bottom right,var(--orange-light),var(--orange-dark) 85%);--green-grad:linear-gradient(to bottom right,var(--green-light),var(--green-dark) 85%);--background:var(--gray6);--text-color:var(--gray2);--h-color:#fff;--nav-shadow:4px 0 10px -3px #010101;--card-shadow:0 4px 8px rgba(0,0,0,0.38);--toc-shadow:rgba(0,0,0,0.7) 0px 10px 20px 0px;--nav-bg:var(--gray5);--tag-bg:var(--gray4);--code-bg:#22262f;--card-bg:var(--gray5);--overlay-bg:rgba(0,0,0,0.9);--h-border:2px dashed var(--nav-bg);--nav-border:2px dashed var(--text-color);--card-radius:0.25em;transition: all .3s ease

.container {
    background: var(--background);
    color: var(--text-color);
    margin: 0;
    font-family: var(--font-body);
    font-size: var(--font-size);
    display: flex;
    min-height: 100vh;
    flex-direction: column
}

.tag {
    display: inline-block;
    border-radius: 3px;
    padding: .2em .5em .3em;
    border-radius: 2px;
    background: var(--tag-bg);
    color: var(--text-color);
    font-weight: 600;
    margin: .25em .1em
}

h1.tag {
    margin-left: 0;
    margin-right: 0
}

.tag-sm {
    font-size: .7em;
    display: inline-block;
    letter-spacing: .15ch;
    font-weight: 400
}

.tag-lg {
    font-size: 1.2em;
    border-radius: 4px
}

.tag-bg {
    background: var(--background)
}

.tag-green,.tag-pro {
    background: var(--green);
    color: #fff
}

.tag-purple {
    background: var(--purple);
    color: #fff
}

.tag-contrast {
    background: var(--text-color);
    color: var(--background)
}

.tag-0 {
  color: #313244;
    background: #adecf3
}
.tag-1 {
    background: #f0db4f;
    color: #000
}


.tag-2 {
    background: #2775c3;
    color: #fff
}

.tag-3 {
    background: #dc0530;
    color: #fff
}

.tag-4 {
    background: #ffcb2b;
    color: #12181a
}

.tag-5 {
    background: #41b883;
    color: #35495e
}

.tag-6 {
    background: var(--pink);
    color: var(--gray5)
}

.tag-7 {
    background: #90c53f;
    color: #46483d
}

.tag-8 {
    background: var(--blue);
    color: #fff
}

.tag-9 {
    background: #54c5f8;
    color: #003b6c
}

.tag-10 {
    background: #33a668;
    color: #f8d845
}

.tag-11 {
    background: #a4c34a;
    color: #fff
}

.tag-12 {
    color: #fff;
    background: #6675e0
}

.tag-13 {
    color: #fff;
    background: var(--purple-light)
}

.tag-14 {
    color: #ffda5d;
    background: #3879ab
}

.tag-15 {
    color: #fff;
    background: #ff3e00
}

.tag-16 {
    color: #00d8ff;
    background: #222
}

.tag-17 {
    color: #fff;
    background: #000
}

.tag-minimum-viable-product,.tag-mvp {
    color: #fff;
    background-image: linear-gradient(90deg,#ff8901,#db1d5f);
    font-weight: 700
}

.tag-18 {
    background: #313244;
    color: #4a8afc
}

.tag-19 {
    color: #e0234e;
    background: #000
}

.tag-20 {
    color: #fff;
    background: #e10097
}

`;
return (
  <>
    <Wrapper class="container">
      {post3daySorted.length > 0 &&
        post3daySorted
          .filter((item, index) => index <= 20)
          .map((item, index) => (
            <a href={`https://near.social/?hashtag=${item[0]}`}>
              <span className={`tag tag-${index} tag-lg`}>
                {item[0].replace("#", "")}
              </span>
            </a>
          ))}
    </Wrapper>
  </>
);
