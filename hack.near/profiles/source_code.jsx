const accountId = props.accountId || context.accountId || "every.near";
const limit = props.limit || 888;

let buildersObject =
  props.builders || Social.get(`*/graph/commons/${accountId}`, "final");

const builders = Object.keys(buildersObject);

const Faces = styled.span`
  .face {
    display: inline-block;
    position: relative;
    top: -0.05em;
    margin: 0 -0.1em;
    height: 1.888em;
    width: 1.888em;
    min-width: 1.5em;
    img {
        object-fit: cover;
        border-radius: 50%;
        width: 100%;
        height: 100%;
    }
  }
`;

return (
  <>
    <Faces className="ms-2">
      {builders.map((accountId, i) => (
        <a
          key={i}
          href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
          className="text-decoration-none d-inline-block"
        >
          <Widget
            src="mob.near/widget/Profile.OverlayTrigger"
            props={{
              accountId,
              children: (
                <Widget
                  src="mob.near/widget/ProfileImage"
                  props={{
                    metadata,
                    accountId,
                    widgetName,
                    style: { zIndex: 10 - i },
                    className: "face",
                    tooltip: false,
                    imageStyle: {},
                    imageClassName: "",
                  }}
                />
              ),
            }}
          />
        </a>
      ))}
    </Faces>
  </>
);
