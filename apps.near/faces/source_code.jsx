const accountId = props.accountId ?? context.accountId ?? "every.near";

let accounts = props.accounts ?? ["every.near"];

const renderFaces = accounts.slice(0, limit);

const Faces = styled.span`
  .face {
    display: inline-block;
    position: relative;
    top: -0.05em;
    margin: 0 -0.1em;
    height: 1.2em;
    width: 1.2em;
    min-width: 1em;
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
      {renderFaces.map((accountId, i) => (
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
