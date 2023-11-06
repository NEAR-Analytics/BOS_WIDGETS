const { secretkey, nearconId, label, isAdmin, isSuper, inAdminPage } = props;

const ownerId = "nearcon23.near";

const Container = styled.div`
  position: relative;
  min-height: 64px;
  background-color: #00EC97;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left:20px;
  padding-right:20px;

  background-image: url(${
    inAdminPage
      ? "https://ipfs.near.social/ipfs/bafkreigmwev6i2ivgz5ampkihov2ub7yenn7hohs34erheclixz2dopwru"
      : "https://ipfs.near.social/ipfs/bafkreih7nzetlwxrz2viqazzkdyt5faey536a5vc6iljxxc6i3lfjiedne"
  });
  background-color: #cccccc;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .toggle {
    curson : pointer;
    a:hover {
      text-decoration:none;
    }
  }
`;

const TitleBarText = styled.h3`
  font-family: FK Grotesk;
  font-weight: 600;
  margin: 0;
  font-size:20px;
`;

const trimName = (nearconId) => {
  let name = (nearconId || "")?.replace(".nearcon23.near", "");

  if (name.length > 12) {
    name = name.substring(0, 15) + "...";
  }

  return "@" + name;
};

return (
  <Container>
    {label ? (
      <TitleBarText>{label}</TitleBarText>
    ) : (
      <TitleBarText>
        {trimName(nearconId)}
        <span
          style={{
            fontSize: ".85rem",
            fontWeight: 400,
            opacity: 0.85,
            marginLeft: -4,
          }}
        >
          .nearcon23.near
        </span>
      </TitleBarText>
    )}

    {(isAdmin || isSuper) && (
      <div className="toggle">
        <Link
          to={inAdminPage ? "/mobile" : "/admin"}
          style={{ color: "currentColor" }}
        >
          <Widget
            src={`${ownerId}/widget/Inputs.Toggle2`}
            props={{
              style: {
                fontSize: 14,
              },
              rightLabel: inAdminPage ? "Mobile" : "Admin",
              value: inAdminPage,
              onChange: () => {},
            }}
          />
        </Link>
      </div>
    )}
  </Container>
);
