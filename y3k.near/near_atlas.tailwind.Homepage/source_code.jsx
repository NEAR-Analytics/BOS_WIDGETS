const accountId = props.debugAccountId ?? context.accountId;

// change this back to !accountId
if (!accountId) {
}

const profile = Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "";
}

const name = profile.name;
const image = profile.image;

return (
  <div>
    <div>
      {accountId && !name && (
        <div className="alert alert-warning rounded-4 mb-3">
          <p>Your profile is missing a name.</p>
          {editProfileButton}
        </div>
      )}

      {accountId &&
        !image.ipfs_cid &&
        (!image.nft.contractId || !image.nft.tokenId) &&
        !image.url && (
          <div className="alert alert-warning rounded-4 mb-3">
            <p>Your profile is missing a picture.</p>
            {editProfileButton}
          </div>
        )}
    </div>

    <div class="flex flex-wrap">
      <div class="border-r border-gray-200 dark:border-gray-700">
        <div
          class="flex flex-col space-y-2"
          aria-label="Tabs"
          role="tablist"
          data-hs-tabs-vertical="true"
        >
          <button
            type="button"
            class="hs-tab-active:border-blue-500 hs-tab-active:text-blue-600 dark:hs-tab-active:text-blue-600 py-1 pr-4 inline-flex itdivs-center gap-2 border-r-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 active"
            id="vertical-tab-with-border-itdiv-1"
            data-hs-tab="#vertical-tab-with-border-1"
            aria-controls="vertical-tab-with-border-1"
            role="tab"
          >
            Tab 1
          </button>
          <button
            type="button"
            class="hs-tab-active:border-blue-500 hs-tab-active:text-blue-600 dark:hs-tab-active:text-blue-600 py-1 pr-4 inline-flex itdivs-center gap-2 border-r-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 dark:hover:text-gray-300"
            id="vertical-tab-with-border-itdiv-2"
            data-hs-tab="#vertical-tab-with-border-2"
            aria-controls="vertical-tab-with-border-2"
            role="tab"
          >
            Tab 2
          </button>
          <button
            type="button"
            class="hs-tab-active:border-blue-500 hs-tab-active:text-blue-600 dark:hs-tab-active:text-blue-600 py-1 pr-4 inline-flex itdivs-center gap-2 border-r-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 dark:hover:text-gray-300"
            id="vertical-tab-with-border-itdiv-3"
            data-hs-tab="#vertical-tab-with-border-3"
            aria-controls="vertical-tab-with-border-3"
            role="tab"
          >
            Tab 3
          </button>
        </div>
      </div>

      <div class="ml-3">
        <div
          id="vertical-tab-with-border-1"
          role="tabpanel"
          aria-labelledby="vertical-tab-with-border-itdiv-1"
        >
          <p class="text-gray-500 dark:text-gray-400">
            This is the{" "}
            <div class="font-sdivibold text-gray-800 dark:text-gray-200">
              first
            </div>{" "}
            itdiv's tab body.
          </p>
        </div>
        <div
          id="vertical-tab-with-border-2"
          class="hidden"
          role="tabpanel"
          aria-labelledby="vertical-tab-with-border-itdiv-2"
        >
          <p class="text-gray-500 dark:text-gray-400">
            This is the{" "}
            <div class="font-sdivibold text-gray-800 dark:text-gray-200">
              second
            </div>{" "}
            itdiv's tab body.
          </p>
        </div>
        <div
          id="vertical-tab-with-border-3"
          class="hidden"
          role="tabpanel"
          aria-labelledby="vertical-tab-with-border-itdiv-3"
        >
          <p class="text-gray-500 dark:text-gray-400">
            This is the{" "}
            <div class="font-sdivibold text-gray-800 dark:text-gray-200">
              third
            </div>{" "}
            itdiv's tab body.
          </p>
        </div>
      </div>
    </div>
  </div>
);
