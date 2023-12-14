const themeColor = props.themeColor;
const explor_balance_collectibles_theme = themeColor?.explor_balance
  ?.collectibles || { color: "#000", card_bg: "#f0f0f0" };
const accountId = props.accountId ?? context.accountId ?? "";

const operationsDoc = `
  query MyQuery {
    mb_views_nft_tokens(
      order_by: {last_transfer_timestamp: desc}
      where: {owner: {_eq: "${accountId}"}, _and: {burned_timestamp: {_is_null: true}, last_transfer_timestamp: {}}}
    ) {
      nft_contract_id
      title
      description
      media
      last_transfer_receipt_id
      metadata_id
      token_id
      nft_contract_name
      nft_contract_icon
    }
  }
`;

State.init({
  searchedAccountId: "",
  result: {},
  isLoading: true,
  error: [],
});

const checkNewAccountId = () => {
  if (state.searchedAccountId === accountId) {
    return;
  } else {
    State.update({
      searchedAccountId: accountId,
      result: {},
      isLoading: true,
    });
  }
};
checkNewAccountId();

const handleData = () => {
  const result = fetchData();
  if (result.isLoading) {
    State.update({
      isLoading: true,
      result: {
        isLoading: true,
        error: false,
        data: null,
      },
    });
  }
  if (result.error) {
    const errors = state.error;
    errors.push(`${result.error}`);
    State.update({
      error: errors,
      isLoading: false,
      result: {
        isLoading: false,
        error: true,
        data: null,
      },
    });
  }
  if (result.data) {
    State.update({
      isLoading: false,
      result: {
        isLoading: false,
        error: false,
        data: result.data.data.mb_views_nft_tokens,
      },
    });
  }
};

const fetchData = () => {
  const data = fetch(`https://graph.mintbase.xyz/mainnet`, {
    method: "POST",
    headers: {
      "mb-api-key": "anon",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: {},
      operationName: "MyQuery",
    }),
  });
  const result = {
    data: (data && data.body) || null,
    error: (data && !data.ok && (data.status || data.error)) || null,
    isLoading: !data && !error,
  };
  return result;
};

if (state.isLoading) {
  handleData();
}

// error managment #######################
if (state.error.length > 0) {
  function hide() {
    const errors = state.error;
    errors.shift();
    if (errors.length > 0) setTimeout(hide, 2500);
    State.update({ error: errors });
  }
  setTimeout(hide, 2500);
}

// ----------------------------------------------------
const noData = <div className="w-100 py-4 text-center"> No data available</div>;
const CardIsLoading = () =>
  state.isLoading && (
    <div
      className="d-flex flex-column gap-1"
      style={{
        padding: "60px 12px",
      }}
    >
      <Widget
        src={`easypoll-v0.ndc-widgets.near/widget/Common.Spinner`}
        props={{
          ...spinnerColors,
        }}
      />
      <span
        style={{
          fontWeight: "bold",
          fontsize: 15,
          color: "#4f46e5",
          textAlign: "center",
        }}
      >
        Loading...
      </span>
    </div>
  );
const CardHasError = () =>
  state.result.error && (
    <div className="d-flex justify-content-center align-items-center h-100 p-4 pb-1">
      An error occurred for this section
    </div>
  );

const Result =
  state.result.data.length > 0 ? (
    <div className="row g-2">
      {state.result.data.map((nft) => (
        <div key={nft.contract_id + nft.token_id} className="col-md-6 col-lg-4">
          <div
            className="p-2 d-flex flex-column align-items-center h-100 rounded-4"
            style={{
              backgroundColor:
                explor_balance_collectibles_theme?.card_bg || "#eee",
              cursor: "pointer",
            }}
          >
            <img
              style={{ marginBottom: "1rem" }}
              height={60}
              width={60}
              layout="intrinsic"
              src={
                nft.media ??
                "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
              }
            />
            <div
              style={{
                fontWeight: 500,
                fontSize: "1.125rem",
                textAlign: "center",
                color: explor_balance_collectibles_theme?.color || "#000",
              }}
            >
              <div>{nft.title}</div>
              <div
                style={{
                  overflowWrap: "break-word",
                  wordWrap: "break-word",
                  wordBreak: "break-word",
                }}
              >
                [{nft.token_id}]
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    noData
  );
return (
  <>
    {CardIsLoading()}
    {CardHasError()}

    {state.result.data && Result}
  </>
);
