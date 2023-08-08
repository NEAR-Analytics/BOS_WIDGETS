const accountId = props.accountId ?? context.accountId;

if (!accountId) {
  return "Please connect your NEAR account :)";
}

const mutualFollowers = [];

const followers = Social.get(`${accountId}/graph/follow/*`);

if (followers) {
  for (const follower of Object.keys(followers)) {
    if (allAccounts[follower]?.graph?.follow?.[account]) {
      if (!mutualFollowers[account]) {
        mutualFollowers[account] = [];
      }
      mutualFollowers[account].push(follower);
    }
  }
}

const FollowButtonWrapper = styled.div`
  width: 100%;
  padding: 2px;
  display: flex;
  justify-content: space-between;

  div,
  button {
    flex-grow: 1;
    padding: 8px;
    margin: 4px;
  }

  @media (max-width: 1200px) {
    width: auto;
    div,
    button {
      width: auto;
    }
  }
`;

return (
  <>
    <p>{JSON.stringify(followers)}</p>
    {mutualFollowers.map((accountId, i) => (
      <div key={i} className="d-flex border-bottom justify-content-between">
        <div className="d-flex align-items-center">
          <div className="p-3">
            <h5>{i + 1}</h5>
          </div>
          <div className="p-2">
            <Widget src="mob.near/widget/Profile" props={{ accountId }} />
          </div>
        </div>
        <div className="p-1 m-3">
          <Widget src="mob.near/widget/FollowButton" props={{ accountId }} />
        </div>
      </div>
    ))}
  </>
);
