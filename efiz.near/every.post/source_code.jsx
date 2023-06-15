const data = props.data;

const domainKeyPairs = data.domainKeyPairs;
const typeWhitelist = data.typeWhitelist;
const hashtagWhitelist = data.hashtagWhitelist;
const hashtagBlacklist = data.hashtagBlacklist;
const accountWhitelist = data.accountWhitelist;
const accountBlacklist = data.accountBlacklist;
const feedOrder = data.feedOrder || "desc";

if (hashtagBlacklist.length) {
  hashtagBlacklist = hashtagBlacklist.map((it) => it.toLowerCase());
}

let index = [];
const options = {
  limit: 10,
  order: feedOrder,
  accountId: accountWhitelist.length ? accountWhitelist : undefined,
};
// posts indexed via a hashtag are saved differently
// than posts indexed via a domain/action
if (hashtagWhitelist.length) {
  // get all posts saved under the hashtags
  // and we will filter domains and keys later
  index = hashtagWhitelist.map((it) => ({
    action: "hashtag",
    key: it.toLowerCase(),
    options,
  }));
} else {
  // else, get all posts saved under the domain/action key pairs
  index = domainKeyPairs?.map((it) => ({
    action: it.domain,
    key: it.key,
    options,
  }));
}

const Post = styled.div`
  border-bottom: 1px solid #eceef0;
  padding: 24px 0 12px;

  @media (max-width: 1200px) {
    padding: 12px 0 0;
  }
`;

function extractPath(a) {
  let path;
  if (hashtagWhitelist.length) {
    // May want to revisit this again
    // The path doesn't represent where this came from
    // For example, a comment is indexed under the parent post's key
    // but is saved under a regular post/comment path
    path = a.value.path;
  } else {
    path = `${a.accountId}/${a.action}/${a.key}`;
  }
  return path;
}

const extractHashtags = (text) => {
  const hashtagRegex = /#(\w+)/gi;
  hashtagRegex.lastIndex = 0;
  const hashtags = new Set();
  for (const match of text.matchAll(hashtagRegex)) {
    if (
      !/[\w`]/.test(match.input.charAt(match.index - 1)) &&
      !/[/\w`]/.test(match.input.charAt(match.index + match[0].length))
    ) {
      hashtags.add(match[1].toLowerCase());
    }
  }
  return [...hashtags];
};

const renderItem = (a) => {
  // Filter out post if account is in blacklist
  if (accountBlacklist.length && accountBlacklist.includes(a.accountId)) {
    return <></>;
  }

  const path = extractPath(a);
  const blockHeight = a.blockHeight;
  // Filter out post if type is not in whitelist
  if (hashtagWhitelist.length) {
    // although you can't really do this for hashtags... cuz the type is always "social"
    // so we're just gonna return for now...
    return (
      <Widget
        src="every.near/widget/every.post.view"
        props={{
          path,
          blockHeight: a.blockHeight,
        }}
      />
    );
  } else {
    if (typeWhitelist.includes(a.value.type)) {
      const post = Social.get(path, blockHeight);
      // Filter out post if it contains a blacklisted hashtag
      // (only works for type md)
      if (hashtagBlacklist.length && a.value.type === "md") {
        // extractHashtags from the text
        // if hashtags equal the blacklist, then don't show
        if (post) {
          const content = JSON.parse(post).text;
          const hashtags = extractHashtags(content);
          // return <p>{JSON.stringify(hashtags)}</p>;
          const val = hashtagBlacklist.some((item) => hashtags.includes(item));
          if (val) {
            return <></>;
          }
        }
      }
      return (
        <Widget
          src="every.near/widget/every.post.view"
          props={{
            path,
            blockHeight: a.blockHeight,
          }}
        />
      );
    }
  }
};

return (
  <Widget src="mob.near/widget/MergedIndexFeed" props={{ index, renderItem }} />
);
