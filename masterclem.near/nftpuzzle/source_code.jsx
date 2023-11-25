const contract = "nftpuzzle.masterclem.near";
const level = (props.level = 1);
const baseurl =
  "https://ipfs.io/ipfs/QmXWX64AtfcmF5ch5xDeAASWsz6VAFQ3YXAmAFx8oUfEhe/puzzle/";
const claimNFT = () => {
  Near.call(
    contract,
    "nft_mint",
    {
      token_id: context.accountId + " - " + level,
      receiver_id: context.accountId,
      token_metadata: {
        title: "NFT REWARD",
        description: "Puzzle reward for level " + level,
        media: baseurl + level + ".jpg",
        copies: 1,
      },
    },
    null,
    1000000000000000000000
  );
};

return (
  <>
    <div class="container-fluid">
      <div class="row">
        {context.accountId ? (
          <div class="col-md-12">
            <div class="p-5 text-center">
              {level ? (
                <>
                  <h1>CLAIM YOUR NFT REWARD</h1>
                  <img width="100%" src={baseurl + level + ".jpg"} />
                  <br />

                  <button
                    class=" btn btn-primary m-5"
                    onClick={() => claimNFT()}
                  >
                    Mint Reward
                  </button>
                </>
              ) : (
                <p>REWARD NOT FOUND</p>
              )}
            </div>
          </div>
        ) : (
          <div class="col-md-12 text-center">
            Sign in to Claim your NFT Reward
          </div>
        )}
      </div>
    </div>
  </>
);
