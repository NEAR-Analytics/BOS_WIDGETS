// TODO: Should be grabbed from contract side
let { ids, org } = props;
ids = props.ids ? ids : [1, 2, 3]; // for testing purposes
org = props.org ? org : "test"; // for testing purposes

const electionContract = "elections-v1.gwg-testing.near";
const registryContract = "registry-v1.gwg-testing.near";
let nominationContract = "nominations-v1.gwg-testing.near";
const apiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

function handleSelfRevoke() {
  Near.call(nominationContract, "self_revoke");
}

const houses = [
  Near.view(electionContract, "proposal", { prop_id: ids[0] }),
  Near.view(electionContract, "proposal", { prop_id: ids[1] }),
  Near.view(electionContract, "proposal", { prop_id: ids[2] }),
];

const widgets = {
  header: "syi216.near/widget/NDC.Nomination.Header",
  houses: "syi216.near/widget/NDC.Nomination.Houses",
  card: "syi216.near/widget/NDC.nomination.card",
};

State.init({
  selectedHouse: ids[0],
  house: "HouseOfMerit",
  start: true,
  nominations: [],
  sbt: false,
  og: false,
  selfNomination: false,
});
//

function handleNominations(data) {
  State.update({ nominations: data });
}

function getVerifiedHuman() {
  asyncFetch(
    `https://api.pikespeak.ai/sbt/sbt-by-owner?holder=${context.accountId}&class_id=1&issuer=fractal.i-am-human.near&with_expired=false`,
    {
      headers: {
        "x-api-key": "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5",
      },
    }
  ).then((res) => {
    if (res.body.length > 0) {
      State.update({ sbt: true });
    }
  });
  asyncFetch(
    `https://api.pikespeak.ai/sbt/sbt-by-owner?holder=${context.accountId}&class_id=2&issuer=fractal.i-am-human.near&with_expired=false`,
    {
      headers: {
        "x-api-key": "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5",
      },
    }
  ).then((res) => {
    if (res.body.length > 0) {
      State.update({ og: true });
    }
  });
  asyncFetch(
    `https://api.pikespeak.ai/nominations/candidates-comments-and-upvotes?candidate=${context.accountId}`,
    { headers: { "x-api-key": "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5" } }
  ).then((res) => {
    if (res.body.length > 0) {
      State.update({ selfNomination: true });
    }
  });
}

function getNominationInfo() {
  let nominationsArr = [];
  asyncFetch(
    `https://api.pikespeak.ai/nominations/house-nominations?house=${state.house}`,
    {
      headers: {
        "x-api-key": "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5",
      },
    }
  ).then((res) => {
    if (res.body.length <= 0) {
      State.update({ nominations: [] });
    }
    for (const [i, data] of res.body.entries()) {
      asyncFetch(
        `https://api.pikespeak.ai/nominations/candidates-comments-and-upvotes?candidate=${data.nominee}`,
        { headers: { "x-api-key": "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5" } }
      ).then((res) => {
        let upVoteInfo = res.body[0];
        let profileData;
        let nominationData;
        Social.getr(`${data.nominee}/profile`);
        Social.getr(`${data.nominee}/nominations`);
        setTimeout(() => {
          profileData = Social.getr(`${data.nominee}/profile`);
          nominationData = Social.getr(`${data.nominee}/nominations`);
        }, 1000);

        setTimeout(() => {
          let objCard = {
            indexerData: data,
            profileData: profileData,
            nominationData: nominationData,
            upVoteData: upVoteInfo,
          };
          if (!data.is_revoked) {
            if (profileData && nominationData) {
              nominationsArr.push(objCard);
            }
          }
          if (i == res.body.length - 1) {
            State.update({ nominations: nominationsArr });
          }
        }, 1000);
      });
    }
  });
}
//

if (state.start) {
  getNominationInfo();
  getVerifiedHuman();
  State.update({
    start: false,
  });
}

const handleSelect = (item) => {
  switch (item.id) {
    case 2:
      State.update({ house: "CouncilOfAdvisors" });
      getNominationInfo();
      break;
    case 1:
      State.update({ house: "HouseOfMerit" });
      getNominationInfo();
      break;
    case 3:
      State.update({ house: "TransparencyCommission" });
      getNominationInfo();
      break;
  }
  State.update({ selectedHouse: item.id });
};

const Container = styled.div`
  padding: 30px 0;
`;

const ActivityContainer = styled.div`
  overflow-y: scroll;
`;

const Left = styled.div`
  padding: 20px;
  background: #F8F8F9;
  border-radius: 8px;
`;

const Center = styled.div`
`;

const Right = styled.div`
  padding: 20px;
  margin-bottom: 20px;
  background: #F8F8F9;
  border-radius: 8px;
`;

const H5 = styled.h5`
  margin-bottom: 20px;
`;

const Toolbar = styled.div`
margin: 16px 0 0 0;
display: flex;
width: 100%;
flex-direction: row;
align-items: flex-start;
gap: 20px;
@media only screen and (max-width: 480px){
  flex-direction:column;
}
`;

const FilterBar = styled.div`
display: flex;
padding: 12px 16px;
width: 66%;
@media only screen and (max-width: 480px) {
 width: 100%;  
}
align-items: center;
gap: 8px;
flex: 1 0 0;
border-radius: 8px;
background: #F8F8F9;
`;

const SearchIcon = styled.img`
width: 14px;
height: 14px;
`;

const LabelFile = styled.div`
display: flex;
padding: 12px;
align-items: flex-start;
gap: 12px;
flex: 1 0 0;
border-radius: 8px;
border: 1px solid #D0D6D9;
background: #FFF;
`;

const InputSearch = styled.input`
color: #828688;
font-size: 12px;
width: 100%;
font-family: Avenir;
font-weight: 500;
line-height: 120%;
border: 0px;
`;

const VerifiedDiv = styled.div`
display: flex;
width: 100%;
padding: 16px;
flex-direction: column;
align-items: flex-start;
gap: 20px;
border-radius: 8px;
background: var(--ffffff, #FFF);
box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.10);
`;

const VerifiedHeader = styled.div`
display: flex;
align-items: flex-start;
gap: 16px;
align-self: stretch;
`;

const VerifiedHeaderContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 4px;
flex: 1 0 0;
`;

const VerfiedTitle = styled.p`
display: flex;
width: 176px;
flex-direction: column;
justify-content: center;
color: var(--000000, #000);
font-size: 14px;
font-family: Avenir;
font-style: normal;
font-weight: 500;
line-height: 120%;
margin: 0px;
`;

const VerifedDesc = styled.p`
display: flex;
flex-direction: column;
justify-content: center;
align-self: stretch;
color: var(--primary-gray-dark, #828688);
font-size: 12px;
font-family: Avenir;
font-style: normal;
font-weight: 500;
line-height: 120%;
margin: 0px;
`;

const VerifyButton = styled.a`
display: flex;
padding: 8px 20px;
justify-content: center;
width: 100%;
align-items: center;
gap: 10px;
align-self: stretch;
border-radius: 10px;
background: var(--ffd-50-d, #FFD50D);
border:0px;
`;

const VerifyButtonText = styled.p`
color: var(--primary-black, #000);
font-size: 14px;
font-family: Avenir;
font-style: normal;
font-weight: 500;
line-height: 24px;
margin: 0px;
`;

const SortButton = styled.button`
display: flex;
width: 38px;
height: 38px;
padding: 8px 12px;
justify-content: center;
align-items: center;
gap: 6px;
border-radius: 6px;
background: var(--buttons-gradient-default, linear-gradient(90deg, #9333EA 0%, #4F46E5 100%));
border: 0px;
`;

const SortIcon = styled.img`
width: 18px;
height: 18px;
flex-shrink: 0;
`;

const ButtonNominateContainer = styled.div`
display: flex;
flex-direction:row;
padding: 12px 16px;
align-items: center;
gap: 8px;
border-radius: 8px;
background: #F8F8F9;
@media only screen and (max-width: 480px){
  width: 100%;
  flex-direction: column;
}
`;

const ButtonDeleteDiv = styled.button`
display: flex;
height: 40px;
padding: 8px 12px;
align-items: center;
gap: 6px;
border-radius: 10px;
border: 1px solid #C23F38;
background: #F1D6D5;
@media only screen and (max-width: 480px){
  width: 100%;
  justify-content: center;
}
`;

const ButtonDeleteText = styled.p`
color: #C23F38;
font-size: 14px;
font-family: Avenir;
font-style: normal;
font-weight: 500;
line-height: 24px;
margin: 0px;
`;

const ButtonDeleteIcon = styled.img`
width: 18px;
height: 18px;
`;

const ButtonNominateDiv = styled.button`
display: flex;
height: 40px;
padding: 8px 12px;
align-items: center;
gap: 6px;
border: 1px solid #FFD50D;
border-radius: 10px;
background: var(--buttons-yellow-default, #FFD50D);
@media only screen and (max-width: 480px){
  width: 100%;
  justify-content: center;
}
`;

const ButtonNominateText = styled.p`
margin: 0px;
color: var(--primary-black, #000);
font-size: 14px;
font-family: Avenir;
font-style: normal;
font-weight: 500;
line-height: 24px;
`;

const ButtonNominateIcon = styled.img`
width: 18px;
height: 18px;
`;

return (
  <div>
    {houses.map((group) => (
      <>
        {group.id === state.selectedHouse && (
          <Widget
            key={i}
            src={widgets.header}
            props={{
              startTime: group.start,
              endTime: group.end,
              type: "Nomination",
            }}
          />
        )}
      </>
    ))}
    <Toolbar>
      <FilterBar>
        <LabelFile>
          <SearchIcon
            src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmUgE9Cgge5VRgQB1VYxMaAjJWgzmXUzMcPSTwQ8ZfLJqz?_gl=1*xfjfsk*_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*_ga_5RMPXG14TE*MTY4NzkxMTcwOS41LjAuMTY4NzkxMTcxNi41My4wLjA."
            alt="pic"
          ></SearchIcon>
          <InputSearch
            placeholder="Search by candidate name and affiliation"
            disabled
          ></InputSearch>
        </LabelFile>
        <SortButton disabled>
          <SortIcon
            src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmNivRaFySDTXDK3rsNXNZn7ySyhCR82rVwqA15Nn2hofK?_gl=1*jc7vlr*_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*_ga_5RMPXG14TE*MTY4ODQxMzUxMS43LjEuMTY4ODQxMzUzMi4zOS4wLjA."
            alt="pic"
          ></SortIcon>
        </SortButton>
      </FilterBar>
      {state.showModal && (
        <Widget
          src={`dokxo.near/widget/NDC.Nomination.Compose`}
          props={{
            candidateOrReplay: true,
            onClickConfirm: () => State.update({ showModal: false }),
            onClickCancel: () => State.update({ showModal: false }),
          }}
        />
      )}
      {state.og ? (
        <ButtonNominateContainer>
          {state.selfNomination ? (
            <ButtonDeleteDiv onClick={handleSelfRevoke}>
              <ButtonDeleteText>Delete Self Nomination</ButtonDeleteText>
              <ButtonDeleteIcon
                src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/Qma7DF8kyoGN4Mf3Yty5uoP64RpZewCsZFawae4Ux4wBBF?_gl=1*6fastp*_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*_ga_5RMPXG14TE*MTY4ODQxMzUxMS43LjEuMTY4ODQxMzUzMi4zOS4wLjA."
                alt="pic"
              ></ButtonDeleteIcon>
            </ButtonDeleteDiv>
          ) : (
            <ButtonNominateDiv
              onClick={async () => {
                !status.sbt ? State.update({ showModal: true }) : "";
              }}
            >
              <ButtonNominateText>Self Nominate</ButtonNominateText>
              <ButtonNominateIcon
                src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmPRtMgbzoPxsuLLYdntJzEUDLZdndSiWWvMw4VZYozd29?_gl=1*1loq8cw*_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*_ga_5RMPXG14TE*MTY4ODQxMzUxMS43LjEuMTY4ODQxNTA1MC42MC4wLjA."
                alt="pic"
              ></ButtonNominateIcon>
            </ButtonNominateDiv>
          )}
        </ButtonNominateContainer>
      ) : (
        <></>
      )}
    </Toolbar>
    <Container className="d-flex row">
      <Left className="col-lg">
        <H5>Houses</H5>
        <Widget
          src={widgets.houses}
          props={{
            selectedHouse: state.selectedHouse,
            houses: houses,
            handleSelect: (item) => handleSelect(item),
          }}
        />
        <div>
          {state.sbt ? (
            ""
          ) : (
            <VerifiedDiv>
              <VerifiedHeader>
                <VerifiedHeaderContainer>
                  <VerfiedTitle>To Comment or to Upvote</VerfiedTitle>
                  <VerifedDesc>
                    Verify as a Human to comment or to upvote
                  </VerifedDesc>
                </VerifiedHeaderContainer>
              </VerifiedHeader>
              <VerifyButton
                href="https://i-am-human.app/"
                target="_blank"
                rel="noopener"
              >
                <VerifyButtonText>Verify as a Human</VerifyButtonText>
              </VerifyButton>
            </VerifiedDiv>
          )}
        </div>
      </Left>
      <Center className="col-lg-9 px-2 px-md-3 d-flex flex-row flex-wrap justify-content-start gap-4">
        {state.nominations.length > 0 ? (
          state.nominations.map((data) => {
            return (
              <>
                <Widget src={widgets.card} props={data} />
              </>
            );
          })
        ) : (
          <H5 className="mt-10">
            There are no active nominations at the moment
          </H5>
        )}
      </Center>
    </Container>
  </div>
);
