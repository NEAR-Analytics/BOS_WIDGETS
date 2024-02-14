const accountId = context.accountId;
const Owner = "dropcast.near";
const API_URL = props.API_URL || "http://localhost:3000";
const USER = props.USER || {};
const TOKEN = props.TOKEN || "";

//Styles
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  padding: 64px;
  position: relative;
  align-items: stretch;
  color: rgb(229 229 229);
  background: rgb(23,23,23);
`;

const Tabs = styled.div`
  display: flex;
  width: 100%;
  height: 52px;
  border-bottom: 1px solid #e5e7eb;
`;

const Tab = styled.div`
  gap: 6px;
  height: 100%;
  display: flex;
  padding: 16px 4px;
  align-items: center;
  position: relative;
`;

const Counter = styled.span`
  font-size: 12px;
  padding: 2px 10px;
  border-radius: 50px;
  background-image: linear-gradient(to right, rgb(250, 204, 21), rgb(234, 88, 12));
`;

const SelectedTab = styled.span`
  left: -2px;
  height: 4px;
  width: 100%;
  bottom: -1.75px;
  position: absolute;
  border-radius: 50px;
  background-image: linear-gradient(to right, rgb(250, 204, 21), rgb(234, 88, 12));
`;

return (
  <Wrapper>
    <Tabs>
      <Tab>
        <p className="m-0">My project</p>
        <Counter>0</Counter>
        <SelectedTab />
      </Tab>
    </Tabs>
  </Wrapper>
);
