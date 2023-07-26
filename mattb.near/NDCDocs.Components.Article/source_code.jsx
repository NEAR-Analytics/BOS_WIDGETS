let { previousArticle, nextArticle } = props;

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

getIndex();

const Main = styled.div`
    display:flex;
    position:relative;
`;

const SideBarWrapper = styled.div`
  min-width:250px;
  position:relative;
`;

const SideBar = styled.div`
    display:flex;
    flex-direction:column;
    position:fixed;
    width:250px;
    height:calc(100vh - 1.5rem);
    border-right:1px solid rgba(0,0,0,.05);
    box-sizing:border-box;
    padding:1.5rem;

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

const ArticleDetails = styled.div`
    margin:auto;
    width:100%;
    min-height:250px;
    box-sizing:border-box;
    border-top: 1px solid rgba(0,0,0,.05);
    padding: .5rem 0;

    .title {
        font-size:.8rem;
        font-weight:bold;
    }

    p {
        padding:0;
        margin:0;
    }

    .title + p {
        font-size:.7rem;
        margin-bottom:10px;
        padding-bottom:10px;
        &:not(:last-of-type) {
            border-bottom: 1px solid rgba(0,0,0,.05);
        }
    }
`;

const Content = styled.div`
    flex-grow:1;
    box-sizing:border-box;
    padding:2rem;
    min-height:100vh;

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

const Controls = styled.div`
  width:100%;
  display:flex;
  justify-content:space-between;
`;

const ControlButton = styled.a`
  display:flex;
  cursor:pointer;
  align-items:center;
  justify-content:center;
  width:250px;
  height:100px;
  border-radius:10px;
  background-color:rgba(0,0,0,.05);
  border: 1px solid rgba(0,0,0,.05);
  box-sizing:border-box;
  padding:1rem;
  margin-top:20px;
  transition: all .2s;
  color:inherit;

  &:not(:last-of-type) {
    margin-right:20px;
  }

  * {
    opacity: .6;
    transition: all .2s;
  }

  &:hover {
    box-shadow:0 0 0 5px rgba(0,0,0,.02);

    * {
      opacity: .8;
      transition: all .2s;
    }
  }

  &.previous {

    div:nth-child(1) {
      transform:rotate(180deg);
    }

    div + div {
      flex-grow:1;
      text-align:right;

      p {
        padding:0;
        margin:0;
      }

      & p:nth-child(1) {
        font-size:.8rem;
      }

      & p:nth-child(2) {
        font-weight:bold;
      }

    }

  }

  &.next {
    flex-direction:row-reverse;

    div + div {
      flex-grow:1;
      text-align:left;

      p {
        padding:0;
        margin:0;
      }

      & p:nth-child(1) {
        font-size:.8rem;
      }

      & p:nth-child(2) {
        font-weight:bold;
      }

    }

  }
`;

return (
  <Main>
    <SideBarWrapper>
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
        <ArticleDetails>
          <p className="title">Published by</p>
          <p>@{state.article.author}</p>
          <p className="title">Last edit by</p>
          <p>@{state.article.lastEditor}</p>
          <p className="title">Modified on</p>
          <p>{getDate(state.article.timeLastEdit)}</p>
          <p className="title">Version</p>
          <p>#{state.article.version}</p>
        </ArticleDetails>
      </SideBar>
    </SideBarWrapper>
    <Content>
      <Wrapper>
        {state.index.map((content) => (
          <div id={content.contentStart} className="markdown">
            <div
              className="link"
              onClick={() =>
                clipboard.writeText(`${path}#${content.contentStart}`)
              }
            >
              🔗
            </div>
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
        {(previousArticle || nextArticle) && (
          <Controls>
            {previousArticle && (
              <ControlButton href={previousArticle.link} className="previous">
                <div>
                  <img
                    src="https://ipfs.near.social/ipfs/bafkreigygnp234eyi5ljtxf7czp5emmhihjxitbl6e4zzuol3wgxsvkhcu"
                    style={{
                      maxWidth: "20px",
                      maxHeight: "20px",
                    }}
                  />
                </div>
                <div>
                  <p>Previous</p>
                  <p>{previousArticle.title}</p>
                </div>
              </ControlButton>
            )}
            {nextArticle && (
              <ControlButton href={nextArticle.link} className="next">
                <div>
                  <img
                    src="https://ipfs.near.social/ipfs/bafkreigygnp234eyi5ljtxf7czp5emmhihjxitbl6e4zzuol3wgxsvkhcu"
                    style={{
                      maxWidth: "20px",
                      maxHeight: "20px",
                    }}
                  />
                </div>
                <div>
                  <p>Next</p>
                  <p>{nextArticle.title}</p>
                </div>
              </ControlButton>
            )}
          </Controls>
        )}
      </Wrapper>
    </Content>
  </Main>
);
