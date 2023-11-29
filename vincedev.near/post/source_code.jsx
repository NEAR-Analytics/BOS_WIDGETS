const { Feed } = VM.require("devs.near/widget/Module.Feed");
const { ContextMenu } = VM.require("efiz.near/widget/Module.ContextMenu");

ContextMenu = ContextMenu || (() => <></>); // make sure you have this or else it can break
Feed = Feed || (() => <></>);
const MainWrapper = styled.div`
display: flex;
justify-content: space-between;
`;
const childDiv1 = styled.div`
width:70%;
`;
const childDiv2 = styled.div`
width:28%;
`;

const [parentArray, setParentAray] = useState([]);
const [hashList, setHashList] = useState([]);
const [trendList, setTrendList] = useState([]);
const [singlePostTrendList, setSinglePostTrendList] = useState([]);
const [search, setSearch] = useState("");
const [postActive, setPostActive] = useState(true);
const [trendActive, setTrendActive] = useState(false);
const [activeTag, setActiveTag] = useState("");

const pushToArray = (array) => {
  setParentAray((prevArray) => [...prevArray, ...array]);
};

const pushSearchArray = () => {
  return [];
};

const getSearch = (search) => {
  setSearch(search);
};

const extractHashtags = (text) => {
  const hashtagRegex = /#(\w+)/gi;
  hashtagRegex.lastIndex = 0;
  if (text === undefined) return [];
  if (text) {
    const hashtags = new Set();
    for (const match of text?.matchAll(hashtagRegex)) {
      if (
        !/[\w`]/.test(match.input.charAt(match.index - 1)) &&
        !/[/\w`]/.test(match.input.charAt(match.index + match[0].length))
      ) {
        hashtags.add(match[1].toLowerCase());
      }
    }

    return [...hashtags];
  }
};

// function getHashList() {
//   // if (parentArray.length >= 10) {
//   for (let i = 0; i < parentArray.length; i++) {
//     const txt = parentArray[i].text;
//     let res = extractHashtags(txt);
//     setHashList((prevHashList)=>[...prevHashList, ...res]);
//   }
//   // } else {
//   //   console.log("0");
//   // }
// }

function getHashList() {
  const hashtagCounts = {};

  for (let i = 0; i < parentArray.length; i++) {
    const txt = parentArray[i].text;
    const hashtags = extractHashtags(txt);

    hashtags.map((tag) => {
      hashtagCounts[tag] = (hashtagCounts[tag] || 0) + 1;
    });
  }

  setHashList(Object.entries(hashtagCounts));
}

const fetchTrendFeed = () => {
  setTrendList(
    parentArray.filter((it) =>
      extractHashtags(it.text).includes(hashList[0][0])
    )
  );

  setPostActive(false);
  setTrendActive(true);
  setActiveTag("");
};
const fetchAllPost = () => {
  setTrendList([]);
  setPostActive(true);
  setTrendActive(false);
  setActiveTag("");
};

useEffect(() => {
  getHashList();
}, [parentArray]);

const singlePosthashTag = (text) => {
  setSinglePostTrendList(
    parentArray.filter((it) => extractHashtags(it.text).includes(text))
  );
  setActiveTag(text);
  setPostActive(false);
  setTrendActive(false);
  setTrendList([]);
  setSearch("");
};

return (
  <div
    className="d-flex flex-column gap-1"
    style={{
      background: "#fefefe",
    }}
  >
    <Widget
      src="vincedev.near/widget/PostxNavbar"
      props={{
        getSearch: getSearch,
        fetchTrendFeed: fetchTrendFeed,
        fetchAllPost: fetchAllPost,
        postActive: postActive,
        trendActive: trendActive,
      }}
    />
    <MainWrapper>
      <childDiv1>
        {activeTag && (
          <div
            style={{
              backgroundColor: "#F3F9FF",
              padding: "24px 40px",
              margin: "8px auto",
              borderRadius: "8px",
              minWidth: "120px",
              maxWidth: "40%",
              fontFamily: "Space Grotesk",
              fontWeight: "bolder",
              fontSize: "28px",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            #{activeTag}
          </div>
        )}
        {search ? (
          <div>
            {parentArray
              .filter((it) => extractHashtags(it.text).includes(search))
              .map((eachP) => (
                <>
                  <Widget
                    loading="loading"
                    src="blessed07.near/widget/post-content"
                    props={{
                      accountId: eachP.accountId,
                      blockHeight: eachP.blockHeight,
                      pushToArray: pushSearchArray,
                      forSearch: true,
                    }}
                  />
                </>
              ))}
          </div>
        ) : trendList?.length > 0 ? (
          <>
            {trendList.map((eachP) => (
              <Widget
                src="blessed07.near/widget/post-content"
                props={{
                  accountId: eachP.accountId,
                  blockHeight: eachP.blockHeight,
                  pushToArray: pushSearchArray,
                  forSearch: true,
                }}
              />
            ))}
          </>
        ) : singlePostTrendList?.length > 0 ? (
          <>
            {singlePostTrendList.map((eachP) => (
              <Widget
                src="blessed07.near/widget/post-content"
                props={{
                  accountId: eachP.accountId,
                  blockHeight: eachP.blockHeight,
                  pushToArray: pushSearchArray,
                  forSearch: true,
                }}
              />
            ))}
          </>
        ) : (
          <Feed
            index={[
              {
                action: "post",
                key: "main",
                options: {
                  limit: 10,
                  order: "desc",
                  accountId: props.accounts,
                },
                cacheOptions: {
                  ignoreCache: true,
                },
              },
              {
                action: "repost",
                key: "main",
                options: {
                  limit: 10,
                  order: "desc",
                  accountId: props.accounts,
                },
                cacheOptions: {
                  ignoreCache: true,
                },
              },
            ]}
            Item={(p) => {
              const item = {
                path: `${p.accountId}/post/main`,
                blockHeight: p.blockHeight,
                type: "social",
              };

              console.log(p);
              // <Widget
              //   loading={
              //     <div className="w-100" style={{ height: "200px" }} />
              //   }
              //   src="vincedev.near/widget/singlePost"
              //   props={{
              //     accountId: p.accountId,
              //     blockHeight: p.blockHeight,
              //   }}
              // />
              return (
                <ContextMenu
                  Item={() => (
                    <>
                      <Widget
                        src="blessed07.near/widget/post-content"
                        props={{
                          accountId: p.accountId,
                          blockHeight: p.blockHeight,
                          pushToArray: pushToArray,
                          forSearch: false,
                        }}
                      />
                    </>
                  )}
                  passProps={{
                    // PROPS THAT WILL BE PASSED TO FUNCTION
                    show: {
                      item,
                    },
                  }}
                  handlers={{
                    // FUNCTION DEFINITIONS
                    show: ({ item }) => {
                      const data = {
                        index: {},
                      };
                      const notifications = ["james.near"].map((accountId) => ({
                        key: accountId,
                        value: {
                          type: "mention",
                          item,
                        },
                      }));

                      if (notifications.length) {
                        Social.set({
                          notify: JSON.stringify(
                            notifications.length > 1
                              ? notifications
                              : notifications[0]
                          ),
                        });
                      }
                    },
                  }}
                  items={{
                    // MENU ITEM TO RENDER, WILL CALL FUNCTION WHEN CLICKED
                    show: () => (
                      <>
                        <i className="menu__item__icon bi bi-arrow-return-right" />
                        Forward
                      </>
                    ),
                  }}
                />
              );
            }}
          />
        )}
      </childDiv1>
      <childDiv2>
        <Widget
          src="vincedev.near/widget/PostXTrendingPost"
          props={{
            hashList: hashList,
            singlePosthashTag: singlePosthashTag,
            activeTag: activeTag,
          }}
        />
      </childDiv2>
    </MainWrapper>
  </div>
);
