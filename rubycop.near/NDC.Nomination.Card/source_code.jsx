const data = props;
State.init({
  verified: false,
  start: true,
  voted: false,
  shareText: "Copy link to the clipboard",
});
let nominationContract = "nominations-v1.gwg-testing.near";
function getVerifiedHuman() {
  asyncFetch(
    `https://api.pikespeak.ai/sbt/has-sbt?holder=${context.accountId}&class_id=1&issuer=fractal.i-am-human.near&with_expired=false`,
    {
      headers: {
        "x-api-key": "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5",
      },
    }
  ).then((res) => {
    State.update({ verified: res.body });
  });
  asyncFetch(
    `https://api.pikespeak.ai/nominations/is-upvoted-by?candidate=${data.indexerData.nominee}&upvoter=${context.accountId}`,
    {
      headers: {
        "x-api-key": "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5",
      },
    }
  ).then((res) => {
    State.update({ voted: res.body });
  });
}

if (state.start) {
  getVerifiedHuman();
  State.update({
    start: false,
  });
}

function handleUpVote() {
  Near.call(
    nominationContract,
    state.voted ? "remove_upvote" : "upvote",
    {
      candidate: data.indexerData.nominee,
    },
    300000000000000,
    state.voted ? 0 : 1000000000000000000000
  );
}

function handleShare() {
  console.log(copied);
  State.update({ shareText: "Copied" });
  clipboard.writeText(
    "https://near.org/#/yairnava.near/widget/NDC.Nomination.Candidate.Container?house=" +
      data.indexerData.house +
      "&candidate=" +
      data.indexerData.nominee
  );
}

function getComponentURL() {
  const url =
    "https%3A%2F%2Fnear.org%2F%23%2Fyairnava.near%2Fwidget%2FNDC.Nomination.Candidate.Container%3Fhouse%3D" +
    data.indexerData.house +
    "%26candidate%3D" +
    data.indexerData.nominee;
  return url;
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  gap: 16px;
  width: 358px;
  background: #f8f8f9;
  border-radius: 10px;
`;
const HeaderCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 12px;
  width: 326px;
  height: 53px;
`;
const ProfilePicture = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;
const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  width: 190px;
  height: 53px;

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
  font-size: 10px;
  display: flex;
  align-items: center;
  color: white;
  margin: 0;
`;
const HeaderContentText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 228px;
  height: 31px;
`;
const NominationName = styled.p`
  width: 90%;
  font-weight: 500;
  font-size: 14px;
  margin: 5px 0;
  display: flex;
  align-items: center;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const NominationUser = styled.p`
  width: 90%;
  height: 14px;
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

const ViewButton = styled.button`
  padding: 2px 12px;
  border-radius: 8px;
  background: #fff;
  font-size: 12px;
  font-weight: 500;
  line-height: 24px;
  color: #9333ea;
  border: 1px solid #9333ea;
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
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  gap: 12px;
  width: 326px;
  height: 56px;
  background: #ffffff;
  border-radius: 6px;

  align-self: stretch;
`;
const CollapseCandidateContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  width: 302px;
  height: 40px;
`;
const CollapseCandidateHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 12px;
  width: 302px;
  height: 16px;

  align-self: stretch;
`;
const CollapseCandidateText = styled.p`
  width: 274px;
  height: 14px;
  font-style: normal;
  font-weight: 800;
  font-size: 12px;
  line-height: 120%;
  margin: 0px;
  color: #000000;

  flex-grow: 1;
`;
const DownArrow = styled.img`
  width: 16px;
  height: 16px;
`;
const CandidateTagContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  width: 100%;
  flex-wrap: wrap;
  height: 20px;
`;
const CandidateTag = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  gap: 10px;
  height: 20px;
  background: #f0e1ce;
  border-radius: 100px;
`;
const CandidateTagText = styled.p`
  height: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 120%;
  margin: 0px;
  color: #f19d38;
`;
const KeyIssues = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 8px 12px;
  gap: 12px;
  width: 326px;
  background: #ffffff;
  border-radius: 6px;
`;
const KeyIssuesContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;
  width: 302px;
`;
const KeyIssuesHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;
  width: 302px;
  height: 14px;
`;
const KeyIssuesTitle = styled.p`
  width: 302px;
  height: 14px;
  font-style: normal;
  font-weight: 800;
  font-size: 12px;
  line-height: 120%;
  /* or 14px */
  color: #000000;

  flex-grow: 1;
`;
const KeyIssuesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 302px;
`;
const KeyIssue = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 2px;
  width: 302px;
  height: 28px;
`;
const KeyIssueHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;
  width: 302px;
  height: 14px;

  align-self: stretch;
`;
const KeyIssueTitle = styled.p`
  width: 302px;
  height: 12px;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 120%;
  margin: 0px;
  color: #000000;

  align-self: stretch;
`;
const KeyIssueDescription = styled.p`
  width: 302px;
  height: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  margin: 0px;
  line-height: 120%;
  color: #585b5c;

  align-self: stretch;
`;
const KeyIssueSeparator = styled.hr`
  width: 302px;
  height: 0px;
  margin: 0px;
  b
  
  
  
`;
const LowerSection = styled.div`
  display: flex;
  width: 326px;
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
  gap: 8px;
  align-self: stretch;
`;
const ButtonsLowerSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  width: 326px;
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
const TimestampText = styled.p`
  width: 150px;
  height: 20px;
  font-style: italic;
  font-weight: 300;
  font-size: 10px;
  line-height: 14px;
  margin: 0px;
  display: flex;
  align-items: center;
  color: #000000;
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
  max-height: 20px;
  overflow: hidden;
`;
const Tag = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  gap: 10px;
  height: 20px;
  b
  border-radius: 80px;
  background-image: linear-gradient(#eae5f7, #eae5f7),
    radial-gradient(circle at top left, #9333ea 0%, #4f46e5 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  border-radius: 100px;
  
  
  
`;
const TagText = styled.p`
  height: 12px;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  margin: 0px;
  line-height: 120%;
  background: linear-gradient(90deg, #9333ea 0%, #4f46e5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
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
const TagSectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;
const ViewButtonContainer = styled.div`
  display: flex;
  padding: 0px 0px 0px 8px;
  align-items: flex-start;
  gap: 8px;
`;
const ViewButtonDiv = styled.a`
  display: flex;
  padding: 2px 12px;
  align-items: flex-start;
  b
  border-radius: 80px;
  background-image: linear-gradient(#f8f8f9, #f8f8f9),
    radial-gradient(circle at top left, #9333ea 0%, #4f46e5 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  gap: 10px;
  border-radius: 4px;
  text-decoration: none;
`;
const ViewButtonText = styled.p`
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
const ShareButtonDiv = styled.button`
  display: flex;
  padding: 2px 12px;
  align-items: flex-start;
  gap: 10px;
  border-radius: 4px;
  background: var(--buttons-yellow-default, #ffd50d);
  b @media (hover: hover) {
    /* when hover is supported */
    a:hover {
      color: white;
      background: black;
    }
  }
`;
const ShareButtonText = styled.p`
  color: var(--primary-black, #000);
  font-size: 12px;
  font-weight: 500;
  line-height: 24px;
  margin: 0px;
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
  b
`;

const DropdownContent = styled.div`
  display: none;
  font-size: 13px;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  border-radius: 8px;
  background: #ffffff;
  width: 200px;
  gap: 9px;
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  z-index: 1;
  padding: 8px;
`;

const Element = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: center;
  width: 100%;
  &:hover {
    border-radius: 6px;
    background: #f8f8f9;
  }
`;

const ShareLink = styled.a`
  color: black;
  padding: 12px 16px;
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
  }
`;

const Separation = styled.div`
    margin-top: -196px;
    width: 200px;
    position: absolute;
  }
`;

return (
  <Card>
    {state.showModal && (
      <Widget
        src={`dokxo.near/widget/CommentCard`}
        props={{
          candidateOrReplay: true,
          username: data.indexerData.nominee,
          onClickConfirm: () => State.update({ showModal: false }),
          onClickCancel: () => State.update({ showModal: false }),
        }}
      />
    )}
    <HeaderCard>
      <ProfilePicture
        src={
          data.imgURL
            ? data.imgURL
            : "https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmZBPPMKLdZG2zVpYaf9rcbtNfAp7c3BtsvzxzBb9pNihm?_gl=1*6avmrp*rs_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*rs_ga_5RMPXG14TE*MTY4NjkzMzM2NC4zLjEuMTY4NjkzMzM4Ni4zOC4wLjA."
        }
        alt="pic"
      ></ProfilePicture>
      <HeaderContent>
        <HeaderTag>
          <HeaderTagP>
            {data.indexerData.house == "HouseOfMerit"
              ? "House of Merit"
              : data.indexerData.house == "CouncilOfAdvisors"
              ? "Council of Advisors"
              : "Transparency Commission"}
          </HeaderTagP>
        </HeaderTag>
        <HeaderContentText>
          <NominationName>{data.profileData.name}</NominationName>
          <NominationUser>{data.nominationData.profileAccount}</NominationUser>
        </HeaderContentText>
      </HeaderContent>
      {state.verified && context.accountId != data.indexerData.nominee ? (
        <UpvoteButton onClick={handleUpVote}>
          {data.upVoteData.upvotes ? "+" + data.upVoteData.upvotes : "+" + 0}
          <Icon src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmXqGSZvrgGkVviBJirnBtT9krTHHsjPYX1UM8EWExFxCM?_gl=1*1hd2izc*rs_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*rs_ga_5RMPXG14TE*MTY4NjkzOTYyNC40LjAuMTY4NjkzOTYyNC42MC4wLjA."></Icon>
        </UpvoteButton>
      ) : (
        <UpvoteButton onClick={handleUpVote} disabled>
          {data.upVoteData.upvotes ? "+" + data.upVoteData.upvotes : "+" + 0}
          <Icon
            style={{ filter: "grayscale(1)" }}
            src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmXqGSZvrgGkVviBJirnBtT9krTHHsjPYX1UM8EWExFxCM?_gl=1*1hd2izc*rs_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*rs_ga_5RMPXG14TE*MTY4NjkzOTYyNC40LjAuMTY4NjkzOTYyNC42MC4wLjA."
          ></Icon>
        </UpvoteButton>
      )}
    </HeaderCard>
    <CollapseCandidate>
      <CollapseCandidateContent>
        <CollapseCandidateHeader>
          <CollapseCandidateText>Candidate Affiliations</CollapseCandidateText>
        </CollapseCandidateHeader>
        <CandidateTagContainer>
          {JSON.parse(data.nominationData.afiliation).map((data) => {
            return (
              <>
                <CandidateTag>
                  <CandidateTagText>{data.company_name}</CandidateTagText>
                </CandidateTag>
              </>
            );
          })}
        </CandidateTagContainer>
      </CollapseCandidateContent>
    </CollapseCandidate>
    <KeyIssues>
      <KeyIssuesContent>
        <KeyIssuesHeader>
          <KeyIssuesTitle>Key issues</KeyIssuesTitle>
        </KeyIssuesHeader>
        <KeyIssuesContainer>
          <KeyIssue name="HowAreYouInvolved" style={{ height: "35px" }}>
            <KeyIssueHeader>
              <KeyIssueTitle style={{ "text-overflow": "ellipsis" }}>
                Involvement in the NEAR ecosystem, qualifications to be a
                candidate and reasons for being voted
              </KeyIssueTitle>
            </KeyIssueHeader>
            <KeyIssueDescription style={{ "margin-top": "10px" }}>
              {data.nominationData.HAYInvolve}
            </KeyIssueDescription>
            <KeyIssueSeparator></KeyIssueSeparator>
          </KeyIssue>
          <KeyIssue name="WhatIsYourStrategy">
            <KeyIssueHeader>
              <KeyIssueTitle>
                Strategy to develop the NEAR ecosystem
              </KeyIssueTitle>
            </KeyIssueHeader>
            <KeyIssueDescription>
              {data.nominationData.WIYStrategy}
            </KeyIssueDescription>
            <KeyIssueSeparator></KeyIssueSeparator>
          </KeyIssue>
          <KeyIssue>
            <KeyIssueHeader>
              <KeyIssueTitle>Key Issue 1</KeyIssueTitle>
            </KeyIssueHeader>
            <KeyIssueDescription>
              {data.nominationData.Key_Issue_1}
            </KeyIssueDescription>
            <KeyIssueSeparator></KeyIssueSeparator>
          </KeyIssue>
          <KeyIssue>
            <KeyIssueHeader>
              <KeyIssueTitle>Key Issue 2</KeyIssueTitle>
            </KeyIssueHeader>
            <KeyIssueDescription>
              {data.nominationData.Key_Issue_2}
            </KeyIssueDescription>
            <KeyIssueSeparator></KeyIssueSeparator>
          </KeyIssue>
          <KeyIssue>
            <KeyIssueHeader>
              <KeyIssueTitle>Key Issue 3</KeyIssueTitle>
            </KeyIssueHeader>
            <KeyIssueDescription>
              {data.nominationData.Key_Issue_3}
            </KeyIssueDescription>
            <KeyIssueSeparator></KeyIssueSeparator>
          </KeyIssue>
          <KeyIssue>
            <KeyIssueHeader>
              <KeyIssueTitle>Other Platform</KeyIssueTitle>
            </KeyIssueHeader>
            <KeyIssueDescription>
              {data.nominationData.addition_platform}
            </KeyIssueDescription>
          </KeyIssue>
        </KeyIssuesContainer>
      </KeyIssuesContent>
    </KeyIssues>
    <LowerSection>
      <LowerSectionContainer>
        <ButtonsLowerSection>
          <TextLowerSectionContainer>
            <ClockIcon
              src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmTUjsGCFy6YrmjgS7zPVbdcKs4V8PZrXKC5zn6LUBfdoi?_gl=1*1141dsg*rs_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*rs_ga_5RMPXG14TE*MTY4Njk0NzU3Mi41LjEuMTY4Njk0ODc2Ny42MC4wLjA."
              alt="pic"
            ></ClockIcon>
            <TimestampText>
              {data.indexerData.timestamp} by {data.indexerData.nominee}
            </TimestampText>
          </TextLowerSectionContainer>
          {state.verified ? (
            <CommentButtonDiv
              onClick={async () => {
                !data.preview ? State.update({ showModal: true }) : "";
              }}
            >
              <CommentButtonCounter>
                +{data.upVoteData.comments.length}
              </CommentButtonCounter>
              <CommentButtonIcon
                src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmeZWTSG87x4RVE2MmaW5EPt3R2qBw6KpDvQNnGPV1hF2Q?_gl=1*11ayqft*_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*_ga_5RMPXG14TE*MTY4NzgwODA5Ny4xLjEuMTY4NzgwODA5OS41OC4wLjA."
                alt="pic"
              ></CommentButtonIcon>
            </CommentButtonDiv>
          ) : (
            <CommentButtonDisabled>
              <CommentButtonCounter style={{ filter: "grayscale(1)" }}>
                {data.upVoteData.comments
                  ? "+" + data.upVoteData.comments.length
                  : "+" + 0}
              </CommentButtonCounter>
              <Icon
                style={{ filter: "grayscale(1)" }}
                src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmeZWTSG87x4RVE2MmaW5EPt3R2qBw6KpDvQNnGPV1hF2Q?_gl=1*11ayqft*_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*_ga_5RMPXG14TE*MTY4NzgwODA5Ny4xLjEuMTY4NzgwODA5OS41OC4wLjA."
              ></Icon>
            </CommentButtonDisabled>
          )}
        </ButtonsLowerSection>
        <TagSectionContainer>
          <TagSection>
            {data.nominationData.tags
              .trim()
              .split(",")
              .map((data) => {
                return data === "" ? (
                  <></>
                ) : (
                  <Tag>
                    <TagText>{data}</TagText>
                  </Tag>
                );
              })}
          </TagSection>
          <ViewButtonContainer>
            {data.preview ? (
              <></>
            ) : (
              <>
                <ViewButtonDiv
                  className="text-decoration-none"
                  href={
                    "#/yairnava.near/widget/NDC.Nomination.Candidate.Container?house=" +
                    data.indexerData.house +
                    "&candidate=" +
                    data.indexerData.nominee
                  }
                >
                  <ViewButtonText>View</ViewButtonText>
                </ViewButtonDiv>
                <DropdownContainerHover>
                  <ShareButtonDiv onClick={handleShare}>
                    <ShareButtonText>Share</ShareButtonText>
                  </ShareButtonDiv>
                  <Separation>
                    <DropdownContent>
                      <Element onClick={handleShare}>
                        <OverlayTrigger
                          placement={top}
                          overlay={<Tooltip>{state.shareText}</Tooltip>}
                        >
                          <ShareLink
                            style={{
                              width: "132px",
                              "text-decoration": "none",
                              color: "black",
                            }}
                          >
                            Share as a Link
                          </ShareLink>
                        </OverlayTrigger>
                        <ShareIcon src="https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmV7qjDVv5dhsMJF1hRqCzeVNEHervtSURQmyBqWLdvtq3" />
                      </Element>
                      <Element>
                        <ShareLink
                          target="_blank"
                          href={
                            "https://twitter.com/intent/tweet?text=Please%20checkout%20this%20NDC%20Candidate%20and%20Support%20the%20NDC%20Election!%20&url=" +
                            getComponentURL()
                          }
                          style={{
                            width: "132px",
                            "text-decoration": "none",
                            color: "black",
                          }}
                        >
                          Share on Twitter
                        </ShareLink>
                        <ShareIcon src="https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmTXndeq7DWFW8gwsmhLBXTd4KzCeKr2Q6GgMwUA8fmfoJ" />
                      </Element>
                      <Element>
                        <ShareLink
                          href={
                            "mailto:?subject=Please%20checkout%20this%20NDC%20Candidate%20and%20Support%20the%20NDC%20Election&body=Support%20the%20NDC%20Election!%20" +
                            getComponentURL()
                          }
                          style={{
                            width: "132px",
                            "text-decoration": "none",
                            color: "black",
                          }}
                        >
                          Share by Email
                        </ShareLink>
                        <ShareIcon src="https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmdDa1om9dWr49n7ozBsGhQfNrkQ3FxYWCtKRtNwHkuz3Q" />
                      </Element>
                    </DropdownContent>
                  </Separation>
                </DropdownContainerHover>
              </>
            )}
          </ViewButtonContainer>
        </TagSectionContainer>
      </LowerSectionContainer>
    </LowerSection>
  </Card>
);
