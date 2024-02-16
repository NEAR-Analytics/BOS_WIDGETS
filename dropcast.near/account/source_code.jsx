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
  @media (max-width: 510px) {
      padding: 30px;
  }
`;

return (
  <Wrapper>
    <div className="d-flex gap-3 align-items-center">
      <img
        style={{ width: 64, height: 64, borderRadius: 50 }}
        src={`https://cdn.discordapp.com/avatars/${USER.id}/${USER.avatar}.png`}
        alt=""
      />
      <h4 className="m-0">{USER.username}</h4>
    </div>
    <div
      className="mt-5 rounded-3"
      style={{ backgroundColor: "rgb(38, 38, 38)" }}
    >
      <h6 className="px-3 py-4 m-0" style={{ fontSize: 18 }}>
        Wallets
      </h6>
      <hr className="m-0" />
      <p className="px-3 py-4 m-0">{accountId}</p>
    </div>
    <div
      className="d-flex flex-column gap-1 mt-5 rounded-3 p-4"
      style={{ backgroundColor: "rgb(38, 38, 38)", maxWidth: 550 }}
    >
      <h6 className="m-0" style={{ fontSize: 18 }}>
        Note
      </h6>
      <p
        className="m-0"
        style={{ fontSize: 14 }}
      >{`The wallet address put forward to projects for whitelisting is the address that is configured as "Default" on your Account. This can be changed as many times up until the project finishes whitelisting and has fully exported their whitelist addresses.`}</p>
    </div>
  </Wrapper>
);
