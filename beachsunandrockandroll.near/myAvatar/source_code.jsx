const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");

const { Badge } = VM.require("beachsunandrockandroll.near/widget/badge");

State.init({
  cnBadge: "",
});

if (["", "loaded"].includes(state.cnBadge))
  return (
    <Widget
      src="beachsunandrockandroll.near/widget/badgeIframe"
      props={{
        output: (cnBadge) => State.update({ cnBadge }),
      }}
    />
  );

return (
  <Tailwind>
    <div className="flex mx-auto w-max pt-10">
      <Badge className={state.cnBadge}>Badge</Badge>
    </div>
  </Tailwind>
);
