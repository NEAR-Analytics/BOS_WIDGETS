const PostContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding-inline: 8px;
  gap: 8px;
`;

const ImageContainer = styled.img`
    position: relative;
    display: block;
    min-width: 100px;
    max-width: 100px;
    height: 100px;
    background: #D9D9D9;
    border-radius: 50% 50%;
`;

const PostContentContainer = styled.div`
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    gap: 16px;
    width: 100%;
`;

const PostTopContainer = styled.div`
    flex-basis: auto 1 0;
    width: 100%;
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
`;

const PostContent = styled.div`
    position: relative;
`;

const accountId = props.accountId;
if (!accountId) {
  return "No accountId";
}

const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const myName = Social.get(`${accountId}/profile/name`);
const pinned = !!props.pinned;
const hideMenu = !!props.hideMenu;
const hideButtons = !!props.hideButtons;
const content =
  props.content ??
  JSON.parse(Social.get(`${accountId}/post/main`, blockHeight) ?? "null");
const subscribe = !!props.subscribe;
const raw = !!props.raw;
const groupId = props.groupId ?? content.groupId;
const indexKey = props.indexKey;
const permissions = props.permissions;
const fullPostLink = props.fullPostLink;

const notifyAccountId = accountId;
const item = {
  type: "social",
  path: `${accountId}/post/main`,
  blockHeight,
};

const link =
  props.link ??
  props.fullPostLink ??
  `/mob.near/widget/MainPage.N.Post.Page?accountId=${accountId}&blockHeight=${blockHeight}`;
// const imgWrapperStyle = { width: "40px", height: "40px" };
const profile = Social.getr(`${accountId}/profile`);
const image = profile.image;

// Function to formatAccountId if accountId is not a `.near` account
const formatAccountId = (acctId) => {
  if (acctId.split(".near").length == 2) {
    return acctId;
  }
  return `${acctId?.substring(0, 6)}...${acctId?.substring(acctId.length - 4)}`;
};

// Function to extractHashtags
const extractHashtags = (text) => {
  const hashtagRegex = /#(\w+)/gi;
  hashtagRegex.lastIndex = 0;
  const hashtags = new Set();
  for (const match of text.matchAll(hashtagRegex)) {
    if (
      !/[\w`]/.test(match.input.charAt(match.index - 1)) &&
      !/[/\w`]/.test(match.input.charAt(match.index + match[0].length))
    ) {
      hashtags.add(match[1].toLowerCase());
    }
  }
  return [...hashtags];
};

extractHashtags(content?.text);

return (
  <>
    <PostContainer>
      <ImageContainer>
        {image ? (
          <Img src={`https://ipfs.near.social/ipfs/${image.ipfs_cid}`} />
        ) : (
          <div style={{ fontSize: "40px", margin: "auto" }}>
            {myName[0].toUpperCase()}
          </div>
        )}
      </ImageContainer>
      <PostContentContainer>
        <PostTopContainer>
          <div
            class=""
            style={{ display: "flex", alignItems: "center", gap: "16px" }}
          >
            <div>{myName}</div>
            <div>@{formatAccountId(accountId)}</div>
            <Widget
              loading=""
              src="mob.near/widget/TimeAgo"
              props={{ blockHeight }}
            />
          </div>
        </PostTopContainer>
        <PostContent>
          <div>{content?.text}</div>
        </PostContent>
      </PostContentContainer>
    </PostContainer>
  </>
);
