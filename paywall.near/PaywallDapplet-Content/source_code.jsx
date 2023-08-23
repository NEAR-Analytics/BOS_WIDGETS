State.init({ isVisible: false });

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

  .unlock-content-overlay {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    background-color: rgba(255, 255, 255, 0.6);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .unlock-content-overlay > .text {
    color: #000;
    text-align: center;
    font-family: Helvetica;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .unlock-content-overlay > .price {
    color: #000;
    text-align: center;
    font-family: Helvetica;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .unlock-content-overlay > .main-button {
    display: flex;
    padding: 10px 40px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 20px;
    background: #1d9bf0;
    color: #fff;
    text-align: center;
    font-family: Helvetica;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border: none;
    cursor: pointer;
    transition-duration: 0.2s;
  }

  .unlock-content-overlay > .main-button:hover {
    background-color: rgb(26, 140, 216);
  }

  .content-image {
    width: 100%;
  }
`;

const tweetIdsWithContent = ["1691462269182611456", "1454091121320206337"];

if (!tweetIdsWithContent.includes(props.post.id)) {
  return <></>;
}

function handleBlur() {
  State.update({ isVisible: false });
  return false;
}

function handleUnblur() {
  State.update({ isVisible: true });
  return false;
}

return (
  <Wrapper>
    <div className="content-blur-wrapper">
      {state.isVisible ? (
        <img
          className="content-image"
          onClick={handleBlur}
          src={`https://miscellaneous.s3-website.fr-par.scw.cloud/web3hackfest-2023/${props.post.id}-original.png`}
        />
      ) : (
        <>
          <img
            className="content-image"
            src={`https://miscellaneous.s3-website.fr-par.scw.cloud/web3hackfest-2023/${props.post.id}-blur.png`}
          />
          {props.accountId ? (
            <div className="unlock-content-overlay">
              <div className="text">Unlock this Tweet</div>
              <div className="price">0.5 $NEAR</div>
              <button
                className="main-button"
                onClick={() => props.onBuy()}
                disabled={props.loading}
              >
                Buy
              </button>
            </div>
          ) : (
            <div className="unlock-content-overlay">
              <div className="text">Unlock this Tweet</div>
              <div className="price">0.5 $NEAR</div>
              <button
                className="main-button"
                onClick={() => props.onConnect()}
                disabled={props.loading}
              >
                Connect Wallet
              </button>
            </div>
          )}
        </>
      )}
    </div>
  </Wrapper>
);
