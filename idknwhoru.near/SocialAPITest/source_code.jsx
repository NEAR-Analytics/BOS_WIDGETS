State.init({
  article: undefined,
});

if (state.article === undefined) {
  const index = Social.index("collegium.post", "main", {
    order: "desc",
    limit: 10,
  });

  const posts = index.filter(({ value }) => value.title !== undefined);

  const getPost = ({ accountId, title }) => {
    const content = Social.get(`${accountId}/collegium/post/${title}`);

    if(content !== undefined) {
      State.update({
      article: {
        accountId,
        title,
        content,
      },
    });
    }
  };

  const Post = posts.map(({ accountId, value: { title: title } }) => {
    return (
      <div>
        <h1 onClick={(_) => getPost({ accountId, title })}>{title}</h1>
        <p>{accountId}</p>
      </div>
    );
  });

  return <>{Post}</>;
}

return (
  <>
    <button onClick={(_) => State.update({ article: undefined })}>
      뒤로가기
    </button>
    <h1>{state.article.title}</h1>
    <p>{state.article.accountId}</p>
    <Markdown text={state.article.content} />
  </>
);
