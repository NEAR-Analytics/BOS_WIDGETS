const accountId = context.accountId;
const Owner = "dropcast.near";
const API_URL = props.API_URL || "http://localhost:3000";
const USER = props.USER || {};
const TOKEN = props.TOKEN || "";

//Styles
const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    padding: 64px;
    position: absolute;
    align-items: center;
    flex-direction: column;
    color: rgb(229 229 229);
    justify-content: center;
    background: rgba(23,23,23, 0.7);
    @media (max-width: 510px) {
      padding: 25px;
    }  
`;

const Card = styled.div`
    gap: 10px;
    display: flex;
    padding: 35px;
    max-width: 430px;
    border-radius: 8px;
    position: relative;
    text-align: center;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background: rgb(38, 38, 38);
    @media (max-width: 510px) {
      padding: 15px;
      height: 100%;
      .menu {
        width: 74vw;
      }
    }  
`;

const StepButton = styled.button`
    color: #FFF;
    padding: 12px 20px;
    border-radius: 6px;
    background-image: linear-gradient(to right, rgb(147, 51, 234), rgb(99, 102, 241));
`;

return (
  <Wrapper>
    <Card>
      <h4>Import Discrod BOT</h4>
      <p>
        {`Please Import bot into discord and place it above all the Allowlist
        roles in Settings -> Roles`}
      </p>
      <StepButton className="btn">Import Bot Into Discord</StepButton>
    </Card>
  </Wrapper>
);
