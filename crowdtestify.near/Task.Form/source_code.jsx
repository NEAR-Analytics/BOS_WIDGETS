const ownerId = "crowdtestify.near";

const options = [
  { text: "Intern", value: "Intern" },
  { text: "Junior", value: "Junior" },
  { text: "Middle", value: "Middle" },
  { text: "Senior", value: "Senior" },
];

if (!context.accountId) {
  return (
    <Widget
      src={`${ownerId}/widget/InfoSegment`}
      props={{
        title: "Not logged in!",
        description: "You must log in to create a new project!",
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
  description: "",
  descriptionError: "",
  skills: [],
  skillsError: "",
  numTestersRequired: null,
  numTestersRequiredError: "",
  testerReward: null,
  testerRewardError: "",
  badge: "",
  badgeError: "",
});

const validateForm = () => {
  return (
    state.name &&
    state.nameError === "" &&
    state.description &&
    state.descriptionError === "" &&
    state.skills &&
    state.skillsError === "" &&
    state.testersRequired &&
    state.testersRequiredError === "" &&
    state.testerReward &&
    state.testerRewardError === "" &&
    state.badge &&
    state.badgeError === ""
  );
};

return (
  <Container>
    <div>
      <Header>Create new task</Header>
    </div>
    <Form>
      <FormHeader>General</FormHeader>
      <Widget
        src={`${ownerId}/widget/Inputs.Text`}
        props={{
          label: "Task name *",
          placeholder: "Enter task name",
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
        src={`${ownerId}/widget/Inputs.TextArea`}
        props={{
          label: "Description",
          placeholder: "Give a description of your task",
          value: state.description,
          onChange: (description) => State.update({ description }),
          validate: () => {
            if (state.description.length > 500) {
              State.update({
                descriptionError:
                  "Description must be less than 500 characters",
              });
              return;
            }

            State.update({ descriptionError: "" });
          },
          error: state.descriptionError,
        }}
      />

      <Widget
        src={`${ownerId}/widget/Inputs.Skills`}
        props={{
          label: "Skills",
          placeholder: "Add skills",
          value: state.skills,
          onChange: (skills) =>
            State.update({
              skills: skills.map(({ name }) => ({
                name: name.trim().replaceAll(/\s+/g, "-"),
              })),
            }),
        }}
      />

      <Widget
        src={`${ownerId}/widget/Inputs.Select`}
        props={{
          label: "Minimum Badge Requirement",
          placeholder: "Junior",
          options,
          value: state.badge,
          onChange: (badge) => State.update({ badge }),
          validate: () => {
            if (!state.badge) {
              State.update({
                badgeError: "Please select a minimum badge requirement",
              });
              return;
            }
            // if (!options.find(({ value }) => state.badge.value === value)) {
            //   state.setError("Please select a valid badge");
            // }
            State.update({ badgeError: "" });
          },
        }}
      />

      <Widget
        src={`${ownerId}/widget/Inputs.Number`}
        props={{
          label: "Testers Needed",
          placeholder: 2,
          value: state.testersRequired,
          onChange: (testersRequired) => State.update({ testersRequired }),
          validate: () => {
            if (state.testersRequired < 1) {
              State.update({
                testersRequiredError: "Testers size must be at least 1",
              });
              return;
            }
            State.update({ testersRequiredError: "" });
          },
        }}
      />

      <Widget
        src={`${ownerId}/widget/Inputs.Number`}
        props={{
          label: "Tester Reward",
          placeholder: 10,
          value: state.testerReward,
          onChange: (testerReward) => State.update({ testerReward }),
          validate: () => {
            if (state.testerReward < 1) {
              State.update({
                testerRewardError: "Tester Reward must be at least 1",
              });
              return;
            }
            State.update({ testerRewardError: "" });
          },
        }}
      />

      <FormFooter>
        <Widget
          src={`${ownerId}/widget/Buttons.Blue`}
          props={{
            disabled: !validateForm(),
            onClick: () => {
              if (!validateForm()) return;

              const transactions = [
                {
                  contractName: "v1.crowdtestify.near",
                  methodName: "create_task",
                  args: {
                    info: {
                      owner: context.accountId,
                      title: state.name,
                      description: state.description,
                      skills_required: state.skills.map((skill) => skill.name),
                      num_testers_required: state.testersRequired,
                      reward: state.testerReward,
                      min_badge_level: state.badge.value,
                    },
                  },
                },
              ];
              Near.call(transactions);
            },
            text: <>Create project</>,
          }}
        />
      </FormFooter>
    </Form>
  </Container>
);
