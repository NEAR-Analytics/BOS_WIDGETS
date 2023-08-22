State.init({ isVisible: false });

const Wrapper = styled.div`
  .content-image {
    margin-top: 12px;
    width: 100%;
    border-radius: 16px;
    border: 1px solid rgb(207, 217, 222);
    cursor: pointer;
    aspect-ratio: 1.777;
  }

  .unlock-content-overlay {
    display: flex;
    width: 411px;
    height: 231px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }

  .unlock-content-overlay > .text {
    color: #000;
    text-align: center;
    font-family: Helvetica;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .unlock-content-overlay > .price {
    color: #000;
    text-align: center;
    font-family: Helvetica;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .unlock-content-overlay > .main-button {
    display: flex;
    padding: 7px 30px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 20px;
    background: #1D9BF0;
    color: #FFF;
    text-align: center;
    font-family: Helvetica;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
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
