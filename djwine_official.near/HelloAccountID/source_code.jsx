const accountId = context.accountId;

if (context.loading) return "Loading";
if (!accountId) return "Please sign in with NEAR wallet to use this widget";

console.log();

return `Hello, ${accountId}!`;
