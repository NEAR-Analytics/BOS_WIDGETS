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
          <Action>{action}</Action>
        //   <ComponentName>{componentName}</ComponentName>
          <Timestamp>
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
