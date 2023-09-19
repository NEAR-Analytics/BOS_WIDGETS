// styled components
const Banner = styled.div`
    width : 100%;
    text-align : center;
    margin-bottom : 1rem;

    img {
        width : 100%;
        height : 100%;
    }
`;

const FlexBoxRow = styled.div`
    display : flex;
`;

const FlexBoxColumn = styled.div`
    display : flex;
    position : relative;
    flex-direction: column;
    justify-content: center;
    height : 20vh;

        .name-icon {
        position : absolute;
        top : 0rem;
        left : 0.5rem;
    }
`;

const Avatar = styled.div`
    display : flex;
    justify-content : flex-start;
    margin-left : 1rem;
    height : 20vh;
    margin : 0.5rem 0.5rem;

    .avatar {
        width : 10rem;
    }
`;

const Name = styled.div`

    font-size : 1rem;

    .name {
        height : 5vh;
    }

    .wallet {
        font-size : 1rem;
        color : #687076;
        overflow-wrap: break-word;
        height : 5vh;
    }

`;

const PostContainer = styled.div`
margin-top : 5rem;
padding : 1rem 1rem;
width : 50%;
overflow-wrap: break-word;


`;

const SocialWidgetContainer = styled.div`
margin-top : 5rem;
padding : 1rem 1rem;
width : 50%;
overflow-wrap: break-word;

`;

// fetch data
const account_id = context.accountId ?? props.accountId;
const profileData = Social.getr(`${account_id}/profile`);

State.init({
  isInit: false,
  posts: [],
});

const getMyPosts = () => {
  asyncFetch(
    "https://queryapi-hasura-graphql-24ktefolwq-ew.a.run.app/v1/graphql",
    {
      method: "POST",
      headers: { "x-hasura-role": "nearpavel_near" },
      body: JSON.stringify({
        query: `query MyPosts {
          nearpavel_near_social_posts_posts(where: {account_id: {_eq: "${account_id}"}}, order_by: {block_timestamp: desc}) {
          account_id
          block_height
          block_timestamp
          content
          receipt_id
        }
      }`,
      }),
    }
  ).then((postRes) => {
    if (postRes.body.errors === undefined) {
      State.update({
        isInit: true,
        posts: postRes.body.data.nearpavel_near_social_posts_posts,
      });
    }
  });
};

if (state.isInit === false) {
  getMyPosts();
}

const Post = state.posts.map((post, index) => {
  const content = JSON.parse(post.content);
  const block_timestamp = new Date(post.block_timestamp / 1000000);
  const { year, month, day, hours, minutes, seconds } = {
    year: block_timestamp.getFullYear(),
    month: (block_timestamp.getMonth() + 1).toString().padStart(2, "0"),
    day: block_timestamp.getDate().toString().padStart(2, "0"),
    hours: block_timestamp.getHours().toString().padStart(2, "0"),
    minutes: block_timestamp.getMinutes().toString().padStart(2, "0"),
  };

  return (
    <>
      <div style={{ padding: "1rem 2ren" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 style={{ fontSize: "1rem" }}>No.{state.posts.length - index}</h2>
          <h3 style={{ fontSize: "1rem", fontStyle: "italic" }}>
            {year}-{month}-{day} {hours}:{minutes}
          </h3>
        </div>
        <div
          style={{
            padding: "1rem 1rem 0 1rem",
            border: "solid 0.1rem #53D8D9", // aqua green
            borderRadius: "0.5rem",
            borderWidth: "0 0 0 0.5rem",
          }}
        >
          <Markdown text={content.text} />
        </div>
      </div>
      <hr style={{ color: "#53D8D9" }} />
    </>
  );
});

const data = Social.getr(`${account_id}/widget/*`, "final", {
  subscribe: true,
});

const widgetEntries =
  data === undefined || data === null ? [] : Object.entries(data);

const widgets = widgetEntries.map(([title]) => {
  return (
    <div
      style={{
        padding: "1rem 1rem",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
        }}
      >
        <a
          href={`/near/widget/ComponentDetailsPage?src=${account_id}/widget/${title}`}
          style={{
            padding: "1rem",
            border: "dotted 1px #53D8D9",
            backgroundColor: "#fff",
            color: "#0d6efd",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          Click Here
        </a>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <a
            href={`/${account_id}/widget/${title}`}
            style={{
              padding: "0 0 0 15px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              fontSize: "2em",
              fontWeight: "bold",
              color: "#000",
              wordBreak: "break-all",
            }}
          >
            <h1 style={{ fontSize: "1rem" }}>{title}</h1>
          </a>
          <a
            href={`/near/widget/ProfilePage?accountId=${account_id}`}
            style={{
              padding: "0 0 0 14px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              fontSize: "1.3em",
              color: "#888",
              wordBreak: "break-all",
            }}
          >
            <h1 style={{ fontSize: "1rem" }}>@{account_id}</h1>
          </a>
        </div>
      </div>
      <hr style={{ color: "#53D8D9" }} />
    </div>
  );
});

return (
  <>
    <Banner>
      <img
        className="avatar"
        src={`https://ipfs.near.social/ipfs/${profileData.backgroundImage.ipfs_cid}`}
      />
    </Banner>
    <FlexBoxRow>
      <div style={{ width: "30%" }}>
        <Avatar>
          <img
            className="avatar"
            src={`https://ipfs.near.social/ipfs/${profileData.image.ipfs_cid}`}
          />
        </Avatar>
      </div>
      <div style={{ width: "70%" }}>
        <FlexBoxColumn>
          <Name>
            <div className="name">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="0.8rem"
                style={{ paddingRight: "0.5rem" }}
                viewBox="0 0 448 512"
              >
                <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
              </svg>
              {profileData.name}
            </div>
            <div className="wallet">@{account_id}</div>
          </Name>
        </FlexBoxColumn>
      </div>
    </FlexBoxRow>
    <FlexBoxRow>
      <PostContainer>
        <div>
          {state.isInit === false ? (
            <FlexBoxRow>
              <h1 style={{ fontSize: "1rem" }}>Load Your Posts...</h1>
            </FlexBoxRow>
          ) : (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1 style={{ fontSize: "1rem" }}>
                  <span
                    style={{
                      fontSize: "1.5rem",
                      color: "blue",
                      marginRight: "0.5rem",
                    }}
                  >
                    {Post.length}
                  </span>
                  posts
                </h1>
                <button onClick={getMyPosts} style={{ fontSize: "1rem" }}>
                  Load Posts
                </button>
              </div>
              <hr style={{ color: "#53D8D9" }} />
              {Post.length === 0 ? <h1>Can not found your post</h1> : Post}
            </div>
          )}
        </div>
      </PostContainer>

      <SocialWidgetContainer>
        <div>
          <h1 style={{ fontSize: "1rem" }}>
            <span
              style={{
                fontSize: "1.5rem",
                color: "blue",
                marginRight: "0.5rem",
              }}
            >
              {widgetEntries.length}
            </span>
            widgets
          </h1>
          <hr style={{ color: "#53D8D9" }} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {widgets}
          </div>
        </div>
      </SocialWidgetContainer>
    </FlexBoxRow>
  </>
);
