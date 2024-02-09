const image = props.image;

const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "";
}

const color =
  props.color || Social.get(`${accountId}/badge/builder/${accountId}`);

let isBuilder = props.isBuilder ?? false;

const badgeData =
  props.badgeData ||
  Social.get(`${context.accountId}/badge/builder/${accountId}`) ||
  Social.get(`${accountId}/badge/builder/${accountId}`);

if (badgeData.length > 0 || badgeData === "") {
  isBuilder = true;
}

return (
  <>
    {isBuilder && image && (
      <Widget src="mob.near/widget/Image" props={{ image }} />
    )}
  </>
);
