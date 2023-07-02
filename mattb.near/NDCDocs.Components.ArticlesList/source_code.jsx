let { writersAllowed } = props;

const ARTICLES_ADDRESS = "ndcWikiArticle";
const ALLOWED_AUTHORS = writersAllowed || [
  "neardigitalcollective.near",
  "blaze.near",
  "jlw.near",
  "kazanderdad.near",
  "joep.near",
  "sarahkornfeld.near",
  "yuensid.near",
  "shubham007.near",
  "psalm.near",
  "fiftycent.near",
];
const ARTICLES_NOT_ALLOWED = [91092435, 91092174, 91051228, 91092223, 91051203];
const WIDGET_AUTHOR = "neardigitalcollective.near";

State.init({
  loaded: false,
});

const postsIndex =
  Social.index(ARTICLES_ADDRESS, "main", {
    order: "desc",
    accountId: undefined,
  }) || [];

const ARTICLES =
  postsIndex &&
  postsIndex
    .reduce((acc, { accountId, blockHeight }) => {
      const postData = Social.get(
        `${accountId}/${ARTICLES_ADDRESS}/main`,
        blockHeight
      );
      const postDataWithBlockHeight = { ...JSON.parse(postData), blockHeight };

      return [...acc, postDataWithBlockHeight];
    }, [])
    .filter((article) =>
      ALLOWED_AUTHORS.some((addr) => addr === article.author)
    )
    .filter((article) => !ARTICLES_NOT_ALLOWED.includes(article.blockHeight));

const FILTERED_ARTICLES =
  ARTICLES.length &&
  ARTICLES.reduce((acc, article) => {
    State.update({ loaded: true });

    if (!acc.some(({ articleId }) => articleId === article.articleId)) {
      return [...acc, article];
    } else {
      return acc;
    }
  }, []);

const getDateLastEdit = (timestamp) => {
  const date = new Date(Number(timestamp));
  const dateString = {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(),
  };
  return dateString;
};

function getName(accountId) {
  return Social.getr(`${accountId}/profile`).name || "-";
}

function getProfileImage(accountId) {
  let image = Social.getr(`${accountId}/profile`).image || {
    ipfs_cid: "",
  };

  return `https://ipfs.near.social/ipfs/${image.ipfs_cid}`;
}

const Main = styled.div`
    width:100%;
    height:100vh;
`;

const ArticlePill = styled.a`
    display:block;
    cursor:pointer;
    width:100%;
    max-width:300px;
    height:200px;
    background-color:rgba(0,0,0,.05);
    border-radius:20px;
    box-sizing:border-box;
    padding:10px;
    border: 2px solid transparent;
    transition: all .2s;
    margin:0 auto 20px;
    text-decoration:none!important;
    color:#000;

    &:hover {
        transition: all .2s;
        border: 2px solid rgb(0,0,0,.02);
    }
`;

const ArticleTitle = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    width:100%;
    max-width:300px;
    height:70%;
    background-color:#fff;
    border-radius:15px;
    box-sizing:border-box;
    padding:20px;

    h1 {
        max-width:200px;
        overflow:hidden;
        text-overflow:ellipsis;
        font-size:1.5rem;
        font-weight:bold;
        margin:0;
        padding:0;

        & ~ p {
          opacity:.4;
          padding:0;
          margin:0;
          font-size:.7rem;
        }
    }
`;

const ArticleDetails = styled.div`
    margin-top:5px;
    display:flex;
    align-items:center;
    width:100%;
    max-width:300px;
    height:30%;
`;

const Wrapper = styled.div`
    h2 {
        font-size:.8rem;
        letter-spacing:-.5px;
        padding:0;
        margin:0;
        margin-left:5px;

        & ~ p {
          opacity:.4;
          padding:0;
          margin:0;
          font-size:.7rem;
          margin-left:5px;
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
    {state.loaded &&
      FILTERED_ARTICLES.map((article) => (
        <>
          <ArticlePill
            href={`#/neardigitalcollective.near/widget/NDCDocs_OneArticle?articleId=${article.articleId}&blockHeight=${article.blockHeight}&lastEditor=${article.lastEditor}
            `}
          >
            <ArticleTitle>
              <div>
                <h1>{article.articleId}</h1>
                <p>Published on {getDateLastEdit(article.timeCreate).date}</p>
                <p>Last edit by {article.lastEditor}</p>
              </div>
              <div>
                <img
                  src="https://ipfs.near.social/ipfs/bafkreigygnp234eyi5ljtxf7czp5emmhihjxitbl6e4zzuol3wgxsvkhcu"
                  style={{
                    maxWidth: "20px",
                  }}
                />
              </div>
            </ArticleTitle>
            <ArticleDetails>
              <Wrapper>
                <Avatar
                  style={{
                    "background-image": `url("${getProfileImage(
                      article.author
                    )}")`,
                  }}
                />
              </Wrapper>
              <Wrapper>
                <h2>{getName(article.author)}</h2>
                <p>@{article.author}</p>
              </Wrapper>
            </ArticleDetails>
          </ArticlePill>
        </>
      ))}
  </>
);
