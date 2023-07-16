const { inputs } = props;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  width: 100%;
  flex: none;
  order: 3;
  flex-grow: 0;
`;

return (
  <div class="col-sm-12 mx-0">
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
