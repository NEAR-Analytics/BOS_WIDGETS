const {
  finalArticles,
  tabs,
  widgets,
  handleOpenArticle,
  handleFilterArticles,
  authorForWidget,
} = props;

const authors =
  finalArticles.length && Array.from(finalArticles, ({ author }) => author);

console.log("authors: ", authors);

let articlesByAuthorsArray = [];
authors.map((author) => {
  let thisAuthorArtciles = finalArticles.filter(
    (article) => article.author == author
  );
  articlesByAuthorsArray.push(thisAuthorArtciles);
});

console.log("articlesByAuthorsArray: ", articlesByAuthorsArray);

return (
  <div className="container-fluid">
    <h6>Total authors: {articlesByAuthorsArray.length}</h6>

    <div className="row card-group py-3">
      {articlesByAuthorsArray &&
        articlesByAuthorsArray.map((authorArticlesArray) => {
          const filter = {
            filterBy: "author",
            value: authorArticlesArray[0].author,
          };
          return (
            <Widget
              src={widgets.articlesByAuthorCard}
              props={{ authorArticlesArray, filter, handleFilterArticles }}
            />
          );
        })}
    </div>
  </div>
);
