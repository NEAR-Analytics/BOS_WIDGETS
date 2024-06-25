const ProjectOptions = (props) => [
  {
    label: "Home",
    id: "home",
    disabled: false,
    source: "old.potlock.near/widget/Project.About",
    href: props.hrefWithParams(
      `?tab=project&projectId=${props.projectId}&nav=home`
    ),
  },
  {
    label: "Social Feed",
    id: "feed",
    disabled: false,
    source: "old.potlock.near/widget/Profile.Feed",
    href: props.hrefWithParams(
      `?tab=project&projectId=${props.projectId}&nav=feed`
    ),
  },
  {
    label: "Pots",
    id: "pots",
    disabled: false,
    source: "old.potlock.near/widget/Project.Pots",
    href: props.hrefWithParams(
      `?tab=project&projectId=${props.projectId}&nav=pots`
    ),
  },
  // {
  //   label: "Attestations",
  //   id: "attestations",
  //   disabled: true,
  // },
  {
    label: "Funding Raised",
    id: "funding",
    disabled: false,
    source: "old.potlock.near/widget/Project.FundingRaised",
    href: props.hrefWithParams(
      `?tab=project&projectId=${props.projectId}&nav=funding`
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
  ProjectOptions,
};
