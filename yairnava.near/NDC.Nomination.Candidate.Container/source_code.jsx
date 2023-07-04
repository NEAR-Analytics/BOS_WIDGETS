let { ids, org } = props;
ids = props.ids ? ids : [1, 2, 3]; // for testing purposes
org = props.org ? org : "test"; // for testing purposes

console.log(props);

const widgets = {
  header: "syi216.near/widget/NDC.Nomination.Header",
  houses: "rubycop.near/widget/NDC.Elections.Houses",
  card: "syi216.near/widget/NDC.nomination.card",
};

const electionContract = "elections-v1.gwg-testing.near";

const houses = [
  Near.view(electionContract, "proposal", { prop_id: ids[0] }),
  Near.view(electionContract, "proposal", { prop_id: ids[1] }),
  Near.view(electionContract, "proposal", { prop_id: ids[2] }),
];

State.init({
  selectedHouse: ids[0],
});

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
      <div
        style={{
          width: "358px",
          "margin-bottom": "15px",
          "margin-top": "10px",
        }}
      >
        <a
          href="#/syi216.near/widget/NDC.Nomination.Page"
          style={{ "font-weight": "500", color: "black" }}
        >
          <label style={{ cursor: "pointer" }}>{"< Back"}</label>
        </a>
      </div>
    </Movile>
    <Movile>
      <Widget src={"yairnava.near/widget/NDC.Nomination.Candidate.Mobil"} />
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
      <div
        style={{
          width: "1305px",
          "margin-bottom": "15px",
          "margin-top": "10px",
        }}
      >
        <a
          href="#/syi216.near/widget/NDC.Nomination.Page"
          style={{ "font-weight": "500", color: "black" }}
        >
          <label style={{ cursor: "pointer" }}>{"< Back"}</label>
        </a>
      </div>
    </Desktop>
    <Desktop class="row">
      <Widget src={"yairnava.near/widget/NDC.Nomination.Candidate.Desktop"} />
    </Desktop>
  </div>
);
