let { ids, candidate, house } = props;
ids = props.ids ? ids : [1, 2, 3]; // for testing purposes

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

asyncFetch(
  `https://api.pikespeak.ai/nominations/candidates-comments-and-upvotes?candidate=${candidate}`,
  { headers: { "x-api-key": "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5" } }
).then((res) => {
  State.update({ comments: res.body });
});

let profile = Social.getr(`${candidate}/profile`);
let nominations = Social.getr(`${candidate}/nominations`);
State.update({ profile: profile });
State.update({ nominations: nominations });

const BackLink = styled.a`
  color: black;

  &:hover {
    text-decoration: none;
    color: black;
  }
`;

return (
  <div>
    {houses.map((house) => (
      <>
        {house.id === state.selectedHouse && (
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

    <div className="my-3">
      <BackLink href="#/rubycop.near/widget/NDC.Nomination.Page">
        <i className="bi bi-chevron-left mr-2"></i>
        Back
      </BackLink>
    </div>

    <Widget
      props={{
        data: state,
        house: props.house,
        candidate: candidate,
      }}
      src={"yairnava.near/widget/NDC.Nomination.Candidate.Mobil"}
    />
  </div>
);
