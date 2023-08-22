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
  }

  .unlock-content-overlay {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    background-image: url(https://miscellaneous.s3-website.fr-par.scw.cloud/web3hackfest-2023/1691462269182611456-blur.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: white;
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

  .unlock-content-overlay > .main-button:hover {
    background-color: rgb(26,140,216);
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
    <div className="content-blur-wrapper">
      {state.isVisible ? (
        <img
          className="content-image"
          onClick={handleBlur}
          src={`https://miscellaneous.s3-website.fr-par.scw.cloud/web3hackfest-2023/${props.post.id}-original.png`}
        />
      ) : (
        <div
          className="unlock-content-overlay"
          style={{
            backgroundImage: `https://miscellaneous.s3-website.fr-par.scw.cloud/web3hackfest-2023/${props.post.id}-blur.png`,
          }}
        >
          <div className="text">Unlock this Tweet</div>
          <div className="price">0.5 $NEAR</div>
          <button className="main-button">Buy</button>
        </div>
      )}
    </div>
  </Wrapper>
);
