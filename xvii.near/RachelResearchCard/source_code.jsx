const accountId = props.accountId ?? "racheludoka.near";
const profile = props.profile || Social.get(`${accountId}/profile/**`, "final");
const tags = Object.keys(profile.tags || {});
const profileUrl = `/ndcplug.near/widget/DAO.main?daoId=${accountId}`;
const onPointerUp =
  props.onClick ??
  ((event) => {
    if (props.debug) {
      console.log("click", event);
    }
  });

State.init({
  show: false,
});

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  width: 100%;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #ECEEF0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
  padding: 16px;
`;

const CardLeft = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-grow: 1;
  min-width: 0;

  > div {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
`;

const CardRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Avatar = styled.a`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border: 1px solid #ECEEF0;
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
    border-color: #D0D5DD;
  }
`;

const TextLink = styled.a`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 18px;
  color: ${(p) => (p.bold ? "#11181C !important" : "#687076 !important")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "visible")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "unset")};
  white-space: nowrap;
  outline: none;

  &:focus,
  &:hover {
    text-decoration: underline;
  }
`;

const TagsWrapper = styled.div`
  padding-top: 4px;
`;

const ResearchTopic = styled.div`
  font-size: 14px;
  line-height: 18px;
  color: #687076;
  padding: 8px;
  border: 1px solid #ECEEF0;
  border-radius: 8px;
  text-align: left;
`;

const BoldLabel = styled.span`
  font-weight: 600;
  display: block; // Makes it go on a new line
`;

return (
  <Card>
    <CardLeft>
      <Avatar href={profileUrl} onPointerUp={onPointerUp}>
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: profile.image,
            alt: profile.name,
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreigntstuf6xnfn25zddw6gzlzva7eqpm7kwrkmnj27gw5iguvk7aku",
          }}
        />
      </Avatar>

      <div>
        <TextLink href={profileUrl} onPointerUp={onPointerUp} ellipsis bold>
          {profile.name || accountId.split(".near")[0]}
        </TextLink>
        <TextLink href={profileUrl} onPointerUp={onPointerUp} ellipsis>
          @{accountId}
        </TextLink>

        {tags.length > 0 && (
          <TagsWrapper>
            <Widget src="near/widget/Tags" props={{ tags, scroll: true }} />
          </TagsWrapper>
        )}
      </div>
    </CardLeft>

    <CardRight>
      <ResearchTopic>
        <BoldLabel>Research topic selected:</BoldLabel>
        Airdrop campaign and it's effects on new projects
      </ResearchTopic>
    </CardRight>
  </Card>
);
