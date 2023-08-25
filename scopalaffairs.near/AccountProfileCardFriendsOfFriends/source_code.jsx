const Avatar = styled.a`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border: 1px solid #eceef0;
  overflow: hidden;
  border-radius: 56px;
  transition: border-color 200ms;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  &:hover,
  &:focus {
    border-color: #d0d5dd;
  }
`;

const Button = styled.div`
  div > .follow-button {
    color: #000 !important;
}
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  width: 100%;
  border-radius: 12px;
  z-index: 1070;
  background: #fff;
  border: 1px solid #eceef0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  overflow: hidden;
  padding: 16px 0;
`;

const CenteredLinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MaybeSelf = styled.div`
  height: 32px;
`;

const NoTags = styled.div`
  height: 20px;
`;

const Score = styled.div`
  font-size: 14px;
  color: #90908C;
  padding: 0;
`;

const Scores = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: left;
  width: 100%;
  padding: 16px 24px;
  border-bottom: 1px solid #eceef0;
  font-size: 14px;
  color: #90908C;
`;

const TagsWrapper = styled.div`
  max-width: 80%;
`;

const TextLink = styled.a`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 18px;
  color: ${(p) => (p.bold ? "#11181C !important" : "#687076 !important")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "visible")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "unset")};
  white-space: nowrap;
  outline: none;
  max-width: 230px;

  &:focus,
  &:hover {
    text-decoration: underline;
  }
`;

const accountId = props.accountId;
const profile = props.profile || Social.get(`${accountId}/profile/**`, "final");
const tags = Object.keys(profile.tags || {});
const profileUrl = `#/near/widget/ProfilePage?accountId=${accountId}`;

// Skip this for now
// {props.similar_posts && props.similar_posts.length > 0 && (
//   <Scores>
//     <>Because You Posted: {props.similar_posts[0].because_you_posted}</>
//     <p>Similar Posts:</p>
//     <ul>
//       {props.similar_posts[0].recommended_profile.map((profile, index) => (
//         <Score key={index}>
//           <p>{profile} posted:</p>
//           <p>{props.similar_posts[0].post_text[index]}</p>
//           <p>
//             <p>
//               {" "}
//               {(
//                 props.similar_posts[0].post_similarity[index] * 100
//               ).toFixed(2)}
//               % Similarity
//             </p>
//           </p>
//           <hr />
//         </Score>
//       ))}
//     </ul>
//   </Scores>
// )}

return (
  <Card>
    <Avatar href={profileUrl}>
      <Widget
        src="mob.near/widget/Image"
        props={{
          image: props.profileImage || profile.image,
          alt: props.profileName || profile.name,
          fallbackUrl:
            "https://ipfs.near.social/ipfs/bafkreibiyqabm3kl24gcb2oegb7pmwdi6wwrpui62iwb44l7uomnn3lhbi",
        }}
      />
    </Avatar>
    <CenteredLinksWrapper>
      <TextLink href={profileUrl} ellipsis bold>
        {props.profileName || profile.name || accountId.split(".near")[0]}
      </TextLink>
      <TextLink href={profileUrl} ellipsis>
        @{accountId}
      </TextLink>
    </CenteredLinksWrapper>
    {tags.length > 0 ? (
      <TagsWrapper>
        <Widget src="near/widget/Tags" props={{ tags, scroll: true }} />
      </TagsWrapper>
    ) : (
      <TagsWrapper>
        <NoTags></NoTags>
      </TagsWrapper>
    )}

    {props.tags_similarity_score !== null && (
      <Scores>
        <Score>
          {" "}
          {(props.tags_similarity_score * 100).toFixed(0)}% Tag Similarity
        </Score>
      </Scores>
    )}

    {props.follows_you !== null &&
      props.because_you_know !== null &&
      props.aggregated_authority_score !== null &&
      props.aggregated_hub_score !== null &&
      props.tags_similarity_score !== null && (
        <Scores>
          {props.follows_you == 1 && <Score>Follows You</Score>}
          <Score>
            {props.aggregated_authority_score.toFixed(2)} Authority Score
          </Score>
          <Score>{props.aggregated_hub_score.toFixed(2)} Hub Score</Score>
        </Scores>
      )}

    {props.because_you_know && props.because_you_know.length > 0 && (
      <Scores>
        Because you know
        <ul>
          {props.because_you_know.map((profile, index) => (
            <Score key={index}>{profile}</Score>
          ))}
        </ul>
      </Scores>
    )}

    {context.accountId && context.accountId !== props.accountId ? (
      <Button>
        <Widget
          src="near/widget/FollowButton"
          props={{ accountId: props.accountId }}
        />
      </Button>
    ) : (
      <Button>
        <MaybeSelf></MaybeSelf>
      </Button>
    )}
  </Card>
);
