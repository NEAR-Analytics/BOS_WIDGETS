const Owner = "socializer.near";

const changePage = props?.changePage || (() => {});
const page = props?.page || "";

const MainComponent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  background: #FAFAFA;
  flex-direction: column;
`;

const HeadComponent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  padding: 32px;
  justify-content: space-between;
  
`;

const Button = styled.button`
  display: inline-flex;
  padding: 12px 24px;
  align-items: flex-start;
  gap: 10px;
  border-radius: 6px;
  background: var(--Dark, #121212); 
  color: var(--light_95, #F3F3F3);
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
  line-height: normal;
`;

return (
  <MainComponent>
    <div className="d-flex">
      <p>{"< GoBack"}</p>
    </div>
    <HeadComponent>
      <div
        style={{
          position: "relative",
          flexDirection: "column",
          display: "flex",
          gap: 14,
        }}
      >
        <h4 style={{ margin: 0 }}>{"Create New Campaign"}</h4>
        <p style={{ fontSize: 14, margin: 0 }}>
          The list of Near Social Posts are offering rewards
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 21,
        }}
      >
        <Button onClick={() => {}}>{"Create New Campaigns"}</Button>
      </div>
    </HeadComponent>
  </MainComponent>
);
