const accountId = context.accountId;
const Owner = "dropcast.near";
const API_URL = props.API_URL || "http://localhost:2402";
const TOKEN = props.TOKEN || "";
const changePage = props.changePage || ((page) => {});

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
    @media (max-width: 510px) {
        padding: 29px;
    }   
`;

const ProjectButton = styled.button`
    color: #FFF;
    padding: 8px 16px;
    border-radius: 6px;
    background-image: linear-gradient(to right, rgb(147, 51, 234), rgb(99, 102, 241), rgb(99, 102, 241));
`;

const GridWrapper = styled.div`
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(3,minmax(0,1fr));
  @media (max-width: 510px) {
    grid-template-columns: repeat(1,minmax(0,1fr));
  }
`;
State.init({
  list: [],
  loaded: false,
  isRegister: false,
});

const handleNewProject = () => {
  State.update({
    isRegister: true,
  });
};

const getList = () => {
  let promise = asyncFetch(`${API_URL}/api/project/me`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "x-auth-token": TOKEN,
    },
    method: "GET",
  });

  promise.then((data) => {
    if (data.status === 200) {
      State.update({
        loaded: true,
        list: data.body,
      });
    } else {
      State.update({
        error: data.body,
      });
    }
  });
};

if (!state.loaded) getList();

if (state.isRegister)
  return (
    <Widget
      src={`${Owner}/widget/register`}
      props={{ API_URL, TOKEN, changePage }}
    />
  );

return (
  <Wrapper>
    <p>Start by creating a new Vulcan Project</p>
    <div>
      <ProjectButton className="btn" onClick={handleNewProject}>
        + New Project
      </ProjectButton>
    </div>
    <GridWrapper>
      {state.list.map((project) => (
        <Widget
          props={{ project }}
          key={project._id}
          src={`${Owner}/widget/project`}
        />
      ))}
    </GridWrapper>
  </Wrapper>
);
