const { Button } = VM.require(
  "blueprints.near/widget/Components.Pixel.Button"
) || {
  Button: () => <></>,
};
const { Hashtag } = VM.require(
  "blueprints.near/widget/Components.Pixel.Hashtag"
) || {
  Hashtag: () => <></>,
};
const { LinkTree } = VM.require(
  "blueprints.near/widget/Components.Pixel.LinkTree"
) || {
  LinkTree: () => <></>,
};
return {
  Button,
  Hashtag,
  LinkTree,
};
