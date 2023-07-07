const o = Social.keys(
  `build.sputnik-dao.near/graph/connect/${props.accountId}`,
  undefined,
  {
    values_only: true,
  }
);

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
    <Widget
      src="mob.near/widget/Image"
      props={{
        image: {
          ipfs_cid: "QmcxtybPoeXG1ypbDQDNe4U2c4cNFW4KeuQ5q42gZwnceV",
        },
        alt: "connected",
        fallbackUrl:
          "https://ipfs.near.social/ipfs/bafkreibiyqabm3kl24gcb2oegb7pmwdi6wwrpui62iwb44l7uomnn3lhbi",
        className: "image",
        thumbnail,
      }}
    />
  </Badge>
);
