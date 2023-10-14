const drop = Near.view("betatest.learnclub.near", "get_caller_drop", {
  account_id: props.accountId,
});

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

State.init({ liked: false, likes: randomIntFromInterval(0, 50) });

return (
  <Widget
    src="mybadge.near/widget/Generic.DetailedLinkBadge"
    props={{
      primaryText: "(L)Earner",
      secondaryText: `${state.likes} NEAR`,
      iconSrc: "mybadge.near/widget/LNC.LogoIcon",
      color: "orange",
      href: `https://learnnear.club/lnc-pro/beta-testing/`,
    }}
  />
);
