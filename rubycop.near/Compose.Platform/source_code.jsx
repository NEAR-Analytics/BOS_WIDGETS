const { inputs } = props;

const Section = styled.div`
  margin-bottom: 10px;
`;
console.log(inputs);
return (
  <div>
    {inputs.map((input, i) => {
      <Widget
        src={"rubycop.near/widget/NDC.StyledComponents"}
        props={{
          TextArea: {
            label: "input.label",
            placeholder: "input.placeholder",
            maxLength: 2000,
            value: "input.value",
            handleChange: () => {},
          },
        }}
      />;
    })}
  </div>
);
