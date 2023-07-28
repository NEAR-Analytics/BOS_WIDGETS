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
  coverImage: null,
  article: null,
  showMenu: false,
});

State.update({
  article:
    JSON.parse(
      Social.get(`${lastEditor}/${addressForArticles}/main`, blockHeight)
    ) || {},
});

function getIndex() {
  let titles = [];

  state.article.body.split("\n").map((line, idx) => {
    if (line[0] === "!") {
      State.update({ coverImage: line.substring(0, line.length).trim() });
    }
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

console.log(state.coverImage);

const Main = styled.div`
    display:flex;
    position:relative;
    overflow:hidden;
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

return (
  <>
    <Widget
      src={`${OWNER_ACCOUNT}/widget/NDCDocs.Components.Header`}
      props={{
        onClick: (newState) => State.update({ showMenu: newState }),
      }}
    />
    <Main>
      <Widget
        src={`${OWNER_ACCOUNT}/widget/NDCDocs.Components.SideBar`}
        props={{
          showMenu: state.showMenu,
          article: state.article,
          index: state.index,
        }}
      />
      <Content>
        <Wrapper>
          <Widget
            src={`${OWNER_ACCOUNT}/widget/NDCDocs.Components.ArticleContent`}
            props={{
              article: state.article,
              index: state.index,
              converImage: state.coverImage,
            }}
          />
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
