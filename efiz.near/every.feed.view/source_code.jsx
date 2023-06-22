const data = props.data;

return (
  <>
    <Widget
      src="efiz.near/widget/every.post"
      props={{
        sources: data.sources,
        typeWhitelist: data.typeWhitelist,
        hashtagWhitelist: data.hashtagWhitelist,
        hashtagBlacklist: data.hashtagBlacklist,
        accountWhitelist: data.accountWhitelist,
        accountBlacklist: data.accountBlacklist,
        disableCaching: data.disableCaching,
      }}
    />
  </>
);
