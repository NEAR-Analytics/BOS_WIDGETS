const accountId = context.accountId;

if (!accountId) {
  return "";
}

State.init({
  posts: [],
});

//1.Getting last user follows, likes , etc.

// const followGraphReqBody = {
//   action: "graph",
//   key: "follow",
//   options: {
//     limit: 20,
//     order: "desc",
//     accountId: accountId,
//   },
// };

// const currentUserFollowGraph = fetch("https://api.near.social/index", {
//   body: JSON.stringify(followGraphReqBody),
//   headers: {
//     "Content-Type": "application/json",
//   },
//   method: "POST",
// }).body.map((e) => e.value.accountId);

//2.Gettings my followers and my following
// const following = Social.keys(`${accountId}/graph/follow/*`, "final", {
//   return_type: "BlockHeight",
// })["vlmoon.near"].graph.follow;

// const followers = Social.keys(`*/graph/follow/${accountId}`, "final", {
//   return_type: "BlockHeight",
// });

// const index = {
//     action: "post",
//     key: "main",
//     options: {
//     limit:20,
//     order: "desc",
//     accountId: "context.accountId"
//     }
// };

// const content = JSON.parse(
//   Social.get(`vlmoon.near/index/like`, 99086677) ?? "null"
// );

// const item = {
//   type: "social",
//   path: `root.near/post/main`,
//   blockHeight: 99086677
// };

// const likes = Social.index("like", item);

return (
  <>
    <h6>{JSON.stringify("s")}</h6>
  </>
);
