const { typeToEmptyData, validateType, types } = props;

const initialFormState = typeToEmptyData(types["astro.sking.near/type/dao"]);

State.init({
  step: 0,
  form: initialFormState,
  errors: null,
});

const handleStepComplete = (value) => {
  const stepValid = true;
  Object.keys(value).forEach((key) => {
    const properties = types["astro.sking.near/type/dao"].properties.find(
      (p) => p.name === key
    );
    const validation = validateType(properties.type, value[key], properties);
    if (validation) {
      State.update({
        errors: {
          ...state.errors,
          [key]: validation,
        },
      });
      stepValid = false;
    } else {
      State.update({
        errors: {
          ...state.errors,
          [key]: null,
        },
      });
    }
  });

  if (stepValid) {
    State.update({
      step: state.step + 1,
      form: {
        ...state.form,
        ...value,
      },
    });
  }
};

const steps = [
  {
    title: "DAO Info & KYC",
    active: state.step === 0,
    icon: state.step > 0 ? <i className="bi bi-check2"></i> : undefined,
    className: state.step > 0 ? "active-outline" : undefined,
  },
  {
    title: "Links & Socials",
    active: state.step === 1,
    icon: state.step > 1 ? <i className="bi bi-check2"></i> : undefined,
    className: state.step > 1 ? "active-outline" : undefined,
  },
  {
    title: "Cool Down Period",
    active: state.step === 2,
    icon: state.step > 2 ? <i className="bi bi-check2"></i> : undefined,
    className: state.step > 2 ? "active-outline" : undefined,
  },
  {
    title: "Add Groups & Members",
    active: state.step === 3,
    icon: state.step > 3 ? <i className="bi bi-check2"></i> : undefined,
    className: state.step > 3 ? "active-outline" : undefined,
  },
  {
    title: "Proposal & Voting Permission",
    active: state.step === 4,
    icon: state.step > 4 ? <i className="bi bi-check2"></i> : undefined,
    className: state.step > 4 ? "active-outline" : undefined,
  },
  {
    title: "DAO Assets",
    active: state.step === 5,
    icon: state.step > 5 ? <i className="bi bi-check2"></i> : undefined,
    className: state.step > 5 ? "active-outline" : undefined,
  },
];

return (
  <>
    <h1 className="h3 fw-bold mb-4">Create a new DAO</h1>
    <Widget
      src={`nui.sking.near/widget/Navigation.Steps`}
      props={{
        steps: steps,
        onClick: (i) => {
          State.update({
            step: i,
          });
        },
      }}
    />
    <Widget
      src={`astro.sking.near/widget/CreateDAO.Step${state.step + 1}`}
      props={{
        formState: state.form,
        onComplete: handleStepComplete,
        errors: state.errors,
        renderFooter: (stepState) => (
          <Widget
            src={`astro.sking.near/widget/CreateDAO.Footer`}
            props={{
              isLast: state.step >= steps.length - 1,
              hasPrevious: state.step > 0,
              onNext: () => {
                handleStepComplete(stepState);
              },
              onPrevious: () => {
                State.update({
                  step: state.step - 1,
                });
              },
            }}
          />
        ),
      }}
    />
  </>
);
