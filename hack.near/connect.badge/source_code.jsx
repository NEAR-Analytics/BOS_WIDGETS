const accountId = props.accountId;

if (!accountId) {
  return "";
}

const connectionData = Social.keys(
  `build.sputnik-dao.near/graph/connect/${accountId}`,
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
  padding: 0.5em 1em;

  .image {
    display: block;
    height: 8em;
    margin: 0.5em;
  }
}`;

return (
  <Badge>
    {connected && (
      <Widget
        src="mob.near/widget/Image"
        props={{
          image: {
            ipfs_cid: "QmcxtybPoeXG1ypbDQDNe4U2c4cNFW4KeuQ5q42gZwnceV",
          },
          alt: "connected",
          className: "image",
          thumbnail,
        }}
      />
    )}
  </Badge>
);
