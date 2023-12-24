// CommunityVoice.GeneralCard
//===============================================INITIALIZATION=====================================================

const {
  widgets,
  isTest,
  data,
  handleOpenArticle,
  handleFilterArticles,
  addressForArticles,
  authorForWidget,
  handleShareButton,
  callLibs,
} = props;

const tags = data.tags;
const accountId = data.author;
const title = data.title;
const content = data.body;
const timeLastEdit = data.timeLastEdit;
const id = data.id ?? `${data.author}-${data.timeCreate}`;
const upVotes = data.upVotes;

//For the moment we'll allways have only 1 sbt in the array. If this change remember to do the propper work in CommunityVoice.lib.SBT and here.
const articleSbts = articleToRenderData.sbts ?? data.sbts ?? [];

const libSrcArray = [widgets.libComment];

function stateUpdate(obj) {
  State.update(obj);
}

const initLibsCalls = {
  comment: [
    {
      functionName: "canUserCreateComment",
      key: "canLoggedUserCreateComment",
      props: {
        accountId: context.accountId,
        sbtsNames: articleSbts,
      },
    },
  ],
};

State.init({
  verified: true,
  start: true,
  voted: false,
  sliceContent: true,
  libsCalls: initLibsCalls,
});
//=============================================END INITIALIZATION===================================================

//===================================================CONSTS=========================================================
const canLoggedUserCreateComment = state.canLoggedUserCreateComment;

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

function toggleShowModal() {
  State.update({ showModal: !state.showModal });
}

//================================================END FUNCTIONS=====================================================

//==============================================STYLED COMPONENTS===================================================

const CardContainer = styled.div`
  box-shadow: rgba(140, 149, 159, 0.1) 0px 4px 28px 0px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  gap: 16px;
  background: rgba(140, 149, 159, 0.1) 0px 4px 28px 0px;
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
const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  width: 70%;
`;
const HeaderButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
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

const KeyIssues = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px;
  gap: 12px;
  background: #ffffff;  
  border: 1px solid rgb(248, 248, 249);
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
  max-height: 250px;
  width: 100%;
  border: 1px solid rgb(248, 248, 249);
  border-radius: var(--bs-border-radius-lg) !important;
`;

const ArticleBodyContainer = styled.div`
  margin: 0 0.5rem 0.5rem 0.5rem;
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

const CallLibrary = styled.div`
  display: none;
`;
//============================================END STYLED COMPONENTS=================================================

//=================================================MORE STYLES======================================================

const communityVoiceProfileImageStyles = {
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
      src={widgets.newStyledComponents.Element.User}
      props={{
        accountId,
        options: {
          showHumanBadge: true,
          showImage: true,
          showSocialName: true,
          shortenLength: 20,
        },
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
                  src={widgets.newStyledComponents.Element.Badge}
                  props={{
                    children: tag,
                    variant: "round info outline",
                    size: "lg",
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
                href={`https://near.social/${authorForWidget}/widget/${widgets.communityVoice}?tagShared=${hashtag}`}
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
  <CardContainer className="bg-white rounded-3 p-3 m-3 col-lg-8 col-md-8 col-sm-12">
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
            id,
            onCloseModal: toggleShowModal,
            callLibs,
          }}
        />
      )}
      <HeaderCard className="d-flex justify-content-between pb-1 border-bottom border-dark">
        <div className="d-flex align-items-center gap-2">
          <Widget
            src="mob.near/widget/Profile.OverlayTrigger"
            props={{ accountId, children: inner }}
          />
          {
            //   <HeaderContent>
            //   <HeaderContentText
            //     onClick={() => {
            //       handleOpenArticle(data);
            //     }}
            //   >
            //     <NominationName>{getUserName()}</NominationName>
            //     <NominationUser>{getShortUserName()}</NominationUser>
            //   </HeaderContentText>
            // </HeaderContent>
          }
        </div>
        <HeaderButtonsContainer>
          <Widget
            src={widgets.upVoteButton}
            props={{
              isTest,
              authorForWidget,
              reactedElementData: data,
              widgets,
              disabled:
                !context.accountId ||
                context.accountId === accountId ||
                (articleSbts.length > 0 && !canLoggedUserCreateComment),
              articleSbts,
              upVotes,
              callLibs,
            }}
          />
          <Widget
            src={widgets.newStyledComponents.Input.Button}
            props={{
              size: "sm",
              className: "info outline icon",
              children: <i className="bi bi-share"></i>,
              onClick: () =>
                handleShareButton(true, {
                  type: "sharedBlockHeight",
                  value: data.blockHeight,
                }),
            }}
          />
        </HeaderButtonsContainer>
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
      <KeyIssuesContent>
        <KeyIssuesContainer>{renderArticleBody()}</KeyIssuesContainer>
      </KeyIssuesContent>
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
                elementReactedId: id,
                disabled:
                  !context.accountId ||
                  context.accountId === accountId ||
                  (articleSbts.length > 0 && !canLoggedUserCreateComment),
                callLibs,
                sbtsNames: articleSbts,
              }}
            />
          </ButtonsLowerSection>
          <div className="d-flex w-100 align-items-center">
            <div className="d-flex w-100 gap-2 justify-content-start">
              <Widget
                src={widgets.newStyledComponents.Input.Button}
                props={{
                  children: (
                    <div className="d-flex align-items-center justify-content-center">
                      <span className="mx-1">Add comment</span>
                      <i className="bi bi-chat-square-text-fill"></i>
                    </div>
                  ),
                  disabled:
                    !context.accountId ||
                    context.accountId === accountId ||
                    (articleSbts.length > 0 && !canLoggedUserCreateComment),
                  size: "sm",
                  className: "info outline w-25",
                  onClick: toggleShowModal,
                }}
              />
              <Widget
                src={widgets.newStyledComponents.Input.Button}
                props={{
                  children: (
                    <div className="d-flex align-items-center justify-content-center">
                      <span className="mx-1">View</span>
                      <i className="bi bi-eye fs-6"></i>
                    </div>
                  ),
                  size: "sm",
                  className: "info w-25",
                  onClick: () => {
                    handleOpenArticle(data);
                  },
                }}
              />
            </div>
          </div>
        </LowerSectionContainer>
      </LowerSection>
    </Card>
    <CallLibrary>
      {libSrcArray.map((src) => {
        return callLibs(
          src,
          stateUpdate,
          state.libsCalls,
          { baseAction: "communityVoiceComment" },
          "General card"
        );
      })}
    </CallLibrary>
  </CardContainer>
);
