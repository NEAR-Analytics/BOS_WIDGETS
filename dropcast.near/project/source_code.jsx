const API_URL = props.API_URL || "http://localhost:3000";
const Owner = "dropcast.near";
const TOKEN = props.TOKEN || "";
const type = props.type || "other";
const project = props.project || {};
const editMyProject = props.editMyProject || ((val) => {});
const showDetail = props.showDetail || ((val) => {});

const Wrapper = styled.div`
    padding: 20px;
    border-radius: 8px;
    background-color: rgb(38, 38, 38);
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px;
`;

const BadgeActiveIcon = styled.div`
    width: 12px;
    height: 12px;
    border-radius: 50px;
    background-color: rgb(34, 197, 94);
`;

const BadgeCloseIcon = styled.div`
    width: 12px;
    height: 12px;
    border-radius: 50px;
    background-color: red;
`;

const Label = styled.div`
    margin: 0px;
    font-size: 14px;
    color: rgb(163, 163, 163);
`;

const Value = styled.div`
    margin: 0px;
    color: white;
    font-size: 14px;
`;

const Button = styled.button`
    color: #FFF;
    padding: 8px 16px;
    border-radius: 6px;
    background-image: linear-gradient(to right, rgb(147, 51, 234), rgb(99, 102, 241), rgb(99, 102, 241));
`;

const Description = styled.p`
    margin: 0;
    fontSize: 14px;
    color: rgb(163, 163, 163);
    @media (min-width: 935px) {
      height: 85px;
    }
`;

State.init({
  file: "",
  error: "",
  download: false,
  status: project.whitelist,
  avatar: `https://cdn.discordapp.com/icons/${project.guild_id}/${project.icon}.png?size=1024`,
});

const convertObject = (params) => {
  return Object.keys(params)
    .map((param) => `${param}=${params[param]}`)
    .join("&");
};

const onSelect = (val) => {
  if (val === "whitelist") {
    let promise = asyncFetch(`${API_URL}/api/project/whitelist`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-auth-token": TOKEN,
      },
      method: "POST",
      body: convertObject({
        whitelist: !state.status,
        project_id: project._id,
      }),
    });

    promise.then((data) => {
      if (data.status === 200) {
        State.update({
          ...state,
          status: !state.status,
        });
      } else {
        State.update({
          ...state,
          error: data.body,
        });
      }
    });
  } else if (val === "configure") {
    editMyProject(project);
  } else if (val === "export") {
    let promise = asyncFetch(`${API_URL}/api/project/export`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-auth-token": TOKEN,
      },
      method: "POST",
      body: convertObject({
        project_id: project._id,
      }),
    });

    promise.then((data) => {
      if (data.status === 200) {
        if (data.body?.error) {
          State.update({
            ...state,
            error: data.body,
          });
        } else {
          State.update({
            ...state,
            download: true,
            file: data.body,
          });
        }
      } else {
        State.update({
          ...state,
          error: data.body,
        });
      }
    });
  }
};

const ManageButton = (
  <Button className="btn w-75 justify-content-center">
    Manage <i className="ph ph-caret-down" />
  </Button>
);

const Items = [
  {
    name: `${state.status ? "Disable" : "Enable"} Allowlisting`,
    id: "whitelist",
    onSelect,
  },
  { name: "Configure", id: "configure", onSelect },
  {
    onSelect,
    id: "export",
    name: "Export Whitelist Users",
  },
];

const handleImageNotFound = (e) => {
  State.update({
    avatar: "https://dropcast.nearverselabs.com/comingsoon.jpg",
  });
};

const handleClick = () => {
  if (type === "my") showDetail(project);
};

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
      <Description>
        {project.description.length > 120
          ? `${project.description.slice(0, 120)}...`
          : project.description}
      </Description>
    </div>
    {type !== "past" && (
      <>
        <hr className="mt-0" />
        <div className="d-flex flex-column gap-3">
          <div className="d-flex justify-content-between">
            <Label>Whitelist</Label>
            {state.status ? (
              <div className="d-flex align-items-center gap-2">
                <BadgeActiveIcon />
                <Value style={{ fontSize: 12 }}>Active</Value>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <BadgeCloseIcon />
                <Value style={{ fontSize: 12 }}>Closed</Value>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-between">
            <Label>Mint date</Label>
            <Value>{project.mint_date2 || "TBD"}</Value>
          </div>
          <div className="d-flex justify-content-between">
            <Label>Mint price</Label>
            <Value>{project.mint_price || "TBD"}</Value>
          </div>
          <div className="d-flex justify-content-between">
            <Label>Supply</Label>
            <Value>{project.supply || "TBD"}</Value>
          </div>
        </div>
      </>
    )}

    {type === "my" && (
      <>
        <hr />

        <Button
          className="btn w-100"
          onClick={handleClick}
        >{`Check roles`}</Button>
      </>
    )}

    <hr />
    {type === "manager" ? (
      <div className="d-flex justify-content-center">
        <Widget
          props={{
            items: Items,
            trigger: ManageButton,
          }}
          src={`${Owner}/widget/dropdown`}
        />
      </div>
    ) : (
      <div className="d-flex justify-content-center gap-5 mt-3 mb-1">
        <a
          className={`btn p-1 ${!project.twitter && "disabled border-0"}`}
          href={project.twitter}
          target="_blank"
        >
          <svg
            style={{ width: 24, height: 24, fill: "#FFF" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
          </svg>
        </a>
        <a
          className={`btn p-1  ${!project.discord && "disabled border-0"}`}
          href={project.discord}
          target="_blank"
        >
          <svg
            className="fill-white"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            style={{ width: 24, height: 24, fill: "#FFF" }}
          >
            <path d="M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-1.452-1.344-1.536-1.428.636 2.22h-13.608c-1.356 0-2.46-1.104-2.46-2.472v-16.224c0-1.368 1.104-2.472 2.46-2.472h16.08zm-4.632 15.672c2.652-.084 3.672-1.824 3.672-1.824 0-3.864-1.728-6.996-1.728-6.996-1.728-1.296-3.372-1.26-3.372-1.26l-.168.192c2.04.624 2.988 1.524 2.988 1.524-1.248-.684-2.472-1.02-3.612-1.152-.864-.096-1.692-.072-2.424.024l-.204.024c-.42.036-1.44.192-2.724.756-.444.204-.708.348-.708.348s.996-.948 3.156-1.572l-.12-.144s-1.644-.036-3.372 1.26c0 0-1.728 3.132-1.728 6.996 0 0 1.008 1.74 3.66 1.824 0 0 .444-.54.804-.996-1.524-.456-2.1-1.416-2.1-1.416l.336.204.048.036.047.027.014.006.047.027c.3.168.6.3.876.408.492.192 1.08.384 1.764.516.9.168 1.956.228 3.108.012.564-.096 1.14-.264 1.74-.516.42-.156.888-.384 1.38-.708 0 0-.6.984-2.172 1.428.36.456.792.972.792.972zm-5.58-5.604c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332.012-.732-.54-1.332-1.224-1.332zm4.38 0c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332 0-.732-.54-1.332-1.224-1.332z"></path>
          </svg>
        </a>
      </div>
    )}
    {state.error && (
      <div className="d-flex mt-1 justify-content-center align-items-center">
        <p style={{ color: "red" }}>{state.error}</p>
      </div>
    )}
    {state.download && (
      <div className="d-flex mt-1 justify-content-center align-items-center">
        <a
          href={`${API_URL}/${state.file}`}
          download={`Allowlist_${project.guild_id}.csv`}
        >
          Download CSV
        </a>
      </div>
    )}
  </Wrapper>
);
