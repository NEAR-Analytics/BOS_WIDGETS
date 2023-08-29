const backgroundColor = props.backgroundColor ?? "#1E1F28";
const width = props.width ?? "14.5625rem";
const borderColor = props.border ?? "#9c9da326";
const expanded = props.expanded ?? false;
const apps = props.apps ?? [];
const onAppClick = props.onAppClick ?? null;

const applicationList = {
  id: "applicationList",
  name: "Application List",
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M1 2C1 1.73478 1.10536 1.48043 1.29289 1.29289C1.48043 1.10536 1.73478 1 2 1H4C4.26522 1 4.51957 1.10536 4.70711 1.29289C4.89464 1.48043 5 1.73478 5 2V4C5 4.26522 4.89464 4.51957 4.70711 4.70711C4.51957 4.89464 4.26522 5 4 5H2C1.73478 5 1.48043 4.89464 1.29289 4.70711C1.10536 4.51957 1 4.26522 1 4V2ZM6 2C6 1.73478 6.10536 1.48043 6.29289 1.29289C6.48043 1.10536 6.73478 1 7 1H9C9.26522 1 9.51957 1.10536 9.70711 1.29289C9.89464 1.48043 10 1.73478 10 2V4C10 4.26522 9.89464 4.51957 9.70711 4.70711C9.51957 4.89464 9.26522 5 9 5H7C6.73478 5 6.48043 4.89464 6.29289 4.70711C6.10536 4.51957 6 4.26522 6 4V2ZM11 2C11 1.73478 11.1054 1.48043 11.2929 1.29289C11.4804 1.10536 11.7348 1 12 1H14C14.2652 1 14.5196 1.10536 14.7071 1.29289C14.8946 1.48043 15 1.73478 15 2V4C15 4.26522 14.8946 4.51957 14.7071 4.70711C14.5196 4.89464 14.2652 5 14 5H12C11.7348 5 11.4804 4.89464 11.2929 4.70711C11.1054 4.51957 11 4.26522 11 4V2ZM1 7C1 6.73478 1.10536 6.48043 1.29289 6.29289C1.48043 6.10536 1.73478 6 2 6H4C4.26522 6 4.51957 6.10536 4.70711 6.29289C4.89464 6.48043 5 6.73478 5 7V9C5 9.26522 4.89464 9.51957 4.70711 9.70711C4.51957 9.89464 4.26522 10 4 10H2C1.73478 10 1.48043 9.89464 1.29289 9.70711C1.10536 9.51957 1 9.26522 1 9V7ZM6 7C6 6.73478 6.10536 6.48043 6.29289 6.29289C6.48043 6.10536 6.73478 6 7 6H9C9.26522 6 9.51957 6.10536 9.70711 6.29289C9.89464 6.48043 10 6.73478 10 7V9C10 9.26522 9.89464 9.51957 9.70711 9.70711C9.51957 9.89464 9.26522 10 9 10H7C6.73478 10 6.48043 9.89464 6.29289 9.70711C6.10536 9.51957 6 9.26522 6 9V7ZM11 7C11 6.73478 11.1054 6.48043 11.2929 6.29289C11.4804 6.10536 11.7348 6 12 6H14C14.2652 6 14.5196 6.10536 14.7071 6.29289C14.8946 6.48043 15 6.73478 15 7V9C15 9.26522 14.8946 9.51957 14.7071 9.70711C14.5196 9.89464 14.2652 10 14 10H12C11.7348 10 11.4804 9.89464 11.2929 9.70711C11.1054 9.51957 11 9.26522 11 9V7ZM1 12C1 11.7348 1.10536 11.4804 1.29289 11.2929C1.48043 11.1054 1.73478 11 2 11H4C4.26522 11 4.51957 11.1054 4.70711 11.2929C4.89464 11.4804 5 11.7348 5 12V14C5 14.2652 4.89464 14.5196 4.70711 14.7071C4.51957 14.8946 4.26522 15 4 15H2C1.73478 15 1.48043 14.8946 1.29289 14.7071C1.10536 14.5196 1 14.2652 1 14V12ZM6 12C6 11.7348 6.10536 11.4804 6.29289 11.2929C6.48043 11.1054 6.73478 11 7 11H9C9.26522 11 9.51957 11.1054 9.70711 11.2929C9.89464 11.4804 10 11.7348 10 12V14C10 14.2652 9.89464 14.5196 9.70711 14.7071C9.51957 14.8946 9.26522 15 9 15H7C6.73478 15 6.48043 14.8946 6.29289 14.7071C6.10536 14.5196 6 14.2652 6 14V12ZM11 12C11 11.7348 11.1054 11.4804 11.2929 11.2929C11.4804 11.1054 11.7348 11 12 11H14C14.2652 11 14.5196 11.1054 14.7071 11.2929C14.8946 11.4804 15 11.7348 15 12V14C15 14.2652 14.8946 14.5196 14.7071 14.7071C14.5196 14.8946 14.2652 15 14 15H12C11.7348 15 11.4804 14.8946 11.2929 14.7071C11.1054 14.5196 11 14.2652 11 14V12Z"
        fill="white"
      />
    </svg>
  ),
};

const defaul = props.default ?? applicationList;

State.init({
  expanded: expanded,
  selectedApp: applicationList,
});

const arrowUp = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14.7071 12.7071C14.3166 13.0976 13.6834 13.0976 13.2929 12.7071L10 9.41421L6.70712 12.7071C6.3166 13.0976 5.68343 13.0976 5.29291 12.7071C4.90238 12.3166 4.90238 11.6834 5.29291 11.2929L9.2929 7.29289C9.68342 6.90237 10.3166 6.90237 10.7071 7.29289L14.7071 11.2929C15.0976 11.6834 15.0976 12.3166 14.7071 12.7071Z"
      fill="white"
    />
  </svg>
);

const arrowDown = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7.29289 14.7071C6.90237 14.3166 6.90237 13.6834 7.29289 13.2929L10.5858 10L7.29289 6.70712C6.90237 6.3166 6.90237 5.68343 7.29289 5.29291C7.68342 4.90238 8.31658 4.90238 8.70711 5.29291L12.7071 9.2929C13.0976 9.68343 13.0976 10.3166 12.7071 10.7071L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071Z"
      fill="white"
    />
  </svg>
);

const Dropdown = styled.div`
display: ${(props) => (props.expanded ? "block" : "none")};
width: 100%;
border-top: 1px solid ${borderColor};
opacity: ${(props) => (props.expanded ? 1 : 0)};
max-height: ${(props) => (props.expanded ? "1000px" : "0")};
transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out; /* Apply transitions */
`;

const Divider = styled.div`
width: 100%;
height: 1px;
background-color: #9C9DA326;
`;

const DropdownContainer = styled.div`
width: ${width};
overflow: hidden;
border-radius: 0.25rem;
background-color: ${backgroundColor};
z-index: 100;
position: absolute;
top: 0%;
`;

const SelectedApp = styled.div`
background-color: ${backgroundColor};
width: 100%;
cursor: pointer;
align-items: center;
display: inline-flex;
flex-direction: row;
justify-content: space-between;
`;

const Arrow = styled.div`
padding: 1rem;
`;

const handleWidgetClick = (app) => {
  State.update({
    expanded: false,
    selectedApp: app,
  });
  onAppClick(app);
};

const toggleDropdown = () => {
  State.update({
    expanded: !state.expanded,
  });
};

return (
  <DropdownContainer>
    <SelectedApp onClick={toggleDropdown}>
      <Widget
        src="vuki.near/widget/DropdownElement"
        props={{
          app: state.selectedApp,
          backgroundColor: backgroundColor,
        }}
      />
      {apps.length > 0 && <Arrow>{state.expanded ? arrowUp : arrowDown}</Arrow>}
    </SelectedApp>
    <Dropdown expanded={state.expanded}>
      {apps.map((app, index) => {
        return (
          <>
            <Widget
              src="vuki.near/widget/DropdownElement"
              props={{
                app: app,
                onClick: () => handleWidgetClick(app),
                backgroundColor: backgroundColor,
              }}
            />
            {index !== apps.length - 1 && <Divider />}{" "}
            {/* Render divider for all but the last element */}
          </>
        );
      })}
    </Dropdown>
  </DropdownContainer>
);
