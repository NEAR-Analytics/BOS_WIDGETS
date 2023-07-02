const hashtag = props.hashtag;

return (
  <Widget
    src="efiz.near/widget/every.feed.view"
    props={{
      data: { hashtagWhitelist: [hashtag] },
    }}
  />
);
