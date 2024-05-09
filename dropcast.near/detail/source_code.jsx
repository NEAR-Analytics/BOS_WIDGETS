const Owner = "dropcast.near";
const API_URL = props.API_URL || "http://localhost:3000";
const TOKEN = props.TOKEN || "";
const project = props.project || "";
const onClose = props.onClose;

//Styles
const Wrapper = styled.div`
    display: flex;
    width: 100%;
    padding: 64px;
    position: relative;
    height: fit-content;
    align-items: stretch;
    flex-direction: column;
    color: rgb(229 229 229);
    background: rgb(23,23,23);
    @media (max-width: 620px) {
      padding: 29px;
    }
`;

const GridWrapper = styled.div`
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(3,minmax(0,1fr));
  @media (max-width: 935px) {
    grid-template-columns: repeat(1,minmax(0,1fr));
  }
  @media (min-width: 935px) and (max-width: 1400px) {
    grid-template-columns: repeat(2,minmax(0,1fr));
  }
`;

const Card = styled.div`
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    background-color: rgb(38, 38, 38);
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px;
`;

const Status = styled.span`
    width: 100%;
    padding: 10px 24px;
    border-radius: 8px;
`;

State.init({
  data: {},
  loaded: false,
  avatar: `https://cdn.discordapp.com/icons/${project.guild_id}/${project.icon}.png?size=1024`,
});

console.log(project, "==>");
const roles =
  JSON.parse(project.roles).filter((e) => e.selected === true) || [];

const handleImageNotFound = (e) => {
  State.update({
    ...state,
    avatar: "https://dropcast.nearverselabs.com/comingsoon.jpg",
  });
};

const getData = () => {
  let promise = asyncFetch(`${API_URL}/api/project/state?id=${project._id}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "x-auth-token": TOKEN,
    },
    method: "GET",
  });

  promise.then((data) => {
    if (data.status === 200) {
      State.update({
        ...state,
        loaded: true,
        data: data.body,
      });
    } else {
      State.update({
        ...state,
        error: data.body,
      });
    }
  });
};

if (!state.loaded) getData();

return (
  <Wrapper>
    <a
      href="#"
      className="my-2 text-decoration-underline"
      style={{ fontSize: 18, color: "rgb(229 229 229)" }}
      onClick={onClose}
    >
      back
    </a>
    <img
      style={{ height: 192 }}
      className="w-100 object-fit-cover rounded-3"
      src={state.avatar}
      onError={handleImageNotFound}
    />
    <div className="text-center px-2 py-3">
      <h5>{project.name}</h5>
      <p className="m-0">{project.description}</p>
    </div>

    <hr />

    <div>
      <h5 style={{ fontSize: 18 }}>{project.name}</h5>
      <GridWrapper>
        {roles.map((role) => (
          <Card key={role.id}>
            <h5>{role.name}</h5>
            <h5>Discord role</h5>
            <p
              style={{ color: "grey" }}
            >{`If you have this role in the discord server, you are automatically eligible for Allowlist`}</p>
            <Status
              style={{
                backgroundImage: state.data[role.id]
                  ? `linear-gradient(to right, rgb(81 110 11), rgb(12 234 195))`
                  : `linear-gradient(to right, rgb(110 11 11), rgb(234 75 12))`,
              }}
            >{`${state.data[role.id] ? "" : "Not "}Eligible`}</Status>
          </Card>
        ))}
      </GridWrapper>
    </div>
  </Wrapper>
);
