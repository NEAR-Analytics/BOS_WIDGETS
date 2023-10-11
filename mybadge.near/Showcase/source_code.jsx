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
    <Widget src="mybadge.near/widget/Near.SmallAvatarBadge" />
    <Widget src="mybadge.near/widget/Near.BigAvatarBadge" />
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
