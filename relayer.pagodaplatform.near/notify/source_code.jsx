const accountId = context.accountId;

return Social.index("notify", accountId, {
  limit: 10,
  order: "desc",
  subscribe: true,
});
