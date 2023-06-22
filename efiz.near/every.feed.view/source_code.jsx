const data = props.data;
const disableCaching = props.disableCaching;

return (
  <>
    <Widget
      src="efiz.near/widget/every.post"
      props={{
        domainKeyPairs: data.domainKeyPairs,
        typeWhitelist: data.typeWhitelist,
        hashtagWhitelist: data.hashtagWhitelist,
        hashtagBlacklist: data.hashtagBlacklist,
        accountWhitelist: data.accountWhitelist,
        accountBlacklist: data.accountBlacklist,
        disableCaching,
      }}
    />
  </>
);
