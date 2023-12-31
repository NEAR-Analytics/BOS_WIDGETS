const accountId = props.accountId;
const blockHeight = props.blockHeight ?? parseInt(props.blockHeight);
const dbAction = props.dbAction || "discuss";
const identifier = props.identifier;

const composeWidget =
  props.composeWidget ||
  "ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/NestedDiscussions.Compose";

const previewWidget =
  props.previewWidget ||
  "ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/NestedDiscussions.Preview";

const singlePageView =
  props.singlePageView ||
  "ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/NestedDiscussions.SinglePageView";

return (
  <Widget
    src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/NestedDiscussions.Feed"
    props={{
      dbAction,
      composeWidget,
      previewWidget,
      singlePageView,
      identifier,
    }}
  />
);
