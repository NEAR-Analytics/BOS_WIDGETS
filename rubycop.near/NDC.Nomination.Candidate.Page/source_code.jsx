let { ids, org } = props;
ids = props.ids ? ids : [1, 2, 3]; // for testing purposes
org = props.org ? org : "test"; // for testing purposes

const widgets = {
  header: "rubycop.near/widget/NDC.Elections.Header",
};

const electionContract = "elections-v1.gwg-testing.near";

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

const Movile = styled.div`
  display: flex;
  justify-content: center;
  @media only screen and (min-width: 601px) {
    display: none !important;
  }
`;

const Desktop = styled.div`
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 600px) {
    display: none !important;
  }
`;

return (
  <div>
    <Movile style={{ display: "flex", "justify-content": "center" }}>
      <Movile style={{ width: "359px" }}>
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
      </Movile>
    </Movile>
    <Movile class="row">
      <div className="my-3">
        <BackLink href="#/rubycop.near/widget/NDC.Nomination.Page">
          <i className="bi bi-chevron-left mr-2"></i>
          Back
        </BackLink>
      </div>
    </Movile>
    <Movile>
      <Widget
        props={{ data: state, house: props.house, candidate: props.candidate }}
        src={"yairnava.near/widget/NDC.Nomination.Candidate.Mobil"}
      />
    </Movile>
    <Desktop style={{ display: "flex", "justify-content": "center" }}>
      <div
        style={{
          width: "1305px",
          "margin-bottom": "10px",
          "padding-left": "5px",
        }}
      >
        {houses.map((group) => (
          <>
            {group.id === state.selectedHouse && (
              <Widget
                key={i}
                src={widgets.header}
                props={{
                  house: props.house,
                  candidate: props.candidate,
                  startTime: group.start,
                  endTime: group.end,
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
        <BackLink href="#/rubycop.near/widget/NDC.Nomination.Page">
          <i className="bi bi-chevron-left mr-2"></i>
          Back
        </BackLink>
      </div>
    </Desktop>
    <Desktop class="row">
      <Widget
        props={{ data: state, house: props.house, candidate: props.candidate }}
        src={"yairnava.near/widget/NDC.Nomination.Candidate.Desktop"}
      />
    </Desktop>
  </div>
);
