let accountId;
let itemGlobalId;

if (props.accountGId && props.itemGId) {
  accountId = props.accountGId;
  itemGlobalId = props.itemGId;
} else if (
  (props.accountId || props.notifyAccountId) &&
  (props.blockHeight || props.item?.blockHeight)
) {
  accountId = props.accountId || props.notifyAccountId;
  const blockHeight = props.blockHeight || props.item?.blockHeight;
  itemGlobalId = `bos/${blockHeight}/${accountId}/post/main`;
} else if (props.context) {
  accountId = `${props.context.values.authorUsername}/twitter`;
  itemGlobalId = `post/${props.context.values.id}`;
} else {
  console.error(
    "The context should provide accountGId with itemGId or accountId with blockHeight props."
  );
  return <></>;
}

return "hello";
