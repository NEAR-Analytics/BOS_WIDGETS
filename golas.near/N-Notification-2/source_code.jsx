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
  
  &::before {
    content: '',
    width: 2px;
    height: 2px;
    backtround: #333;
  }
`;

const Desc = styled.span`
  font: var(--text-s);
  color: #706F6C;
  font-style: italic;
  border-left: 2px solid #E3E3E0;
  padding: 0 0 0 1rem;
`;




const { value } = props;
const { type } = value;
const item = value?.item || {};
const path = item.path || "";

// Build notification
const isComment = path.indexOf("/post/comment") > 0 || type === "comment";
const isPost = !isComment && path.indexOf("/post/main") > 0;

const accountId = type === "like" ? path.split("/")[0] : props.accountId;
const blockHeight = type === "like" ? item.blockHeight : props.blockHeight;
const urlBlockHeight = isComment ? "commentBlockHeight" : "blockHeight";

const profile = props.profile || Social.get(`${accountId}/profile/**`, "final");
const profileUrl = `#/near/widget/ProfilePage?accountId=${accountId}`;


let postUrl = "";

if (type !== "custom") {
  postUrl = `#/near/widget/PostPage?accountId=${accountId}&${urlBlockHeight}=${blockHeight}`;
} else {
  postUrl = `#/${value.widget}?${Object.entries(value.params || {})
    .map(([k, v]) => `${k}=${v}`)
    .join("&")}`;
}

const actionable =
  type === "like" ||
  type === "comment" ||
  type === "mention" ||
  type === "custom";

let notificationMessage = {
  like: isPost ? "liked your post" : isComment ? "liked your comment" : "",
  // fork: '',
  follow: "followed you",
  unfollow: "unfollowed you",
  comment: "replied to your post",
  mention: "mentioned you in their post",
  poke: "poked you",
  custom: value.message ?? "",
};

// DevGov handles their own type
if (type && type.startsWith("devgovgigs/")) {
  return (
    <Widget src="mob.near/widget/Notification.Item.DevGov" props={props} />
  );
}

// Assert is a valid type
if (!(type in notificationMessage) || !notificationMessage[type]) return <></>;

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
          <Username>{profile.name || accountId.split(".near")[0]}</Username>
          <Action>{notificationMessage[type]}</Action>
          {/*<ComponentName>{componentName}</ComponentName>*/}

          <Timestamp>
          ·
            <Widget
            src="mob.near/widget/TimeAgo@97556750"
            props={{ blockHeight: props.blockHeight }}
            />
        </Timestamp>
        </div>
        <Desc>{desc}</Desc>
      </Content>
    </Notification>




    {/*
    <Wrapper>
      <div>
        <Widget
          src="near/widget/AccountProfile"
          props={{ accountId: props.accountId }}
        />
      </div>

      <Text bold>
        <Text as={actionable ? "a" : "p"} href={actionable ? postUrl : ""}>
          {notificationMessage[type]}
        </Text>
        <Widget
          src="mob.near/widget/TimeAgo@97556750"
          props={{ blockHeight: props.blockHeight }}
        />
        ago
      </Text>

      <div>
        {(type === "follow" || type === "unfollow") && (
          <Widget
            src="near/widget/FollowButton"
            props={{ accountId: props.accountId }}
          />
        )}

        {type === "poke" && (
          <Widget
            src="near/widget/PokeButton"
            props={{ accountId: props.accountId, back: true, primary: true }}
          />
        )}

        {actionable && <Button href={postUrl}>View</Button>}
      </div>
    </Wrapper>
    */}
  </>
);
