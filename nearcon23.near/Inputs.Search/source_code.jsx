const label = props?.label;
const placeholder = props?.placeholder ?? "Placeholder";
const value = props.value ?? "";
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

const Label = styled.label`
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1.25em;
  color: #344054;
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

const Input = styled.input`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  :focus{
    outline: none;
}
  padding: 0.5em 0.75em;
  gap: 0.5em;
  border-width:0px;
  border-radius: 4px;
  color: #101828;
  width: 100%;
`;

const InputContainerDiv = styled.div`
  background: #ffffff;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 10px;
  border: 1px solid #d0d5dd;
  border-radius: 4px;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
`;

return (
  <Container>
    {!!label && <Label>{label}</Label>}
    <InputContainerDiv>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <path
          d="M17.1634 15.8367L13.4533 12.125C14.5657 10.6754 15.085 8.85688 14.906 7.03841C14.7269 5.21993 13.8629 3.53765 12.4891 2.33282C11.1153 1.12799 9.33464 0.490837 7.50834 0.550608C5.68205 0.610378 3.94687 1.3626 2.65479 2.65467C1.36272 3.94675 0.6105 5.68193 0.55073 7.50822C0.490959 9.33451 1.12811 11.1152 2.33294 12.489C3.53777 13.8628 5.22005 14.7268 7.03853 14.9059C8.85701 15.0849 10.6755 14.5656 12.1251 13.4531L15.8384 17.1672C15.9256 17.2544 16.0292 17.3236 16.1431 17.3708C16.257 17.418 16.3792 17.4423 16.5025 17.4423C16.6258 17.4423 16.7479 17.418 16.8619 17.3708C16.9758 17.3236 17.0793 17.2544 17.1665 17.1672C17.2537 17.08 17.3229 16.9765 17.3701 16.8625C17.4173 16.7486 17.4416 16.6265 17.4416 16.5031C17.4416 16.3798 17.4173 16.2577 17.3701 16.1438C17.3229 16.0298 17.2537 15.9263 17.1665 15.8391L17.1634 15.8367ZM2.43764 7.75002C2.43764 6.6993 2.74921 5.67218 3.33295 4.79855C3.9167 3.92491 4.7464 3.244 5.71713 2.84191C6.68786 2.43981 7.75603 2.33461 8.78656 2.53959C9.81708 2.74458 10.7637 3.25054 11.5066 3.99351C12.2496 4.73648 12.7556 5.68307 12.9606 6.7136C13.1655 7.74412 13.0603 8.81229 12.6582 9.78302C12.2562 10.7538 11.5752 11.5835 10.7016 12.1672C9.82797 12.7509 8.80085 13.0625 7.75014 13.0625C6.34162 13.0611 4.9912 12.5009 3.99523 11.5049C2.99926 10.5089 2.43908 9.15853 2.43764 7.75002Z"
          fill="#868682"
        />
      </svg>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={({ target: { value } }) => onChange(value)}
        onBlur={() => validate()}
      />
    </InputContainerDiv>
    <Error className={error ? "show" : ""}>{error}</Error>
  </Container>
);
