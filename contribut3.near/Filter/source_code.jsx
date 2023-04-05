const ownerId = "contribut3.near";
const name = props.name ?? "Type";
const options = props.options ?? [
  { id: "option-1", text: "Option 1", href: "#" },
  { id: "option-2", text: "Option 2", href: "#" },
  { id: "option-2", text: "Option 2", href: "#" },
];
const selected = props.selected ?? options[0].id;

State.init({
  show: false,
});

const DropdownContainer = styled.div`
  position: relative;

  ul {
    --y-pos: 40px;
    z-index: 3;
    dislpay: block;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    list-style-type: none;
    position: absolute;
    inset: 0px 0px auto auto;
    padding: 0px;
    margin: 0px;
    transform: translate(0px, var(--y-pos)) scale(0);
    transition: transform 0.2s ease-in-out;
    transform-origin: top right;
    width: 100%;

    &.show {
      transform: translate(0px, var(--y-pos)) scale(1);
    }
  }
`;

const DropdownItem = styled.li`
  cursor: pointer;

  a {
    display: block;
    width: 100%;
    clear
    padding: 1em;
    font-while: ${({ selected }) => (selected ? "600" : "400")};
    white-space: nowrap;
    text-decoration: none;
    color: #000;
    border: 0;
    text-align: left;
    transition: background-color 0.2s ease-in-out;
    background-color: ${({ selected }) => (selected ? "#e9ecef" : "#fff")};

    &:hover {
      color: #000;
      text-decoration: none;
      background-color: #e9ecef;
    }
  }
`;

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid #e9ecef;
  margin: 0;
`;

const Arrow = styled.div`
  transition: transform 0.2s ease-in-out;

  &.show {
    transform: rotate(-180deg);
  }
`;

const arrowIcon = (
  <svg
    width="12"
    height="8"
    viewBox="0 0 12 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1.5L6 6.5L11 1.5"
      stroke="black"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const Label = styled.label`
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1.25em;
  color: #344054;
`;

const DropdownButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 0.25em;
  font-style: normal;
  font-weight: 400;
  font-size: 0.95em;
  line-height: 1.25em;
  color: #101828;
  background-color: #fff;
  border: none;
`;

const createOption = ({ id, text, href }) => (
  <DropdownItem key={id} selected={selected === id}>
    <a href={href} onClick={() => props.update(id)}>
      {text}
    </a>
  </DropdownItem>
);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1em;
`

return (
  <Container>
    <Label htmlFor={name}>{name}:</Label>

    <DropdownContainer className={state.show ? "show" : ""}>
      <DropdownButton
        onClick={() => State.update({ show: !state.show })}
        onBlur={() => State.update({ show: false })}
      >
        {options.find((option) => option.id === selected).text}
        <Arrow className={state.show ? "show" : ""}>
          {arrowIcon}
        </Arrow>
      </DropdownButton>

      <ul>
        {options.map((option) => createOption(option))}
      </ul>
    </DropdownContainer>
  </Container>
);
