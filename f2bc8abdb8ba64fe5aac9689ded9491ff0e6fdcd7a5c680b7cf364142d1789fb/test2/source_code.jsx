State.init({ articleId: "" });

return (
  <input
    className="form-control mt-2"
    id="inputArticleId"
    value={state.articleId}
    onChange={(e) => {
      State.update({
        articleId: e.target.value.replace(/\s+/g, ""),
      });
    }}
  />
);
