State.init({
  tabSelected: "comments",
  verified: false,
  start: true,
  voted: false,
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
    `https://api.pikespeak.ai/nominations/is-upvoted-by?candidate=${props.candidate}&upvoter=${context.accountId}`,
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
      candidate: props.candidate,
    },
    300000000000000,
    state.voted ? 0 : 1000000000000000000000
  );
}

const pillsVesting = [
  { id: "declaration", title: "Declaration" },
  { id: "comments", title: "Comments" },
];

const DetailContent = styled.div`
display: inline-flex;
flex-direction: column;
align-items: flex-start;
gap: 12px;
`;

const DetailCard = styled.div`
display: flex;
width: 358px;
padding: 16px;
flex-direction: column;
align-items: flex-start;
gap: 16px;
border-radius: 10px;
background: #F8F8F9;
`;

const DetailHeader = styled.div`
display: flex;
width: 326px;
align-items: center;
gap: 12px;
`;

const ProfilePicture = styled.img`
width: 40px;
height: 40px;
flex-shrink: 0;
`;

const HeaderDetailContent = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 4px;
flex: 1 0 0;
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
background: var(--gradient-purple-gradient, linear-gradient(90deg, #9333EA 0%, #4F46E5 100%));
`;

const HouseTagText = styled.p`
color: #FFF;
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
background-image: linear-gradient(#EAE5F7, #EAE5F7), radial-gradient(circle at top left, #9333EA 0%,#4F46E5 100%);
background-origin: border-box;
background-clip: padding-box, border-box;
`;

const TagDivText = styled.p`
font-size: 8px;
margin: 0px;
font-weight: 500;
line-height: 120%;
background: linear-gradient(90deg, #9333EA 0%, #4F46E5 100%);
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
margin: 0px;
color: #000;
font-size: 14px;
font-weight: 500;
line-height: 120%;
`;

const NominationUser = styled.p`
display: flex;
flex-direction: column;
justify-content: center;
color: #828688;
margin:0px;
font-size: 12px;
line-height: 120%;
`;

const UpvoteButtonDisabled = styled.button`
display: flex;
padding: 2px 12px;
align-items: center;
gap: 6px;
border-radius: 4px;
border: solid 1px transparent;
background: var(--buttons-disable, #C3CACE);
cursor: default !important;
`;

const UpvoteButton = styled.button`
display: flex;
padding: 2px 12px;
align-items: center;
gap: 6px;
border-radius: 4px;
border: solid 1px transparent;
background-image: linear-gradient(#F8F8F9, #F8F8F9), radial-gradient(circle at left top, rgb(147, 51, 234) 0%, rgb(79, 70, 229) 100%);
background-origin: border-box;
background-clip: padding-box, border-box;
`;

const UpvoteCount = styled.p`
font-size: 12px;
font-weight: 500;
line-height: 24px;
margin: 0px;
background: linear-gradient(90deg, #9333EA 0%, #4F46E5 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
text-fill-color: transparent;
`;

const Icon = styled.img`
width: 17px;
height: 17px;
`;

const PlatformCard = styled.div`
display: flex;
width: 326px;
padding-top: 16px;
align-items: flex-start;
gap: 12px;
border-radius: 6px;
background: #FFF;
`;

const PlatformContent = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 12px;
`;

const PlatformHeaderDiv = styled.div`
display: flex;
width: 302px;
align-items: flex-start;
gap: 12px;
`;

const PlatformHeaderText = styled.p`
display: flex;
flex-direction: column;
flex: 1 0 0;
color: #000;
font-size: 12px;
font-weight: 800;
line-height: 120%;
margin: 0px;
`;

const PlatformInfoDiv = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 8px;
`;

const PlatformInfoHeader = styled.div`
display: flex;
width: 302px;
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
width: 302px;
height: 0px;
margin: 8px 0 0 0;

border: 1px solid rgba(208, 214, 217, 1);
`;

const KeyIssuesContainer = styled.div`
display: flex;
width: 302px;
flex-direction: column;
align-items: flex-start;
gap: 2px;
`;

const KeyIssueTitle = styled.p`
color: var(--primary-000000, #000);
font-size: 12px;
line-height: 120%;
margin: 0px;
`;

const KeyIssueDescription = styled.p`
color: #828688;
font-size: 12px;
line-height: 120%;
margin: 0px;
`;

const CandidateCard = styled.div`
display: flex;
padding: 16px 12px;
align-items: center;
gap: 12px;
align-self: stretch;
border-radius: 6px;
background: #FFF;
`;

const CandidateContent = styled.div`
display: flex;
width: 302px;
flex-direction: column;
justify-content: center;
align-items: flex-start;
gap: 12px;
`;

const CandidateHeader = styled.div`
display: flex;
align-items: center;
gap: 12px;
align-self: stretch;
`;

const CandidateHeaderText = styled.p`
color: #000;
font-size: 12px;
font-weight: 800;
line-height: 120%;
margin: 0px;
`;

const CandidateInfoDiv = styled.div`
display: flex;
width: 290px;
padding: 16px;
flex-direction: column;
align-items: flex-start;
gap: 16px;
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
border: 1px solid var(--secondary-warning, #F19D38);
background: #F0E1CE;
`;

const CandidateTagText = styled.p`
color: var(--secondary-warning, #F19D38);
font-size: 10px;
font-weight: 500;
line-height: 120%;
margin: 0px;
`;

const CandidateTime = styled.p`
margin: 0px;
color: var(--primary-828688, #828688);
font-size: 10px;
font-weight: 500;
line-height: 120%;
`;

const CandidateTextInfo = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 4px;
align-self: stretch;
`;

const CandidateTitle = styled.p`
color: var(--000000, #000);
font-size: 12px;
font-weight: 500;
line-height: 120%;
margin:0px;
`;

const CandidateDescription = styled.p`
color: var(--primary-828688, #828688);
font-size: 12px;
line-height: 130%;
margin: 0px;
width: 258px;
overflow: hidden;
text-align: justify;
`;

const DeclarationCard = styled.div`
display: flex;
padding: 16px 12px;
align-items: center;
gap: 12px;
align-self: stretch;
border-radius: 6px;
background: #FFF;
`;

const DeclarationContent = styled.div`
display: flex;
width: 302px;
flex-direction: column;
justify-content: center;
align-items: flex-start;
gap: 4px;
`;

const DeclarationHeader = styled.div`
display: flex;
align-items: center;
gap: 12px;
align-self: stretch;
`;

const DeclarationHeaderText = styled.p`
color: #000;
font-size: 12px;
font-weight: 800;
line-height: 120%;
`;

const DeclarationInfo = styled.div`
display: flex;
width: 290px;
padding: 8px 0px;
flex-direction: column;
align-items: flex-start;
gap: 16px;
border-radius: 8px;
background: #FFF;
`;

const DeclarationDescription = styled.p`
color: black;
font-size: 12px;
line-height: 130%;
text-align: justify;
`;

const DeclarationImage = styled.img`
width: 290px;
height: 234px;
`;

const CommentSection = styled.div`
display: flex;
padding: 16px;
flex-direction: column;
align-items: flex-start;
gap: 12px;
border-radius: 10px;
background: #F8F8F9;
`;

const CommentHeader = styled.div`
display: flex;
width: 326px;
align-items: center;
justify-content: space-between;
gap: 20px;
`;

const CommentHeaderText = styled.p`
color: var(--000000, #000);
font-size: 16px;
font-weight: 500;
line-height: 120%;
margin: 0px;
`;

const Container = styled.div`
display: flex;
justify-content: center;
@media only screen and (max-width: 600px) {
  display: none;
}
`;

const PillButtonActive = styled.div`
font-weight: 700;
border-bottom: 4px solid;
border-image: var(--gradient-purple-gradient, linear-gradient(90deg, #9333EA 0%, #4F46E5 100%));
border-image-slice: 1;
cursor: pointer;
padding-bottom: 5px;
  }
`;

const PillButton = styled.div`
font-weight: 700;
border-bottom: 4px solid;
border-color: #dee2e6;
border-image-slice: 1;
cursor: pointer;
padding-bottom: 5px;
  }
`;

const CommentButton = styled.div`
cursor: pointer;
display: flex;
padding: 2px 12px;
align-items: center;
gap: 6px;
align-self: stretch;
border-radius: 4px;
background: var(--buttons-yellow-default, #FFD50D);
`;

const CommentButtonDisabled = styled.div`
cursor: pointer;
display: flex;
padding: 2px 12px;
align-items: center;
gap: 6px;
align-self: stretch;
border-radius: 4px;
background: var(--buttons-disable, #C3CACE);
cursor: default !important;
`;

const CommentText = styled.p`
color: var(--primary-black, #000);
font-size: 12px;
font-weight: 500;
line-height: 24px;
margin: 0px;
`;

const afilations = JSON.parse(props.data.nominations.afiliation);

const afiilationsSort = afilations
  .sort((a, b) => new Date(a.end_date) - new Date(b.end_date))
  .reverse();

const issues = [
  props.data.nominations.HAYInvolve,
  props.data.nominations.WIYStrategy,
  props.data.nominations.Key_Issue_1,
  props.data.nominations.Key_Issue_2,
  props.data.nominations.Key_Issue_3,
  props.data.nominations.addition_platform,
];
const comments = props.data.comments[0].comments;

return (
  <Container class="row">
    <div class="col-9" style={{ "margin-right": "5px", width: "950px" }}>
      <div class="row" style={{ "margin-inline": "5px" }}>
        <div
          class="col-12"
          style={{
            width: "100%",
            background: "#F8F8F9",
            "border-radius": "8px",
          }}
        >
          <DetailHeader
            style={{
              width: "100%",
              "margin-top": "10px",
              "margin-bottom": "10px",
            }}
          >
            <ProfilePicture
              style={{
                width: "100px",
                height: "100px",
                "border-radius": "20px",
              }}
              src={
                props.data.nominations.img.url
                  ? props.data.nominations.img.url
                  : "https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmZBPPMKLdZG2zVpYaf9rcbtNfAp7c3BtsvzxzBb9pNihm?_gl=1*6avmrp*rs_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*rs_ga_5RMPXG14TE*MTY4NjkzMzM2NC4zLjEuMTY4NjkzMzM4Ni4zOC4wLjA."
              }
              alt="pic"
            ></ProfilePicture>
            <HeaderDetailContent>
              <TagContainer style={{ "margin-bottom": "5px" }}>
                <HouseTagDiv>
                  <HouseTagText style={{ "font-size": "12px" }}>
                    {props.house == "HouseOfMerit"
                      ? "House of Merit"
                      : props.house == "CouncilOfAdvisors"
                      ? "Council of Advisors"
                      : "Transparency Commission"}
                  </HouseTagText>
                </HouseTagDiv>
              </TagContainer>
              <NominationTitleContainer>
                <NominationTitle
                  style={{ "margin-bottom": "5px", "font-size": "18px" }}
                >
                  {props.data.nominations.name}
                </NominationTitle>
                <NominationUser
                  style={{ "margin-bottom": "5px", "font-size": "14px" }}
                >
                  {props.candidate}
                </NominationUser>
                <TagContainer>
                  {props.data.nominations.tags
                    .trim()
                    .split(",")
                    .map((tag) => {
                      return tag && tag != "" ? (
                        <TagDiv>
                          <TagDivText style={{ "font-size": "10px" }}>
                            {tag}
                          </TagDivText>
                        </TagDiv>
                      ) : null;
                    })}
                </TagContainer>
              </NominationTitleContainer>
            </HeaderDetailContent>
            <HeaderDetailContent
              style={{ "align-items": "end", height: "71.17px" }}
            >
              {state.verified && context.accountId != props.candidate ? (
                <UpvoteButton onClick={handleUpVote}>
                  <UpvoteCount>
                    {props.data.comments[0].upvotes
                      ? "+" + props.data.comments[0].upvotes
                      : "+" + 0}
                  </UpvoteCount>
                  <Icon src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmXqGSZvrgGkVviBJirnBtT9krTHHsjPYX1UM8EWExFxCM?_gl=1*1hd2izc*rs_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*rs_ga_5RMPXG14TE*MTY4NjkzOTYyNC40LjAuMTY4NjkzOTYyNC42MC4wLjA."></Icon>
                </UpvoteButton>
              ) : (
                <UpvoteButtonDisabled>
                  <UpvoteCount style={{ filter: "grayscale(1)" }}>
                    {props.data.comments[0].upvotes
                      ? "+" + props.data.comments[0].upvotes
                      : "+" + 0}
                  </UpvoteCount>
                  <Icon
                    style={{ filter: "grayscale(1)" }}
                    src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmXqGSZvrgGkVviBJirnBtT9krTHHsjPYX1UM8EWExFxCM?_gl=1*1hd2izc*rs_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*rs_ga_5RMPXG14TE*MTY4NjkzOTYyNC40LjAuMTY4NjkzOTYyNC42MC4wLjA."
                  ></Icon>
                </UpvoteButtonDisabled>
              )}
            </HeaderDetailContent>
          </DetailHeader>
        </div>
        <div
          class="col-5"
          style={{
            "margin-top": "10px",
            "padding-left": "0",
            "padding-right": "0",
            width: "310px",
          }}
        >
          <div>
            <CandidateCard
              style={{
                "border-radius": "8px",
                background: "#F8F8F9",
              }}
            >
              <CandidateContent style={{ display: "grid", width: "100%" }}>
                <CandidateHeader>
                  <CandidateHeaderText>
                    Candidate Affiliations
                  </CandidateHeaderText>
                </CandidateHeader>
                {afilations.map((data) => {
                  return (
                    <CandidateInfoDiv
                      style={{ background: "white", "border-radius": "8px" }}
                    >
                      <CandidateInfoHeader>
                        <CandidateImage
                          src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmZBPPMKLdZG2zVpYaf9rcbtNfAp7c3BtsvzxzBb9pNihm?_gl=1*6avmrp*rs_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*rs_ga_5RMPXG14TE*MTY4NjkzMzM2NC4zLjEuMTY4NjkzMzM4Ni4zOC4wLjA."
                          alt="pic"
                        ></CandidateImage>
                        <CandidateInfoData>
                          <CandidateTagDiv>
                            <CandidateTagText>
                              {data.company_name}
                            </CandidateTagText>
                          </CandidateTagDiv>
                          <CandidateTime>
                            {data.start_date} - {data.end_date}
                          </CandidateTime>
                        </CandidateInfoData>
                      </CandidateInfoHeader>
                      <CandidateTextInfo>
                        <CandidateTitle>Role Description</CandidateTitle>
                        <CandidateDescription>{data.role}</CandidateDescription>
                      </CandidateTextInfo>
                    </CandidateInfoDiv>
                  );
                })}
              </CandidateContent>
            </CandidateCard>
          </div>
        </div>
        <div
          class="col-7"
          style={{
            "border-radius": "8px",
            "margin-top": "10px",
            width: "620px",
            background: "#F8F8F9",
            "margin-left": "10px",
          }}
        >
          <div>
            <PlatformCard
              style={{ background: "rgb(255 255 255 / 0%)", width: "100%" }}
            >
              <PlatformContent style={{ width: "100%" }}>
                <PlatformHeaderDiv>
                  <PlatformHeaderText>Platform</PlatformHeaderText>
                </PlatformHeaderDiv>

                <table
                  className="table table-sm"
                  style={{
                    background: "white",
                    "border-collapse": "collapse",
                    "border-radius": "8px",
                    "border-style": "hidden",
                    "box-shadow": "0 0 0 1px #dee2e6",
                    overflow: "hidden",
                  }}
                >
                  <thead>
                    <tr class="p-3 mb-2 rounded-5 text-center">
                      <th
                        style={{
                          border: "1px solid",
                          "border-color": "#dee2e6",
                          width: "30%",
                        }}
                      >
                        Key Issues
                      </th>
                      <th
                        style={{
                          width: "70%",
                        }}
                      >
                        Candidate's Positions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {issues.map((data, key) => {
                      return (
                        <>
                          <tr
                            class="text-center"
                            style={{
                              height: "80px",
                              "vertical-align": "middle",
                            }}
                          >
                            <td
                              style={{
                                border: "1px solid",
                                "border-color": "#dee2e6",
                              }}
                            >
                              {key < issues.length - 1 ? (
                                <KeyIssueTitle>
                                  {key == 0
                                    ? "Involvement in the NEAR ecosystem, qualifications to be a candidate and reasons for being voted"
                                    : key == 1
                                    ? "Strategy to develop the NEAR ecosystem"
                                    : "Key Issue " + (key - 1)}
                                </KeyIssueTitle>
                              ) : (
                                <KeyIssueTitle>Other Platform</KeyIssueTitle>
                              )}
                            </td>
                            <td style={{ background: "#F8F8F9" }}>
                              <KeyIssueDescription
                                style={{
                                  color: "black",
                                  "padding-inline": "20px",
                                  "padding-top": "15px",
                                  "padding-bottom": "15px",
                                  "line-height": "130%",
                                  "font-weight": "bold",
                                  "text-align": "justify",
                                }}
                              >
                                {data}
                              </KeyIssueDescription>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </PlatformContent>
            </PlatformCard>
          </div>
        </div>
      </div>
    </div>
    <div
      class="col-3"
      style={{
        width: "350px",
        background: "#F8F8F9",
        "border-radius": "8px",
      }}
    >
      <>
        <ul
          className="nav nav-pills nav-fill mb-4"
          id="pills-tab2"
          role="tablist2"
          style={{ "margin-top": "15px" }}
        >
          {pillsVesting.map(({ id, title }, i) => (
            <li className="nav-item" role="presentation" key={i}>
              {state.tabSelected == id ? (
                <PillButtonActive
                  onClick={() => {
                    State.update({ tabSelected: id });
                  }}
                >
                  {state.tabSelected == "declaration" ? (
                    <Icon src="https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmcFY8p1wkThK91xa3aZHjgaLHj48Cxcdgr2HzpeNEhNFS?_gl=1*2xnemk*_ga*Mzc5OTE2NDYyLjE2ODg1MTY4MTA.*_ga_5RMPXG14TE*MTY4ODY2OTUwNS4zLjEuMTY4ODY2OTU2NC4xLjAuMA.."></Icon>
                  ) : (
                    <Icon src="https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmRT9nmotDAEBcPC5bR3M57pnwNJi7bJxsussUNUvb4Ena?_gl=1*2xnemk*_ga*Mzc5OTE2NDYyLjE2ODg1MTY4MTA.*_ga_5RMPXG14TE*MTY4ODY2OTUwNS4zLjEuMTY4ODY2OTU2NC4xLjAuMA.."></Icon>
                  )}
                  {title}
                </PillButtonActive>
              ) : (
                <PillButton
                  onClick={() => {
                    State.update({ tabSelected: id });
                  }}
                >
                  {state.tabSelected == "comments" ? (
                    <Icon src="https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmSS4qbsAc9E5EgFKiJRSUjFAfCXXsCH4BQEmDT9s2dT9W?_gl=1*updvyu*_ga*Mzc5OTE2NDYyLjE2ODg1MTY4MTA.*_ga_5RMPXG14TE*MTY4ODY2OTUwNS4zLjEuMTY4ODY2OTU2NC4xLjAuMA.."></Icon>
                  ) : (
                    <Icon src="https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmYHQBAWPUFRYzjxCASciM93ezH73VFPhQkuAEoeKpZBEo?_gl=1*updvyu*_ga*Mzc5OTE2NDYyLjE2ODg1MTY4MTA.*_ga_5RMPXG14TE*MTY4ODY2OTUwNS4zLjEuMTY4ODY2OTU2NC4xLjAuMA.."></Icon>
                  )}
                  {title}
                </PillButton>
              )}
            </li>
          ))}
        </ul>
        <div
          className="tab-content"
          id="pills-tabContent"
          style={{ display: "flex", "justify-content": "center" }}
        >
          {state.tabSelected == "declaration" ? (
            <DeclarationCard
              style={{
                background: "rgb(255 255 255 / 0%)",
                "justify-content": "center",
              }}
            >
              <DeclarationInfo
                style={{
                  background: "rgb(255 255 255 / 0%)",
                  width: "auto",
                }}
              >
                <DeclarationDescription>
                  <label style={{ "font-weight": "700" }}>
                    Declaration of Transparency and Accountability
                  </label>
                  <br /> <br />
                  I hereby declare my unwavering commitment to transparency,
                  accountability, and the resolution of critical ecosystem
                  challenges as a candidate seeking election to the NEAR Digital
                  Collective. It is my utmost goal to instill faith and
                  prosperity in our ecosystem. In the event of my election, I
                  pledge to support and promote the operation and development of
                  the NEAR Digital Collective.
                  <br /> <br /> Transparency stands as the cornerstone of a
                  thriving governance framework and as a candidate, I strongly
                  believe in leading by example. I vow to disclose comprehensive
                  information about my previous affiliations, partnerships, and
                  associations that may influence my decision-making or impact
                  the public interest. This includes openly sharing any
                  conflicts of interest, financial relationships, or external
                  influences that could compromise my ability to serve with
                  impartiality and integrity.
                  <br /> <br />
                  Moreover, I fully recognize the numerous challenges that our
                  NEAR ecosystem currently faces, demanding immediate attention
                  and effective solutions. As a responsible candidate, I am
                  deeply committed to identifying, addressing, and resolving
                  these issues to the best of my abilities. I acknowledge the
                  gravity of these problems and understand that superficial
                  fixes and empty promises are insufficient. Therefore, I pledge
                  to conduct thorough research, seek input from experts, and
                  engage with stakeholders to devise sustainable, equitable
                  strategies. In the event of my election, my top priorities
                  will be focused on addressing critical ecosystem challenges.
                  <br /> <br />I recognize that this declaration is not merely a
                  symbolic gesture, but a solemn commitment to the NEAR
                  ecosystem. I understand the weight of the expectations. I
                  pledge to honor the trust placed in me with unwavering
                  dedication, determination, and integrity. Through this
                  declaration, I affirm my commitment to transparency,
                  accountability, and the resolve to actualize my pledges to the
                  best of my abilities if elected. Together, let us embark on a
                  journey towards a brighter future of the NEAR ecosystem.
                </DeclarationDescription>
              </DeclarationInfo>
            </DeclarationCard>
          ) : (
            <CommentSection style={{ padding: "0px" }}>
              {state.showModal && (
                <Widget
                  src={`dokxo.near/widget/CommentCard`}
                  props={{
                    candidateOrReplay: true,
                    username: props.candidate,
                    onClickConfirm: () => State.update({ showModal: false }),
                    onClickCancel: () => State.update({ showModal: false }),
                  }}
                />
              )}
              <CommentHeader
                style={{ width: "100%", "justify-content": "center" }}
              >
                {state.verified ? (
                  <CommentButton
                    style={{ width: "100%", "justify-content": "center" }}
                    onClick={async () => {
                      State.update({ showModal: true });
                    }}
                  >
                    <CommentText>Add a Comment +</CommentText>
                  </CommentButton>
                ) : (
                  <CommentButtonDisabled
                    style={{ width: "100%", "justify-content": "center" }}
                  >
                    <CommentText
                      style={{ color: "var(--primary-gray-dark, #828688)" }}
                    >
                      Add a Comment +
                    </CommentText>
                  </CommentButtonDisabled>
                )}
              </CommentHeader>

              {comments
                .map((data) => {
                  return (
                    <Widget
                      props={{ data }}
                      src={"syi216.near/widget/NDC.Nomination.CommentCard"}
                    />
                  );
                })
                .reverse()}
            </CommentSection>
          )}
        </div>
      </>
    </div>
  </Container>
);
