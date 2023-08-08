const {
  finalArticles,
  tabs,
  widgets,
  handleOpenArticle,
  handleFilterArticles,
  authorForWidget,
} = props;

const GeneralContainer = styled.div`
  background-color: rgb(230, 230, 230);
  border-radius: 20px;
  padding: 0;
`;

const SecondContainer = styled.div`
  margin: 0 auto;
  width: 90%;
  min-width: 360px;
`;

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
  <GeneralContainer className="container-fluid">
    <SecondContainer>
      <h6>Total authors: {authorsCountArray.length}</h6>

      <div className="row card-group py-3">
        {authorsCountArray &&
          authorsCountArray.map(([author, quantity]) => {
            const filter = { filterBy: "author", value: author };
            return (
              <div className="col-sm-12 col-lg-6 col-xl-4 gy-3">
                <div
                  className="card h-100 p-3"
                  key={article.articleId}
                  onClick={handleFilterArticles(filter)}
                >
                  <Widget
                    src="mob.near/widget/Profile.ShortInlineBlock"
                    props={{ accountId: author, tooltip: true }}
                  />
                  <span>{quantity} articles</span>
                </div>
              </div>
            );
          })}
      </div>
    </SecondContainer>
  </GeneralContainer>
);
