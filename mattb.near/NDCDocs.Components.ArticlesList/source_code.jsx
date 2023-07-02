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

return <div>{state.loaded ? "Hello World" : "Loading..."}</div>;
