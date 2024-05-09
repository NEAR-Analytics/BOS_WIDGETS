const accountId = context.accountId;
State.init({ image: {}, uploaded: false });
const data = state.image.cid && { ipfs_cid: state.image.cid };

const imageLink = data && `https://ipfs.near.social/ipfs/${data.ipfs_cid}`;
const Wrap = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
`;

if (!accountId) return "Please Login to use image Upload";

return (
  <Wrap>
    <IpfsImageUpload
      image={state.image}
      className="my-2 btn btn-outline-primary"
    />
    <br />
    {state.uploaded ? (
      <a
        href={imageLink}
        target="_blank"
        onClick={() => State.update({ uploaded: false, image: {} })}
        className="btn btn-outline-primary"
      >
        See Image
        <i class="bi bi-box-arrow-in-up-right ms-2"></i>
      </a>
    ) : (
      <CommitButton
        className="btn btn-primary"
        data={{ imageUpload: data }}
        disabled={!state.image.cid}
        onCommit={() => State.update({ uploaded: true })}
      >
        Save Image
      </CommitButton>
    )}
    {state.uploaded && <p> image url: {JSON.stringify(imageLink)} </p>}
  </Wrap>
);
