const groupId = props.groupId ?? "6fd36ddf4884flm20pbe91e7b208b88d16";

const groupMembers = Social.get(`*/graph/${groupId}/**`, "final");

if (!groupMembers) {
  return "";
}
const groupInfo = props.group ?? Social.get(`*/thing/${groupId}/**`, "final");

if (!groupInfo) {
  return "";
}

const groupKey = Object.keys(groupInfo)[0];

const tags = Object.keys(
  groupInfo[groupKey].thing[Object.keys(groupInfo[groupKey].thing)[0]].tags ||
    {}
);
const groupUrl = `/hack.near/widget/group?groupId=${groupId}`;

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
  z-index: 1070;
  background: #fff;
  border: 1px solid #eceef0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  overflow: hidden;
  padding: 16px;
`;

const CardLeft = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  width: 100%;
  min-width: 0;

  > div {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 0;
  }
`;

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

  &:focus,
  &:hover {
    text-decoration: underline;
  }
`;

const TagsWrapper = styled.div`
  padding-top: 4px;
`;

return (
  <Card>
    <CardLeft>
      <Avatar href={groupUrl}>
        <Widget
          src="mob.near/widget/Image"
          props={{
            image:
              groupInfo[groupKey].thing[Object.keys(groupInfo[groupKey].thing)]
                .image,
            alt: groupInfo[groupKey].thing[
              Object.keys(groupInfo[groupKey].thing)
            ].name,
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreibiyqabm3kl24gcb2oegb7pmwdi6wwrpui62iwb44l7uomnn3lhbi",
          }}
        />
      </Avatar>

      <div>
        <TextLink href={groupUrl} ellipsis bold>
          {
            groupInfo[groupKey].thing[Object.keys(groupInfo[groupKey].thing)[0]]
              .name
          }
        </TextLink>
        <TextLink href={groupUrl} ellipsis>
          @{Object.keys(groupInfo)}
        </TextLink>

        {tags.length > 0 && (
          <TagsWrapper>
            <Widget src="near/widget/Tags" props={{ tags, scroll: true }} />
          </TagsWrapper>
        )}
      </div>
    </CardLeft>
  </Card>
);
