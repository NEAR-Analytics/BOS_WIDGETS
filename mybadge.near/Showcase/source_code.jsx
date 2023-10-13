const Showcase = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
`;

return (
  <Showcase>
    <Widget
      src="mybadge.near/widget/Near.AvatarBadge"
      props={{ size: "small" }}
    />
    <Widget
      src="mybadge.near/widget/Near.AvatarBadge"
      props={{ size: "medium" }}
    />
    <Widget src="mybadge.near/widget/Near.CircleBadge" />
    <Widget src="mybadge.near/widget/Near.CoreDev" />
    <Widget src="mybadge.near/widget/Near.BossShortenBadge" />
    <Widget src="mybadge.near/widget/Near.BossFullBadge" />
    <Widget src="mybadge.near/widget/Near.ProtocolWorkingGroup" />
    <Widget src="mybadge.near/widget/Near.ContractStandardsWorkingGroup" />
    <Widget src="mybadge.near/widget/Near.WalletStandardsWorkingGroup" />
    <Widget src="mybadge.near/widget/Near.ToolingWorkingGroup" />
    <Widget src="mybadge.near/widget/Near.ZeroKnowledgeWorkingGroup" />
    <Widget src="mybadge.near/widget/Near.ValidatorWorkingGroup" />
    <Widget
      src="mybadge.near/widget/LNC.DropBalanceBadge"
      props={{ accountId: "coldy.near" }}
    />
    <Widget src="mybadge.near/widget/LNC.ProTesterBadge" />
    <Widget src="mybadge.near/widget/Dapplets.DappCreatorBadge" />
    <Widget src="mybadge.near/widget/Near.AlphaTesterBadge" />
    <Widget src="mybadge.near/widget/Near.VeteranBadge" />
    <Widget src="mybadge.near/widget/DevHacks.DevHacksBadge" />
    <Widget src="mybadge.near/widget/LNC.EliteBadge" />
    <Widget src="mybadge.near/widget/DevHacks.CircleBadge" />
    <Widget src="mybadge.near/widget/LNC.CircleBadge" />
    <Widget src="mybadge.near/widget/Dapplets.CircleBadge" />
  </Showcase>
);
