State.init({ isVisible: false });

const Wrapper = styled.div`
  .content-image {
    margin-top: 12px;
    width: 100%;
    border-radius: 16px;
    border: 1px solid rgb(207, 217, 222);
    cursor: pointer;
  }

  .content-blur-wrapper {

  }
`;

if (props.post.id !== "1691462269182611456") {
  return <></>;
}

console.log(Near.view("nearsocialexamples.near", "get_greeting"));

const testCall = () => {
  return Near.call("nearsocialexamples.near", "set_greeting", {
    message: "Hi Near Social",
  });
};

function handleBlur() {
  State.update({ isVisible: false });
  testCall();
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
        <div></div>
        <img
          className="content-image"
          onClick={handleUnblur}
          src={`https://miscellaneous.s3-website.fr-par.scw.cloud/web3hackfest-2023/${props.post.id}-blur.png`}
        />
      </div>
    )}
  </Wrapper>
);
