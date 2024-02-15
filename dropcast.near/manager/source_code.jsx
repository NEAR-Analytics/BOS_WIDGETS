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
    <p>Start by creating a new Vulcan Project</p>
    <div>
      <ProjectButton className="btn">+ New Project</ProjectButton>
    </div>
  </Wrapper>
);
