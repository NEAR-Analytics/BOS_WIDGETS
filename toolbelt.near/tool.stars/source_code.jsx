const src = props.src ?? "efiz.near/widget/Tree";
const [creatorId, type, thingId] = src.split("/");
const blockHeight = props.blockHeight;

const creator = creatorId.replace(/\.[^\.]*$/, "");

const stars = Social.get(
  `*/graph/star/${creatorId}/${type}/${thingId}`,
  "final"
);

if (!stars) {
  return "";
}

const accounts = Object.keys(stars);

return (
  <>
    <div className="m-2">
      <span>
        {context.accountId && (
          <Widget src="hack.near/widget/star.button" props={{ path: src }} />
        )}
      </span>
      <span className="ms-2">{accounts.length} stars</span>
    </div>
    <div className="m-1 mt-3">
      <Widget src="hack.near/widget/faces" props={{ accounts, limit: 5 }} />
    </div>
  </>
);
