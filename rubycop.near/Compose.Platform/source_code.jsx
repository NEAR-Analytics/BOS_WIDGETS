const { inputs } = props;

const Section = styled.div`
  margin-bottom: 10px;
`;

return (
  <div>
    {inputs.map((input, i) => {
      <Section key={i}>
        <Widget
          src={"rubycop.near/widget/NDC.StyledComponents"}
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
      </Section>;
    })}
  </div>
);
