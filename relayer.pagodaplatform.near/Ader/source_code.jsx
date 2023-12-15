const children = props.children;

const tailwindCssUrl =
  "https://cdn.jsdelivr.net/npm/tailwindcss@2.2/dist/tailwind.min.css";

State.init({
  theme: null,
  walletAddress: null,
});

const tailwindCss = fetch(tailwindCssUrl).body;

if (!tailwindCss) return "tailwind css not load";

if (!state.theme) {
  State.update({
    theme: styled.div`
      ${tailwindCss}
    `,
  });
}

State.update({
  walletAddress: Ethers.send("eth_requestAccounts", [])[0],
});

const Theme = state.theme;

return (
  <Theme>
    <div className="flex">
      <div className="p-2">
        {state.walletAddress}
        <div className="">
          <Web3Connect className="bg-white hover:text-red-500" />
        </div>
      </div>
    </div>
  </Theme>
);
