const ownerId = "contribut3.near";
const onSave = props.onSave;

const supportedLinks = [
  {
    name: "github",
    url: "github.com/",
  },
  {
    name: "discord",
    url: "discord.com/",
  },
  {
    name: "reddit",
    url: "reddit.com/u/",
  },
  {
    name: "twitter",
    url: "twitter.com/",
  },
  {
    name: "youtube",
    url: "youtube.com/",
  },
];

State.init({ ...props.data });

if (props.save) {
  onSave(state);
}

const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 2rem 3rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  border-radius: 0.5rem;
  border: 1px solid var(--ui-elements-light, #eceef0);
  background: var(--background-dark, #fafafa);
`;

const HalfWidth = styled.div`
  width: 50%;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const data = (
  <>
    <Widget
      src={`${ownerId}/widget/Inputs.TextArea`}
      props={{
        label: "Describe tu experiencia",
        placeholder:
          "Cuéntanos sobre tu experiencia clínica, estudios relevantes y más.",
        value: state.description,
        onChange: (description) => State.update({ description }),
        validate: () => {
          if (state.description.length > 500) {
            State.update({
              descriptionError: "Description must be less than 500 characters",
            });
            return;
          }

          State.update({ descriptionError: "" });
        },
        error: state.descriptionError,
      }}
    />
    <HalfWidth>
      <Widget
        src={`${ownerId}/widget/Inputs.Text`}
        props={{
          label: "Ingresa tu Página Web",
          placeholder: "Website URL",
          value: state.website,
          onChange: (website) => State.update({ website }),
          validate: () => {
            if (state.website.length > 50) {
              State.update({
                websiteError: "The URL must be less than 50 characters",
              });
              return;
            }

            State.update({ websiteError: "" });
          },
        }}
      />
    </HalfWidth>
    <HalfWidth>
      <Widget
        src={`${ownerId}/widget/Inputs.Number`}
        props={{
          label: "¿Cuántos usuarios/pacientes atiendes actualmente?",
          placeholder: 0,
          value: state.company_size,
          onChange: (company_size) =>
            State.update({ company_size: `${company_size}` }),
          validate: () => {
            if (state.company_size < 1) {
              State.update({
                company_sizeError: "Team size must be at least 0",
              });
              return;
            }

            State.update({ company_sizeError: "" });
          },
        }}
      />
    </HalfWidth>
    <HalfWidth>
      <Widget
        src={`${ownerId}/widget/Inputs.Text`}
        props={{
          label: "Ubicación",
          placeholder: "¿Terapia Online o física?",
          value: state.geo,
          onChange: (geo) => State.update({ geo }),
          validate: () => {
            if (state.geo.length > 100) {
              State.update({
                geoError: "Location must be less than 100 characters",
              });
              return;
            }

            State.update({ geoError: "" });
          },
        }}
      />
    </HalfWidth>
    <HalfWidth>
      <Widget
        src={`${ownerId}/widget/Inputs.LabeledData`}
        props={{
          label: "Ingresa tus Perfiles sociales",
          content: supportedLinks.map(({ name, url }) => (
            <Widget
              src={`${ownerId}/widget/Inputs.Social`}
              props={{
                start: url,
                value: state.linktree[name] ?? "",
                update: (s) => State.update({ ...state.linktree, [name]: s }),
              }}
            />
          )),
        }}
      />
    </HalfWidth>
    <Widget
      src={`${ownerId}/widget/Inputs.TextArea`}
      props={{
        label:
          "Describe tu modelo de trabajo (Psicoanálisis, GC, Gestalt, etc.)",
        placeholder: " ",
        value: state.problem,
        onChange: (problem) => State.update({ problem }),
        validate: () => {
          if (state.problem.length > 500) {
            State.update({
              problemError: "Problem must be less than 500 characters",
            });
            return;
          }

          State.update({ problemError: "" });
        },
        error: state.problemError,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.TextArea`}
      props={{
        label: "Descripción profesional y Formación educativa.",
        placeholder: " ",
        value: state.success_position,
        onChange: (success_position) => State.update({ success_position }),
        validate: () => {
          if (state.success_position.length > 500) {
            State.update({
              success_positionError:
                "Success position must be less than 500 characters",
            });
            return;
          }

          State.update({ success_positionError: "" });
        },
        error: state.success_positionError,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.TextArea`}
      props={{
        label: "¿Porque te quieres sumar a MotusDAO?",
        placeholder: " ",
        value: state.why,
        onChange: (why) => State.update({ why }),
        validate: () => {
          if (state.why.length > 500) {
            State.update({
              whyError: "Why must be less than 500 characters",
            });
            return;
          }

          State.update({ whyError: "" });
        },
        error: state.whyError,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.TextArea`}
      props={{
        label: "¿Cómo te enteraste de MotusDAO?",
        placeholder: " ",
        value: state.win,
        onChange: (win) => State.update({ win }),
        validate: () => {
          if (state.win.length > 500) {
            State.update({
              winError: "Win must be less than 500 characters",
            });
            return;
          }

          State.update({ winError: "" });
        },
        error: state.winError,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.TextArea`}
      props={{
        label: "Cuál es tu visión de psicología para un futuro?",
        placeholder: " ",
        value: state.vision,
        onChange: (vision) => State.update({ vision }),
        validate: () => {
          if (state.vision.length > 500) {
            State.update({
              visionError: "Vision must be less than 500 characters",
            });
            return;
          }

          State.update({ visionError: "" });
        },
        error: state.visionError,
      }}
    />
  </>
);

return <Container>{data}</Container>;
