const accountId = props.accountId;
const profile = props.profile || Social.get(`${accountId}/profile/**`, "final");
const profileUrl = `#/near/widget/ProfilePage?accountId=${accountId}`;

const username = props.username;
const action = props.action;
const componentName = props.componentName;
const timestamp = props.timestamp;
const desc = props.desc;
const icon = props.icon;

const Notification = styled.div`
  display: flex;
  padding: 16px 24px 16px 16px;
  align-items: flex-start;
  gap: 16px; 
  border-top: 1px solid var(--sand-light-6, #E3E3E0);

  &:hover {
    background: var(--sand-light-2, #F9F9F8);
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  flex: 1 0 0; 
`;

const Icon = styled.div`

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
  <>
    <Notification>
      <Icon>{icon}</Icon>
      <Content>
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
      </Content>
    </Notification>
  </>
);
