State.init({ isVisible: false });

const Wrapper = styled.div`
  .text {
    color: #f00;
  }
`;

if (props.post.id !== "1691462269182611456") {
  return null;
}

return (
  <Wrapper>
    {state.isVisible ? (
      <img
        onClick={() => State.update({ isVisible: false })}
        src={`https://miscellaneous.s3-website.fr-par.scw.cloud/web3hackfest-2023/${props.post.id}-original.png`}
      />
    ) : (
      <img
        onClick={() => State.update({ isVisible: true })}
        src={`https://miscellaneous.s3-website.fr-par.scw.cloud/web3hackfest-2023/${props.post.id}-blur.png`}
      />
    )}
  </Wrapper>
);
