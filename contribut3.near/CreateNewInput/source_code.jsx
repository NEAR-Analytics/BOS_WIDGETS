const ownerId = "contribut3.near";

State.init({
  show: false,
});

const icon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_721_25679)">
      <path
        d="M3.74984 18.3333V14.1667M3.74984 5.83334V1.66667M1.6665 3.75001H5.83317M1.6665 16.25H5.83317M10.8332 2.5L9.38802 6.25739C9.15301 6.86842 9.03551 7.17393 8.85278 7.43091C8.69083 7.65867 8.49184 7.85766 8.26408 8.01961C8.00709 8.20234 7.70158 8.31985 7.09055 8.55486L3.33317 10L7.09056 11.4452C7.70158 11.6802 8.00709 11.7977 8.26408 11.9804C8.49184 12.1423 8.69083 12.3413 8.85278 12.5691C9.03551 12.8261 9.15301 13.1316 9.38802 13.7426L10.8332 17.5L12.2783 13.7426C12.5133 13.1316 12.6308 12.8261 12.8136 12.5691C12.9755 12.3413 13.1745 12.1423 13.4023 11.9804C13.6592 11.7977 13.9648 11.6802 14.5758 11.4452L18.3332 10L14.5758 8.55486C13.9648 8.31985 13.6592 8.20234 13.4023 8.01961C13.1745 7.85766 12.9755 7.65867 12.8136 7.43091C12.6308 7.17393 12.5133 6.86842 12.2783 6.25739L10.8332 2.5Z"
        stroke="white"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_721_25679">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

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
      stroke="white"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const Arrow = styled.div`
  transition: transform 0.2s ease-in-out;

  &.show {
    transform: rotate(-180deg);
  }
`;

const DropdownDivider = styled.hr`
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.4);
  margin: 0;
`;

const DropdownItem = styled.a`
  display: block;
  width: 100%;
  clear: both;
  padding: 1em;
  font-weight: 400;
  white-space: nowrap;
  text-decoration: none;
  color: black;
  border: 0;
  text-align: left;
  transition: background-color 0.2s ease-in-out;
  background-color: white;

  &:hover {
    color: black;
    text-decoration: none;
    background-color: #e9ecef;
  }
`;

const DropdownLi = styled.li`
  cursor: pointer;
  z-index: 3;
`;

const createNewButton = ({ id, text, icon }) => (
  <DropdownMenu.Item asChild={true}>
    <DropdownLi>
      <DropdownItem
        href={`/${ownerId}/widget/Index?tab=${id}`}
        onClick={() => props.update({ tab: id, content: "" })}
      >
        <i className={icon} />
        <span>{text}</span>
      </DropdownItem>
    </DropdownLi>
  </DropdownMenu.Item>
);

const scaleOut = styled.keyframes`
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
`;

const DropdownList = styled.ul`
  z-index: 3;
  dislpay: block;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  list-style-type: none;
  padding: 0px;
  margin: 0px;
  transform-origin: top right;
  width: 184px;

  &[data-state="open"] {
    animation: ${scaleOut} 0.2s ease-in-out;
  }

  &[data-state="closed"] {
    animation: ${scaleOut} 0.2s ease-in-out reverse;
  }
`;

const MenuIcon = styled.button`
  color: #fff;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5em 1em;
  gap: 0.5em;
  background: #11181c;
  border-radius: 50px;
  flex: none;
  order: 1;
  flex-grow: 0;
`;

const DropdownContainer = styled.div`
  position: relative;
  z-index: 3;
`;

const MenuText = styled.span`
  margin: 0 0.2em;
`;

return (
  <DropdownMenu.Root
    asChild={true}
    onOpenChange={(show) => State.update({ show })}
    open={state.show}
  >
    <DropdownMenu.Trigger asChild={true}>
      <MenuIcon>
        {icon}
        <MenuText>Create new...</MenuText>
        <Arrow className={state.show ? "show" : ""}>{arrowIcon}</Arrow>
      </MenuIcon>
    </DropdownMenu.Trigger>

    <DropdownMenu.Content asChild={true}>
      <DropdownList className={state.show ? "show" : ""}>
        {createNewButton({
          id: "createproject",
          text: "Project",
          icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.04733 10.1476C4.41092 10.1476 3.78075 10.0189 3.19278 9.76896C2.60482 9.51901 2.07058 9.15265 1.62058 8.6908C1.17057 8.22896 0.813605 7.68066 0.570063 7.07723C0.326521 6.47379 0.201172 5.82703 0.201172 5.17388C0.201172 4.52073 0.326521 3.87397 0.570063 3.27053C0.813605 2.6671 1.17057 2.1188 1.62058 1.65695C2.07058 1.1951 2.60482 0.828746 3.19278 0.578795C3.78075 0.328844 4.41092 0.200195 5.04733 0.200195C6.33261 0.200195 7.56524 0.724207 8.47407 1.65695C9.3829 2.5897 9.89348 3.85478 9.89348 5.17388C9.89348 6.49298 9.3829 7.75806 8.47407 8.6908C7.56524 9.62355 6.33261 10.1476 5.04733 10.1476ZM5.58579 21.2002C4.30051 21.2002 3.06787 20.6762 2.15904 19.7434C1.25021 18.8107 0.739634 17.5456 0.739634 16.2265C0.739634 14.9074 1.25021 13.6423 2.15904 12.7096C3.06787 11.7768 4.30051 11.2528 5.58579 11.2528C6.87107 11.2528 8.10371 11.7768 9.01254 12.7096C9.92137 13.6423 10.4319 14.9074 10.4319 16.2265C10.4319 17.5456 9.92137 18.8107 9.01254 19.7434C8.10371 20.6762 6.87107 21.2002 5.58579 21.2002ZM16.355 10.1476C15.7186 10.1476 15.0884 10.0189 14.5005 9.76896C13.9125 9.51901 13.3783 9.15265 12.9283 8.6908C12.4783 8.22896 12.1213 7.68066 11.8778 7.07723C11.6342 6.47379 11.5089 5.82703 11.5089 5.17388C11.5089 4.52073 11.6342 3.87397 11.8778 3.27053C12.1213 2.6671 12.4783 2.1188 12.9283 1.65695C13.3783 1.1951 13.9125 0.828746 14.5005 0.578795C15.0884 0.328844 15.7186 0.200195 16.355 0.200195C17.6403 0.200195 18.8729 0.724207 19.7818 1.65695C20.6906 2.5897 21.2012 3.85478 21.2012 5.17388C21.2012 6.49298 20.6906 7.75806 19.7818 8.6908C18.8729 9.62355 17.6403 10.1476 16.355 10.1476ZM16.355 21.2002C15.0697 21.2002 13.8371 20.6762 12.9283 19.7434C12.0194 18.8107 11.5089 17.5456 11.5089 16.2265C11.5089 14.9074 12.0194 13.6423 12.9283 12.7096C13.8371 11.7768 15.0697 11.2528 16.355 11.2528C17.6403 11.2528 18.8729 11.7768 19.7818 12.7096C20.6906 13.6423 21.2012 14.9074 21.2012 16.2265C21.2012 17.5456 20.6906 18.8107 19.7818 19.7434C18.8729 20.6762 17.6403 21.2002 16.355 21.2002ZM5.04733 7.93704C5.76137 7.93704 6.44617 7.64592 6.95108 7.12773C7.45598 6.60953 7.73963 5.90671 7.73963 5.17388C7.73963 4.44104 7.45598 3.73822 6.95108 3.22003C6.44617 2.70184 5.76137 2.41072 5.04733 2.41072C4.33328 2.41072 3.64848 2.70184 3.14358 3.22003C2.63867 3.73822 2.35502 4.44104 2.35502 5.17388C2.35502 5.90671 2.63867 6.60953 3.14358 7.12773C3.64848 7.64592 4.33328 7.93704 5.04733 7.93704ZM5.58579 18.9897C6.29983 18.9897 6.98463 18.6986 7.48954 18.1804C7.99444 17.6622 8.2781 16.9593 8.2781 16.2265C8.2781 15.4937 7.99444 14.7909 7.48954 14.2727C6.98463 13.7545 6.29983 13.4634 5.58579 13.4634C4.87174 13.4634 4.18694 13.7545 3.68204 14.2727C3.17713 14.7909 2.89348 15.4937 2.89348 16.2265C2.89348 16.9593 3.17713 17.6622 3.68204 18.1804C4.18694 18.6986 4.87174 18.9897 5.58579 18.9897ZM16.355 7.93704C17.0691 7.93704 17.7539 7.64592 18.2588 7.12773C18.7637 6.60953 19.0473 5.90671 19.0473 5.17388C19.0473 4.44104 18.7637 3.73822 18.2588 3.22003C17.7539 2.70184 17.0691 2.41072 16.355 2.41072C15.641 2.41072 14.9562 2.70184 14.4513 3.22003C13.9464 3.73822 13.6627 4.44104 13.6627 5.17388C13.6627 5.90671 13.9464 6.60953 14.4513 7.12773C14.9562 7.64592 15.641 7.93704 16.355 7.93704ZM16.355 18.9897C17.0691 18.9897 17.7539 18.6986 18.2588 18.1804C18.7637 17.6622 19.0473 16.9593 19.0473 16.2265C19.0473 15.4937 18.7637 14.7909 18.2588 14.2727C17.7539 13.7545 17.0691 13.4634 16.355 13.4634C15.641 13.4634 14.9562 13.7545 14.4513 14.2727C13.9464 14.7909 13.6627 15.4937 13.6627 16.2265C13.6627 16.9593 13.9464 17.6622 14.4513 18.1804C14.9562 18.6986 15.641 18.9897 16.355 18.9897Z" fill="black" />
          </svg>
          ,
        })}
        <li>
          <DropdownDivider />
        </li>
        {createNewButton({
          id: "createrequest",
          text: "Request",
          icon: "bi-boxes",
        })}
        {/*createNewButton({
          id: "createvendor",
          text: "Vendor",
          icon: "bi-diagram-2",
        })*/}
      </DropdownList>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
);
