//This code comes from NDC.Nomination.Candidate.Page > NDC.Nomination.Candidate.DesktopView

const {
  widgets,
  isTest,
  handleFilterArticles,
  articleToRenderData,
  authorForWidget,
  handleEditArticle,
  handleShareButton,
  // logedUserSbts,
} = props;

const accountId = articleToRenderData.author;
const realArticleId =
  articleToRenderData.realArticleId ??
  `${articleToRenderData.author}-${articleToRenderData.timeCreate}`;

//For the moment we'll allways have only 1 sbt in the array. If this change remember to do the propper work in SayALot.lib.SBT and here.
const articleSbts = articleToRenderData.sbts ?? [];

const libSrcArray = [widgets.libComment];

function callLibs(srcArray, stateUpdate, libCalls) {
  return (
    <>
      {srcArray.map((src) => {
        return (
          <Widget
            src={src}
            props={{
              isTest,
              stateUpdate,
              libCalls,
            }}
          />
        );
      })}
    </>
  );
}

const tabs = [
  {
    id: "generalInfo",
    title: "Post info",
    icon: "bi bi-info-circle",
  },
];

const prodAction = "sayALotArticle_v0.0.3";
const testAction = `test_${prodAction}`;
const action = isTest ? testAction : prodAction;

const initLibCalls = [
  {
    functionName: "getValidComments",
    key: "comments",
    props: { realArticleId, articleSbts },
  },
  {
    functionName: "canUserCreateComment",
    key: "canLoggedUserCreateComment",
    props: {
      accountId: context.accountId,
      sbtName: articleSbts,
    },
  },
];

State.init({
  tabSelected: tabs[0].id,
  comments: [],
  sliceContent: true,
  libCalls: initLibCalls,
});

const timeLastEdit = new Date(articleToRenderData.timeLastEdit);

const CursorPointer = styled.div`
  cursor: pointer;
`;

const DetailContent = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

const TagContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 4px;
`;

const HouseTagDiv = styled.div`
  display: flex;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 100px;
  background: var(
    --gradient-purple-gradient,
    linear-gradient(90deg, #9333ea 0%, #4f46e5 100%)
  );
`;

const HouseTagText = styled.p`
  color: #fff;
  font-size: 7px;
  font-weight: 500;
  line-height: 120%;
  margin: 0px;
`;

const TagDiv = styled.div`
  display: flex;
  justify-content: center;
  padding: 4px 8px;
  align-items: center;
  gap: 10px;
  border-radius: 100px;
  border: solid 1px transparent;
  border-radius: 80px;
  background-image: linear-gradient(#eae5f7, #eae5f7),
    radial-gradient(circle at top left, #9333ea 0%, #4f46e5 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
`;

const TagDivText = styled.p`
  font-size: 8px;
  margin: 0px;
  font-weight: 500;
  line-height: 120%;
  background: linear-gradient(90deg, #9333ea 0%, #4f46e5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

const NominationTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const NominationTitle = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 7px 0 0 0;
  color: #000;
  font-size: 18px;
  font-weight: 500;
  line-height: 120%;
`;
const UserLink = styled.a`
  cursor: pointer;
  &:hover {
    text-decoration: none;
  }
`;
const NominationUser = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #828688;
  margin: 0 0 7px 0;
  font-size: 14px;
  line-height: 120%;
`;

const UpvoteButtonDisabled = styled.button`
  display: flex;
  padding: 2px 12px;
  align-items: center;
  gap: 6px;
  border-radius: 4px;
  border: solid 1px transparent;
  background: var(--buttons-disable, #c3cace);
  cursor: default !important;
`;

const UpvoteButton = styled.button`
  display: flex;
  padding: 2px 12px;
  align-items: center;
  gap: 6px;
  border-radius: 4px;
  border: solid 1px transparent;
  background-image: linear-gradient(#f8f8f9, #f8f8f9),
    radial-gradient(
      circle at left top,
      rgb(147, 51, 234) 0%,
      rgb(79, 70, 229) 100%
    );
  background-origin: border-box;
  background-clip: padding-box, border-box;
`;

const UpvoteCount = styled.p`
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

const Icon = styled.img`
  width: 17px;
  height: 17px;
`;
const BodyContainer = styled.div`
  border-radius: 8px;
  margin: 10px 0;
  background: #F8F8F9;
  padding: 20px;
`;

const PlatformCard = styled.div`
  display: flex;
  border-radius: 6px;
  background: background: "rgb(255 255 255 / 0%);
`;

const PlatformContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
`;

const PlatformInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const PlatformInfoHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`;

const PlatInforHeadText = styled.p`
  margin: 0px;
  color: var(--000000, #000);
  font-size: 10px;
  font-weight: 500;
  line-height: 120%;
`;

const PlatInfoHeadSeparator = styled.hr`
  height: 0px;
  margin: 8px 0 0 0;

  border: 1px solid rgba(208, 214, 217, 1);
`;

const KeyIssuesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`;

const KeyIssueTitle = styled.p`
  font-size: 12px;
  line-height: 120%;
  margin: 0px;
  font-weight: 500;
  line-height: 18px;
  text-align: left;
  padding: 10px;
`;

const KeyIssueDescription = styled.p`
  color: #212427;
  font-size: 12px;
  line-height: 130%;
  margin: 0px;
  padding: 10px;
  line-height: 18px;
  text-align: justify;
`;

const CandidateCard = styled.div`
  display: flex;
  padding: 20px;
  align-items: center;
  align-self: stretch;
  border-radius: 6px;
  background: #fff;
`;

const CandidateContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
`;

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  align-self: stretch;
`;

const ContentHeaderText = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin: 0px;
`;

const CandidateInfoDiv = styled.div`
  width: 100%;
  padding: 16px;
  background: white;
  gap: 16px;
  border-radius: 8px;
`;

const CandidateInfoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: stretch;
`;

const CandidateImage = styled.img`
  width: 32px;
  height: 32px;
`;

const CandidateInfoData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  flex: 1 0 0;
`;

const CandidateTagDiv = styled.div`
  display: flex;
  height: 20px;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 100px;
  border: 1px solid var(--secondary-warning, #f19d38);
  background: #f0e1ce;
`;

const CandidateTagText = styled.p`
  color: var(--secondary-warning, #f19d38);
  font-size: 10px;
  font-weight: 500;
  line-height: 120%;
  margin: 0px;
`;

const CandidateTime = styled.h6`
  margin: 3px 0 0 0;
  font-size: 10px;
  font-weight: 500;
  line-height: 120%;
  color: #828688;
`;

const CandidateTextInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
`;

const SectionTitle = styled.h5`
  font-size: 12px;
  font-weight: 500;
  line-height: 120%;
  margin: 16px 0 0 0;
`;

const SectionDescription = styled.p`
  font-size: 12px;
  line-height: 18px;
  margin: 0px;
  text-align: justify;
  color: #828688;
`;

const DescriptionSubtitle = styled.h5`
  display: inline-block;
  font-size: 12px;
  line-height: 120%;
  margin-right: 0.3rem;
`;

const DescriptionInfoSpan = styled.span`
  font-size: 12px;
  line-height: 18px;
  margin: 0px;
  text-align: justify;
  color: #828688;
`;

const DeclarationCard = styled.div`
  padding: 0px;
`;

const CommentSection = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  border-radius: 8px;
  background: #f8f8f9;
`;

const Container = styled.div`
  display: flex;
  margin-right: 5px;
  justify-content: center;
`;

const SecondContainer = styled.div`
  background: #F8F8F9;
  border-radius: 8px;
  padding: 20px;
`;

const H6 = styled.h6`
  font-size: 14px;
  margin-bottom: 0;
`;

const Tab = styled.div`
  font-weight: ${(props) => (props.active ? "600" : "500")};
  border-bottom: 2px solid;
  border-color: ${(props) => (props.active ? "rgb(68, 152, 224)" : "#dee2e6")};
  color: ${(props) => (props.active ? "rgb(68, 152, 224)" : "#ababab")};
  cursor: pointer;
  padding-bottom: 8px;
  font-size: 14px;

  i {
    &::before {
      color: ${(props) => (props.active ? "rgb(68, 152, 224)" : "#ababab")};
    }
    margin-right: 5px;
  }
`;

const TH = styled.th`
  border: 1px solid rgba(208, 214, 217, 0.4) !important;
  text-align: left !important;
  padding: 15px 20px !important;
`;

const CallLibrary = styled.div`
  display: none;
`;

const HeaderButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

//Get basic original comments info
let originalComments = state.comments.filter(
  (comment) => comment.value.comment.originalCommentId === realArticleId
);

//Append answers to original comments
originalComments = originalComments.map((originalComment) => {
  let answers = state.comments.filter((comment) => {
    return (
      comment.value.comment.originalCommentId ===
      originalComment.value.comment.commentId
    );
  });

  return {
    originalComment,
    answers,
  };
});

function stateUpdate(obj) {
  State.update(obj);
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

let displayedContent = state.sliceContent
  ? articleToRenderData.body.slice(0, 1000)
  : articleToRenderData.body;

return (
  <>
    <Container className="row">
      <div className="col-lg-9 col-sm-12">
        <div className="row" style={{ "margin-inline": "5px" }}>
          <div
            className="col-12 p-0 w-100"
            style={{
              background: "#F8F8F9",
              "border-radius": "8px",
            }}
          >
            <div className="w-100 p-3 d-flex flex-wrap justify-content-between align-items-start">
              <div className="d-flex flex-column">
                <Widget
                  src={widgets.newStyledComponents.Element.User}
                  props={{
                    accountId,
                    options: {
                      showHumanBadge: true,
                      showImage: true,
                      showSocialName: true,
                      shortenLength: 20,
                      size: "lg",
                    },
                  }}
                />
                <TagContainer>
                  {articleToRenderData.tags.length > 0 &&
                    articleToRenderData.tags.map((tag) => {
                      const filter = { filterBy: "tag", value: tag };
                      return (
                        <CursorPointer
                          onClick={() => handleFilterArticles(filter)}
                        >
                          <Widget
                            src={widgets.newStyledComponents.Element.Badge}
                            props={{
                              children: tag,
                              variant: "round info outline",
                              size: "sm",
                            }}
                          />
                        </CursorPointer>
                      );
                    })}
                </TagContainer>
                {
                  // <Widget
                  //   src="mob.near/widget/ProfileImage"
                  //   props={{
                  //     accountId,
                  //     imageClassName: "rounded-circle w-100 h-100",
                  //     style: {
                  //       width: "100px",
                  //       height: "100px",
                  //       marginRight: "15px",
                  //     },
                  //   }}
                  // />
                  // <div className="d-flex flex-column">
                  //   <NominationTitleContainer>
                  //     <UserLink
                  //       target="_blank"
                  //       href={`https://www.near.org/near/widget/ProfilePage?accountId=${accountId}`}
                  //     >
                  //       <NominationTitle>
                  //         {articleToRenderData.authorProfile.name ??
                  //           getShortUserName()}
                  //       </NominationTitle>
                  //       <NominationUser>{getShortUserName()}</NominationUser>
                  //     </UserLink>
                  //     <TagContainer>
                  //       {articleToRenderData.tags.length > 0 &&
                  //         articleToRenderData.tags.map((tag) => {
                  //           const filter = { filterBy: "tag", value: tag };
                  //           return (
                  //             <CursorPointer
                  //               onClick={() => handleFilterArticles(filter)}
                  //             >
                  //               <Widget
                  //                 src={widgets.styledComponents}
                  //                 props={{
                  //                   Tag: { title: tag },
                  //                 }}
                  //               />
                  //             </CursorPointer>
                  //           );
                  //         })}
                  //     </TagContainer>
                  //   </NominationTitleContainer>
                  // </div>
                }
              </div>
              <div className="d-flex gap-3">
                <div className="d-flex flex-column">
                  <HeaderButtonsContainer>
                    <Widget
                      src={widgets.upVoteButton}
                      props={{
                        isTest,
                        authorForWidget,
                        reactedElementData: articleToRenderData,
                        widgets,
                        disabled:
                          !context.accountId ||
                          context.accountId === accountId ||
                          (articleSbts.length > 0 &&
                            !state.canLoggedUserCreateComment),
                        articleSbts,
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
                  <Widget
                    src={widgets.reactions}
                    props={{
                      widgets,
                      isTest,
                      authorForWidget,
                      elementReactedId: realArticleId,
                      disabled:
                        !context.accountId ||
                        context.accountId === accountId ||
                        (articleSbts.length > 0 &&
                          !state.canLoggedUserCreateComment),
                    }}
                  />
                  {context.accountId == accountId && (
                    <Widget
                      src={widgets.newStyledComponents.Input.Button}
                      props={{
                        children: (
                          <div className="d-flex justify-content-center align-items-center">
                            <span className="mx-2">Edit</span>
                            <i className="bi bi-pencil"></i>
                          </div>
                        ),
                        className: `info outline mt-2`,
                        onClick: () => handleEditArticle(articleToRenderData),
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <BodyContainer className="col-12">
            <PlatformCard>
              <PlatformContent>
                <ContentHeader>
                  <ContentHeaderText>
                    {articleToRenderData.title}
                  </ContentHeaderText>
                </ContentHeader>

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
                {state.sliceContent &&
                  articleToRenderData.body.length > 1000 && (
                    <Widget
                      src={widgets.newStyledComponents.Input.Button}
                      props={{
                        children: (
                          <div className="d-flex justify-content-center align-items-center">
                            <span className="mx-2">Show more</span>
                            <i className="bi bi-chat-square-text-fill"></i>
                          </div>
                        ),
                        size: "sm",
                        className: "w-100",
                        onClick: () => {
                          State.update({ sliceContent: false });
                        },
                      }}
                    />
                  )}
              </PlatformContent>
            </PlatformCard>
          </BodyContainer>
          <CommentSection>
            <NominationTitle>
              <span>
                <i className="bi bi-chat-square-dots-fill" /> Comments
              </span>
            </NominationTitle>

            {state.showModal && (
              <Widget
                src={widgets.addComment}
                props={{
                  article: articleToRenderData,
                  originalComment,
                  widgets,
                  isTest,
                  isReplying: false,
                  username: accountId,
                  onCloseModal: () => State.update({ showModal: false }),
                  // nomination_contract,
                }}
              />
            )}
            <Widget
              src={widgets.newStyledComponents.Input.Button}
              props={{
                children: (
                  <div className="d-flex align-items-center justify-content-cente">
                    <span className="mx-1">Add comment</span>
                    <i className="bi bi-plus-lg"></i>
                  </div>
                ),
                disabled:
                  !context.accountId ||
                  context.accountId === accountId ||
                  (articleSbts.length > 0 && !state.canLoggedUserCreateComment),
                className: "info outline w-100 mt-4 mb-2",
                onClick: () => {
                  State.update({ showModal: true });
                },
              }}
            />
            {
              // <Widget
              //   src={widgets.styledComponents}
              //   props={{
              //     Button: {
              //       text: "Add a Comment",
              //       disabled:
              //         !context.accountId ||
              //         context.accountId === accountId ||
              //         (articleSbts.length > 0 &&
              //           !state.canLoggedUserCreateComment),
              //       className: "primary w-100 mt-4 mb-2 justify-content-center",
              //       onClick: () => State.update({ showModal: true }),
              //       icon: <i className="bi bi-plus-lg"></i>,
              //     },
              //   }}
              // />
            }
            {originalComments.map((data) => (
              <Widget
                props={{
                  widgets,
                  data,
                  isTest,
                  authorForWidget,
                  isReply: false,
                  canLoggedUserCreateComment: state.canLoggedUserCreateComment,
                  articleSbts,
                }}
                src={widgets.commentView}
              />
            ))}
          </CommentSection>
        </div>
      </div>
      <SecondContainer className="col-lg-3 col-sm-12">
        <>
          <ul className="nav nav-pills nav-fill">
            {tabs.map(({ id, title, icon }, i) => (
              <li className="nav-item" role="presentation" key={i}>
                <Tab
                  active={state.tabSelected === id}
                  onClick={() => State.update({ tabSelected: id })}
                >
                  <i className={`${icon}`} />
                  {title}
                </Tab>
              </li>
            ))}
          </ul>
          <div>
            {state.tabSelected == "generalInfo" && (
              <DeclarationCard>
                <SectionTitle className="mt-4 mb-3"></SectionTitle>
                <div>
                  <DescriptionSubtitle>Created by:</DescriptionSubtitle>
                  <DescriptionInfoSpan>
                    {articleToRenderData.authorProfile.name ??
                      getShortUserName()}
                  </DescriptionInfoSpan>
                </div>
                <div>
                  <DescriptionSubtitle>Edited on:</DescriptionSubtitle>
                  <DescriptionInfoSpan>{timeLastEdit + ""}</DescriptionInfoSpan>
                </div>
                <div>
                  <DescriptionSubtitle>Edit versions:</DescriptionSubtitle>
                  <DescriptionInfoSpan>
                    {articleToRenderData.version}
                  </DescriptionInfoSpan>
                </div>
                {articleSbts.length > 0 && (
                  <div>
                    <DescriptionSubtitle>
                      SBT requiered to interact:
                    </DescriptionSubtitle>
                    {articleSbts.map((sbt) => {
                      return <DescriptionInfoSpan>{sbt}</DescriptionInfoSpan>;
                    })}
                  </div>
                )}
              </DeclarationCard>
            )}
          </div>
        </>
      </SecondContainer>
    </Container>
    <CallLibrary>
      {callLibs(libSrcArray, stateUpdate, state.libCalls)}
    </CallLibrary>
  </>
);
