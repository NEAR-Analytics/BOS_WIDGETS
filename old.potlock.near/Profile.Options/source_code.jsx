const ProfileOptions = (props) => [
  {
    label: "Social Feed",
    id: "feed",
    disabled: false,
    source: "old.potlock.near/widget/Profile.Feed",
    href: props.hrefWithParams(
      `?tab=profile&accountId=${props.accountId}&nav=feed`
    ),
  },
  {
    label: "Donations",
    id: "donations",
    disabled: false,
    source: "old.potlock.near/widget/Project.PotlockFunding",
    href: props.hrefWithParams(
      `?tab=profile&accountId=${props.accountId}&nav=donations`
    ),
  },
  {
    label: "",
    id: "followers",
    disabled: false,
    source: "old.potlock.near/widget/Profile.FollowTabs",
  },
  {
    label: "",
    id: "following",
    disabled: false,
    source: "old.potlock.near/widget/Profile.FollowTabs",
  },
];
return {
  ProfileOptions,
};
