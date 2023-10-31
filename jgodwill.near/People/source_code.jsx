const WrapSeaerch = styled.div`
input{
    display: flex;
    align-items:center;
    justify-content:space-between;;
    border-radius: 32px;
    flex-shrink: 0;
    height: 48px;
    width: 100%;
    border: 1px solid #B0B0B0;
    background: #F8F8F8;
    overflow: hidden;
    color: #B0B0B0;
    text-overflow: ellipsis;
    font-family: Helvetica Neue;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    outline: none;
    padding: 0 1rem;
    line-height: 148%; /* 29.6px */
    margin-bottom: 1rem;
    p{
      margin: 0;
    }
}`;
return (
  <div>
    <h5 className="text-center my-2">Suggested People</h5>
    <div className="mb-2">
      <WrapSeaerch>
        <Widget
          loading={
            <div className="input-group">
              <input type="text" className="form-control" />
            </div>
          }
          src="mob.near/widget/ProfileSearch"
          props={{
            limit: 10,
            onChange: ({ result }) => State.update({ profiles: result }),
          }}
        />
      </WrapSeaerch>
    </div>
    {state.profiles && state.profiles.length > 0 && (
      <div className="mb-2">
        {state.profiles.map(({ accountId }, i) => (
          <div
            key={accountId}
            className="d-flex justify-content-between align-items-center mb-3"
          >
            <div className="me-2 text-truncate">
              <a
                href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
                className="text-decoration-none link-dark text-truncate"
              >
                <Widget
                  src="mob.near/widget/Profile.InlineBlock"
                  props={{ accountId }}
                />
              </a>
            </div>
            <div className="d-none text-nowrap d-md-block">
              <Widget
                src="mob.near/widget/FollowButton"
                props={{ accountId }}
              />
              <Widget src="mob.near/widget/PokeButton" props={{ accountId }} />
            </div>
          </div>
        ))}
        <hr />
      </div>
    )}

    <Widget src="jgodwill.near/widget/LastProfiles" props={{ limit: 24 }} />
  </div>
);
