State.init({ isVisible: false });

const Wrapper = styled.div`
  .content-image {
    margin-top: 12px;
    width: 100%;
    border-radius: 16px;
    border: 1px solid rgb(207, 217, 222);
    cursor: pointer;
  }
`;

if (props.post.id !== "1691462269182611456") {
  return <></>;
}

function handleBlur(e) {
  e.stopPropagation();
  State.update({ isVisible: false });
}

function handleUnblur(e) {
  e.stopPropagation();
  State.update({ isVisible: true });
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
      <img
        className="content-image"
        onClick={handleUnblur}
        src={`https://miscellaneous.s3-website.fr-par.scw.cloud/web3hackfest-2023/${props.post.id}-blur.png`}
      />
    )}
  </Wrapper>
);
