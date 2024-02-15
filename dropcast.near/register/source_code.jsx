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
  position: relative;
  align-items: stretch;
  flex-direction: column;
  justify-content: center;
  color: rgb(229 229 229);
  background: rgb(23,23,23);
`;

const ProjectButton = styled.button`
    color: #FFF;
    padding: 8px 16px;
    border-radius: 6px;
    background-image: linear-gradient(to right, rgb(147, 51, 234), rgb(99, 102, 241), rgb(99, 102, 241));
`;

return (
  <Wrapper>
    <div
      className="d-flex flex-column rounded-3"
      style={{ padding: 48, background: "rgb(38, 38, 38)" }}
    >
      gggh
    </div>
  </Wrapper>
);
