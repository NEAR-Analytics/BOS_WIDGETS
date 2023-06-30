State.init({
  tabSelected: "declaration",
});

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
font-family: Avenir;
font-weight: 500;
line-height: 120%;
margin: 0px;
`;

const TagDiv = styled.div`
display: flex;
padding: 4px 8px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 100px;
border: solid 1px transparent;
border-radius: 80px;
background-image: linear-gradient(white, white), radial-gradient(circle at top left, #9333EA 0%,#4F46E5 100%);
background-origin: border-box;
background-clip: padding-box, border-box;
`;

const TagDivText = styled.p`
font-size: 8px;
font-family: Avenir;
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
font-family: Avenir;
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
font-family: Avenir;
line-height: 120%;
`;

const UpvoteButton = styled.button`
display: flex;
padding: 2px 12px;
align-items: center;
gap: 6px;
border-radius: 4px;
border: solid 1px transparent;
background-image: linear-gradient(white, white), radial-gradient(circle at top left, #9333EA 0%,#4F46E5 100%);
background-origin: border-box;
background-clip: padding-box, border-box;
`;

const UpvoteCount = styled.p`
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

const UpvoteIcon = styled.img`
width: 14px;
height: 14px;
`;

const PlatformCard = styled.div`
display: flex;
width: 326px;
padding: 8px 12px;
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
font-family: Avenir;
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
font-family: Avenir;
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
font-family: Avenir;
line-height: 120%;
margin: 0px;
`;

const KeyIssueDescription = styled.p`
color: #828688;
font-size: 12px;
font-family: Avenir;
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
gap: 4px;
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
font-family: Avenir;
font-weight: 800;
line-height: 120%;
margin: 0px;
`;

const CandidateInfoDiv = styled.div`
display: flex;
width: 290px;
padding: 8px;
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
font-family: Avenir;
font-weight: 500;
line-height: 120%;
margin: 0px;
`;

const CandidateTime = styled.p`
margin: 0px;
color: var(--primary-828688, #828688);
font-size: 10px;
font-family: Avenir;
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
font-family: Avenir;
font-weight: 500;
line-height: 120%;
margin:0px;
`;

const CandidateDescription = styled.p`
color: var(--primary-828688, #828688);
font-size: 12px;
font-family: Avenir;
line-height: 130%;
margin: 0px;
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
font-family: Avenir;
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
color: var(--primary-828688, #828688);
font-size: 12px;
font-family: Avenir;
line-height: 130%;
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
font-family: Avenir;
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
  }
`;

const PillButton = styled.div`
font-weight: 700;
border-bottom: 4px solid;
border-color: #dee2e6;
border-image-slice: 1;
cursor: pointer;
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

const CommentText = styled.p`
color: var(--primary-black, #000);
font-size: 12px;
font-family: Avenir;
font-weight: 500;
line-height: 24px;
margin: 0px;
`;

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
              style={{ width: "100px", height: "100px" }}
              src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmZBPPMKLdZG2zVpYaf9rcbtNfAp7c3BtsvzxzBb9pNihm?_gl=1*6avmrp*rs_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*rs_ga_5RMPXG14TE*MTY4NjkzMzM2NC4zLjEuMTY4NjkzMzM4Ni4zOC4wLjA."
              alt="pic"
            ></ProfilePicture>
            <HeaderDetailContent>
              <TagContainer style={{ "margin-bottom": "5px" }}>
                <HouseTagDiv>
                  <HouseTagText style={{ "font-size": "12px" }}>
                    House intended
                  </HouseTagText>
                </HouseTagDiv>
              </TagContainer>
              <NominationTitleContainer>
                <NominationTitle
                  style={{ "margin-bottom": "5px", "font-size": "18px" }}
                >
                  Candidate Name
                </NominationTitle>
                <NominationUser
                  style={{ "margin-bottom": "5px", "font-size": "14px" }}
                >
                  candidate.near
                </NominationUser>
                <TagContainer>
                  <TagDiv>
                    <TagDivText style={{ "font-size": "10px" }}>
                      #amazing
                    </TagDivText>
                  </TagDiv>
                  <TagDiv>
                    <TagDivText style={{ "font-size": "10px" }}>
                      #thank you
                    </TagDivText>
                  </TagDiv>
                </TagContainer>
              </NominationTitleContainer>
            </HeaderDetailContent>
            <HeaderDetailContent
              style={{ "align-items": "end", height: "71.17px" }}
            >
              <UpvoteButton>
                <UpvoteCount>+354</UpvoteCount>
                <UpvoteIcon
                  src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmXqGSZvrgGkVviBJirnBtT9krTHHsjPYX1UM8EWExFxCM?_gl=1*1hd2izc*rs_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*rs_ga_5RMPXG14TE*MTY4NjkzOTYyNC40LjAuMTY4NjkzOTYyNC42MC4wLjA."
                  alt="pic"
                ></UpvoteIcon>
              </UpvoteButton>
            </HeaderDetailContent>
          </DetailHeader>
        </div>
        <div
          class="col-5"
          style={{
            "margin-top": "10px",
            "padding-left": "0",
            "padding-right": "0",
            width: "330px",
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
                        <CandidateTagText>Near Foundation</CandidateTagText>
                      </CandidateTagDiv>
                      <CandidateTime>Oct 2018 - Present</CandidateTime>
                    </CandidateInfoData>
                  </CandidateInfoHeader>
                  <CandidateTextInfo>
                    <CandidateTitle>Lorem Ipsum Dolor Sit</CandidateTitle>
                    <CandidateDescription>
                      Lorem ipsum dolor sit amet consectetur. Turpis maecenas
                      pulvinar quis massa tristique velit.
                    </CandidateDescription>
                  </CandidateTextInfo>
                </CandidateInfoDiv>
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
                        <CandidateTagText>Near Foundation</CandidateTagText>
                      </CandidateTagDiv>
                      <CandidateTime>Oct 2018 - Present</CandidateTime>
                    </CandidateInfoData>
                  </CandidateInfoHeader>
                  <CandidateTextInfo>
                    <CandidateTitle>Lorem Ipsum Dolor Sit</CandidateTitle>
                    <CandidateDescription>
                      Lorem ipsum dolor sit amet consectetur. Turpis maecenas
                      pulvinar quis massa tristique velit.
                    </CandidateDescription>
                  </CandidateTextInfo>
                </CandidateInfoDiv>
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
                        <CandidateTagText>Near Foundation</CandidateTagText>
                      </CandidateTagDiv>
                      <CandidateTime>Oct 2018 - Present</CandidateTime>
                    </CandidateInfoData>
                  </CandidateInfoHeader>
                  <CandidateTextInfo>
                    <CandidateTitle>Lorem Ipsum Dolor Sit</CandidateTitle>
                    <CandidateDescription>
                      Lorem ipsum dolor sit amet consectetur. Turpis maecenas
                      pulvinar quis massa tristique velit.
                    </CandidateDescription>
                  </CandidateTextInfo>
                </CandidateInfoDiv>
              </CandidateContent>
            </CandidateCard>
          </div>
        </div>
        <div
          class="col-7"
          style={{
            "border-radius": "8px",
            "margin-top": "10px",
            width: "600px",
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
                    "border-radius": "30px",
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
                        }}
                      >
                        Key Issues
                      </th>
                      <th>Candidate's Positions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4].map((data, key) => {
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
                              <KeyIssueTitle>Key Issue {data}</KeyIssueTitle>
                            </td>
                            <td style={{ background: "#F8F8F9" }}>
                              <KeyIssueDescription style={{ color: "black" }}>
                                Candidate's Position Description {data}
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
        "min-width": "350px",
        "max-width": "350px",
        background: "#F8F8F9",
      }}
    >
      <>
        <ul
          className="nav nav-pills nav-fill mb-4"
          id="pills-tab2"
          role="tablist2"
          style={{ "margin-top": "5px" }}
        >
          {pillsVesting.map(({ id, title }, i) => (
            <li className="nav-item" role="presentation" key={i}>
              {state.tabSelected == id ? (
                <PillButtonActive
                  onClick={() => {
                    State.update({ tabSelected: id });
                  }}
                >
                  {title}
                </PillButtonActive>
              ) : (
                <PillButton
                  onClick={() => {
                    State.update({ tabSelected: id });
                  }}
                >
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
                  Lorem ipsum dolor sit amet consectetur. Turpis maecenas
                  pulvinar quis massanibh porttitor non lacus venenatis. Mi in
                  iaculis viverra ac sapien augue nisl odio. Neque eget magna
                  nibh sed neque ipsum enim sed. Consectetur dictum quisque
                  faucibus nunc. Suspendisse lacus tempus tempor nisl .
                </DeclarationDescription>
                <div style={{ "text-align": "center", width: "100%" }}>
                  <DeclarationImage
                    src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmRXqPtacR16tfe7EoA55u97FkXa1EoHvrPZrLfMk8wZs1?_gl=1*1dx7soz*rs_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*rs_ga_5RMPXG14TE*MTY4NzQ4MTc4Ni42LjEuMTY4NzQ4MTgxOC4yOC4wLjA."
                    alt="pic"
                  ></DeclarationImage>
                </div>
              </DeclarationInfo>
            </DeclarationCard>
          ) : (
            <CommentSection style={{ padding: "0px" }}>
              <CommentHeader
                style={{ width: "100%", "justify-content": "center" }}
              >
                <CommentButton
                  style={{ width: "100%", "justify-content": "center" }}
                >
                  <CommentText>Add a Comment +</CommentText>
                </CommentButton>
              </CommentHeader>
              <Widget
                src={"syi216.near/widget/NDC.Nomination.CommentCard"}
                style={{ padding: "0px" }}
              />
              <Widget src={"syi216.near/widget/NDC.Nomination.CommentCard"} />
              <Widget src={"syi216.near/widget/NDC.Nomination.CommentCard"} />
              <Widget src={"syi216.near/widget/NDC.Nomination.CommentCard"} />
              <Widget src={"syi216.near/widget/NDC.Nomination.CommentCard"} />
              <Widget src={"syi216.near/widget/NDC.Nomination.CommentCard"} />
            </CommentSection>
          )}
        </div>
      </>
    </div>
  </Container>
);
