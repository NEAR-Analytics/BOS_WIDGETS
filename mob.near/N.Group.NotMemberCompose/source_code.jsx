const text =
  props.text ??
  "Only owners of this NFT collection can post, comment and repost";
const groupId = props.groupId;
const buttonText = props.buttonText ?? "Subscribe to Premium";

const Wrapper = styled.div`
  border-bottom: 1px solid #eee;
  margin: 0 -12px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

const Locked = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="ratio-1x1"
    style={{ height: "4em" }}
    viewBox="0 0 16 16"
    fill="#bbb"
  >
    <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7.764a3 3 0 0 0-4.989 2.497 2.01 2.01 0 0 0-.743.739H6.5a.5.5 0 0 0-.5.5V16H3a1 1 0 0 1-1-1V1Zm2 1.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5Zm3 0v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM4 5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5ZM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5ZM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5Z" />
    <path d="M9 13a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2Zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1Z" />
  </svg>
);

return (
  <Wrapper className="d-flex align-items-center flex-row p-2">
    <div className="me-3">{Locked}</div>
    <div className="flex-grow-1">
      <p>{text}</p>
      <div>
        <a
          className="btn btn-outline-primary rounded-5 text-nowrap"
          href={`/mintbase.near/widget/nft-marketplace?contracts=${groupId}&affiliateAccount=mob.near`}
        >
          Buy with{" "}
          <img
            style={{ width: "5em", background: "#fff" }}
            src="https://www.mintbase.xyz/mintbase1.svg"
            alt="Mintbase logo"
          />
        </a>
      </div>
    </div>
  </Wrapper>
);
