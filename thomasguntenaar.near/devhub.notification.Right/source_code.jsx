const { href } = VM.require("thomasguntenaar.near/widget/core.lib.url") || (() => {});

return props.proposal === undefined ? (
  "Loading ..."
) : (
  <>
    <a
      className="btn btn-outline-dark"
      href={href({
        widgetSrc: "thomasguntenaar.near/widget/app",
        params: {
          page: "proposal",
          id: props.proposal,
        },
      })}
    >
      View DevHub proposal
    </a>
  </>
);
