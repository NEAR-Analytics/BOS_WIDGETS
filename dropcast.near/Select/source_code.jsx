const label = props.label || "Label";
const noLabel = props.noLabel || false;
const placeholder = props.placeholder || "Select an option";
const value = props.value || "";
const width = props.width || "270px";
const options = props.options || [];
const onChange = props.onChange || (() => {});
const error = props.error || "";

const Container = styled.div`
  gap: 0.45em;
  width: 100%;
  display: flex;
  background: unset;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Label = styled.label`
  color: #344054;
  font-weight: 400;
  font-size: 0.95em;
  font-style: normal;
  line-height: 1.25em;
`;

const Error = styled.span`
  height: 0;
  color: #ff4d4f;
  overflow: hidden;
  font-weight: 400;
  font-size: 0.75em;
  font-style: normal;
  line-height: 1.25em;
  display: inline-block;
  transition: height 0.3s ease-in-out;

  &.show {
    height: 1.25em;
  }
`;

const Input = styled.div`
  gap: 0.5em;
  width: 100%;
  display: flex;
  color: white;
  font-size: 12px;
  font-weight: 600;
  background: unset;
  border-radius: 6px;
  line-height: normal;
  flex-direction: row;
  align-items: center;
  border: 1px solid #FFF;
  box-sizing: border-box;
  text-transform: capitalize;
  padding: 12px 18px 12px 24px;
  justify-content: space-between;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
`;

const Placeholder = styled.span`
  color: #a0a3a8;
`;

const scaleOut = styled.keyframes`
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
`;

const Content = styled.div`
  padding: 0;
  gap: 0.5em;
  width: ${width};
  display: flex;
  font-size: 14px;
  overflow-y: auto;
  max-height: 400px;
  border-radius: 4px;
  background: #ffffff;
  z-index: 3 !important;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid #d0d5dd;
  justify-content: flex-start;

  /* &[data-state="open"] { */
  /*   animation: ${scaleOut} 0.2s ease-in-out; */
  /* } */
  /**/
  /* &[data-state="closed"] { */
  /*   animation: ${scaleOut} 0.2s ease-in-out reverse; */
  /* } */
`;

const Viewport = styled.div`
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background: var(--light_95, #F3F3F3);
  box-shadow: 0px 4px 12px 0px rgba(140, 140, 140, 0.27);
`;

const Item = styled.button`
  gap: 0.5em;
  color: #FFF;
  width: 100%;
  border: none;
  display: flex;
  cursor: pointer;
  font-size: 14px;
  background: #22272b;
  align-items: center;
  flex-direction: row;
  padding: 0.5em 0.75em;
  justify-content: space-between;
  transition: background 0.2s ease-in-out;
  
  // &:nth-child(n + 1) {
  //   border-top: 1px solid #d0d5dd;
  // }

  &:hover {
    background: #d0d5dd;
    boder: none;
  }

  &:focus {
    outline: none;
  }
`;

return (
  <Container>
    {noLabel ? <></> : <Label>{label}</Label>}
    <Select.Root value={value} onValueChange={(value) => onChange(value)}>
      <Select.Trigger asChild={true}>
        <Input>
          <Select.Value
            aria-label={value}
            placeholder={<Placeholder>{placeholder}</Placeholder>}
          />
          <Select.Icon>
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1.5L6 6.5L11 1.5"
                stroke="currentColor"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Select.Icon>
        </Input>
      </Select.Trigger>

      <Select.Content asChild={true} position="popper">
        <Content className="menu">
          <Select.Viewport asChild={true}>
            <Viewport>
              {options.map(({ text, value }) => (
                <Select.Item value={value} asChild={true}>
                  <Item>
                    <Select.ItemText>{text}</Select.ItemText>
                    <Select.ItemIndicator>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Select.ItemIndicator>
                  </Item>
                </Select.Item>
              ))}
            </Viewport>
          </Select.Viewport>
        </Content>
      </Select.Content>
    </Select.Root>
  </Container>
);
