return (
  <div>
    <h5>People</h5>
    <div className="mb-2">
      <Widget
        src="andyh.near/widget/ProfileSearch"
        props={{
          limit: 10,
          onChange: ({ result }) => State.update({ profiles: result }),
        }}
      />
    </div>
    {state.profiles && state.profiles.length > 0 && (
      <div className="mb-2">
        {state.profiles.map(({ accountId }, i) => (
          <div
            key={i}
            className="d-flex justify-content-between align-items-center mb-3"
          >
            <div className="me-2 text-truncate">
              <a
                href={`#/andyh.near/widget/ProfilePage?accountId=${accountId}`}
                className="text-decoration-none link-dark text-truncate"
              >
                <Widget
                  src="andyh.near/widget/Profile.InlineBlock"
                  props={{ accountId }}
                />
              </a>
            </div>
            <div className="d-none text-nowrap d-md-block">
              <Widget
                src="andyh.near/widget/FollowButton"
                props={{ accountId }}
              />
              <Widget
                src="andyh.near/widget/PokeButton"
                props={{ accountId }}
              />
            </div>
          </div>
        ))}
        <hr />
      </div>
    )}

    {/*<Widget src="andyh.near/widget/LastProfilesImages" props={{ limit: 24 }} />*/}
  </div>
);
