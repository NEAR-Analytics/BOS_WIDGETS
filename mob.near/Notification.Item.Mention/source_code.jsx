const { accountId, value, blockHeight } = props;

return (
  <Widget
    loading={props.loading}
    src="mob.near/widget/Notification.Item.LR"
    props={{
      L: (
        <>
          mentioned you in their
          {value.item.path === `${accountId}/post/main` ? (
            <a
              className="fw-bold text-muted"
              href={`/mob.near/widget/MainPage.N.Post.Page?accountId=${accountId}&blockHeight=${blockHeight}`}
            >
              post
            </a>
          ) : value.item.path === `${accountId}/post/comment` ? (
            <a
              className="fw-bold text-muted"
              href={`/mob.near/widget/MainPage.N.Comment.Page?accountId=${accountId}&blockHeight=${blockHeight}`}
            >
              comment
            </a>
          ) : (
            "item???"
          )}
        </>
      ),
      R:
        value.item.path === `${accountId}/post/main` ? (
          <a
            className="btn btn-outline-dark rounded-5"
            href={`/mob.near/widget/MainPage.N.Post.Page?accountId=${accountId}&blockHeight=${blockHeight}`}
          >
            View post
          </a>
        ) : value.item.path === `${accountId}/post/comment` ? (
          <a
            className="btn btn-outline-dark rounded-5"
            href={`/mob.near/widget/MainPage.N.Comment.Page?accountId=${accountId}&blockHeight=${blockHeight}`}
          >
            View comment
          </a>
        ) : (
          ""
        ),
      ...props,
    }}
  />
);
