const account_id = context.accountId ?? props.accountId;
const profileData = Social.getr(`${account_id}/profile`);
const componentData = Social.getr(`${account_id}/widget`);
const postData = Social.getr(`${account_id}/post`);

const [num, setNum] = useState(0);

const logData = () => {
    setNum(num+1);
    console.log("profileData");
    // console.log(profileData);
    console.log("componentData");
    // console.log(componentData);
};

return (
  <div>
    Hello World
    <button onClick={logData}>mydata</button>
    {JSON.stringify(profileData)}
    <br/><br/>
    {JSON.stringify(Object.keys(componentData))}
    <br/><br/>
    {JSON.stringify(postData)}
  </div>
);
