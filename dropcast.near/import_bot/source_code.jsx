const accountId = context.accountId;
const Owner = "dropcast.near";
const TOKEN = props.TOKEN || "";
const CLIENT_ID = "1206878767633534976";
const API_URL = props.API_URL || "http://localhost:3000";
const data = props.data || {};
const onClose = props.onClose || (() => {});
const changePage = props.changePage || ((page) => {});

//Styles
const Wrapper = styled.div`
    top: 0px;
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
    @media (max-width: 620px) {
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
    @media (max-width: 620px) {
      padding: 15px;
      height: 100%;
      .menu {
        width: 74vw;
      }
    }  
`;

const StepButton = styled.button`
    color: #FFF;
    padding: 12px 40px;
    border-radius: 6px;
    background-image: linear-gradient(to right, rgb(147, 51, 234), rgb(99, 102, 241));
`;

const StepButtonLink = styled.a`
    color: #FFF;
    padding: 12px 40px;
    border-radius: 6px;
    background-image: linear-gradient(to right, rgb(147, 51, 234), rgb(99, 102, 241));
`;

const CloseButton = styled.button`
    top: 10px;
    padding: 0;
    z-index: 1;
    width: 29px;
    right: 10px;
    height: 29px;
    color: white;
    border: 1px solid;  
    position: absolute;
    align-items: center;
    border-radius: 50px;  
    justify-content: center;
`;

State.init({
  roles: data.type === "edit" ? JSON.parse(data.roles) : [],
  discord: data.type === "edit",
  submitted: false,
  error: "",
});

const convertObject = (params) => {
  return Object.keys(params)
    .map((param) => `${param}=${params[param]}`)
    .join("&");
};

const handleImportBot = () => {
  let promise = asyncFetch(
    `${API_URL}/api/project/roles?guild_id=${data.project_id}`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-auth-token": TOKEN,
      },
      method: "GET",
    }
  );

  promise.then((data) => {
    if (data.status === 200) {
      State.update({
        discord: true,
        roles: data.body,
      });
    } else {
      State.update({
        error: data.body,
      });
    }
  });
};

const handleSubmit = () => {
  let promise = asyncFetch(`${API_URL}/api/project`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "x-auth-token": TOKEN,
    },
    method: "POST",
    body: convertObject({
      ...data,
      roles: JSON.stringify(state.roles),
    }),
  });

  promise.then((data) => {
    if (data.status === 200) {
      State.update({
        submitted: true,
      });
    } else {
      State.update({
        error: data.body,
      });
    }
  });
};

const onChange = (value, key) => {
  const changed = state.roles.map((role) => ({
    ...role,
    selected: role.id === key ? value : role.selected,
  }));
  State.update({
    ...state,
    roles: changed,
  });
};

return (
  <Wrapper>
    <Card>
      <CloseButton className="btn" onClick={onClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M13.46 12L19 17.54V19h-1.46L12 13.46L6.46 19H5v-1.46L10.54 12L5 6.46V5h1.46L12 10.54L17.54 5H19v1.46z"
          />
        </svg>
      </CloseButton>
      {!state.discord && (
        <>
          <h4>Import Discrod BOT</h4>
          <p>
            {`Please Import bot into discord and place it above all the Allowlist
        roles in Settings -> Roles`}
          </p>
          <StepButtonLink
            href={`https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&permissions=268435457&scope=bot&guild_id=${data.project_id}&disable_guild_select=true`}
            target="_blank"
            className="btn"
            onClick={handleImportBot}
          >
            Import Bot Into Discord
          </StepButtonLink>
        </>
      )}
      {state.discord && !state.submitted && (
        <>
          <h4>{`Choose Allowlist Role(s)`}</h4>
          <p>
            {`Please choose allowlist roles (if any). You can update these at anytime `}
          </p>
          <div
            className="d-flex flex-column w-100"
            style={{ maxHeight: 300, overflow: "auto", paddingLeft: "15%" }}
          >
            {state.roles.map((role) => (
              <Widget
                key={role.id}
                props={{
                  value: role.id,
                  label: role.name,
                  checked: role.selected,
                  onChange: (value) => {
                    onChange(value, role.id);
                  },
                }}
                src={`frichard5.near/widget/NDC-checkbox`}
              />
            ))}
          </div>
          <StepButton
            className="btn"
            disabled={!state.roles.length}
            onClick={handleSubmit}
          >
            Submit
          </StepButton>
        </>
      )}
      {state.submitted && (
        <>
          <h4>{`Listed Successfully`}</h4>
          <p>
            {`You can manage your project information and use admin functions from the Manager tab.`}
          </p>
          <StepButton className="btn" onClick={() => changePage("dashboard")}>
            Goto Dashboard
          </StepButton>
        </>
      )}
    </Card>
  </Wrapper>
);
