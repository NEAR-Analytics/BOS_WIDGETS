const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading";
}

const description = profile.description;

const pills = [{ id: "posts", title: "Posts" }];

return (
  <>
    <div className="col-lg-8 mx-auto">
      {description && (
        <div className="border rounded-4 p-3 pb-0 mb-3 text-break">
          <h4>
            <i class="bi bi-pin-angle" /> Bio
          </h4>
          <Markdown text={description} />
        </div>
      )}
      <Widget
        src="sharddog.near/widget/MainPage.Feed.Beta"
        props={{ accounts: [accountId] }}
      />
    </div>
  </>
);
