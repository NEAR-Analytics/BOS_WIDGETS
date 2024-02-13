const BASE_URL = "https://near.org/dropcast.near/widget/";
const accountId = context.accountId;

const discordCode = props.code || "";
console.log(discordCode, "==>discordCode");
if (!discordCode || !accountId)
  return (window.location.href = `${BASE_URL}login`);
return <div>Hello World</div>;
