let {
  previousArticleLink,
  nextArticleLink,
  previousArticleName,
  nextArticleName,
} = props;

const OWNER_ACCOUNT = "mattb.near";
const addressForComments = "NDCDOCS-comments";
const addressForArticles = "ndcWikiArticle";
const authorForWidget = "neardigitalcollective.near";
const accountId = props.accountId || context.accountId;

const lastEditor = props.lastEditor;
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const subscribe = !!props.subscribe;
const raw = !!props.raw;

const path = `${context.widgetSrc}?lastEditor=${lastEditor}&blockHeight=${blockHeight}&subscribe=${subscribe}&raw=${raw}`;

const notifyAccountId = accountId;

State.init({
  currentSection: 0,
  index: null,
  article: null,
  showMenu: false,
});

State.update({
  article:
    JSON.parse(
      Social.get(`${lastEditor}/${addressForArticles}/main`, blockHeight)
    ) || {},
});

const getDate = (timestamp) => {
  const date = new Date(Number(timestamp));
  return date.toDateString();
};

function getIndex() {
  let titles = [];

  state.article.body.split("\n").map((line, idx) => {
    if (line[0] === "#" && line[1] !== "#") {
      titles = titles.map((title) => {
        if (title.contentEnd == null) {
          title.contentEnd = idx - 1;
        }
        return title;
      });

      titles.push({
        title: line.substring(1, line.length).trim(),
        contentStart: idx,
        contentEnd: null,
      });
    }
  });

  State.update({ index: titles });
}

function getProfileImage(accountId) {
  let image = Social.getr(`${accountId}/profile`).image || {
    ipfs_cid: "",
  };

  return `https://ipfs.near.social/ipfs/${image.ipfs_cid}`;
}

function getName(accountId) {
  return Social.getr(`${accountId}/profile`).name || "-";
}

getIndex();

const Main = styled.div`
    display:flex;
    position:relative;
    overflow:hidden;
`;

const SideBarWrapper = styled.div`
  min-width:250px;
  position:relative;
  z-index:99999;
  height:100vh;
  display:none;

  @media screen and (max-width:800px) {
    position:absolute;
    left:0;
    background-color:#fff;
    width:100%;
  }

  &.show {
    display:block;
  }
`;

const SideBar = styled.div`
    display:flex;
    flex-direction:column;
    width:250px;
    height:calc(100vh - 1.5rem);
    border-right:3px solid rgba(0,0,0,.02);
    box-sizing:border-box;
    padding:1.5rem;
    background-color:#fff;

    @media screen and (max-width:800px) {
      width:100%;
    }

    h1 {
      font-size:1.4rem;
      font-weight:bold;
    }

    div:nth-child(1) {
        flex-grow:1;
        overflow-y:auto;
    }

    ul {
        list-style:none;

        li {
            cursor:pointer;
            position:relative;

            a {
              color:#000;
            }
            
            h2 {
                font-size:.8rem;
                padding:.5rem;
                transition: all .2s;
            }

            &::after {
                position:absolute;
                top:0;
                bottom:0;
                left:-10px;
                margin:auto;
                content: '';
                width:5px;
                height:5px;
                border-radius:100%;
                background-color:#E5E5E5;
                box-shadow: 0 0 0 4px #fff;
                transition: all .2s;
            }

            &:not(:last-of-type) {
                &::before {
                    content: '';
                    position:absolute;
                    width:2px;
                    height:100%;
                    left:-8.5px;
                    background-color:#E5E5E5;
                    transform:translateY(50%);
                    
                }
            }

            &.selected {
                h2 {
                    position:relative;
                    transition: all .2s;
                    font-weight:bold;
                }

                &::after {
                    transition: all .2s;
                    width:10px;
                    height:10px;
                    left:-12.5px;
                }
            }
        }
    }
`;

const Content = styled.div`
    flex-grow:1;
    box-sizing:border-box;
    padding:2rem;
    min-height:100vh;

    @media screen and (min-width:800px) {
      padding:1.2rem;
    }

    h1 {
        font-weight:bold;
    }

    .markdown {
      position:relative;
      padding:10px 0;

      .link {
        cursor:pointer;
        opacity:0;
        width:20px;
        height:20px;
        position:absolute;
        top:15px;
        left:-20px;
        transition:all .2s;
      }

      &:hover {
        .link {
          opacity:.7;
          transition:all .2s;
        }
      }
      
      &:first-of-type {
        padding-top:0;

        .link {
          top:5px;
        }
      }
    }
`;

const Wrapper = styled.div`
  max-width:800px;
  margin:0 auto;

  & > div > img, & > div > p img {
      display:block;
      height:400px;
      border-radius:20px;
      background-color:rgba(0,0,0,.05);
      margin:30px auto;
  }

  h1 {
    font-size:1.8rem;
    margin-bottom:13px;

    &:first-of-type {
      margin-top:0;
    }
  }

  h4 {
    font-size:1.2rem;
  }

`;

const Header = styled.div`
  position:relative;
  box-sizing:border-box;
  padding:1rem;
  align-items:center;
  width:100%;
  display:flex;
  border-bottom:1px solid rgba(0,0,0,.05);
  background-color:#fff;
  z-index:9999;

  @media screen and (max-width: 800px) {
    position:fixed;
  }

  > p {
    margin:0;
    padding:0;
    margin-left:10px;
    font-weight:bold;
  }
`;

const HeaderWrapper = styled.div`
    position:relative;
    height:70px;
    
    @media screen and (max-width:800px) {
        display:block;
    }
`;

const MenuButton = styled.div`
    cursor:pointer;
    width:40px;
    height:40px;
    border-radius:10px;
    background-color:rgba(0,0,0,.05);
    background-image:url(https://ipfs.near.social/ipfs/bafkreiexzn4c2sc53i5k5u7zaazdkf6j2zhzvifsxp7skcucwaxm46aggi);
    background-position:center;
    background-repeat:no-repeat;
    background-size:20px 20px;
    transition: all .2s;
    border: 2px solid rgba(0,0,0,.0);

    &:hover {
        transition: all .2s;
        box-shadow: 0 0 10px 5px rgba(0,0,0,.02);
        border: 2px solid rgba(0,0,0,.02);
    }

`;

const ArticleDetails = styled.div`
    display:flex;
    margin:auto;
    width:100%;
    box-sizing:border-box;
    padding: .5rem 0;
    margin:0 auto 1rem;

    div:first-of-type {
      display:flex;
      align-items:center;
    }

    div + div {
      padding-left:10px;

      .name {
        font-weight:bold;
        margin:0;
      }

      .handle, .last-modification {
        font-size:.7rem;
        margin:0;
        opacity:.5;
      }

      .last-modification {
        opacity:.5;
      }

    }
`;

const Avatar = styled.div`
    border-radius:100%;
    width:40px;
    height:40px;
    background-color:rgba(0,0,0,.05);
    background-position:center;
    background-size:cover;
    background-repeat:no-repeat;
`;

return (
  <>
    <HeaderWrapper>
      <Header>
        <MenuButton
          onClick={() => State.update({ showMenu: !state.showMenu })}
        ></MenuButton>
        <p>NDCDocs</p>
      </Header>
    </HeaderWrapper>
    <Main>
      <SideBarWrapper className={state.showMenu ? "show" : ""}>
        <SideBar>
          <div>
            <h1>{state.article.articleId}</h1>
            <ul>
              {state.index.map((obj, key) => (
                <li
                  onClick={() => State.update({ currentSection: key })}
                  className={key === state.currentSection ? "selected" : ""}
                >
                  <a href={`#${obj.contentStart}`}>
                    <h2>{obj.title}</h2>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </SideBar>
      </SideBarWrapper>
      <Content>
        <Wrapper>
          <ArticleDetails>
            <div>
              <Avatar
                style={{
                  "background-image": `url("${getProfileImage(
                    state.article.author
                  )}")`,
                }}
              ></Avatar>
            </div>
            <div>
              <p className="name">{getName(state.article.author)}</p>
              <p className="handle">
                @{state.article.author} ·{" "}
                <strong>{getDate(state.article.timeCreate)}</strong>
              </p>
              <p className="last-modification">
                Last edit by <strong>@{state.article.lastEditor}</strong> on{" "}
                <strong>{getDate(state.article.timeLastEdit)}</strong>
              </p>
            </div>
          </ArticleDetails>
          {state.index.map((content) => (
            <div id={content.contentStart} className="markdown">
              <OverlayTrigger
                key={content.contentStart}
                placement="left"
                overlay={<Tooltip id={`tooltip-left`}>Copy link</Tooltip>}
              >
                <div
                  className="link"
                  onClick={() =>
                    clipboard.writeText(`${path}#${content.contentStart}`)
                  }
                >
                  🔗
                </div>
              </OverlayTrigger>
              <Markdown
                text={state.article.body
                  .split("\n")
                  .slice(
                    content.contentStart,
                    content.contentEnd || state.article.body.split("\n").length
                  )
                  .join("\n")}
              />
            </div>
          ))}
        </Wrapper>
        <Widget
          src={`${OWNER_ACCOUNT}/widget/NDCDocs.Components.Controls`}
          props={{
            previousArticle: {
              link: previousArticleLink,
              name: previousArticleName,
            },
            nextArticle: {
              link: nextArticleLink,
              name: nextArticleName,
            },
          }}
        />
      </Content>
    </Main>
  </>
);
