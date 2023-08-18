const { data, api_key, dev } = props;

State.init({
  verified: false,
  shareText: "Copy link",
});

const widgets = {
  styledComponents: "#/hack.near/widget/NDC.StyledComponents",
  groupPage: "#/hack.near/widget/NDC.WG.Group.Page",
  addComment: "#/hack.near/widget/NDC.WG.AddComment",
};

const isHuman = Near.view(registry_contract, "is_human", {
  account: context.accountId,
});
State.update({ verified: isHuman[0][1].length > 0 });

const httpRequestOpt = {
  headers: { "x-api-key": api_key },
};

function handleShare() {
  State.update({ shareText: "Copied" });
  clipboard.writeText(
    "https://near.org/#/hack.near/widget/NDC.WG.Page"
  );
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
  width: 56%;
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
const CommentsCounter = styled.p`
  width: 96px;
  height: 24px;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 24px;
  margin: 0px;
  text-align: right;
  background: linear-gradient(90deg, #9333ea 0%, #4f46e5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
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
  }
`;

const canUpvote = () =>
  state.verified &&
  context.accountId &&
  context.accountId != data.?.creator;

const trimText = (text, limit) => {
  if (!text) return "";

  const _limit = limit ?? 200;
  const ending = text.length > _limit ? "..." : "";
  const trimmed = text.slice(0, limit ?? 200);

  return `${trimmed}${ending}`;
};

const groupThing = [
  {
    title: "Charter",
    desc: data.groupData.Charter,
  },
  {
    title: "Strategy to develop the NEAR ecosystem",
    desc: data.groupData.Twitter,
  },
  {
    title: "View and pledge on the issue of User Experience and Accessibility",
    desc: data.groupData.,
  },
  {
    title: "View and pledge on the issue of Economic Growth and Innovation",
    desc: data.groupData.Key_Issue_2,
  },
  {
    title: "View and pledge on the issue of Marketing and Outreach",
    desc: data.groupData.Key_Issue_3,
  },
  {
    title: "Other Platform",
    desc: data.groupData.addition_platform,
  },
];

return (
  <Wrapper className="p-2 col-lg-4 col-md-6 col-sm-12">
    <Card>
      {state.showModal && (
        <Widget
          src={widgets.addComment}
          props={{
            candidateOrReplay: true,
            username: data.creator,
            onClickConfirm: () => State.update({ showModal: false }),
            onClickCancel: () => State.update({ showModal: false }),
          }}
        />
      )}
      <HeaderCard className="d-flex justify-content-between w-100">
        <div className="d-flex align-items-center gap-2 w-100 justify-content-between">
          <Widget
            src="mob.near/widget/ProfileImage"
            props={{
              accountId: data.groupData?.profileAccount.substring(1),
              imageClassName: "rounded-circle w-100 h-100",
              style: { minWidth: "45px", height: "45px" },
            }}
          />
          <HeaderContent>
            <UserLink
              href={`${widgets.groupPage}?group=${
                data.group
              }&accountId=${data.group.creator}${dev ? "&dev=true" : ""}`}
            >
              <GroupName>{data.profileData?.name}</GroupName>
              <GroupCreator>{data.creator}</GroupCreator>
            </UserLink>
          </HeaderContent>

          <Widget
            src={widgets.styledComponents}
            props={{
              Button: {
                disabled: !canUpvote(),
                text: `+${data.upVoteData?.upvotes ?? 0}`,
                className: `${
                  context.accountId && state.voted ? "primary" : "secondary"
                } dark`,
                size: "sm",
                onClick: handleUpVote,
                icon: <i className="bi bi-hand-thumbs-up"></i>,
              },
            }}
          />
        </div>
      </HeaderCard>
      <CollapseGroup className="w-100">
        <CollapseGroupContent>
          <CollapseGroupText>Group Affiliations</CollapseGroupText>
          <GroupTagContainer className="w-100 d-flex flex-wrap">
            {JSON.parse(data.groupData?.afiliation).map((data) => (
              <>
                {data.company_name && (
                  <Widget
                    src={widgets.styledComponents}
                    props={{
                      Tag: { title: data.company_name },
                    }}
                  />
                )}
              </>
            ))}
          </GroupTagContainer>
        </CollapseGroupContent>
      </CollapseGroup>
      <Groups>
        <GroupsContent>
          <GroupsHeader>
            <GroupsTitle>Platform</GroupsTitle>
          </GroupsHeader>
          <GroupsContainer>
            {groupThing.map((issue, i) => (
              <div className="w-100" key={i}>
                <GroupTitle>{issue.title}</GroupTitle>
                <GroupDescription className="text-secondary">
                  <Widget
                    src="mob.near/widget/SocialMarkdown"
                    props={{ text: trimText(issue.desc) }}
                  />
                </GroupDescription>
                <GroupSeparator />
              </div>
            ))}
          </GroupsContainer>
        </GroupsContent>
      </Groups>
      <LowerSection>
        <LowerSectionContainer>
          {data.groupData.tags.length > 0 && (
            <Groups>
              <GroupsContent>
                <GroupsHeader>
                  <GroupsTitle>Tags</GroupsTitle>
                </GroupsHeader>
                <div className="d-flex w-100">
                  <TagSection>
                    {data.groupData.tags
                      .trim()
                      .split(",")
                      .map((data) => (
                        <>
                          {data && (
                            <Widget
                              src={widgets.styledComponents}
                              props={{
                                Tag: { title: data },
                              }}
                            />
                          )}
                        </>
                      ))}
                  </TagSection>
                </div>
              </GroupsContent>
            </Groups>
          )}
          <ButtonsLowerSection>
            <TextLowerSectionContainer className="align-items-center">
              <i className="bi bi-clock"></i>
              {data.timestamp && (
                <TimestampText>
                  <span>
                    {new Date(data.timestamp).toDateString()}
                  </span>
                  <span>by</span>
                  <b>{data.creator}</b>
                </TimestampText>
              )}
            </TextLowerSectionContainer>
          </ButtonsLowerSection>
          <div className="d-flex w-100 align-items-center">
            {!data.preview && (
              <div className="d-flex w-100 gap-2 justify-content-between">
                <Widget
                  src={widgets.styledComponents}
                  props={{
                    Button: {
                      disabled: !state.verified,
                      size: "sm",
                      className:
                        "secondary dark w-100 justify-content-center text-nowrap",
                      onClick: () => {
                        !data.preview ? State.update({ showModal: true }) : "";
                      },
                      icon: <i className="bi bi-chat-square-text-fill"></i>,
                    },
                  }}
                />
                <Widget
                  src={widgets.styledComponents}
                  props={{
                    Link: {
                      text: "View",
                      size: "sm",
                      className: "primary w-100 justify-content-center",
                      href: `${widgets.groupPage}?group=${
                        data.group
                      }&accountId=${data.creator}${
                        dev ? "&dev=true" : ""
                      }`,
                      icon: <i className="bi bi-eye fs-6"></i>,
                    },
                  }}
                />
              </div>
            )}
          </div>
        </LowerSectionContainer>
      </LowerSection>
    </Card>
  </Wrapper>
);
