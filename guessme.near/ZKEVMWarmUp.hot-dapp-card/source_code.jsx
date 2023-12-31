const { background, src, dappName, creator, widgetPath, widgetSrc } = props;

const DappCardWrapper = styled.a`
  padding: 20px 8px;
  display: flex;
  align-items: center;

  :hover {
    text-decoration: none;
  }

  gap: 6px;
  width: 248px;
  height: 108px;
  border-radius: 20px;

  .icon-wrapper {
    width: 72px;
    height: 72px;
    border-radius: 20px;
  }

  .dapp-detail {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .dapp-name {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    color: #ffffff;
    /* white-space: nowrap; */
  }

  .dapp-creator {
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    color: #979abe;
  }
  @media (max-width:900px) {
    width: 165px;
    height: 150px;
    display: inline-block;
    text-align: center;
    .icon-wrapper{
      width: 50px;
      height: 50px;
    }
    .dapp-name{
      text-align: center;
      font-size: 16px;
    }
    .dapp-creator{
      font-size: 12px;
      text-align: center;
    }
  }
`;

const metadata = Social.get(`${widgetSrc}/metadata/**`, "final");

return (
  <DappCardWrapper
    href={widgetSrc}
    style={{
      background,
    }}
  >
    {metadata.image.ipfs_cid ? (
      <img
        src={`https://ipfs.near.social/ipfs/${metadata.image.ipfs_cid}`}
        className="icon-wrapper"
      ></img>
    ) : (
      <div className="icon-wrapper"></div>
    )}

    <div className="dapp-detail">
      <div className="dapp-name">{metadata.name || dappName}</div>

      <div className="dapp-creator">@{creator}</div>
    </div>
  </DappCardWrapper>
);
