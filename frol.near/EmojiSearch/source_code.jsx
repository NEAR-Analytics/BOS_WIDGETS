// MIT License: https://github.com/openwebbuild/bos-emoji-search/blob/main/LICENSE

const ROW_LIMIT = 10;

// Emoji helper functions
function loadEmojis() {
  const res = fetch(
    "https://raw.githubusercontent.com/openwebbuild/bos-emoji-search/master/src/emojiList.json"
  );
  return res.body && JSON.parse(res.body);
}

function filterEmoji(searchText, maxResults) {
  return emojiList
    .filter((emoji) => {
      if (emoji.title.toLowerCase().includes(searchText.toLowerCase())) {
        return true;
      }
      if (emoji.keywords.includes(searchText)) {
        return true;
      }
      return false;
    })
    .slice(0, maxResults);
}

// Load Emojis
const emojiList = loadEmojis();
if (!emojiList) {
  return "Loading Emojis...";
}

State.init({
  filteredEmoji: filterEmoji("", ROW_LIMIT),
});

const handleSearchChange = (event) => {
  State.update({
    filteredEmoji: filterEmoji(event.target.value, ROW_LIMIT),
  });
};

return (
  <div>
    <Widget src={`ncd-cn.near/widget/EmojiSearch.Header`} />
    <Widget
      src={`ncd-cn.near/widget/EmojiSearch.SearchInput`}
      props={{ textChange: handleSearchChange }}
    />
    <div>
      {state.filteredEmoji.map(({ symbol, title }) => (
        <Widget
          src={`ncd-cn.near/widget/EmojiSearch.ResultRow`}
          props={{
            symbol,
            title,
          }}
        />
      ))}
    </div>
  </div>
);
