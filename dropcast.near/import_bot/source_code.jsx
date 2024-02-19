const accountId = context.accountId;
const Owner = "dropcast.near";
const TOKEN = props.TOKEN || "";
const CLIENT_ID = "1206878767633534976";
const API_URL = props.API_URL || "http://localhost:3000";
const data = props.data || {};

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

State.init({
  roles: [],
  discord: false,
  submitted: false,
  error: "",
  selected_roles: {},
});

const handleImportBot = () => {
  let promise = asyncFetch(
    `${API_URL}/api/project/roles?guild_id=${"940531636251021362"}`,
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
  State.update({
    submitted: true,
  });
};

const onChange = (value, key) => {
  console.log(value, "==.value", key);
  State.update({
    selected_roles: {
      [key]: value,
    },
  });
};

return (
  <Wrapper>
    {!state.discord && (
      <Card>
        <h4>Import Discrod BOT</h4>
        <p>
          {`Please Import bot into discord and place it above all the Allowlist
        roles in Settings -> Roles`}
        </p>
        <StepButtonLink
          href={`https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&permissions=268435457&scope=bot&guild_id=${data.guild_id}&disable_guild_select=true`}
          target="_blank"
          className="btn"
          onClick={handleImportBot}
        >
          Import Bot Into Discord
        </StepButtonLink>
      </Card>
    )}
    {state.discord && !state.submitted && (
      <Card>
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
                onChange: (value) => {
                  onChange(value, role.id);
                },
              }}
              src={`frichard5.near/widget/NDC-checkbox`}
            />
          ))}
        </div>
        <StepButton className="btn" onClick={handleSubmit}>
          Submit
        </StepButton>
      </Card>
    )}
    {state.submitted && (
      <Card>
        <h4>{`Listed Successfully`}</h4>
        <p>
          {`You can manage your project information and use admin functions from the Manager tab.`}
        </p>
        <StepButton className="btn">Goto Dashboard</StepButton>
      </Card>
    )}
  </Wrapper>
);
