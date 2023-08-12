const path = props.path || "james.near/thing/page/one";
const template = props.template || "hack.near/widget/community.page";
const thing = JSON.parse(Social.get(path) || "null");

return <Widget src={thing.template || template} props={thing} />;
