const Container = styled.div`
  .tokenIcon{
      width: 26px;
      height: 26px;
      border-radius:100px;
      margin-right:4px;
    }
.rewardIcon{
      width: 16px;
      height: 16px;
      border-radius:100px;
  }
  .flex-end{
      display:flex;
      align-items:center;
      justify-content:end;
      height:50px;
    }
`;
const Backdrop = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1001;
`;
const Modal = styled.div`
  background-color:#1A2E33;
  border-radius:12px;
  position:fixed;
  z-index:1002;
  width:30rem;
  max-width: 95vw;
  max-height: 80vh;
  padding:10px 0 20px 0;
  animation:anishow 0.3s forwards ease-out;
  left:50%;
  top:50%;
  @keyframes anishow {
    from {
      opacity: 0;
      transform:translate(-50%,-70%);
    }
    to {
      opacity: 1;
      transform:translate(-50%,-50%);
    }
  }
    .modal-header{
      display:flex;
      align-items:center;
      justify-content:center;
      color:#fff;
      font-weight: 700;
      font-size: 18px;
      padding:12px;
      margin-bottom:16px;
      border-bottom:2px solid rgba(48, 67, 82, 0.5);
    } 
    .modal-header .btn-close{
      position:absolute;
      right:28px;
      margin:0;
    }
    .modal-body {
        padding:0 10px;
    }
    .modal-body .tab{
      display:flex;
      align-items:center;
      justify-content:space-between;
      margin-bottom:30px;
    }
    .modal-body .tab span{
      display:flex;
      align-items:center;
      justify-content:center;
      width:50%;
      height:40px;
      border-radius: 6px;
      font-weight: 700;
      font-size: 18px;
      cursor:pointer;
      color:#fff;
    }
    .modal-body .tab span.active{
      background: #304352;
    }
   .btn-close-custom{
      position:absolute;
      right:28px;
      width:12px;
      height:12px;
      cursor:pointer;
    }
`;
/** base tool start  */
let accountId = context.accountId;
if (!accountId) {
  return <Widget src="juaner.near/widget/ref_account-signin" />;
}
const toAPY = (v) => Math.round(v * 100) / 100;
const shrinkToken = (value, decimals, fixed) => {
  return new Big(value).div(new Big(10).pow(decimals || 0)).toFixed(fixed);
};
const {
  assets,
  rewards,
  account,
  balances,
  showModal,
  selectedTokenId,
  selectedTokenMeta,
  wnearbase64,
  closeButtonBase64,
} = state;
const { onLoadState } = props;
function changeSelectedToken(asset, type) {
  const { token_id, metadata } = asset;
  State.update({
    selectedTokenId: token_id,
    selectedTokenMeta: metadata,
    type,
    showModal: true,
  });
}
function closeModal() {
  State.update({
    showModal: false,
  });
}
const onLoad = (data) => {
  State.update(data);
};

const hasData = assets.length > 0 && rewards.length > 0 && account;
function getPortfolioRewards(type, token_id) {
  const targetFarm = account.farms.find((farm) => {
    return farm["farm_id"][type] == token_id;
  });
  if (targetFarm) {
    const asset = assets.find((a) => a.token_id == token_id);
    const rewards = targetFarm["rewards"] || [];
    const totalRewards =
      type == "Supplied" ? asset.farms[0].rewards : asset.farms[1].rewards;
    const result = rewards.map((reward) => {
      const { reward_token_id } = reward;
      const assetDecimals =
        asset.metadata.decimals + asset.config.extra_decimals;
      const rewardAsset = assets.find((a) => a.token_id == reward_token_id);
      const rewardTokenDecimals =
        rewardAsset.metadata.decimals + rewardAsset.config.extra_decimals;

      const boostedShares = Number(
        shrinkToken(reward.boosted_shares, assetDecimals)
      );
      const totalBoostedShares = Number(
        shrinkToken(totalRewards[reward_token_id].boosted_shares, assetDecimals)
      );
      const totalRewardsPerDay = Number(
        shrinkToken(
          totalRewards[reward_token_id].reward_per_day,
          rewardTokenDecimals
        )
      );
      const rewardPerDay =
        (boostedShares / totalBoostedShares) * totalRewardsPerDay || 0;
      return { rewardPerDay, metadata: asset.metadata };
    });
    return result;
  }
  return [];
}
// get portfolio borrowed assets
let total_burrowed_usd = Big(0);
const borrowedAssets = hasData
  ? account.borrowed.map((borrowedAsset) => {
      const asset = assets.find((a) => a.token_id === borrowedAsset.token_id);
      const r = rewards.find((a) => a.token_id === asset.token_id);
      const totalApy = r.apyBaseBorrow;

      const decimals = asset.metadata.decimals + asset.config.extra_decimals;
      const borrowed = Number(shrinkToken(borrowedAsset.balance, decimals));
      const usd = borrowed * asset.price.usd;
      total_burrowed_usd = total_burrowed_usd.plus(usd);
      const rewardsList =
        getPortfolioRewards("Supplied", borrowedAsset.token_id) || [];
      return (
        <tr>
          <td>
            <img
              src={asset.metadata.icon || wnearbase64}
              class="tokenIcon"
            ></img>
            {asset.metadata.symbol}
          </td>
          <td class="text-start">{toAPY(totalApy)}%</td>
          <td class="text-start">
            {rewardsList.length == 0
              ? "-"
              : rewardsList.map((reward) => {
                  const { rewardPerDay, metadata } = reward;
                  return (
                    <div class="flex_center">
                      {Big(rewardPerDay).toFixed(4)}
                      <img
                        class="rewardIcon ml_5"
                        src={metadata.icon || wnearbase64}
                      />
                    </div>
                  );
                })}
          </td>
          <td class="text-start">
            {borrowed.toFixed(4)}
            <span class="text_grey_color">(${usd.toFixed(2)})</span>
          </td>
          <td class="flex-end">
            <Widget
              src="juaner.near/widget/ref-operation-button"
              props={{
                clickEvent: () => {
                  changeSelectedToken(asset, "burrow");
                },
                buttonType: "solid",
                actionName: "Repay",
                hoverOn: true,
              }}
            />
          </td>
        </tr>
      );
    })
  : undefined;
if (borrowedAssets && borrowedAssets.length > 0) {
  onLoadState &&
    onLoadState({
      total_burrowed_usd: total_burrowed_usd.toFixed(),
    });
}
function getWnearIcon(icon) {
  State.update({
    wnearbase64: icon,
  });
}
function getCloseButtonIcon(icon) {
  State.update({
    closeButtonBase64: icon,
  });
}
return (
  <Container>
    {/* load data */}
    {!hasData && (
      <Widget src="juaner.near/widget/ref_burrow-data" props={{ onLoad }} />
    )}
    {/* load icons */}
    <Widget
      src="juaner.near/widget/ref-icons"
      props={{ getWnearIcon, getCloseButtonIcon }}
    />
    <div class="title">You Borrowed</div>
    <table class="table click">
      <thead>
        <tr>
          <th scope="col" width="20%">
            Assets
          </th>
          <th scope="col" class="text-start" width="20%">
            Borrow APY
          </th>
          <th scope="col" class="text-start" width="20%">
            Rewards
          </th>
          <th scope="col" class="text-start" width="15%">
            Borrowed
          </th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>{borrowedAssets}</tbody>
    </table>
    {/** modal */}
    <Widget
      src="juaner.near/widget/ref-market-burrow-repay"
      props={{ selectedTokenId, selectedTokenMeta, showModal, closeModal }}
    />
  </Container>
);
