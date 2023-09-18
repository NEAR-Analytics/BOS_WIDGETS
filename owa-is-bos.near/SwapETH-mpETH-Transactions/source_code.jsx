const data = props;

const sender = Ethers.send("eth_requestAccounts", [])[0];
State.init({
  transactions: [],
});

const getTransactions = () => {
  const status = ["verified", "failed"];
  if (!sender) return;
  asyncFetch(
    `https://api.arbiscan.io/api?module=account&action=txlist&address=${sender}&startblock=0&endblock=latest&page=1&offset=20&sort=asc&apikey=37IRPETG28QVXDX98M7IC97BAG2P1FPM2R`
  ).then((res) => {
    if (!res.ok) {
      return;
    }

    const transactions = res.body.result
      .filter((item) => {
        return item.to == "0x09bd2a33c47746ff03b86bce4e885d03c74a8e8c";
      })
      .reverse();
    console.log(transactions);
    State.update({
      transactions: transactions,
    });
  });
};

if (data.state.reloadTransactions) {
  console.log("recargar transacciones");
  data.handleReload;
  getTransactions();
}

getTransactions();

const css = fetch(
  "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/widget.css"
).body;

if (!css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    ${css}
`,
  });
}

const Theme = state.theme;

return (
  <Theme>
    <div class="text-center mt-1">
      <div class="MainContainer" style={{ background: "rgb(238, 238, 238)" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.25 18.25H16.25V16.25C16.25 15.125 15.75 14 14.875 13.125L13.375 11.625L12.625 10.875L12.375 10.75C12.375 10.75 12.25 10.75 12.25 10.625C12.125 10.5 12 10.25 12 10C12 9.75 12.125 9.5 12.25 9.375C12.25 9.375 12.25 9.25 12.375 9.25L12.75 9L12.875 8.75L13.375 8.25L15 6.75C15.875 6 16.25 4.875 16.25 3.75V1.75H17.25C17.75 1.75 18.25 1.375 18.25 1C18.25 0.625 17.875 0.25 17.25 0.25H2.5C2 0.25 1.5 0.625 1.5 1C1.5 1.375 1.875 1.75 2.5 1.75H3.5V3.625C3.5 4.75 4 5.875 4.875 6.75L5.5 7.375L7.125 9L7.25 9.125L7.5 9.25L7.625 9.375C7.75 9.5 7.875 9.75 7.875 10V10.25C7.875 10.375 7.75 10.625 7.625 10.75H7.5L7.25 11L5.5 12.625L4.875 13.25C4 14 3.5 15.125 3.5 16.375V18.375H2.375C1.875 18.375 1.375 18.75 1.375 19.125C1.375 19.5 1.75 19.875 2.375 19.875H17.25C17.75 19.875 18.25 19.5 18.25 19.125C18.25 18.625 17.875 18.25 17.25 18.25ZM5 16.25C5 15.5 5.375 14.75 5.875 14.25L7.625 12.5L9 11.25C9.125 11 9.125 10.875 9.25 10.625C9.25 10.375 9.375 10.25 9.375 10V9.375C9.375 9.25 9.375 9.125 9.25 9V8.875C9 8.75 9 8.75 8.875 8.625L7.5 7.25L5.875 5.625C5.25 5.125 5 4.375 5 3.625V1.75H14.875V3.625C14.875 4.375 14.5 5.125 14 5.625L12 7.5L11.25 8.25L11.125 8.375L11 8.5C10.875 8.75 10.75 9.125 10.75 9.375V9.875C10.75 10.125 10.75 10.25 10.875 10.5C10.875 10.875 11 11.375 11.25 11.625L11.875 12.25L13.875 14.25C14.5 14.75 14.75 15.5 14.75 16.25V18.25H5V16.25Z"
              fill="rgb(12, 34, 70)"
            />
            <path
              d="M10.625 13.375C10.375 13.125 9.875 13.125 9.5 13.375L7.625 15C7.25 15.25 7 15.75 7 16.25V17.125H13V16.25C13 15.875 12.75 15.375 12.375 15L10.625 13.375Z"
              fill="rgb(12, 34, 70)"
            />
          </svg>

          <span
            style={{
              color: "black",
            }}
          >
            {state.transactions.length} Transactions
          </span>
          <span
            style={{
              marginLeft: "8px",
              cursor: "pointer",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgb(12, 34, 70)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              onClick={getTransactions}
            >
              <path d="M2.5 2v6h6M21.5 22v-6h-6" />
              <path d="M22 11.5A10 10 0 0 0 3.2 7.2M2 12.5a10 10 0 0 0 18.8 4.2" />
            </svg>
          </span>
        </div>
        {sender ? (
          state.transactions.length > 0 ? (
            <table className="table table-sm">
              <thead>
                <tr
                  class="p-3 mb-2 text-black text-center"
                  style={{ background: "rgba(255, 255, 255, 0.1)" }}
                >
                  <th>Status</th>
                  <th>Transaction Hash</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {state.transactions.length > 0 &&
                  state.transactions.map((t) => {
                    return (
                      <tr class="text-center text-black">
                        <td>
                          {t.isError.toString() == "1" ? "Error" : "Success"}
                        </td>
                        <td>
                          {t.hash.slice(0, 9) + "..." + t.hash.slice(-9 / 2)}
                        </td>
                        <td>
                          {t.isError.toString() == "1"
                            ? "Transaction failed"
                            : "Transaction executed"}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          ) : (
            <span class="text-black">
              No pending transactions found, reload to check again
            </span>
          )
        ) : (
          <Web3Connect
            className="ConfirmButton ConfirmText"
            connectLabel="Connect Wallet"
          />
        )}
      </div>
    </div>
  </Theme>
);
