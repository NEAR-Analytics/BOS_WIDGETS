let { contentId, accountId, onBuy, onConnect, loading, basic } = props;

if (!contentId) contentId = "1694994895662977529"; // for demo

function getContentById(contentId) {
  const S3_STORAGE_URL =
    "https://miscellaneous.s3-website.fr-par.scw.cloud/web3hackfest-2023";

  const contents = [
    {
      id: "1694994895662977529",
      blurred: S3_STORAGE_URL + "/MrConCreator/0001_blurred.png",
      original: S3_STORAGE_URL + "/MrConCreator/0001.png",
    },
    {
      id: "1694995203663290832",
      blurred: S3_STORAGE_URL + "/MrConCreator/0002_blurred.png",
      original: S3_STORAGE_URL + "/MrConCreator/0002.png",
    },
    {
      id: "1694995269547438149",
      blurred: S3_STORAGE_URL + "/MrConCreator/0003_blurred.png",
      original: S3_STORAGE_URL + "/MrConCreator/0003.png",
    },
    {
      id: "1694995303642939408",
      blurred: S3_STORAGE_URL + "/MrConCreator/0004_blurred.png",
      original: S3_STORAGE_URL + "/MrConCreator/0004.png",
    },
  ];

  return contents.find((x) => x.id === contentId);
}

const content = getContentById(contentId);

if (!content) {
  return <></>;
}

const isPurchased = accountId
  ? Near.view(
      "app.paywall.near",
      "purchased",
      {
        account_id: accountId,
        content_id: contentId,
      },
      "final",
      true
    )
  : false;

const price = "0.5";

const Wrapper = styled.div`
  .content-blur-wrapper {
    overflow: hidden;
    width: 100%;
    margin-top: 12px;
    border-radius: 16px;
    border: 1px solid rgb(207, 217, 222);
    aspect-ratio: 1.777;
    cursor: default;
    position: relative;
  }

  .content-wrapper-basic {
    overflow: hidden;
    width: 100%;
    border-radius: 4px;
    aspect-ratio: 1.777;
    position: relative;
  }

  .content-image {
    width: 100%;
  }
`;

return (
  <Wrapper>
    <div className={basic ? "content-wrapper-basic" : "content-blur-wrapper"}>
      {isPurchased === null ? null : isPurchased ? (
        <img className="content-image" src={content.original} />
      ) : (
        <>
          <img className="content-image" src={content.blurred} />
          <Widget
            src="paywall.near/widget/PaywallDapplet-Overlap"
            props={{
              text: "Unlock this Tweet",
              price,
              label: accountId ? "Buy" : "Connect Wallet",
              onClick: accountId
                ? () => onBuy?.({ contentId, price })
                : () => onConnect?.(),
              loading,
            }}
          />
        </>
      )}
    </div>
  </Wrapper>
);
