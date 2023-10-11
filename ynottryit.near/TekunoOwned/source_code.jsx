const accountId = context.accountId;

const contractId = "tekuno.near";

State.init({
  nftData: [],
  metadata: null,
  daisyUiTheme: "light",
  supportedThemes: [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
  ],
});

if (accountId) {
  const metadata = Near.view(contractId, "nft_metadata");

  const data = Near.view(contractId, "nft_tokens_for_owner", {
    account_id: accountId,
  });

  State.update({ metadata });
  State.update({ nftData: data });
}

const content = (
  <div className="bg-base-300 p-4">
    <div className="navbar bg-base-100 rounded-box">
      <div className="flex-1 px-2 lg:flex-none">
        <img
          style={{
            height: "20px",
            marginRight: "8px",
          }}
          src="https://i.imgur.com/BF6sZhU.png"
          alt="Tekuno Logo"
        />
        <a className="text-lg font-bold text-base-content">Tekuno</a>
      </div>

      <div className="flex justify-end flex-1 px-2">
        <div className="flex items-stretch">
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost gap-2 rounded-btn text-base-content"
            >
              <svg
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                ></path>
              </svg>

              {state.daisyUiTheme}
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4 max-h-52 overflow-auto"
            >
              {state.supportedThemes.map((theme) => (
                <li onClick={() => State.update({ daisyUiTheme: theme })}>
                  <a className="text-base-content">
                    {theme}
                    {state.daisyUiTheme === theme ? "✓" : ""}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <a
            href="https://tekuno.app"
            className="btn btn-ghost rounded-btn text-base-content"
          >
            Go To Tekuno
          </a>
        </div>
      </div>
    </div>

    {accountId && (
      <div className="flex flex-col justify-center align-items-center my-4">
        <button className="btn btn-lg gap-2 flex flex-col justify-center align-items-center">
          <span>{accountId}</span>
          <div className="badge badge-secondary">
            {state.nftData.length ?? 0} NFTs owned
          </div>
        </button>
      </div>
    )}

    {!accountId && (
      <div className="alert shadow-sm mt-4 bg-base-200">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6 text-base-content"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="text-base-content">Please connect your wallet</span>
        </div>
      </div>
    )}

    {accountId && state.nftData.length === 0 && (
      <div className="alert shadow-md">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6 text-base-content"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="text-base-content">
            You don't have any Tekuno NFTs 😔. Follow us and find some campaigns
            where you can claim them.
          </span>
        </div>
      </div>
    )}

    {state.nftData.length > 0 && (
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {state.nftData.map((nft) => (
          <div className="card bg-base-100 shadow-xl">
            <img
              className="h-48 w-48 mx-auto mt-4"
              src={`${state.metadata.base_uri}/${nft.metadata.media}`}
              alt={nft.metadata.title}
            />
            <div className="card-body">
              <h2 className="card-title text-base-content">
                {nft.metadata.title}
              </h2>
              <p className="text-base-content">{nft.metadata.description}</p>
              <div className="card-actions justify-end mt-1">
                <a
                  target="_blank"
                  href={`https://nearblocks.io/nft-token/tekuno.near/${nft.token_id}`}
                  className="btn btn-primary"
                >
                  More information
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

return (
  <Widget
    src="igris.near/widget/DaisyUIWrapper"
    props={{
      children: content,
      daisyUiTheme: state.daisyUiTheme,
    }}
  />
);
