const { tokenId, accountId, balance, usdBalance } = props;
if (!tokenId) {
  throw "Missing tokenId";
}

const bigBalance =
  balance === null || balance === undefined ? null : Big(balance);

const metadata =
  tokenId === "near"
    ? {
        name: "Native NEAR",
        icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNiIgZmlsbD0id2hpdGUiPjwvY2lyY2xlPjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMDAwMDAwMDAwMykiPjxwYXRoIGQ9Ik0yMC44NDIyIDguODQ0NzFMMTcuNDk3OCAxMy43NzZDMTcuNDUwMSAxMy44NDcgMTcuNDMgMTMuOTMyOCAxNy40NDExIDE0LjAxNzRDMTcuNDUyMiAxNC4xMDIgMTcuNDkzOCAxNC4xNzk4IDE3LjU1ODIgMTQuMjM2M0MxNy42MjI1IDE0LjI5MjggMTcuNzA1MyAxNC4zMjQzIDE3Ljc5MTMgMTQuMzI0OUMxNy44NzcyIDE0LjMyNTQgMTcuOTYwNCAxNC4yOTUxIDE4LjAyNTYgMTQuMjM5NUwyMS4zMTc4IDExLjQwMzZDMjEuMzM3MSAxMS4zODY1IDIxLjM2MSAxMS4zNzUzIDIxLjM4NjYgMTEuMzcxNEMyMS40MTIyIDExLjM2NzUgMjEuNDM4MyAxMS4zNzExIDIxLjQ2MTkgMTEuMzgxOEMyMS40ODU1IDExLjM5MjQgMjEuNTA1NCAxMS40MDk2IDIxLjUxOTMgMTEuNDMxNEMyMS41MzMxIDExLjQ1MzEgMjEuNTQwMyAxMS40NzgzIDIxLjU0IDExLjUwNFYyMC4zODI0QzIxLjU0IDIwLjQwOTUgMjEuNTMxNiAyMC40MzYxIDIxLjUxNTggMjAuNDU4M0MyMS41MDAxIDIwLjQ4MDYgMjEuNDc3OSAyMC40OTc1IDIxLjQ1MjIgMjAuNTA2OEMyMS40MjY1IDIwLjUxNiAyMS4zOTg1IDIwLjUxNzIgMjEuMzcyMSAyMC41MTAyQzIxLjM0NTYgMjAuNTAzMSAyMS4zMjIgMjAuNDg4MiAyMS4zMDQ0IDIwLjQ2NzNMMTEuMzUzMyA4LjYzNzI2QzExLjE5MzMgOC40NDk1NiAxMC45OTQgOC4yOTg3MyAxMC43NjkzIDguMTk1MjVDMTAuNTQ0NiA4LjA5MTc4IDEwLjI5OTkgOC4wMzgxNSAxMC4wNTIyIDguMDM4MDlIOS43MDQ0NEM5LjI1MjQgOC4wMzgwOSA4LjgxODg3IDguMjE2NDIgOC40OTkyMiA4LjUzMzg2QzguMTc5NTcgOC44NTEzIDggOS4yODE4NSA4IDkuNzMwNzhWMjIuMjM1MUM4IDIyLjY4NCA4LjE3OTU3IDIzLjExNDUgOC40OTkyMiAyMy40MzJDOC44MTg4NyAyMy43NDk0IDkuMjUyNCAyMy45Mjc3IDkuNzA0NDQgMjMuOTI3N1YyMy45Mjc3QzkuOTk1OTEgMjMuOTI3OCAxMC4yODI1IDIzLjg1MzcgMTAuNTM3IDIzLjcxMjVDMTAuNzkxNCAyMy41NzEzIDExLjAwNTEgMjMuMzY3NyAxMS4xNTc4IDIzLjEyMTFMMTQuNTAyMiAxOC4xODk4QzE0LjU0OTkgMTguMTE4OCAxNC41NyAxOC4wMzMgMTQuNTU4OSAxNy45NDg0QzE0LjU0NzggMTcuODYzOCAxNC41MDYyIDE3Ljc4NjEgMTQuNDQxOCAxNy43Mjk1QzE0LjM3NzUgMTcuNjczIDE0LjI5NDcgMTcuNjQxNSAxNC4yMDg3IDE3LjY0MUMxNC4xMjI4IDE3LjY0MDQgMTQuMDM5NiAxNy42NzA3IDEzLjk3NDQgMTcuNzI2NEwxMC42ODIyIDIwLjU2MjJDMTAuNjYyOSAyMC41Nzk0IDEwLjYzOSAyMC41OTA2IDEwLjYxMzQgMjAuNTk0NEMxMC41ODc4IDIwLjU5ODMgMTAuNTYxNyAyMC41OTQ3IDEwLjUzODEgMjAuNTg0MUMxMC41MTQ1IDIwLjU3MzQgMTAuNDk0NiAyMC41NTYyIDEwLjQ4MDcgMjAuNTM0NUMxMC40NjY5IDIwLjUxMjggMTAuNDU5NyAyMC40ODc1IDEwLjQ2IDIwLjQ2MThWMTEuNTgxM0MxMC40NiAxMS41NTQxIDEwLjQ2ODQgMTEuNTI3NiAxMC40ODQyIDExLjUwNTNDMTAuNDk5OSAxMS40ODMgMTAuNTIyMSAxMS40NjYxIDEwLjU0NzggMTEuNDU2OEMxMC41NzM1IDExLjQ0NzYgMTAuNjAxNSAxMS40NDY0IDEwLjYyNzkgMTEuNDUzNEMxMC42NTQ0IDExLjQ2MDUgMTAuNjc4IDExLjQ3NTUgMTAuNjk1NiAxMS40OTYzTDIwLjY0NTYgMjMuMzI4NkMyMC44MDU2IDIzLjUxNjMgMjEuMDA0OSAyMy42NjcxIDIxLjIyOTYgMjMuNzcwNkMyMS40NTQzIDIzLjg3NCAyMS42OTkgMjMuOTI3NyAyMS45NDY3IDIzLjkyNzdIMjIuMjk0NEMyMi41MTg0IDIzLjkyNzkgMjIuNzQwMSAyMy44ODQyIDIyLjk0NyAyMy43OTkyQzIzLjE1NCAyMy43MTQyIDIzLjM0MiAyMy41ODk1IDIzLjUwMDQgMjMuNDMyNEMyMy42NTg4IDIzLjI3NTIgMjMuNzg0NCAyMy4wODg1IDIzLjg3MDIgMjIuODgzMUMyMy45NTU5IDIyLjY3NzYgMjQgMjIuNDU3NCAyNCAyMi4yMzUxVjkuNzMwNzhDMjQgOS4yODE4NSAyMy44MjA0IDguODUxMyAyMy41MDA4IDguNTMzODZDMjMuMTgxMSA4LjIxNjQyIDIyLjc0NzYgOC4wMzgwOSAyMi4yOTU2IDguMDM4MDlDMjIuMDA0MSA4LjAzODAxIDIxLjcxNzUgOC4xMTIxMSAyMS40NjMxIDguMjUzMzJDMjEuMjA4NiA4LjM5NDUzIDIwLjk5NDkgOC41OTgxNCAyMC44NDIyIDguODQ0NzFWOC44NDQ3MVoiIGZpbGw9ImJsYWNrIj48L3BhdGg+PC9nPjxkZWZzPjxjbGlwUGF0aCBpZD0iY2xpcDAwMDMzIj48cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9ImJsYWNrIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4IDcuOTgzNCkiPjwvcmVjdD48L2NsaXBQYXRoPjwvZGVmcz48L3N2Zz4=",
        symbol: "NEAR",
        decimals: 24,
      }
    : Near.view(tokenId, "ft_metadata");

const { bigToString, MutedDecimals } = VM.require(
  "mob.near/widget/Token.utils"
);

const adjustedBalance =
  !bigBalance || !metadata?.decimals
    ? bigBalance
    : bigBalance.div(Big(10).pow(metadata.decimals));

const name = metadata?.name || "";
const icon = metadata?.icon;
const symbol = metadata?.symbol || tokenId;

const Wrapper = styled.div`
display: flex;
flex-wrap: nowrap;
justify-content: space-between;
.account-badge {
  min-width: 0;
  vertical-align: middle;
  margin-right: 1rem;

}
`;

return (
  <Wrapper>
    <div className="d-inline-block account-badge flex-grow-1">
      <a href={`/mob.near/widget/Tokens?accountId=${accountId}`}>
        <Widget
          src="mob.near/widget/Profile.ShortInlineBlock"
          props={{ accountId }}
        />
      </a>
    </div>
    <div className="font-monospace fw-bold">
      <MutedDecimals
        value={bigToString(adjustedBalance ? adjustedBalance.toString() : null)}
      />
    </div>
    {Big(usdBalance || "0").gt(0) && (
      <div className="font-monospace fw-bold d-inline-flex ms-3">
        <span className="text-secondary">~$</span>
        <MutedDecimals value={bigToString(usdBalance)} />
      </div>
    )}
  </Wrapper>
);
