const accountId = context.accountId;

if (context.loading) {
  return "Loading";
}

if (!accountId) {
  return "Please sign in with NEAR wallet to use this widget";
}

return (
  <h1>{`Hello, Aadesh Mallya. This is your account ID: ${accountId}!`}</h1>
);
