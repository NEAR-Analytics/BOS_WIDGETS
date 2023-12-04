return (
  <>
    <DaisyUIWrapper>
      <div class="card max-w-2xl mx-auto bg-gray-900 text-white">
        <div class="px-4 pt-4">
          <div class="relative flex justify-center">
            <LogoZkEra />
            {chainId && (
              <button
                class="btn btn-xs btn-outline absolute right-0 top-0 text-white hover:bg-gray-900"
                style={{ "border-color": "#43f574" }}
                onClick={() => {
                  State.update({ showSettings: !state.showSettings });
                }}
              >
                {chainId === "unsupported"
                  ? "Unsupported network"
                  : CHAINS[chainId].NETWORK_INFO.chainName}
              </button>
            )}

            {/* settings menu */}
            {state.showSettings && (
              <div class="absolute right-0 top-8 bg-gray-900 rounded p-3">
                <div class="flex flex-col gap-2">
                  <button
                    class={`btn btn-xs btn-outline${
                      chainId === ZKSYNC_MAINNET ? " pointer-events-none" : ""
                    }`}
                    onClick={() => {
                      chainId === ZKSYNC_MAINNET
                        ? State.update({ showSettings: false })
                        : handleClickSwitchNetwork(ZKSYNC_MAINNET);
                    }}
                  >
                    {CHAINS[ZKSYNC_MAINNET].NETWORK_INFO.chainName}
                  </button>
                  <button
                    class={`btn btn-xs btn-outline${
                      chainId === ZKSYNC_TESTNET ? " pointer-events-none" : ""
                    }`}
                    onClick={() => {
                      chainId === ZKSYNC_TESTNET
                        ? State.update({ showSettings: false })
                        : handleClickSwitchNetwork(ZKSYNC_TESTNET);
                    }}
                  >
                    {CHAINS[ZKSYNC_TESTNET].NETWORK_INFO.chainName}
                  </button>
                </div>
              </div>
            )}
          </div>

          <label class="label">
            <span class="label-text text-lg text-white">Buy ZLP</span>
          </label>

          <div class="bg-gray-800 rounded p-2 mb-2">
            <label class="label pl-4">
              <span class="label-text text-gray-400">
                {payValueDisplay
                  ? `Pay: $${formatAmount(
                      payValueDisplay,
                      USD_DECIMALS,
                      2,
                      true
                    )} `
                  : "Pay"}
              </span>
              <span class="label-text text-gray-400">
                Balance:
                <span class="text-white">
                  {formatAmount(
                    fromToken && fromToken.balance,
                    fromToken && fromToken.decimals,
                    4,
                    true
                  )}
                </span>
              </span>
            </label>
            <div class="flex">
              <input
                class="input w-full bg-gray-800 text-2xl focus:outline-none"
                onChange={(e) => handleChangePayValue(e.target.value)}
                value={payValue}
                placeholder="0.0"
              />
              <div class="flex items-center space-x-1">
                <button
                  style={{ background: "#43f574" }}
                  class="btn btn-sm border-none font-normal rounded-4 px-2 mx-1 hover:bg-green-600 focus:bg-green-600 text-black"
                  onClick={handleClickMax}
                >
                  MAX
                </button>
                {getIconForToken()}
                <select
                  onChange={(e) => {
                    handleChangeFromToken(e.target.value);
                  }}
                  class="select-ghost bg-gray-800  text-2xl"
                >
                  {tokensInfo.map((token) => (
                    <option value={token.address}>{token.symbol}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div class="bg-gray-800 rounded p-2">
            <label class="label pl-4 pr-2">
              <span class="label-text text-gray-400">
                {receiveValueDisplay
                  ? `Receive: $${formatAmount(
                      receiveValueDisplay,
                      USD_DECIMALS,
                      2,
                      true
                    )} `
                  : "Receive"}
              </span>
              <span class="label-text">
                <span class="label-text text-gray-400">
                  Balance:
                  <span class="text-white">
                    {formatAmount(zlpBalance, ZLP_DECIMALS, 4, true)}
                  </span>
                </span>
              </span>
            </label>
            <div class="flex">
              <input
                onChange={(e) => handleChangeReceiveValue(e.target.value)}
                class="input w-full bg-gray-800 text-2xl focus:outline-none"
                value={receiveValue}
                placeholder="0.0"
              />
              <div class="flex items-center space-x-1 ">
                <IconZLP />
                <span class="text-2xl pl-1 pr-2">ZLP</span>
              </div>
            </div>
          </div>

          <label class="label pt-3">
            <span class="label-text text-gray-400">Fees</span>
            <span class="label-text">
              {feeBasisPoints
                ? `${formatAmount(feeBasisPoints, 2, 2, true)}%`
                : "-"}
            </span>
          </label>
        </div>

        <div class="px-4 pb-4">
          {sender ? (
            <button
              disabled={loading}
              style={{ background: "#43f574" }}
              class={`btn w-full hover:bg-green-600 focus:bg-green-600 mt-2 text-black ${
                primaryButtonDisabled && "cursor-not-allowed"
              }`}
              onClick={
                chainId === "unsupported"
                  ? () => handleClickSwitchNetwork(ZKSYNC_MAINNET)
                  : !primaryButtonDisabled && handleClickSubmitBuyZlp
              }
            >
              {primaryButtonText}
            </button>
          ) : (
            <button
              disabled={sender && payValue <= 0}
              style={{ background: "#43f574" }}
              class="relative btn w-full hover:bg-green-600 focus:bg-green-600 mt-2 text-black"
            >
              Connect Wallet
              <Web3Connect
                className="opacity-0 absolute w-full h-full"
                connectLabel="Connect with Web3"
              />
            </button>
          )}
        </div>
      </div>
    </DaisyUIWrapper>

    <Toast />
  </>
);
