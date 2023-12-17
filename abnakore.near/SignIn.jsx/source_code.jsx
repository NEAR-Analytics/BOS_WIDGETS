const accountId = context.accountId;

return (
  <Widget
    src="abnakore.near/widget/Wrapper.jsx"
    props={{
      body: (
        <div className="main-body">
          <h1>Sign In</h1>
          <div className="form">
            <a
              href={
                accountId
                  ? "https://near.org/abnakore.near/widget/App.jsx"
                  : "https://near.org/signin"
              }
            >
              <button className="submit">
                {accountId ? "Home" : "Sign In"}
              </button>
            </a>
            <p className="member">
              {accountId === "abnakore.near" ? (
                <a href="https://near.org/abnakore.near/widget/AdminHome">
                  I'm an Admin
                </a>
              ) : null}
            </p>
          </div>
        </div>
      ),
    }}
  />
);
