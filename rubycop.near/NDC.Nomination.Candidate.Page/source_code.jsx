let { ids, org, election_contract, nomination_contract } = props;
ids = ids ? ids : [1, 2, 3]; // for testing purposes

const electionContract = election_contract ?? "elections-v1.gwg-testing.near";
const nominationContract = nomination_contract ?? "nominations.ndc-gwg.near";
const apiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const widgets = {
  header: "rubycop.near/widget/NDC.Elections.Header",
  mobile: "rubycop.near/widget/NDC.Nomination.Candidate.MobileView",
  desktop: "rubycop.near/widget/NDC.Nomination.Candidate.DesktopView",
  back: "#/rubycop.near/widget/NDC.Nomination.Page",
};

const houses = [
  Near.view(electionContract, "proposal", { prop_id: ids[0] }),
  Near.view(electionContract, "proposal", { prop_id: ids[1] }),
  Near.view(electionContract, "proposal", { prop_id: ids[2] }),
];

State.init({
  selectedHouse: ids[0],
  comments: [],
  profile: {},
  nominations: {},
});

const BackLink = styled.a`
  color: black;

  &:hover {
    text-decoration: none;
    color: black;
  }
`;

asyncFetch(
  `https://api.pikespeak.ai/nominations/candidates-comments-and-upvotes?candidate=${props.candidate}`,
  { headers: { "x-api-key": "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5" } }
).then((res) => {
  State.update({ comments: res.body });
});

let profile = Social.getr(`${props.candidate}/profile`);
let nominations = Social.getr(`${props.candidate}/nominations`);
State.update({ profile: profile });
State.update({ nominations: nominations });

const Mobile = styled.div`
  display: flex;
  @media only screen and (min-width: 601px) {
    display: none !important;
  }
`;

const Desktop = styled.div`
  display: flex;
  @media only screen and (max-width: 600px) {
    display: none !important;
  }
`;

return (
  <div>
    <Mobile style={{ display: "flex", "justify-content": "center" }}>
      <Mobile style={{ width: "359px" }}>
        {houses.map((house) => (
          <>
            {house.typ === props.house && (
              <Widget
                key={i}
                src={widgets.header}
                props={{
                  startTime: house.start,
                  endTime: house.end,
                  type: "Nomination",
                }}
              />
            )}
          </>
        ))}
      </Mobile>
    </Mobile>
    <Mobile class="row">
      <div className="my-3">
        <BackLink href={widgets.back}>
          <i className="bi bi-chevron-left mr-2"></i>
          Back
        </BackLink>
      </div>
    </Mobile>
    <Mobile>
      <Widget
        props={{
          data: state,
          house: props.house,
          candidate: props.candidate,
          nomination_contract: nominationContract,
          api_key: apiKey,
        }}
        src={widgets.mobile}
      />
    </Mobile>
    <Desktop style={{ display: "flex", "justify-content": "center" }}>
      <div
        style={{
          width: "1305px",
          "margin-bottom": "10px",
          "padding-left": "5px",
        }}
      >
        {houses.map((house) => (
          <>
            {house.typ === props.house && (
              <Widget
                key={i}
                src={widgets.header}
                props={{
                  house: props.house,
                  candidate: props.candidate,
                  startTime: house.start,
                  endTime: house.end,
                  type: "Nomination",
                }}
              />
            )}
          </>
        ))}
      </div>
    </Desktop>
    <Desktop class="row">
      <div className="my-3">
        <BackLink href={widgets.back}>
          <i className="bi bi-chevron-left mr-2"></i>
          Back
        </BackLink>
      </div>
    </Desktop>
    <Desktop class="row">
      <Widget
        props={{
          data: state,
          house: props.house,
          candidate: props.candidate,
          nomination_contract: nominationContract,
          api_key: apiKey,
        }}
        src={widgets.desktop}
      />
    </Desktop>
  </div>
);
