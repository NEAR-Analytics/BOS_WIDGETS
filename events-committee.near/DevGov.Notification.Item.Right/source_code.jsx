const { href } = VM.require("events-committee.near/widget/core.lib.url") || (() => {});

return props.post === undefined ? (
  "Loading ..."
) : (
  <>
    <a
      className="btn btn-outline-dark"
      href={href({
        widgetSrc: "events-committee.near/widget/app",
        params: {
          page: "post",
          id: props.post,
        },
      })}
    >
      View DevHub post
    </a>
  </>
);
