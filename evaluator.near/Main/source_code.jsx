if (context.loading) {
  return;
}

const propsSelected = props.selected || menuLinks[0].label;
const [selected, setSelected] = useState(propsSelected);

const menuLinks = [
  {
    label: "Home",
    icon: "house",
    component: "evaluator.near/widget/NCD.Main",
  },
  {
    icon: "trophy",
    label: "Progress",
    component: "evaluator.near/widget/NCD.Progress",
  },
  {
    icon: "motherboard",
    label: "How to Setup",
    component: "evaluator.near/widget/NCD.Setup",
  },
  {
    icon: "book",
    label: "Lesson 1",
    component: "evaluator.near/widget/NCD.Lessons.HelloNear",
  },
];

const componentFor = (label) =>
  menuLinks.find((link) => link.label === label).component;

return (
  <div class="row mt-1">
    <div class="col-3">
      <Widget
        src="evaluator.near/widget/Menu"
        props={{
          menuLinks,
          topics,
          selected,
          identifier: communityId,
          onClick: (option) => setSelected(option),
        }}
      />
    </div>
    <div class="col-9 mx-auto">
      <Widget src={componentFor(selected)} props={props} />
    </div>
  </div>
);
