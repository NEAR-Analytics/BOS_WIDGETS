const { inputs } = props;

const Section = styled.div`
  margin-bottom: 5px;
`;

const widgets = {
  styledComponents: "rubycop.near/widget/NDC.StyledComponents",
};

return (
  <>
    {inputs.map((input, i) => (
      <Section key={i}>
        <Widget
          src={widgets.styledComponents}
          props={{
            TextArea: {
              label: input.label,
              placeholder: input.placeholder,
              maxLength: 2000,
              value: input.value,
              handleChange: input.handleChange,
            },
          }}
        />
      </Section>
    ))}
  </>
);
