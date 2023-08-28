const GradientBackground = styled.div`
background: rgb(182,232,247);
padding:1px;
    border-radius: 10px;
    width:33%;
background: linear-gradient(180deg, rgba(182,232,247,1) 41%, rgba(255,207,234,1) 96%);
`;

const ContainerDiv = styled.div`
    padding:14px;
    background-color:white;
    border-radius: 10px;
`;

const RedButton = styled.div`
    color: #F87171;
    background-color:white;
    padding:10px;
    padding-left:20px;
    padding-right:20px;
    font-weight: 500;
    border: 1px solid #E2E8F0;
    border-radius:10px;
`;

const Container = styled.div`
  padding:10px;
background: linear-gradient(180deg, rgba(242,252,255,1) 18%, rgba(203,239,255,1) 100%);

`;

const DataToShow = [
  {
    label: "Sold",
    value: "500",
  },
  {
    label: "Earned",
    value: "$500",
  },
  {
    label: "Scanned",
    value: "200/500",
  },
];

return (
  <Container>
    <p style={{ fontSize: 12, letterSpacing: 0.5, marginBottom: 0 }}>
      <span style={{ color: "gray" }}>All Drops</span> {">"} Star Invader 3
    </p>
    <p style={{ fontSize: "30px", marginTop: 10 }}>[Event Name]</p>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "20px",
      }}
    >
      {DataToShow.map((item) => (
        <GradientBackground key={item.label}>
          <ContainerDiv>
            <p style={{ fontSize: 16, letterSpacing: 0.5, marginBottom: 0 }}>
              {item.label}
            </p>
            <p
              style={{
                fontSize: "30px",
                marginTop: 0,
                marginBottom: 0,
                fontWeight: "500",
              }}
            >
              {item.value}
            </p>
          </ContainerDiv>
        </GradientBackground>
      ))}
    </div>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        marginTop: 10,
        justifyContent: "space-between",
      }}
    >
      <p style={{ fontSize: "30px", marginBottom: 0 }}>All Tickets</p>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <RedButton>Delete all</RedButton>
        <RedButton style={{ color: "#000" }}>Export .CSV</RedButton>
      </div>
    </div>
    <Widget src="harrydhillon.near/widget/Keypom.Landing.DropDetails.Table" />
  </Container>
);
