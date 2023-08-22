State.init({ isVisible: false });

const Wrapper = styled.div`
  .content-image {
    width: 100%;
    aspect-ratio: 1.777;
    cursor: default;
  }

  .content-blur-wrapper {
    margin-top: 12px;
    border-radius: 16px;
    border: 1px solid rgb(207, 217, 222);
  }

  .unlock-content-overlay {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    position: absolute;
    background: rgba(255,255,255,0.6);
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
    background: #1D9BF0;
    color: #FFF;
    text-align: center;
    font-family: Helvetica;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border: none;
    cursor: pointer;
  }
`;

if (props.post.id !== "1691462269182611456") {
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
    {state.isVisible ? (
      <img
        className="content-image"
        onClick={handleBlur}
        src={`https://miscellaneous.s3-website.fr-par.scw.cloud/web3hackfest-2023/${props.post.id}-original.png`}
      />
    ) : (
      <div className="content-blur-wrapper">
        <div className="unlock-content-overlay">
          <div className="text">Unlock this Tweet</div>
          <div className="price">0.5 $NEAR</div>
          <button className="main-button">Buy</button>
        </div>
        <img
          className="content-image"
          onClick={handleUnblur}
          src={`https://miscellaneous.s3-website.fr-par.scw.cloud/web3hackfest-2023/${props.post.id}-blur.png`}
        />
      </div>
    )}
  </Wrapper>
);
