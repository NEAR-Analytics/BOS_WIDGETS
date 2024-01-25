const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "Requires accountID prop";
}

const description = Social.get(`${accountId}/profile/description`);
const profile = Social.getr(`${accountId}/profile`);

const Description = styled.div`
  max-height: 8rem;
  position: relative;
  overflow: hidden;
  h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6 {
    font-size: 1.2rem;
    margin: 0
  }
  p {
    margin: 0
  }
  :after {
    content  : "";
    position : absolute;
    z-index  : 1;
    top   : 4rem;
    left     : 0;
    pointer-events   : none;
    background-image : linear-gradient(to bottom, 
                      rgba(255,255,255, 0), 
                      rgba(255,255,255, 1) 90%);
    width    : 100%;
    height   : 4rem;
  }
`;

const Wrapper = styled.div`
*, *::before, *::after{
    font-family: Helvetica Neue; 
    }
    .top_bar{
        height: 64px; 
        width: 100%
        margin-bottom: 10px;
    }
`;
return (
  <Wrapper>
    <div className="d-flex flex-column gap-2">
      <a
        href={`/bos.genadrop.near/widget/DropFlow.ArtistPage?accountId=${accountId}`}
        className="link-dark text-truncate"
      >
        <div className="top_bar mb-2">
          <img
            src={
              profile.backgroundImage
                ? `https://ipfs.near.social/ipfs/${profile.backgroundImage.ipfs_cid}`
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRub7hFLkStCvZiaSeiUGznP4uzqPPcepghhg&usqp=CAU"
            }
            className="w-100 h-100"
            style={{ objectFit: "cover" }}
            alt=""
          />
        </div>
        <div className="mx-3">
          <Widget
            src="jgodwill.near/widget/ProfileLine"
            props={{ accountId, hideDescription: true }}
          />
        </div>
      </a>
      <div className="mx-3">
        <Description>
          <Markdown text={description} />
        </Description>
        <div className="d-flex">
          <div className="me-3">
            <Widget src="mob.near/widget/FollowStats" props={{ accountId }} />
          </div>
          <Widget src="mob.near/widget/FollowsYouBadge" props={{ accountId }} />
        </div>
        <div className="d-flex gap-4 mt-2">
          <Widget
            src="jgodwill.near/widget/CPlanet.FollowButton"
            props={{ accountId }}
          />
          {/* <Widget src="mob.near/widget/PokeButton" props={{ accountId }} />*/}
        </div>
      </div>
    </div>
  </Wrapper>
);
