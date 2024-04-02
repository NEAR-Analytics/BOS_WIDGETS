const ownerId = context.accountId;
const contract = "tkn.near";

State.init({
  totalSupply: "",
  tokenName: "",
  tokenSymbol: "",
  tokenIcon: "",
  tokenDecimals: "",
});

const onInputChange =
  (key) =>
  ({ target: { value } }) => {
    State.update({ [key]: value });
  };

const onCreateBtnClick = () => {
  if (
    state.totalSupply &&
    state.tokenName &&
    state.tokenSymbol &&
    state.tokenDecimals
  ) {
    const decimals = parseInt(state.tokenDecimals);
    const actualTotalSupply = state.totalSupply + "0".repeat(decimals);

    Near.call([
      {
        contractName: contract,
        methodName: "create_token",
        args: {
          args: {
            owner_id: ownerId,
            total_supply: actualTotalSupply,
            metadata: {
              spec: "ft-1.0.0",
              name: state.tokenName,
              symbol: state.tokenSymbol,
              icon: state.tokenIcon || null,
              decimals: decimals,
            },
          },
        },
        deposit: 3000000000000000000000000,
      },
    ]);
  } else {
    alert("Please fill in all required fields.");
  }
};

return (
  <>
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h1 class="text-center mb-4">tkn token minter</h1>
          <div class="card shadow">
            <div class="card-body">
              <p class="card-text">
                Here you can create a new token on NEAR using the tkn.near
                contract.
              </p>
              {context.accountId ? (
                <div class="border border-secondary rounded p-3">
                  <div class="form-group mb-4">
                    <label for="ownerId">Owner ID</label>
                    <input
                      id="ownerId"
                      class="form-control form-control-lg"
                      value={ownerId}
                      disabled
                    />
                    <small class="form-text text-muted">
                      This is the account ID of the token owner, which is the
                      currently logged-in account.
                    </small>
                  </div>
                  <div class="form-group mb-4">
                    <label for="totalSupply">
                      Total Supply <span class="text-danger">*</span>
                    </label>
                    <input
                      id="totalSupply"
                      class="form-control form-control-lg"
                      placeholder="1000000"
                      onChange={onInputChange("totalSupply")}
                    />
                    <small class="form-text text-muted">
                      This is the total number of tokens you want to create,
                      without considering the decimal places. The actual total
                      supply will be calculated based on this value and the
                      number of decimal places you specify.
                    </small>
                  </div>
                  <div class="form-group mb-4">
                    <label for="tokenName">
                      Token Name <span class="text-danger">*</span>
                    </label>
                    <input
                      id="tokenName"
                      class="form-control form-control-lg"
                      placeholder="Test Coin"
                      onChange={onInputChange("tokenName")}
                    />
                    <small class="form-text text-muted">
                      This is the human-readable name of your token.
                    </small>
                  </div>
                  <div class="form-group mb-4">
                    <label for="tokenSymbol">
                      Token Symbol <span class="text-danger">*</span>
                    </label>
                    <input
                      id="tokenSymbol"
                      class="form-control form-control-lg"
                      placeholder="TEST"
                      onChange={onInputChange("tokenSymbol")}
                    />
                    <small class="form-text text-muted">
                      This is the abbreviated symbol for your token, usually 3-5
                      uppercase letters.
                    </small>
                  </div>
                  <div class="form-group mb-4">
                    <label for="tokenIcon">Token Icon (optional)</label>
                    <input
                      id="tokenIcon"
                      class="form-control form-control-lg"
                      placeholder="data:image/jpeg;base64,/9j/..."
                      onChange={onInputChange("tokenIcon")}
                    />
                    <small class="form-text text-muted">
                      This is the Base64-encoded image data for your token icon.
                      You can use a service like{" "}
                      <a
                        href="https://www.base64-image.de/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        base64-image.de
                      </a>{" "}
                      to convert your image to Base64.
                    </small>
                  </div>
                  <div class="form-group mb-4">
                    <label for="tokenDecimals">
                      Token Decimals <span class="text-danger">*</span>
                    </label>
                    <input
                      id="tokenDecimals"
                      class="form-control form-control-lg"
                      placeholder="18"
                      onChange={onInputChange("tokenDecimals")}
                    />
                    <small class="form-text text-muted">
                      This is the number of decimal places for your token.
                    </small>
                  </div>
                  <button
                    class="btn btn-primary btn-lg btn-block mt-4"
                    onClick={onCreateBtnClick}
                  >
                    <i class="fas fa-plus-circle"></i> Create Token
                  </button>
                </div>
              ) : (
                <div class="alert alert-warning text-center mb-0" role="alert">
                  Please log in to create a new token.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
