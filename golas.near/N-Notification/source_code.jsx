const accountId = props.accountId;
const profile = props.profile || Social.get(`${accountId}/profile/**`, "final");
const profileUrl = `#/near/widget/ProfilePage?accountId=${accountId}`;

const username = props.username;
const action = props.action;
const componentName = props.componentName;
const timestamp = props.timestamp;
const desc = props.desc;

const Username = styled.span`
  font: var(--text-s);
  font-weight: 600;
`;

const Action = styled.span`
  font: var(--text-s);
  font-weight: 600;
`;

const ComponentName = styled.span`
  font: var(--text-s);
  font-weight: 600;
`;

const Timestamp = styled.span`
  font: var(--text-s);
  font-weight: 600;
`;

const Desc = styled.span`
  font: var(--text-s);
  font-weight: 600;
`;

return (
  <div>
    <div>
      <Widget
        src="near/widget/DIG.Avatar"
        props={{
          alt: accountId,
          image: profile.image,
          size: "small",
        }}
      />
    </div>
    <div>
      <Username>{username}</Username>
      <Action>{action}</Action>
      <ComponentName>{componentName}</ComponentName>
      <Timestamp>{timestamp}</Timestamp>
    </div>
    <Desc>{desc}</Desc>
  </div>
);
