const accountId = props.accountId;
const profile = props.profile || Social.get(`${accountId}/profile/**`, "final");
const profileUrl = `#/near/widget/ProfilePage?accountId=${accountId}`;

const username = props.username;
const action = props.action;
const componentName = props.componentName;
const timestamp = props.timestamp;
const desc = props.desc;

const Notification = styled.span`
  border-top: 1px solid #E3E3E0;
`;

const Username = styled.span`
  font: var(--text-s);
  font-weight: 600;
`;

const Action = styled.span`
  font: var(--text-s);
  color: #706F6C;
`;

const ComponentName = styled.span`
  font: var(--text-s);
  font-weight: 600;
  color: #604CC8;
`;

const Timestamp = styled.span`
  font: var(--text-s);
  color: #706F6C;
  
`;

const Desc = styled.span`
  font: var(--text-s);
  color: #706F6C;
  font-style: italic;
  border-left: 2px solid #E3E3E0;
  padding: 0 0 0 1rem;
`;

return (
  <Notification>
    <Widget
      src="near/widget/DIG.Avatar"
      props={{
        alt: accountId,
        image: profile.image,
        size: "small",
      }}
    />
    <div>
      <Username>{username}</Username>
      <Action>{action}</Action>
      <ComponentName>{componentName}</ComponentName>
      <Timestamp>{timestamp}</Timestamp>
    </div>
    <Desc>{desc}</Desc>
  </Notification>
);
