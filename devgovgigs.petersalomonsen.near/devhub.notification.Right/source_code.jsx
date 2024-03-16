const { href } = VM.require("devgovgigs.petersalomonsen.near/widget/core.lib.url") || (() => {});

return props.proposal === undefined ? (
  "Loading ..."
) : (
  <>
    <a
      className="btn btn-outline-dark"
      href={href({
        widgetSrc: "devgovgigs.petersalomonsen.near/widget/app",
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
