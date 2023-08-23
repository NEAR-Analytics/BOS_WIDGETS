const ownerId = "crowdtestify.near";
const skillsArray = [
  { name: "ProgrammingBasics" },
  { name: "TestingBasics" },
  { name: "FunctionalTesting" },
  { name: "LoadTesting" },
  { name: "IntegrationTesting" },
  { name: "UnitTesting" },
  { name: "SecurityTesting" },
  { name: "Selenium" },
  { name: "Playwright" },
  { name: "JUnit" },
  { name: "TestNG" },
  { name: "PythonAutomation" },
  { name: "JavaScriptAutomation" },
  { name: "MobileAppTesting" },
  { name: "WebAppTesting" },
  { name: "ApiTesting" },
  { name: "DatabaseTesting" },
  { name: "CloudTesting" },
  { name: "AgileTesting" },
  { name: "ContinuousIntegration" },
  { name: "ContinuousDeployment" },
  { name: "PerformanceTesting" },
  { name: "UITesting" },
  { name: "UXTesting" },
  { name: "CrossPlatformTesting" },
  { name: "VRTesting" },
  { name: "BlockchainTesting" },
  { name: "TesIoTTestingtinBasics" },
  { name: "MicroservicesTesting" },
];

if (!context.accountId) {
  return (
    <Widget
      src={`${ownerId}/widget/InfoSegment`}
      props={{
        title: "Not logged in!",
        description: "You must log in to create a new Tester!",
      }}
    />
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 3em;
  padding-bottom: 3em;
`;

const Header = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 2em;
  line-height: 1.4em;
  text-align: center;
  color: #000000;
`;

const SubHeader = styled.h2`
  font-style: normal;
  font-weight: 400;
  font-size: 0.95em;
  line-height: 1.25em;
  text-align: center;
  color: #101828;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 60%;
  gap: 1em;
`;

const FormHeader = styled.h3`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px 0px 0.5em;
  border-bottom: 1px solid #eceef0;
  font-style: normal;
  font-weight: 700;
  font-size: 1.125em;
  line-height: 1.25em;
  color: #000000;
  width: 100%;
`;

const FormFooter = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

State.init({
  name: "",
  nameError: "",
  accountId: context.accountId,
  accountIdError: "",
  skills: [],
  skillsError: "",
});

const slideDown = styled.keyframes`
  from {
    height: 0;
  }
  to {
    height: var(--radix-collapsible-content-height);
  }
`;

const slideUp = styled.keyframes`
  from {
    height: var(--radix-collapsible-content-height);
  }
  to {
    height: 0;
  }
`;

const Hidable = styled("Collapsible.Content")`
  overflow: hidden;

  &[data-state="open"] {
    animation: ${slideDown} 0.3s ease-in-out;
  }

  &[data-state="closed"] {
    animation: ${slideUp} 0.3s ease-in-out;
  }
`;

const validateForm = () => {
  return (
    state.name &&
    state.nameError === "" &&
    (!state.skills || state.skillsError === "")
  );
};

return (
  <Container>
    <div>
      <Header>Create new Tester</Header>
    </div>
    <Form>
      <FormHeader>General</FormHeader>
      <Widget
        src={`${ownerId}/widget/Inputs.Text`}
        props={{
          label: "Tester name *",
          placeholder: "Enter Tester name",
          value: state.name,
          onChange: (name) => State.update({ name }),
          validate: () => {
            if (state.name.length < 3) {
              State.update({ nameError: "Name must be at least 3 characters" });
              return;
            }

            if (state.name.length > 100) {
              State.update({
                nameError: "Name must be less than 100 characters",
              });
              return;
            }

            State.update({ nameError: "" });
          },
          error: state.nameError,
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.MultiSelect`}
        props={{
          label: "Skills",
          placeholder: "Add skills",
          options: skillsArray,
          value: state.skills,
          onChange: (skills) =>
            State.update({
              skills: skills.map(({ name }) => ({
                name: name.trim().replaceAll(/\s+/g, "-"),
              })),
            }),
        }}
      />
      <FormFooter>
        <Widget
          src={`${ownerId}/widget/Buttons.Blue`}
          props={{
            disabled: !validateForm(),
            onClick: () => {
              if (!validateForm()) return;
              const data = {
                [state.accountId]: {
                  profile: {
                    name: state.name,
                    ...(state.skills.length
                      ? {
                          tags: state.skills.reduce(
                            (acc, { name }) =>
                              Object.assign(acc, { [name]: "" }),
                            {}
                          ),
                        }
                      : {}),
                  },
                },
              };
              const transactions = [
                {
                  contractName: ownerId,
                  methodName: "register_tester",
                  args: {
                    account_id: state.accountId,
                    skills: state.skills.map((skill) => skill.name),
                  },
                },
              ];
              Near.call(transactions);
            },
            text: <>Create Tester</>,
          }}
        />
      </FormFooter>
    </Form>
  </Container>
);
