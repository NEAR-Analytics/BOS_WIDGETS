const accountId = context.accountId;
const Owner = "dropcast.near";
const API_URL = "http://localhost:3000";
const user = props.user || {};
const token = props.token || "";
console.log(token, user, "==>tttttttt");
//Styles
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: stretch;
  flex-direction: column;
  background: white;
  overflow: auto;
  position: relative;
`;

if (!accountId || !user || !token)
  return <Widget src={`${Owner}/widget/login`} />;
return <Wrapper className="root">main</Wrapper>;
