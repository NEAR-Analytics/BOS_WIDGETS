const Wrapper = styled.div`
    margin: 10px 0;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    font-weight: 700;
`;

const StyledInput = styled.input`
    padding: 10px 15px;
    border: 1px solid lightgray;
    border-radius: 5px;  // Rounded borders
    font-size: 16px;
    width: 100%;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: #6C757D;  // Slightly darker border when focused
    }
`;

const StyledTextArea = styled.textarea`
    padding: 10px 15px;
    border: 1px solid lightgray;
    border-radius: 5px;  // Rounded borders
    font-size: 16px;
    width: 100%;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: #6C757D;  // Slightly darker border when focused
    }
`;

const ComponentToUse = props.isTextArea ?StyledTextArea :StyledInput;

const inputComponent = (label, inputProps, labelProps) => (
  <Wrapper>
    <Label {...labelProps}>{label}</Label>
    <ComponentToUse {...inputProps} />
  </Wrapper>
);

return inputComponent(
  props.label ?? "Label",
  props?.inputProps ?? {
    placeholder: "placeholder",
  },
  props?.labelProps ?? {}
);
