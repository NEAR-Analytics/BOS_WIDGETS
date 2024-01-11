if (context.loading) {
  return "Loading...";
}

const evaluator_contract = "eval.flmel.near";

let progress = Near.view(evaluator_contract, "get_progress", { account_id: context.accountId });

if (progress === null) {
  return "Loading...";
}

const menuLinks = [
  {
    label: "About",
    icon: "house",
    component: {
      path: "evaluator.near/widget/Pages.About",
      bindings: {
        evaluator_contract,
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
        evaluator_contract,
        progress,
        redirectTo: (component) => { setActiveComponent(component); },
      }
    }
  },
];

const lessons = [{
  label: "Hello Near",
  component: {
    path: "evaluator.near/widget/Curriculum.HelloNear",
    bindings: {
      evaluation_method: "evaluate_hello_near",
    }
  },
},
{
  label: "Guestbook",
  component: {
    path: "evaluator.near/widget/Curriculum.GuestBook",
    bindings: {
      evaluation_method: "evaluate_guest_book",
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
},
{
  label: "Complex Input (advanced)",
  component: {
    path: "evaluator.near/widget/Curriculum.ComplexInputAdvanced",
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
          evaluator_contract,
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
            lessons,
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
