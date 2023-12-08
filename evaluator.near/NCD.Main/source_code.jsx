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
    component: "evaluator.near/widget/NCD.Pages.Progress",
  },
  {
    icon: "motherboard",
    label: "Prerequisites",
    component: "evaluator.near/widget/NCD.Pages.Prerequisites",
  },
  {
    icon: "book",
    label: "Lesson 1 - Hello Near",
    component: "evaluator.near/widget/NCD.Lessons.HelloNear",
  },
  {
    icon: "book",
    label: "Lesson 2 - Guestbook",
    component: "evaluator.near/widget/NCD.Lessons.GuestBook",
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
