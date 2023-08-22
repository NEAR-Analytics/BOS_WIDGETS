State.init({ isVisible: false });

const Wrapper = styled.div`
  .content-image {
    margin-top: 12px;
    width: 100%;
    border-radius: 16px;
    border: 1px solid rgb(207, 217, 222);
  }
`;

if (props.post.id !== "1691462269182611456") {
  return <></>;
}

return (
  <Wrapper>
    {state.isVisible ? (
      <img
        className="content-image"
        onClick={() => State.update({ isVisible: false })}
        src={`https://miscellaneous.s3-website.fr-par.scw.cloud/web3hackfest-2023/${props.post.id}-original.png`}
      />
    ) : (
      <img
        className="content-image"
        onClick={() => State.update({ isVisible: true })}
        src={`https://miscellaneous.s3-website.fr-par.scw.cloud/web3hackfest-2023/${props.post.id}-blur.png`}
      />
    )}
  </Wrapper>
);
