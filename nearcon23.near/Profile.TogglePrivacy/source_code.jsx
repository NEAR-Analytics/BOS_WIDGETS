const ownerId = "nearpad.testnet";

const FirstBorderBox = styled.div`
    border:1px solid #F2F1EA;
    padding:15px;
    display:flex;
    align-items:center;
    justify-content:center;
    width: 100% !important;
    width:100%;
`;

const GridToggle = styled.div`
    width:100%;
    display: grid;
    grid-template-columns: 1fr 60px 1fr;

    align-items: center;
    justify-content: center !important;
    gap: 16px;

    p {
      transform: translateY(9px);
    }

    @media only screen and (max-width: 600px) {
      font-size:12px;
      justify-content: center !important;
      p {
        transform: translateY(9px);
      }
    }
    @media screen and (max-width: 300px) {
      gap: 8px;
      grid-template-columns: 1fr;
      justify-content: center !important;
      p {
        text-align: left !important; 
      }
    }
`;

const data = [
  { label: "First Name", value: "Phil" },
  { label: "Last Name", value: "Smith" },
  { label: "Email", value: "phil@gotimehq.com" },
  { label: "Near ID", value: "philsoutside.near" },
  { label: "Job Title", value: "Founder" },
  { label: "Project or Company", value: "Go Time" },
  { label: "Age", value: "35 years old" },
  { label: "Twitter", value: "@phil" },
  { label: "Telegram", value: "@phil" },
];

return (
  <div style={{ padding: 20, width: "100%" }}>
    <div style={{ marginBottom: 20 }}>
      <h5>Privacy Settings</h5>
    </div>

    <FirstBorderBox>
      <GridToggle>
        <p style={{ color: "gray", textAlign: "right" }}>Visibilty</p>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Widget src={`${ownerId}/widget/Inputs.Toggle`} props={{}} />
        </div>
        <p style={{ color: "gray" }}>Private Profile</p>
      </GridToggle>
    </FirstBorderBox>
    <FirstBorderBox style={{ borderTop: "none" }}>
      <div style={{ width: "100%" }}>
        {data.map((item) => (
          <GridToggle style={{ marginBottom: 15 }}>
            <p style={{ color: "gray", textAlign: "right" }}>{item.label}</p>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Widget src={`${ownerId}/widget/Inputs.Toggle`} props={{}} />
            </div>
            <p style={{ color: "gray" }}>{item.value}</p>
          </GridToggle>
        ))}
      </div>
    </FirstBorderBox>
  </div>
);
