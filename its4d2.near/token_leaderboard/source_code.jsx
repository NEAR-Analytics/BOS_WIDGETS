const accountId = context.accountId;

State.init({
  tokenName: "",
  holders: {},
  loading: false,
});

const onTokenNameChange = ({ target: { value } }) => {
  State.update({ tokenName: value });
};

const fetchHolders = () => {
  State.update({ loading: true });

  asyncFetch(`https://api.fastnear.com/v1/ft/${state.tokenName}/top`)
    .then((res) => {
      if (!res.ok) {
        console.error("Failed to fetch token holders", res);
        return;
      }

      State.update({
        holders: Object.fromEntries(
          (res.body.accounts || [])
            .filter(({ balance }) => !!balance)
            .map(({ account_id, balance }) => [account_id, balance])
        ),
      });
    })
    .finally(() => State.update({ loading: false }));
};

const onSearchClick = () => {
  fetchHolders();
};

const searchForm = (
  <>
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control form-control-lg"
        placeholder="Enter token contract account"
        onChange={onTokenNameChange}
        data-bs-toggle="tooltip"
        title="Enter the contract account of the token you want to check the holder rankings for."
      />
      <button
        class="btn btn-primary btn-lg"
        type="button"
        onClick={onSearchClick}
        data-bs-toggle="tooltip"
        title="Click to fetch the token holder rankings."
      >
        🔎
      </button>
    </div>
  </>
);

const Wrapper = styled.div`
  .table {
    table-layout: fixed;
    word-wrap: break-word;
  }

  .table th,
  .table td {
    vertical-align: middle;
  }

  .table .rank {
    width: 1px;
    white-space: nowrap;
  }

  .table .account {
    width: 60%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .table .balance {
    width: 30%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: right;
  }
`;

// Render
return (
  <Wrapper>
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <h1 class="text-center mb-4">Token Leaderboard</h1>
          <div class="card shadow">
            <div class="card-body">
              <p class="text-muted">
                Here you can check the top 100 holders for a given token. Simply
                enter the token contract account and click the search button.
              </p>
              {searchForm}
              {state.loading ? (
                <div class="text-center">
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div class="table-responsive">
                  <table class="table table-striped mb-0">
                    <thead>
                      <tr>
                        <th class="rank">Rank</th>
                        <th class="account">Account</th>
                        <th class="balance">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(state.holders).map(
                        ([account_id, balance], index) => (
                          <tr key={account_id}>
                            <td class="rank">{index + 1}</td>
                            <td
                              class="account"
                              title={account_id}
                              data-bs-toggle="tooltip"
                            >
                              {account_id}
                            </td>
                            <td
                              class="balance"
                              title={balance}
                              data-bs-toggle="tooltip"
                            >
                              {balance}
                            </td>
                          </tr>
                        )
                      )}
                      {Object.keys(state.holders).length === 0 && (
                        <tr>
                          <td colspan="3" class="text-center">
                            No holder data found for this token.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Wrapper>
);
