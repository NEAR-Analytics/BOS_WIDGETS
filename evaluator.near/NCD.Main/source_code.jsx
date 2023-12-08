if (context.loading) {
  return;
}

const menuLinks = [
  {
    label: "Home",
    icon: "house",
    component: "evaluator.near/widget/NCD.Pages.Home",
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
  {
    icon: "book",
    label: "Lesson 2",
    component: "evaluator.near/widget/NCD.Lessons.HelloNear",
  },
  {
    icon: "star",
    label: "Evaluation",
    component: "evaluator.near/widget/NCD.Lessons.HelloNear",
  },
];

const propsSelected = props.selected || menuLinks[0].component;
const [selected, setSelected] = useState(propsSelected);

console.log("selected", propsSelected, selected);

return (
  <div class="row mt-1">
    <div class="col-4">
      <Widget
        src="evaluator.near/widget/NCD.Menu"
        props={{
          menuLinks,
          topics,
          selected,
          identifier: communityId,
          onSelect: (option) => { setSelected(option) },
        }}
      />
    </div>
    <div class="col-8 mx-auto">
      <Widget src={selected} props={props} />
    </div>
  </div>
);
