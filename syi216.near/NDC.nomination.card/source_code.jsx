const data = props;
console.log("props card", data);
State.init({ verified: false });
let Nominationcontract = "nominations-v1.gwg-testing.near";
function getVerifiedHuman() {
  asyncFetch(
    `https://api.pikespeak.ai/sbt/has-sbt?holder=${context.accountId}&class_id=1&issuer=fractal.i-am-human.near&with_expired=true`,
    {
      headers: {
        "x-api-key": "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5",
      },
    }
  ).then((res) => {
    State.update({ verified: res.body });
  });
}

const Card = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 16px;
gap: 16px;

width: 358px;


background: #F8F8F9;
border-radius: 10px;

/* Inside auto layout */

flex: none;
order: 2;
flex-grow: 0;
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


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
`;

const HeaderContent = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 190px;
height: 53px;


/* Inside auto layout */

flex: none;
order: 1;
flex-grow: 1;
`;

const HeaderTag = styled.div`
box-sizing: border-box;

/* Auto layout */

display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 4px 8px;
gap: 10px;

width: 74px;
height: 18px;

border: solid 1px transparent;
border-radius: 80px;
background-image: linear-gradient(white, white), radial-gradient(circle at top left, #9333EA 0%,#4F46E5 100%);
background-origin: border-box;
background-clip: padding-box, border-box;


border-radius: 100px;

/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;`;

const HeaderTagP = styled.p`
width: 58px;
height: 10px;

font-family: 'Avenir';
font-style: normal;
font-weight: 500;
font-size: 8px;
line-height: 120%;
margin: 0px;
/* identical to box height, or 10px */

display: flex;
align-items: center;

/* Gradient/Purple gradient */

background: linear-gradient(90deg, #9333EA 0%, #4F46E5 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
text-fill-color: transparent;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
`;

const HeaderContentText = styled.div`
/* Auto layout */

display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 228px;
height: 31px;


/* Inside auto layout */

flex: none;
order: 1;
flex-grow: 0;`;

const NominationName = styled.p`
width: 228px;
height: 17px;

font-family: 'Avenir';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 120%;
margin: 0px;
/* identical to box height, or 17px */

display: flex;
align-items: center;

color: #000000;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;`;

const NominationUser = styled.p`
width: 228px;
height: 14px;

font-family: 'Avenir';
font-style: normal;
font-weight: 400;
font-size: 12px;
margin: 0px;
line-height: 120%;
/* or 14px */

display: flex;
align-items: center;

color: #828688;


/* Inside auto layout */

flex: none;
order: 1;
flex-grow: 0;
`;

const UpvoteButton = styled.button`
box-sizing: border-box;

/* Auto layout */

display: flex;
flex-direction: row;
align-items: center;
padding: 2px 12px;
gap: 6px;

width: 72px;
height: 28px;

border: solid 1px transparent;
border-radius: 80px;
background-image: linear-gradient(white, white), radial-gradient(circle at top left, #9333EA 0%,#4F46E5 100%);
background-origin: border-box;
background-clip: padding-box, border-box;

border-radius: 4px;

/* Inside auto layout */

flex: none;
order: 2;
flex-grow: 0;`;

const UpvoteButtonText = styled.p`
width: 28px;
height: 24px;

font-family: 'Avenir';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 24px;
margin: 0px;
/* identical to box height, or 200% */


/* Buttons/Gradient default */

background: linear-gradient(90deg, #9333EA 0%, #4F46E5 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
text-fill-color: transparent;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
`;

const UpvoteIcon = styled.img`
width: 14px;
height: 14px;


/* Inside auto layout */

flex: none;
order: 1;
flex-grow: 0;
`;
const CollapseCandidate = styled.div`
display: flex;
flex-direction: row;
align-items: center;
padding: 8px 12px;
gap: 12px;

width: 326px;
height: 56px;

background: #FFFFFF;
border-radius: 6px;

/* Inside auto layout */

flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
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


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
`;

const CollapseCandidateHeader = styled.div`
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 12px;

width: 302px;
height: 16px;


/* Inside auto layout */

flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
`;

const CollapseCandidateText = styled.p`
width: 274px;
height: 14px;

font-family: 'Avenir';
font-style: normal;
font-weight: 800;
font-size: 12px;
line-height: 120%;
margin: 0px;
/* or 14px */


color: #000000;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 1;
`;

const DownArrow = styled.img`
width: 16px;
height: 16px;


/* Inside auto layout */

flex: none;
order: 1;
flex-grow: 0;
`;

const CandidateTagContainer = styled.div`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 144px;
height: 20px;


/* Inside auto layout */

flex: none;
order: 1;
flex-grow: 0;
`;

const CandidateTag = styled.div`
box-sizing: border-box;

/* Auto layout */

display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 4px 8px;
gap: 10px;

height: 20px;

background: #F0E1CE;
/* Secondary/Warning */

border: 1px solid #F19D38;
border-radius: 100px;

/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
`;

const CandidateTagText = styled.p`
height: 12px;

font-family: 'Avenir';
font-style: normal;
font-weight: 500;
font-size: 10px;
line-height: 120%;
margin: 0px;
/* identical to box height, or 12px */


/* Secondary/Warning */

color: #F19D38;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
`;

const KeyIssues = styled.div`
/* Auto layout */

display: flex;
flex-direction: row;
align-items: flex-start;
padding: 8px 12px;
gap: 12px;

width: 326px;


background: #FFFFFF;
border-radius: 6px;

/* Inside auto layout */

flex: none;
order: 1;
flex-grow: 0;
`;

const KeyIssuesContent = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 302px;



/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
`;

const KeyIssuesHeader = styled.div`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 302px;
height: 14px;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
`;

const KeyIssuesTitle = styled.p`
width: 302px;
height: 14px;

font-family: 'Avenir';
font-style: normal;
font-weight: 800;
font-size: 12px;
line-height: 120%;
/* or 14px */


color: #000000;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 1;
`;

const KeyIssuesContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 8px;

width: 302px;



/* Inside auto layout */

flex: none;
order: 1;
flex-grow: 0;
`;

const KeyIssue = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 302px;
height: 28px;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
`;

const KeyIssueHeader = styled.div`
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 8px;

width: 302px;
height: 14px;


/* Inside auto layout */

flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
`;

const KeyIssueTitle = styled.p`
width: 302px;
height: 12px;

font-family: 'Avenir';
font-style: normal;
font-weight: 500;
font-size: 10px;
line-height: 120%;
margin: 0px;
/* identical to box height, or 12px */


/* #000000 */

color: #000000;


/* Inside auto layout */

flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
`;

const KeyIssueDescription = styled.p`
width: 302px;
height: 12px;

font-family: 'Avenir';
font-style: normal;
font-weight: 400;
font-size: 10px;
margin: 0px;
line-height: 120%;
/* identical to box height, or 12px */


color: #828688;


/* Inside auto layout */

flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
`;

const KeyIssueSeparator = styled.hr`
width: 302px;
height: 0px;
margin: 0px;

border: 1px solid rgba(208, 214, 217, 1);

/* Inside auto layout */

flex: none;
order: 1;
flex-grow: 0;
`;

const LowerSection = styled.div`
display: flex;
width: 326px;
flex-direction: column;
justify-content: center;
align-items: flex-start;
gap: 8px;




/* Inside auto layout */

flex: none;
order: 2;
flex-grow: 0;
`;

const LowerSectionContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
gap: 8px;
align-self: stretch;



/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
`;

const ButtonsLowerSection = styled.div`
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 326px;
height: 28px;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
`;

const TextLowerSectionContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 4px;

width: 239px;
height: 24px;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 1;
`;

const ClockIcon = styled.img`
width: 12px;
height: 12px;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
`;

const TimestampText = styled.p`
width: 119px;
height: 20px;

font-family: 'Avenir';
font-style: italic;
font-weight: 300;
font-size: 10px;
line-height: 14px;
margin: 0px;
display: flex;
align-items: center;

color: #000000;


/* Inside auto layout */

flex: none;
order: 1;
flex-grow: 0;
`;

const CommentsCounter = styled.p`
width: 96px;
height: 24px;

font-family: 'Avenir';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 24px;
margin: 0px;
/* identical to box height, or 200% */

text-align: right;

/* Buttons/Gradient default */

background: linear-gradient(90deg, #9333EA 0%, #4F46E5 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
text-fill-color: transparent;


/* Inside auto layout */

flex: none;
order: 2;
flex-grow: 0;
`;

const ButtonsContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 4px;

width: 87px;
height: 28px;


/* Inside auto layout */

flex: none;
order: 1;
flex-grow: 0;
`;

const TagSection = styled.div`
display: flex;
width: 160px;
align-items: flex-start;
gap: 4px;
`;

const Tag = styled.div`
box-sizing: border-box;

/* Auto layout */

display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 4px 8px;
gap: 10px;

height: 20px;

border: solid 1px transparent;
border-radius: 80px;
background-image: linear-gradient(white, white), radial-gradient(circle at top left, #9333EA 0%,#4F46E5 100%);
background-origin: border-box;
background-clip: padding-box, border-box;
border-radius: 100px;

/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
`;

const TagText = styled.p`
height: 12px;

font-family: 'Avenir';
font-style: normal;
font-weight: 500;
font-size: 10px;
margin: 0px;
line-height: 120%;
/* identical to box height, or 12px */


/* Gradient/Purple gradient */

background: linear-gradient(90deg, #9333EA 0%, #4F46E5 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
text-fill-color: transparent;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
`;

const CommentButtonDiv = styled.button`
display: flex;
padding: 2px 12px;
align-items: center;
gap: 6px;
border: solid 1px transparent;
border-radius: 80px;
background-image: linear-gradient(white, white), radial-gradient(circle at top left, #9333EA 0%,#4F46E5 100%);
background-origin: border-box;
background-clip: padding-box, border-box;
border-radius: 4px;
`;

const CommentButtonCounter = styled.p`
font-size: 12px;
font-family: Avenir;
font-weight: 500;
line-height: 24px;
margin: 0px;
background: linear-gradient(90deg, #9333EA 0%, #4F46E5 100%);
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
border: solid 1px transparent;
border-radius: 80px;
background-image: linear-gradient(white, white), radial-gradient(circle at top left, #9333EA 0%,#4F46E5 100%);
background-origin: border-box;
background-clip: padding-box, border-box;
gap: 10px;
border-radius: 4px;
`;

const ViewButtonText = styled.p`
font-size: 12px;
font-family: Avenir;
font-weight: 500;
line-height: 24px;
margin: 0px;
background: linear-gradient(90deg, #9333EA 0%, #4F46E5 100%);
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
background: var(--buttons-yellow-default, #FFD50D);
border: 1px solid #FFD50D;
`;

const ShareButtonText = styled.p`
color: var(--primary-black, #000);
font-size: 12px;
font-family: Avenir;
font-weight: 500;
line-height: 24px;
margin: 0px;
`;

return (
  <Card>
    <HeaderCard>
      <ProfilePicture
        src={
          data.nominationData.img.cid
            ? "https://nativonft.mypinata.cloud/ipfs/" +
              data.nominationData.img.cid
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
      <UpvoteButton
        disabled={
          status.verified && data.indexerData.nominee != context.accountId
            ? true
            : false
        }
      >
        <UpvoteButtonText>+354</UpvoteButtonText>
        <UpvoteIcon
          src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmXqGSZvrgGkVviBJirnBtT9krTHHsjPYX1UM8EWExFxCM?_gl=1*1hd2izc*rs_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*rs_ga_5RMPXG14TE*MTY4NjkzOTYyNC40LjAuMTY4NjkzOTYyNC42MC4wLjA."
          alt="pic"
        ></UpvoteIcon>
      </UpvoteButton>
    </HeaderCard>
    <CollapseCandidate>
      <CollapseCandidateContent>
        <CollapseCandidateHeader>
          <CollapseCandidateText>Candidate Affiliations</CollapseCandidateText>
        </CollapseCandidateHeader>
        <CandidateTagContainer>
          {JSON.parse(data.nominationData.afiliation).map((data) => {
            console.log(data);
            return (
              <CandidateTag>
                <CandidateTagText>{data.company_name}</CandidateTagText>
              </CandidateTag>
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
          <KeyIssue>
            <KeyIssueHeader>
              <KeyIssueTitle>Key Issue 1</KeyIssueTitle>
            </KeyIssueHeader>
            <KeyIssueDescription>
              {data.nominationData.issued1}
            </KeyIssueDescription>
            <KeyIssueSeparator></KeyIssueSeparator>
          </KeyIssue>
          <KeyIssue>
            <KeyIssueHeader>
              <KeyIssueTitle>Key Issue 2</KeyIssueTitle>
            </KeyIssueHeader>
            <KeyIssueDescription>
              {data.nominationData.issued2}
            </KeyIssueDescription>
            <KeyIssueSeparator></KeyIssueSeparator>
          </KeyIssue>
          <KeyIssue>
            <KeyIssueHeader>
              <KeyIssueTitle>Key Issue 3</KeyIssueTitle>
            </KeyIssueHeader>
            <KeyIssueDescription>
              {data.nominationData.issued3}
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
            <KeyIssueSeparator></KeyIssueSeparator>
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
          <CommentButtonDiv>
            <CommentButtonCounter>+20</CommentButtonCounter>
            <CommentButtonIcon
              src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmeZWTSG87x4RVE2MmaW5EPt3R2qBw6KpDvQNnGPV1hF2Q?_gl=1*11ayqft*_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*_ga_5RMPXG14TE*MTY4NzgwODA5Ny4xLjEuMTY4NzgwODA5OS41OC4wLjA."
              alt="pic"
            ></CommentButtonIcon>
          </CommentButtonDiv>
        </ButtonsLowerSection>
        <TagSectionContainer>
          <TagSection>
            {data.nominationData.tags.split(",").map((data) => {
              <Tag>
                <TagText>{data}</TagText>
              </Tag>;
            })}
          </TagSection>
          <ViewButtonContainer>
            <ViewButtonDiv
              href={
                "#/yairnava.near/widget/NDC.Nomination.Candidate.Container?house=" +
                data.indexerData.house +
                ",candidate=" +
                data.indexerData.nominee
              }
            >
              <ViewButtonText>View</ViewButtonText>
            </ViewButtonDiv>
            <ShareButtonDiv>
              <ShareButtonText>Share</ShareButtonText>
            </ShareButtonDiv>
          </ViewButtonContainer>
        </TagSectionContainer>
      </LowerSectionContainer>
    </LowerSection>
  </Card>
);
