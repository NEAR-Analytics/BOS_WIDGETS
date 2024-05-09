const { Button } = VM.require("blueprints.near/widget/Components.Button") || {
  Button: () => <></>,
};
const { LinkTree } = VM.require(
  "blueprints.near/widget/Components.Profile.LinkTree"
) || {
  LinkTree: () => <></>,
};
const { FollowStats } = VM.require(
  "blueprints.near/widget/Components.Profile.FollowStats"
) || {
  FollowStats: () => <></>,
};
const { Hashtag } = VM.require("blueprints.near/widget/Components.Hashtag") || {
  Hashtag: () => <></>,
};
return {
  Button,
  LinkTree,
  FollowStats,
  Hashtag,
};
