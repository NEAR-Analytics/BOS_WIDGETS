const MainStyledComponent = styled.div`
  width: 50vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #efefef;
`;

const PageTitleComponent = styled.p`
  font-size: 30px;
  font-weight: bold;
  text-transform: uppercase;
  margin: 0px;
  padding: 0px;
  color: black;
  text-align: center;
  margin-top: 30px;
`;

const pTagStyled = {
  margin: "0px",
  padding: "0px",
  fontWeight: "500",
  fontSize: "20px",
  textAlign: "center",
  marginTop: "30px",
};

const buttonStyled = {
  marginTop: "30px",
  padding: "10px",
  background: "blue",
  border: "none",
  outline: "none",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "10px",
  color: "white",
  width: "20%",
  textDecoration: "none",
};

return (
  <MainStyledComponent>
    <PageTitleComponent>METAVERSE MEETING SYSTEM</PageTitleComponent>
    <p style={pTagStyled}>Click the button to experience the play</p>
    <a
      href="https://near.org/sandbox#/signax.near/widget/HubSpot"
      style={buttonStyled}
    >
      Experience
    </a>
  </MainStyledComponent>
);
