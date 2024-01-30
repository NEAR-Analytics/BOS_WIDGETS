if (context.loading) {
  return "Loading...";
}

const evaluatorContract = "eval.flmel.near";

let progress = Near.view(evaluatorContract, "get_progress", { account_id: context.accountId });

if (progress === null) {
  return "Loading...";
}

let userAccountId;
context.accountId === null ? userAccountId = "myaccount.near" : userAccountId = context.accountId;

const menuLinks = [
  {
    label: "About",
    icon: "house",
    component: {
      path: "evaluator.near/widget/Pages.About",
      bindings: {
        evaluatorContract,
        userAccountId
      }
    }
  },
  {
    icon: "motherboard",
    label: "Prerequisites",
    component: {
      path: "evaluator.near/widget/Pages.Prerequisites",
      bindings: {}
    }
  },
  {
    icon: "motherboard",
    label: "FAQ",
    component: {
      path: "evaluator.near/widget/Pages.FAQ",
      bindings: {}
    }
  },
  {
    icon: "trophy",
    label: "Progress",
    component: {
      path: "evaluator.near/widget/Pages.Progress",
      bindings: {
        evaluatorContract,
        progress,
        redirectTo: (component) => { setActiveComponent(component); },
      }
    }
  },
];

const curriculumLinks = [{
  label: "Hello Near",
  component: {
    path: "evaluator.near/widget/Curriculum.HelloNear",
    bindings: {
      userAccountId,
    }
  },
},
{
  label: "Guestbook",
  component: {
    path: "evaluator.near/widget/Curriculum.GuestBook",
    bindings: {
      userAccountId,
    }
  },
},
{
  label: "Complex Input",
  component: {
    path: "evaluator.near/widget/Curriculum.ComplexInput",
    bindings: {
      progress: '',
    }
  }
},
{
  label: "Cross Contract Calls",
  component: {
    path: "evaluator.near/widget/Curriculum.XCC",
    bindings: {
      progress: '',
    }
  }
}];

const tailwindCssUrl = "https://dl.dropboxusercontent.com/scl/fi/d2krq3g6bibgq3j5dmz1i/output.css?rlkey=qn0cqs11ow7qw28tsffp8ia3b&dl=0";

State.init({
  theme: null,
});

const tailwindCss = fetch(tailwindCssUrl).body;

if (!tailwindCss) return "Can't load CSS 😔.";

if (!state.theme) {
  State.update({
    theme: styled.div`
    ${tailwindCss}`,
  });
}

const Theme = state.theme;

const initialComponent = props.selected || menuLinks[0].component;
const [activeComponent, setActiveComponent] = useState(initialComponent);

return (
  <Theme>
    {props.transactionHashes !== undefined ?
      <Widget
        src="evaluator.near/widget/Modal"
        props={{
          transactionHashes: props.transactionHashes,
          evaluatorContract,
        }}
      />
      : <></>
    }
    <div class="container mx-auto text-gray-800 flex space-x-5 py-6">
      <div class="w-1/5">
        <Widget
          src="evaluator.near/widget/Menu"
          props={{
            menuLinks,
            curriculumLinks,
            progress,
            selected: activeComponent,
            identifier: communityId,
            onSelect: (component) => { setActiveComponent(component); },
          }}
        />
      </div>
      <div class="w-4/5">
        <Widget src={activeComponent.path} props={activeComponent.bindings} />
      </div>
    </div>
    <Widget
      src="evaluator.near/widget/Footer"
      props={{}}
    />
  </Theme>
);
