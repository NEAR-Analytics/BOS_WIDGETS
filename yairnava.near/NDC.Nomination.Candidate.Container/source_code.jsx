const Movile = styled.div`
display: flex;
justify-content: center;
@media only screen and (min-width: 601px) {
  display: none;
}
`;

const Desktop = styled.div`
display: flex;
justify-content: center;
@media only screen and (max-width: 600px) {
  display: none;
}
`;

return (
  <div style={{ width: "1440px", margin: "20px" }}>
    <Movile>
      <Widget src={"yairnava.near/widget/NDC.Nomination.Candidate.Mobil"} />
    </Movile>
    <Desktop class="row">
      <Widget src={"yairnava.near/widget/NDC.Nomination.Candidate.Desktop"} />
    </Desktop>
  </div>
);
