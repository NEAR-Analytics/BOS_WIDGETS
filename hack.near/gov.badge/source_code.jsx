const orgId = props.orgId ?? "rc-dao.near";

const accountId = props.accountId ?? "hack.near";

if (!accountId) {
  return "";
}

const connectionData = Social.keys(
  `${orgId}/graph/connect/${accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const connected = Object.keys(connectionData || {}).length > 0;

const Badge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .image {
    display: block;
    height: 7em;
  }
}`;

return (
  <Badge>
    {connected ? (
      <Widget src="hack.near/widget/dao.badge" />
    ) : (
      <h5>none found</h5>
    )}
  </Badge>
);
