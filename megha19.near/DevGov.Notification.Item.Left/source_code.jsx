const { href } = VM.require("megha2001.testnet/widget/core.lib.url") || (() => {});

if (!props.type) {
  return "Loading ...";
}

const type = props.type.split("/")[1];
return props.type ? (
  <>
    {type == "like"
      ? "liked your"
      : type == "reply"
      ? "replied to your"
      : type == "edit"
      ? "edited your"
      : type == "mention"
      ? "mentioned you in their"
      : "???"}{" "}
    <a
      className="fw-bold text-muted"
      href={href({
        widgetSrc: "megha2001.testnet/widget/app",
        params: {
          page: "post",
          id: props.post,
        },
      })}
    >
      DevHub post
    </a>
  </>
) : (
  "Loading ..."
);
