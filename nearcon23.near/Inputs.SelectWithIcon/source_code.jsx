const placeholder = props.placeholder ?? "Select an option";
const value = props.value ?? "";
const options = props.options ?? [];
const onChange = props.onChange ?? (() => {});
const validate = props.validate ?? (() => {});
const error = props.error ?? "";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px;
  gap: 0.45em;
  width: 100%;
`;

const Error = styled.span`
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  font-size: 0.75em;
  line-height: 1.25em;
  color: #ff4d4f;
  height: 0;
  overflow: hidden;
  transition: height 0.3s ease-in-out;

  &.show {
    height: 1.25em;
  }
`;

const Input = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em 0.75em;
  gap: 0.5em;
  background: #ffffff;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 4px;
  color: #101828;
  width: 100%;
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0;
  gap: 0.5em;
  width: 100%;
  border: 1px solid #d0d5dd;
  border-radius: 4px;
  background: #ffffff;
  z-index: 3 !important;

  /* &[data-state="open"] { */
  /*   animation: ${scaleOut} 0.2s ease-in-out; */
  /* } */
  /**/
  /* &[data-state="closed"] { */
  /*   animation: ${scaleOut} 0.2s ease-in-out reverse; */
  /* } */
`;

const Viewport = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0;
  width: 100%;
`;

const Item = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em 0.75em;
  gap: 0.5em;
  width: 100%;
  cursor: pointer;
  background: transparent;
  border: none;
  transition: background 0.2s ease-in-out;

  &:nth-child(n + 1) {
    border-top: 1px solid #d0d5dd;
  }

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
    <Select.Root
      value={value?.value}
      onValueChange={(value) =>
        onChange(options.find((option) => option.value === value))
      }
    >
      <Select.Trigger asChild={true}>
        <Input>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {props.icon && <Select.Icon>{props.icon}</Select.Icon>}

            <Select.Value
              aria-label={value.value}
              placeholder={<Placeholder>{placeholder}</Placeholder>}
            />
          </div>
          <Select.Icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
            >
              <path
                d="M15.1637 13.0867C15.2511 13.1738 15.3205 13.2773 15.3678 13.3913C15.4151 13.5052 15.4395 13.6274 15.4395 13.7508C15.4395 13.8742 15.4151 13.9964 15.3678 14.1103C15.3205 14.2243 15.2511 14.3278 15.1637 14.4149L11.4137 18.1649C11.3266 18.2523 11.2231 18.3216 11.1092 18.3689C10.9952 18.4162 10.8731 18.4406 10.7497 18.4406C10.6263 18.4406 10.5041 18.4162 10.3902 18.3689C10.2762 18.3216 10.1727 18.2523 10.0856 18.1649L6.33561 14.4149C6.15949 14.2387 6.06055 13.9999 6.06055 13.7508C6.06055 13.5017 6.15949 13.2628 6.33561 13.0867C6.51173 12.9106 6.7506 12.8117 6.99967 12.8117C7.24874 12.8117 7.48762 12.9106 7.66374 13.0867L10.7505 16.1719L13.8372 13.0844C13.9244 12.9974 14.0279 12.9284 14.1418 12.8814C14.2557 12.8344 14.3777 12.8104 14.5009 12.8106C14.6241 12.8108 14.7461 12.8353 14.8598 12.8827C14.9735 12.9301 15.0768 12.9994 15.1637 13.0867ZM7.66374 6.91485L10.7505 3.82813L13.8372 6.91563C14.0133 7.09175 14.2522 7.1907 14.5012 7.1907C14.7503 7.1907 14.9892 7.09175 15.1653 6.91563C15.3414 6.73951 15.4404 6.50064 15.4404 6.25157C15.4404 6.0025 15.3414 5.76363 15.1653 5.58751L11.4153 1.83751C11.3282 1.75011 11.2247 1.68076 11.1108 1.63344C10.9968 1.58612 10.8746 1.56177 10.7512 1.56177C10.6278 1.56177 10.5057 1.58612 10.3917 1.63344C10.2778 1.68076 10.1743 1.75011 10.0872 1.83751L6.33717 5.58751C6.16105 5.76363 6.06211 6.0025 6.06211 6.25157C6.06211 6.50064 6.16105 6.73951 6.33717 6.91563C6.51329 7.09175 6.75216 7.1907 7.00124 7.1907C7.25031 7.1907 7.48918 7.09175 7.6653 6.91563L7.66374 6.91485Z"
                fill="#868682"
              />
            </svg>
          </Select.Icon>
        </Input>
      </Select.Trigger>

      <Select.Content asChild={true}>
        <Content>
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
                          fill-rule="evenodd"
                          clip-rule="evenodd"
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
