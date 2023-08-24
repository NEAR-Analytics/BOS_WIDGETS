const ownerId = "crowdtestify.near";

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
      <FormFooter>
        <Widget
          src={`${ownerId}/widget/Buttons.Blue`}
          props={{
            disabled: !validateForm(),
            onClick: () => {
              if (!validateForm()) return;
              const transactions = [
                {
                  contractName: ownerId,
                  methodName: "register_tester",
                  args: {
                    name: state.accountId,
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
