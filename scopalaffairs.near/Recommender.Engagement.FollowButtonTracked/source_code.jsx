const handleClick = () => {
  State.update({ clicked: true });
};

State.init({
  clicked: false,
});

return (
  <div onClick={handleClick}>
    <Widget
      src="scopalaffairs.near/widget/Recommender.Service.EngagementTracker"
      props={{
        accountId: props.accountId,
        accountIdRank: props.accountIdRank,
        fromContext: props.fromContext,
        event: "Profile Followed | Clicked on Follow Button",
        onClick: state.clicked,
      }}
    />
    <Widget
      src={"scopalaffairs.near/widget/FollowButton"}
      props={{
        accountId: props.accountId,
      }}
    />
  </div>
);
