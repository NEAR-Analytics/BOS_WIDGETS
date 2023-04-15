// Original widget: https://alpha.near.org/#/calebjacob.near/widget/Posts.Post
const accountId = props.accountId ?? context.accountId;
const blockHeight = props.blockHeight ?? "now";
const snipContent = props.snipContent ?? false;
const snippetMaxWords = props.snippetMaxWords ?? 40;
const content = props.content;
if (content?.text && snippet) {
  const text = content.text.split(" ");
  content.text = text.slice(0, snippetMaxWords);
  if (text.length >= snippetMaxWords) {
    content.text.push(props.snippedEnd ?? "...");
  }
  content.text = content.text.join(" ");
}
const key = props.key ?? JSON.stringify(content);
const postType = props.postType ?? "post";
const postBlockHeight =
  postType === "post" ? "blockHeight" : "commentBlockHeight";
const postUrl = `https://alpha.near.org/#/adminalpha.near/widget/PostPage?accountId=${accountId}&${postBlockHeight}=${blockHeight}`;
const onClick =
  props.onClick ??
  (() => {
    if (props.debug) {
      console.log(`clicked on post: ${postUrl}`);
    }
  });

const Post =
  props.styles?.Post ??
  styled.a`
  position: relative;

  &::before {
    content: '';
    display: block;


    width: 2px;
    background: #ECEEF0;
  }
`;

const Header =
  props.styles?.Header ??
  styled.div`
  margin-bottom: 0;
  display: inline-flex;
`;

const Body =
  props.styles?.Body ??
  styled.div`
  padding-left: 52px;
  padding-bottom: 1px;
`;

const Content =
  props.styles?.Content ??
  styled.div`
  img {
    display: block;
    max-width: 100%;
    max-height: 80vh;
    margin: 0 0 12px;
  }
`;

const Text =
  props.styles?.Text ??
  styled.p`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #687076;
  white-space: nowrap;
`;

return (
  <Post href={postUrl} onPointerUp={onClick}>
    <Header>
      <Widget
        src="adminalpha.near/widget/AccountProfile"
        props={{
          accountId,
          hideAccountId: true,
          inlineContent: (
            <>
              <Text as="span">･</Text>
              <Text>
                {blockHeight === "now" ? (
                  "now"
                ) : (
                  <>
                    <Widget
                      src="mob.near/widget/TimeAgo"
                      props={{ blockHeight }}
                    />{" "}
                    ago
                  </>
                )}
              </Text>
            </>
          ),
        }}
      />
    </Header>

    <Body>
      <Content>
        {content.text && (
          <Widget
            src="calebjacob.near/widget/SocialMarkdown"
            props={{ text: content.text }}
          />
        )}

        {content.image && (
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: content.image,
            }}
          />
        )}
      </Content>
    </Body>
  </Post>
);
