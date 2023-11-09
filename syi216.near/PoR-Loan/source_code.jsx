const nftContract = "proof-of-reputation.near";
State.init({
  amountRequest: 0,
  maxAmount: 1000,
  nftsUser: null,
});
const getProfile = () => {
  State.update({ profile: Social.getr(`${context.accountId}/profile`) });
};
const getClaimedQuest = () => {
  let data = Near.view(nftContract, "nft_tokens_for_owner", {
    account_id: context.accountId,
    from_index: "0",
    limit: 50,
  });
  State.update({ nftsUser: data });
};
getProfile();
getClaimedQuest();

if (state.nftsUser != null) {
  let json = state.nftsUser
    .find((quest) => quest.metadata.title == "Proof Of Reputation NFT")
    .metadata.extra.split(",")[0]
    .split(":")[1];
  State.update({ userScore: json });
}

const handleRequestAmount = (value) => {
  State.update({ amountRequest: value });
};
return (
  <div class="m-10">
    <div class="d-flex justify-content-between">
      <div class="d-flex flex-row gap-4 px-2">
        <img
          src={`https://ipfs.near.social/ipfs/bafkreib23axs6i6qwtxmc3qrbcvbe4uegf2rhjx6qpvz7swe4mrc466q4m`}
          style={{ height: "50px", width: "50px", "object-fit": "cover" }}
          class="my-auto"
        />
        <a
          class="btn bg-info bg-gradient my-auto fw-semibold shadow bg-opacity-50"
          href="#/owa-is-bos.near/widget/PoR-MainScreen"
        >
          Go to my quests
        </a>
      </div>
      <div class="d-flex flex-row bg-secondary bg-opacity-25 rounded-4 py-2 px-3 shadow-sm gap-2">
        <img
          src={`https://ipfs.near.social/ipfs/${state.profile.image.ipfs_cid}`}
          style={{ height: "40px", width: "40px", "object-fit": "cover" }}
          class="rounded-circle my-auto"
        />
        <div class="d-flex flex-row gap-3">
          <div class="my-auto fw-bold">{context.accountId}</div>
          <div class="my-auto">
            <div class="fw-semibold">Score</div>
            <div>{state.userScore ? state.userScore : 0}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="px-2 my-4">
      <p class="h2 fw-semibold pb-2">Apply for loan</p>
      <div class="d-flex flex-column bg-secondary bg-opacity-10 rounded-2 shadow-sm p-4 gap-4 flex-wrap">
        <div class="d-flex flex-row gap-5 mx-auto">
          <div class="d-flex flex-row gap-2">
            <p class="my-auto fw-bold">
              Amount to <br /> request
            </p>
            <div class="my-auto d-flex flex-row">
              <p class="my-auto">$</p>
              <input
                type="number"
                value={state.amountRequest}
                onChange={handleRequestAmount(e.target.value)}
                max={state.maxAmount}
                min={0}
                placeholder="1000"
                style={{ width: "150px" }}
              />
            </div>
          </div>
          <div class="d-flex flex-row gap-2">
            <p class="my-auto fw-bold">
              Max amount <br /> based on score
            </p>
            <p class="my-auto px-3 bg-success bg-opacity-50 rounded-3 fw-semibold">
              $1000
            </p>
          </div>
          <div class="d-flex flex-row gap-2">
            <p class="my-auto fw-bold">
              Anual <br /> interest rate
            </p>
            <p class="my-auto px-3 bg-success bg-opacity-50 rounded-3 fw-semibold">
              20%
            </p>
          </div>
        </div>
        <div class="d-flex flex-row gap-4 mx-auto">
          <p class="fw-bold">Period to be paid</p>
          <div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="option1"
              />
              <label class="form-check-label" for="inlineRadio1">
                30 days
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="option2"
              />
              <label class="form-check-label" for="inlineRadio2">
                60 days
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio3"
                value="option3"
                disabled
              />
              <label class="form-check-label" for="inlineRadio3">
                90 days (disabled)
              </label>
            </div>
          </div>
        </div>
        <div class="mx-auto">
          <button
            type="button"
            class="btn btn-primary px-5 py-2 fw-semibold border-0 shadow"
          >
            Request loan
          </button>
        </div>
      </div>
    </div>
    <div class="px-2 my-4">
      <p class="h2 fw-semibold pb-2">Loans requested</p>
      <div class="d-flex flex-column bg-secondary bg-opacity-10 rounded-2 shadow-sm p-4 gap-4 flex-wrap mx-auto">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Requested</th>
              <th scope="col">Amount to pay</th>
              <th scope="col">Day to be paid</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">USDT Loan</th>
              <td class="fw-medium">$100 USDT</td>
              <td class="fw-medium">$105 USDT</td>
              <td class="fw-medium">22/11/2023</td>
              <td>
                <button type="button" class="btn btn-info px-4 fw-semibold">
                  Pay debt
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">USDT Loan</th>
              <td class="fw-medium">$100 USDT</td>
              <td class="fw-medium">$109 USDT</td>
              <td class="fw-medium">17/11/2023</td>
              <td>
                <button type="button" class="btn btn-info px-4 fw-semibold">
                  Pay debt
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
