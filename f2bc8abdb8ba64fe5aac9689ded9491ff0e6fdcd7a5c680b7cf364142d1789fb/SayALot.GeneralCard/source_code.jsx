//===============================================INITIALIZATION=====================================================

const {
  widgets,
  isTest,
  data,
  displayOverlay,
  handleOpenArticle,
  handleFilterArticles,
  addressForArticles,
  authorForWidget,
} = props;

const tags = data.tags;
const accountId = data.author;
const title = data.articleId;
const content = data.body;
const timeLastEdit = data.timeLastEdit;
const realArticleId = data.realArticleId ?? `${data.author}-${data.timeCreate}`;

State.init({
  verified: true,
  start: true,
  voted: false,
  sliceContent: true,
});
//=============================================END INITIALIZATION===================================================

//===================================================CONSTS=========================================================

//=================================================END CONSTS=======================================================

//==================================================FUNCTIONS=======================================================
function getPublicationDate(creationTimestamp) {
  if (creationTimestamp == 0) {
    return "Creation timestamp passed wrong";
  }
  return new Date(creationTimestamp).toDateString();
}

function getUserName() {
  const profile = data.authorProfile;

  return profile.name ?? getShortUserName();
}

const getShortUserName = () => {
  const userId = accountId;

  if (userId.length === 64) return `${userId.slice(0, 4)}..${userId.slice(-4)}`;
  const name = userId.slice(0, -5); // truncate .near

  return name.length > 20 ? `${name.slice(0, 20)}...` : name;
};

//================================================END FUNCTIONS=====================================================

//==============================================STYLED COMPONENTS===================================================

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
  gap: 12px;
  width: 100%;
`;

const profilePictureStyles = {
  width: "45px",
  height: "45px",
  borderRadius: "50%",
};
const ProfilePicture = styled.img`
  width: ${profilePictureStyles.width};
  height: ${profilePictureStyles.height};
  border-radius: ${profilePictureStyles.borderRadius};
`;
const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  width: 70%;
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
const HeaderContentText = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  cursor: pointer;
`;
const NominationName = styled.p`
  font-weight: 500;
  font-size: 14px;
  margin: 0;
  align-items: center;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const NominationUser = styled.p`
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
const CollapseCandidate = styled.div`
  padding: 12px;
  background: #ffffff;
  border-radius: 6px;
`;
const CollapseCandidateContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: 5px;
`;
const CollapseCandidateText = styled.p`
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
const CandidateTagContainer = styled.div`
  gap: 4px;
`;

const KeyIssues = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px;
  gap: 12px;
  background: #ffffff;
  border-radius: 6px;
  width: 100%;
`;
const KeyIssuesContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;
  width: 100%;
`;
const KeyIssuesHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;
`;
const KeyIssuesTitle = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 120%;
  margin-bottom: 0;
`;
const KeyIssuesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  overflow-y: scroll;
  height: 250px;
  width: 100%;
`;

const ArticleBodyContainer = styled.div`
  margin-right: 0.5rem;
`;

const KeyIssueTitle = styled.p`
  font-weight: 500;
  font-size: 11px;
  margin-bottom: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const KeyIssueDescription = styled.p`
  font-weight: 400;
  font-size: 11px;
  margin-bottom: 0;
`;
const KeyIssueSeparator = styled.div`
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
`;
const TextLowerSectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 4px;
  width: 239px;
  height: 24px;
  cursor: pointer;

  flex-grow: 1;
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
  cursor: pointer;
`;

const CommentButtonDisabled = styled.button`
  display: flex;
  padding: 2px 12px;
  align-items: center;
  gap: 6px;
  border-radius: 4px;
  b
  background: var(--buttons-disable, #c3cace);
  cursor: default !important;
`;
const CommentButtonDiv = styled.button`
  display: flex;
  padding: 2px 12px;
  align-items: center;
  gap: 6px;
  b
  border-radius: 80px;
  background-image: linear-gradient(#f8f8f9, #f8f8f9),
    radial-gradient(circle at top left, #9333ea 0%, #4f46e5 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  border-radius: 4px;
`;
const CommentButtonCounter = styled.p`
  font-size: 12px;
  font-weight: 500;
  line-height: 24px;
  margin: 0px;
  background: linear-gradient(90deg, #9333ea 0%, #4f46e5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;
const CommentButtonIcon = styled.img`
  width: 14px;
  height: 14px;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const Dropbtn = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 16px;
  font-size: 16px;
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
//============================================END STYLED COMPONENTS=================================================

//=================================================MORE STYLES======================================================

const sayALotProfileImageStyles = {
  width: profilePictureStyles.width,
  height: profilePictureStyles.height,
  borderRadius: profilePictureStyles.borderRadius,
  overflow: "hidden",
};

//===============================================END MORE STYLES====================================================

//=================================================COMPONENTS=======================================================

const inner = (
  <div className="d-flex flex-row mx-1">
    <Widget
      src="mob.near/widget/ProfileImage"
      props={{
        metadata,
        accountId,
        widgetName,
        style: sayALotProfileImageStyles,
        className: "me-2 rounded-pill",
      }}
    />
  </div>
);

const renderTags = () => {
  return (
    <>
      {tags &&
        tags.map((tag) => {
          const filter = { filterBy: "tag", value: tag };

          return (
            <div onClick={() => handleFilterArticles(filter)}>
              {tag && (
                <Widget
                  src={widgets.styledComponents}
                  props={{
                    Tag: { title: tag },
                  }}
                />
              )}
            </div>
          );
        })}
    </>
  );
};

const renderArticleBody = () => {
  let displayedContent = state.sliceContent ? content.slice(0, 1000) : content;
  return (
    <ArticleBodyContainer>
      <Widget
        src="mob.near/widget/SocialMarkdown"
        props={{
          text: displayedContent,
          onHashtag: (hashtag) => (
            <span
              key={hashtag}
              className="d-inline-flex"
              style={{ fontWeight: 500 }}
            >
              <a
                href={`https://near.social/${authorForWidget}/widget/${widgets.sayALot}?tagShared=${hashtag}`}
                target="_blank"
              >
                #{hashtag}
              </a>
            </span>
          ),
        }}
      />
      {state.sliceContent && content.length > 1000 && (
        <Widget
          src={widgets.styledComponents}
          props={{
            Button: {
              text: `Show more`,
              size: "sm",
              className: "w-100 justify-content-center",
              onClick: () => {
                State.update({ sliceContent: false });
              },
              icon: <i className="bi bi-chat-square-text-fill"></i>,
            },
          }}
        />
      )}
    </ArticleBodyContainer>
  );
};

//===============================================END COMPONENTS====================================================

//===================================================RENDER========================================================
return (
  <div className="p-2 col-lg-4 col-md-6 col-sm-12">
    <Card>
      {state.showModal && (
        <Widget
          src={widgets.addComment}
          props={{
            widgets,
            article: data,
            isReplying: false,
            isTest,
            username: data.author,
            realArticleId,
            onCloseModal: () => State.update({ showModal: false }),
          }}
        />
      )}
      <HeaderCard className="d-flex justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <Widget
            src="mob.near/widget/Profile.OverlayTrigger"
            props={{ accountId, children: inner }}
          />
          <HeaderContent>
            <HeaderContentText
              onClick={() => {
                handleOpenArticle(data);
              }}
            >
              <NominationName>{getUserName()}</NominationName>
              <NominationUser>{getShortUserName()}</NominationUser>
            </HeaderContentText>
          </HeaderContent>
        </div>
        <Widget
          src={widgets.upVote}
          props={{ isTest, authorForWidget, reactedElementData: data, widgets }}
        />
      </HeaderCard>
      <KeyIssuesHeader>
        <KeyIssuesTitle
          role="button"
          onClick={() => {
            handleOpenArticle(data);
          }}
        >
          {title}
        </KeyIssuesTitle>
      </KeyIssuesHeader>
      <KeyIssues>
        <KeyIssuesContent>
          <KeyIssuesContainer>{renderArticleBody()}</KeyIssuesContainer>
        </KeyIssuesContent>
      </KeyIssues>
      <LowerSection>
        <LowerSectionContainer>
          {tags.length > 0 && (
            <KeyIssues>
              <KeyIssuesContent>
                <KeyIssuesHeader>
                  <KeyIssuesTitle>Tags</KeyIssuesTitle>
                </KeyIssuesHeader>
                <div className="d-flex w-100">
                  <TagSection>{renderTags()}</TagSection>
                </div>
              </KeyIssuesContent>
            </KeyIssues>
          )}
          <ButtonsLowerSection>
            <TextLowerSectionContainer
              className="align-items-center"
              onClick={() => {
                handleOpenArticle(data);
              }}
            >
              <i className="bi bi-clock"></i>
              <TimestampText>
                <span>{getPublicationDate(timeLastEdit)}</span>
                <span>by</span>
                <b>{author}</b>
              </TimestampText>
            </TextLowerSectionContainer>
            <Widget
              src={widgets.reactions}
              props={{
                widgets,
                isTest,
                authorForWidget,
                elementReactedId: realArticleId,
              }}
            />
          </ButtonsLowerSection>
          {/*TODO review buttons functionality in sayALot*/}
          <div className="d-flex w-100 align-items-center">
            <div className="d-flex w-100 gap-2 justify-content-between">
              <Widget
                src={widgets.styledComponents}
                //TODO review the button text
                props={{
                  Button: {
                    text: `Add comment`,
                    disabled: !state.verified,
                    size: "sm",
                    className: "secondary dark w-100 justify-content-center",
                    onClick: () => {
                      State.update({ showModal: true });
                    },
                    icon: (
                      <>
                        <i className="bi bi-chat-square-text-fill"></i>
                      </>
                    ),
                  },
                }}
              />
              <Widget
                src={widgets.styledComponents}
                props={{
                  Button: {
                    text: "View",
                    size: "sm",
                    className: "primary w-100 justify-content-center",
                    icon: <i className="bi bi-eye fs-6"></i>,
                    onClick: () => {
                      handleOpenArticle(data);
                    },
                  },
                }}
              />
            </div>
          </div>
        </LowerSectionContainer>
      </LowerSection>
    </Card>
  </div>
);
