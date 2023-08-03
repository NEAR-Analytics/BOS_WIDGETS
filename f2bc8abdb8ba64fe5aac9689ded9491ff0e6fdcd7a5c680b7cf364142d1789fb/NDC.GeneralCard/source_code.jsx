//===============================================INITIALIZATION=====================================================

const {
  widgets,
  data,
  displayOverlay,
  renderReactions,
  handleOpenArticle,
  handleFilterArticles,
  addressForArticles,
} = props;

const tags = data.tags;
const accountId = data.author;
const title = data.articleId;
const content = data.body;
const timeLastEdit = data.timeLastEdit;

State.init({
  verified: false,
  start: true,
  voted: false,
  shareText: "Copy link to the clipboard",
  sliceContent: true,
});
//=============================================END INITIALIZATION===================================================

//===================================================CONSTS=========================================================
//TODO pass this
const item = {
  type: "social",
  path: `${data.author}/${addressForArticles}/main`,
  realArticleId: data.realArticleId,
};

//=================================================END CONSTS=======================================================

//==================================================FUNCTIONS=======================================================

function getPublicationDate(creationTimestamp) {
  if (creationTimestamp == 0) {
    return "Creation timestamp passed wrong";
  }
  return new Date(creationTimestamp).toDateString();
}

function getUserName() {
  const profile = Social.getr(`${accountId}/profile`);

  return profile.name ?? getShortUserName();
}

const getShortUserName = () => {
  const userId = accountId;

  if (userId.length === 64) return `${userId.slice(0, 4)}..${userId.slice(-4)}`;
  const name = userId.slice(0, -5); // truncate .near

  return name.length > 20 ? `${name.slice(0, 20)}...` : name;
};

//================================================END FUNCTIONS=====================================================

//=============================================== OLD FUNCTIONS=====================================================

// const isHuman = Near.view(registry_contract, "is_human", {
//   account: context.accountId,
// });
// State.update({ verified: isHuman[0][1].length > 0 });

// const httpRequestOpt = {
//   headers: { "x-api-key": api_key },
// };

// function getVerifiedHuman() {
//   asyncFetch(
//     `https://api.pikespeak.ai/nominations/is-upvoted-by?candidate=${data.indexerData.nominee}&upvoter=${context.accountId}`,
//     httpRequestOpt
//   ).then((res) => {
//     State.update({ voted: res.body });
//   });
// }

// if (state.start) {
//   getVerifiedHuman();
//   State.update({ start: false });
// }

// function handleUpVote() {
//   Near.call(
//     nomination_contract,
//     state.voted ? "remove_upvote" : "upvote",
//     {
//       candidate: data.indexerData.nominee,
//     },
//     300000000000000,
//     state.voted ? 0 : 1000000000000000000000
//   );
// }

// function handleShare() {
//   State.update({ shareText: "Copied" });
//   clipboard.writeText(
//     "https://near.org/#/rubycop.near/widget/NDC.Nomination.Candidate.Page?house=" +
//       data.indexerData.house +
//       "&candidate=" +
//       data.indexerData.nominee
//   );
// }

// function getComponentURL() {
//   const url =
//     "https%3A%2F%2Fnear.org%2F%23%2Frubycop.near%2Fwidget%2FNDC.Nomination.Candidate.Page%3Fhouse%3D" +
//     data.indexerData.house +
//     "%26candidate%3D" +
//     data.indexerData.nominee;
//   return url;
// }

// const canUpvote = () =>
//   state.verified && context.accountId != data.indexerData?.nominee;

// const trimText = (text, limit) => {
//   if (!text) return "";

//   const _limit = limit ?? 200;
//   const ending = text.length > _limit ? "..." : "";
//   const trimmed = text.slice(0, limit ?? 200);

//   return `${trimmed}${ending}`;
// };

// const keyIssues = [
//   {
//     title:
//       "Involvement in the NEAR ecosystem, qualifications to be a candidate and reasons for being voted",
//     desc: data.nominationData.HAYInvolve,
//   },
//   {
//     title: "Strategy to develop the NEAR ecosystem",
//     desc: data.nominationData.WIYStrategy,
//   },
//   {
//     title: "Key Issue 1",
//     desc: data.nominationData.Key_Issue_1,
//   },
//   {
//     title: "Key Issue 2",
//     desc: data.nominationData.Key_Issue_2,
//   },
//   {
//     title: "Key Issue 3",
//     desc: data.nominationData.Key_Issue_3,
//   },
//   {
//     title: "Other Platform",
//     desc: data.nominationData.addition_platform,
//   },
// ];

//==============================================END OLD FUNCTIONS===================================================

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
const UpvoteButtonDisabled = styled.button`
  display: flex;
  padding: 2px 12px;
  align-items: center;
  gap: 6px;
  border-radius: 4px;
  background: var(--buttons-disable, #c3cace);
  cursor: default !important;
`;

const UpvoteButton = styled.button`
  padding: 6px 12px;
  border-radius: 8px;
  background: #fff;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  color: ${(props) => (props.disabled ? "#C3CACE" : "#9333EA")};
  border: 1px solid #9333ea;
  border-color: ${(props) => (props.disabled ? "#C3CACE" : "")};
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
      {tags.map((tag) => {
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
    <>
      <span>{displayedContent}</span>
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
    </>
  );
};

//===============================================END COMPONENTS====================================================
console.log("data: ", data);
return (
  <div className="p-2 col-lg-4 col-md-6 col-sm-12">
    <Card>
      {state.showModal && (
        <Widget
          src={widgets.addComment}
          props={{
            candidateOrReplay: true,
            username: data.indexerData.nominee,
            onClickConfirm: () => State.update({ showModal: false }),
            onClickCancel: () => State.update({ showModal: false }),
          }}
        />
      )}
      <HeaderCard className="d-flex justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <Widget
            src="mob.near/widget/Profile.OverlayTrigger"
            props={{ accountId, children: inner }}
          />
          {
            //   cardType == "nomination" && (
            //   <ProfilePicture
            //     src={
            //       data.imgURL ??
            //       "https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmZBPPMKLdZG2zVpYaf9rcbtNfAp7c3BtsvzxzBb9pNihm?_gl=1*6avmrp*rs_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*rs_ga_5RMPXG14TE*MTY4NjkzMzM2NC4zLjEuMTY4NjkzMzM4Ni4zOC4wLjA."
            //     }
            //     alt="pic"
            //   ></ProfilePicture>
            // )
          }
          <HeaderContent>
            {
              //   cardType == "nomination" && (
              //   <Widget
              //     src={widgets.styledComponents}
              //     props={{
              //       Tag: {
              //         title:
              //           data.indexerData.house == "HouseOfMerit"
              //             ? "House of Merit"
              //             : data.indexerData.house == "CouncilOfAdvisors"
              //             ? "Council of Advisors"
              //             : "Transparency Commission",
              //         className: "dark",
              //       },
              //     }}
              //   />
              // )
            }
            <HeaderContentText>
              <NominationName>{getUserName()}</NominationName>
              <NominationUser>{getShortUserName()}</NominationUser>
            </HeaderContentText>
          </HeaderContent>
        </div>
        {
          //TODO modify reactions to fit this area properly
        }
        {
          // canUpvote() && cardType == "nomination"(
          //     <Widget
          //       src={widgets.styledComponents}
          //       props={{
          //         Button: {
          //           text: `+${data.upVoteData?.upvotes ?? 0}`,
          //           className: "secondary dark",
          //           size: "sm",
          //           onClick: handleUpVote,
          //           icon: <i className="bi bi-hand-thumbs-up"></i>,
          //         },
          //       }}
          //     />
          //   )
        }
      </HeaderCard>
      {
        //   cardType == "nomination" && (
        //   <CollapseCandidate className="w-100">
        //     <CollapseCandidateContent>
        //       <CollapseCandidateText>
        //         Candidate Affiliations
        //       </CollapseCandidateText>
        //       <CandidateTagContainer className="w-100 d-flex flex-wrap">
        //         {JSON.parse(data.nominationData?.afiliation).map((data) => (
        //           <>
        //             {data.company_name && (
        //               <Widget
        //                 src={widgets.styledComponents}
        //                 props={{
        //                   Tag: { title: data.company_name },
        //                 }}
        //               />
        //             )}
        //           </>
        //         ))}
        //       </CandidateTagContainer>
        //     </CollapseCandidateContent>
        //   </CollapseCandidate>
        // )
      }
      <KeyIssues>
        <KeyIssuesContent>
          <KeyIssuesHeader>
            <KeyIssuesTitle>{articleId}</KeyIssuesTitle>
          </KeyIssuesHeader>
          <KeyIssuesContainer>
            {
              // cardType == "nomination" &&
              // keyIssues.map((issue, i) => (
              //   <div className="w-100" key={i}>
              //     <KeyIssueTitle>{issue.title}</KeyIssueTitle>
              //     <KeyIssueDescription className="text-secondary">
              //       {trimText(issue.desc)}
              //     </KeyIssueDescription>
              //     <KeyIssueSeparator />
              //   </div>
              // ))
            }
            {renderArticleBody()}
          </KeyIssuesContainer>
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
            <TextLowerSectionContainer className="align-items-center">
              <i className="bi bi-clock"></i>
              <TimestampText>
                <span>{getPublicationDate(timeLastEdit)}</span>
                <span>by</span>
                <b>{author}</b>
              </TimestampText>
            </TextLowerSectionContainer>
          </ButtonsLowerSection>
          {/*TODO review buttons functionality in sayALot*/}
          <div className="d-flex w-100 align-items-center">
            {!data.preview && (
              <div className="d-flex w-100 gap-2 justify-content-between">
                <Widget
                  src={widgets.styledComponents}
                  props={{
                    Button: {
                      text: `+${data.upVoteData.comments.length ?? 0} Comments`,
                      disabled: !state.verified,
                      size: "sm",
                      className: "secondary dark w-100 justify-content-center",
                      onClick: () => {
                        !data.preview ? State.update({ showModal: true }) : "";
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
                        handleOpenArticle();
                      },
                    },
                  }}
                />
              </div>
            )}
          </div>
        </LowerSectionContainer>
      </LowerSection>
    </Card>
  </div>
);
