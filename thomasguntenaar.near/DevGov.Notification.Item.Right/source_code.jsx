const { href } = VM.require("thomasguntenaar.near/widget/core.lib.url") || (() => {});

return props.post === undefined ? (
  "Loading ..."
) : (
  <>
    <a
      className="btn btn-outline-dark"
      href={href({
        widgetSrc: "thomasguntenaar.near/widget/dh.post",
        params: {
          id: props.post,
        },
      })}
    >
      View DevHub post
    </a>
  </>
);
