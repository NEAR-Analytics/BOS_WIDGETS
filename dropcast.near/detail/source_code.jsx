const Owner = "dropcast.near";
const API_URL = props.API_URL || "http://localhost:3000";
const TOKEN = props.TOKEN || "";
const project = props.project || "";

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
    background-image: linear-gradient(to right, rgb(250, 204, 21), rgb(234, 88, 12));
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
      <p style={{ color: "grey" }}>
        {`Please take a look at the whitelist requirements below and see if you are eligible to get whitelist.`}
      </p>
      <GridWrapper>
        {roles.map((role) => (
          <Card key={role.id}>
            <h5>{role.name}</h5>
            <h5>Discord role</h5>
            <p
              style={{ color: "grey" }}
            >{`If you have this role in the discord server, you are automatically eligible for whitelist`}</p>
            <Status style={{ opacity: state.data[role.id] ? 1 : 0.5 }}>{`${
              state.data[role.id] ? "" : "Not "
            }Eligible`}</Status>
          </Card>
        ))}
      </GridWrapper>
    </div>
  </Wrapper>
);
