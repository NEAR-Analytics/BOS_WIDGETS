if (context.loading) {
  return;
}

const menuLinks = [
  {
    label: "Home",
    icon: "house",
    component: "gagdiez.near/widget/NCD.Main",
  },
  {
    icon: "trophy",
    label: "Progress",
    component: "gagdiez.near/widget/NCD.Progress",
  },
  {
    icon: "motherboard",
    label: "How to Setup",
    component: "gagdiez.near/widget/NCD.Setup",
  },
  {
    icon: "book",
    label: "Lesson 1",
    component: "gagdiez.near/widget/NCD.Lessons.HelloNear",
  },
];

const selected = props.selected || menuLinks[0].label;

const componentFor = (label) =>
  menuLinks.find((link) => link.label === label).component;

return (
  <div class="row mt-1">
    <div class="col-3">
      <Widget
        src="gagdiez.near/widget/Menu"
        props={{
          menuLinks,
          topics,
          selected,
          identifier: communityId,
        }}
      />
    </div>
    <div class="col-9 mx-auto">
      <Widget src={componentFor(selected)} props={props} />
    </div>
  </div>
);
