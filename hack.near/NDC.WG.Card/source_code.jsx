const creatorId = props.creatorId ?? context.accountId;

const groupId = props.groupId ?? "cefe2651fd468lm0x9mg91d69d351d0c4";

const groupData = props.data ?? Social.get(`${creatorId}/thing/${groupId}/**`);

State.init({
  verified: false,
  shareText: "Copy link",
});

const widgets = {
  styledComponents: "hack.near/widget/NDC.StyledComponents",
  groupPage: "near/widget/ProfilePage",
};

const isHuman = Near.view(registry_contract, "is_human", {
  account: context.accountId,
});
State.update({ verified: isHuman[0][1].length > 0 });

function handleShare() {
  State.update({ shareText: "Copied" });
  clipboard.writeText("#/hack.near/widget/NDC.WG.Page");
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  gap: 16px;
  background: #f8f8f9;
  border-radius: 10px;
`;
const HeaderCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  width: 100%;
`;
const ProfilePicture = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
`;
const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  flex-grow: 1;
`;
const HeaderTag = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  height: 18px;
  background: linear-gradient(90deg, #9333ea 0%, #4f46e5 100%);
  border-radius: 100px;
`;
const HeaderTagP = styled.p`
  height: 10px;
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  display: flex;
  align-items: center;
  color: white;
  margin: 0;
`;
const UserLink = styled.a`
  width: 100%;
  cursor: pointer;
  &:hover {
    text-decoration: none;
  }
`;
const GroupName = styled.p`
  font-weight: 500;
  font-size: 14px;
  margin: 0;
  align-items: center;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const GroupCreator = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  margin: 0px;
  line-height: 120%;
  display: flex;
  align-items: center;
  color: #828688;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Icon = styled.img`
  width: 17px;
  height: 17px;
`;
const CollapseGroup = styled.div`
  padding: 12px;
  background: #ffffff;
  border-radius: 6px;
`;
const CollapseGroupContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: 5px;
`;
const CollapseGroupText = styled.p`
  width: 274px;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 120%;
  margin: 0px;
  margin-bottom: 3px;
  color: #000000;
`;
const DownArrow = styled.img`
  width: 16px;
  height: 16px;
`;
const GroupTagContainer = styled.div`
  gap: 4px;
`;

const Groups = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px;
  gap: 12px;
  background: #ffffff;
  border-radius: 6px;
  width: 100%;
`;
const GroupsContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;
  width: 100%;
`;
const GroupsHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;
`;
const GroupsTitle = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 120%;
  margin-bottom: 0;
`;
const GroupsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  overflow-y: scroll;
  height: 140px;
  width: 100%;
`;
const GroupTitle = styled.p`
  font-weight: 500;
  font-size: 12px;
  margin-bottom: 5px;
  white-space: pre-wrap;
`;
const GroupDescription = styled.p`
  font-weight: 400;
  font-size: 11px;
  margin-bottom: 0;
`;
const GroupSeparator = styled.div`
  height: 1px;
  margin: 7px 0 2px 0;
  background: rgba(208, 214, 217, 0.4);
`;
const LowerSection = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
`;
const LowerSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
`;
const ButtonsLowerSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  width: 100%;
  height: 28px;
`;
const TextLowerSectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 4px;
  width: 239px;
  height: 24px;

  flex-grow: 1;
`;
const ClockIcon = styled.img`
  width: 12px;
  height: 12px;
`;
const TimestampText = styled.div`
  font-style: italic;
  font-weight: 300;
  font-size: 11px;
  line-height: 14px;
  margin: 0px;
  gap: 2px;
  color: #000000;

  b {
    font-weight: 600;
  }
`;
const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 4px;
  width: 87px;
  height: 28px;
`;
const TagSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 4px;
  flex-wrap: wrap;
  overflow: hidden;
`;
const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div`
  display: none;
  left: 0;
  font-size: 12px;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  z-index: 1;
  padding: 8px;
`;

const Element = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 10px;

  &:hover {
    border-radius: 6px;
    background: #f8f8f9;
  }
`;

const ShareLink = styled.a`
  color: black;
  margin-right: 8px 12px;
  text-decoration: none;
  display: block;
  text-align: start;
`;

const ShareIcon = styled.img`
  width: 20px;
`;

const DropdownContainerHover = styled.div`
  width: fit-content;
  float: right;

  &:hover ${DropdownContent} {
    display: flex;
    margin-top: -165px;
  }
`;

const Separation = styled.div`
    position: absolute;
  }
`;

const Wrapper = styled.div`

  @media only screen and (max-width: 610px) {
    width: 100%;
  }
  width: 50%;
`;

const trimText = (text, limit) => {
  if (!text) return "";

  const _limit = limit ?? 200;
  const ending = text.length > _limit ? "..." : "";
  const trimmed = text.slice(0, limit ?? 200);

  return `${trimmed}${ending}`;
};

return (
  <Wrapper className="p-2 col-lg-4 col-md-6 col-sm-12">
    <Card>
      <HeaderCard className="d-flex justify-content-between w-100">
        <div className="d-flex align-items-center gap-2 w-100 justify-content-between">
          <Widget
            src="mob.near/widget/ProfileImage"
            props={{
              accountId: groupData.creatorId,
              imageClassName: "rounded-circle w-100 h-100",
              style: { minWidth: "45px", height: "45px" },
            }}
          />
          <HeaderContent>
            <UserLink
              href={`${widgets.groupPage}?accountId=${groupData.creatorId}`}
            >
              <GroupName>{groupData.title}</GroupName>
              <GroupCreator>{groupData.creatorId}</GroupCreator>
            </UserLink>
          </HeaderContent>
        </div>
      </HeaderCard>
      <LowerSection>
        <LowerSectionContainer>
          <div className="d-flex w-100 align-items-center">
            <div className="d-flex w-100 gap-2 justify-content-between">
              <Widget
                src={widgets.styledComponents}
                props={{
                  Link: {
                    text: "View",
                    className: "primary w-100 justify-content-center",
                    href: `${widgets.groupPage}?accountId=${groupData.creatorId}`,
                    icon: <i className="bi bi-eye-fill fs-6"></i>,
                  },
                }}
              />
            </div>
          </div>
        </LowerSectionContainer>
      </LowerSection>
    </Card>
  </Wrapper>
);
