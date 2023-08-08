const {
  finalArticles,
  tabs,
  widgets,
  handleOpenArticle,
  handleFilterArticles,
  authorForWidget,
} = props;

console.log("SAL ALSBA");

const authors =
  finalArticles.length && Array.from(finalArticles, ({ author }) => author);
// const uniqAuthors = Array.from(new Set(authors));

const getAuthorsStats = (acc, author) => {
  if (!acc.hasOwnProperty(author)) {
    acc[author] = 0;
  }
  acc[author] += 1;
  return acc;
};

const countAuthors = (arr) => arr.reduce(getAuthorsStats, {});

const authorsCountObject = finalArticles.length && countAuthors(authors);

const authorsCountArray =
  finalArticles.length && Object.entries(authorsCountObject);

return (
  <div className="container-fluid">
    <h6>Total authors: {authorsCountArray.length}</h6>

    <div className="row card-group py-3">
      {authorsCountArray &&
        authorsCountArray.map(([author, quantity]) => {
          const filter = { filterBy: "author", value: author };
          return (
            <Widget
              src={widgets.articlesByAuthorCard}
              props={{ author, quantity, filter, handleFilterArticles }}
            />
          );
        })}
    </div>
  </div>
);
