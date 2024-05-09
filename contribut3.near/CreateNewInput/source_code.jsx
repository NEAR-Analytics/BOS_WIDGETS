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
        stroke="currentColor"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_721_25679">
        <rect width="20" height="20" fill="currentColor" />
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
      stroke="currentColor"
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
  <DropdownMenu.Item asChild>
    <DropdownLi>
      <DropdownItem
        href={`/${ownerId}/widget/Index?tab=${id}`}
        onClick={() => props.update({ tab: id, content: "" })}
      >
        {icon}
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
  color: black;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5em 1em;
  gap: 0.5em;
  background: #00ec97;
  border-radius: 50px;
  flex: none;
  order: 1;
  flex-grow: 0;
  border: none;

  &:focus-visible {
    outline: none;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  z-index: 3;
`;

const MenuText = styled.span`
  margin: 0 0.2em;
  font-size: 0.9em;
  font-weight: 500;
`;

return (
  <DropdownMenu.Root
    asChild
    onOpenChange={(show) => State.update({ show })}
    open={state.show}
  >
    <DropdownMenu.Trigger asChild>
      <MenuIcon>
        {icon}
        <MenuText>Create new...</MenuText>
        <Arrow className={state.show ? "show" : ""}>{arrowIcon}</Arrow>
      </MenuIcon>
    </DropdownMenu.Trigger>

    <DropdownMenu.Content asChild>
      <DropdownList className={state.show ? "show" : ""}>
        {createNewButton({
          id: "createproject",
          text: "Project",
          icon: (
            <svg
              width="18"
              height="18"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.04733 10.1476C4.41092 10.1476 3.78075 10.0189 3.19278 9.76896C2.60482 9.51901 2.07058 9.15265 1.62058 8.6908C1.17057 8.22896 0.813605 7.68066 0.570063 7.07723C0.326521 6.47379 0.201172 5.82703 0.201172 5.17388C0.201172 4.52073 0.326521 3.87397 0.570063 3.27053C0.813605 2.6671 1.17057 2.1188 1.62058 1.65695C2.07058 1.1951 2.60482 0.828746 3.19278 0.578795C3.78075 0.328844 4.41092 0.200195 5.04733 0.200195C6.33261 0.200195 7.56524 0.724207 8.47407 1.65695C9.3829 2.5897 9.89348 3.85478 9.89348 5.17388C9.89348 6.49298 9.3829 7.75806 8.47407 8.6908C7.56524 9.62355 6.33261 10.1476 5.04733 10.1476ZM5.58579 21.2002C4.30051 21.2002 3.06787 20.6762 2.15904 19.7434C1.25021 18.8107 0.739634 17.5456 0.739634 16.2265C0.739634 14.9074 1.25021 13.6423 2.15904 12.7096C3.06787 11.7768 4.30051 11.2528 5.58579 11.2528C6.87107 11.2528 8.10371 11.7768 9.01254 12.7096C9.92137 13.6423 10.4319 14.9074 10.4319 16.2265C10.4319 17.5456 9.92137 18.8107 9.01254 19.7434C8.10371 20.6762 6.87107 21.2002 5.58579 21.2002ZM16.355 10.1476C15.7186 10.1476 15.0884 10.0189 14.5005 9.76896C13.9125 9.51901 13.3783 9.15265 12.9283 8.6908C12.4783 8.22896 12.1213 7.68066 11.8778 7.07723C11.6342 6.47379 11.5089 5.82703 11.5089 5.17388C11.5089 4.52073 11.6342 3.87397 11.8778 3.27053C12.1213 2.6671 12.4783 2.1188 12.9283 1.65695C13.3783 1.1951 13.9125 0.828746 14.5005 0.578795C15.0884 0.328844 15.7186 0.200195 16.355 0.200195C17.6403 0.200195 18.8729 0.724207 19.7818 1.65695C20.6906 2.5897 21.2012 3.85478 21.2012 5.17388C21.2012 6.49298 20.6906 7.75806 19.7818 8.6908C18.8729 9.62355 17.6403 10.1476 16.355 10.1476ZM16.355 21.2002C15.0697 21.2002 13.8371 20.6762 12.9283 19.7434C12.0194 18.8107 11.5089 17.5456 11.5089 16.2265C11.5089 14.9074 12.0194 13.6423 12.9283 12.7096C13.8371 11.7768 15.0697 11.2528 16.355 11.2528C17.6403 11.2528 18.8729 11.7768 19.7818 12.7096C20.6906 13.6423 21.2012 14.9074 21.2012 16.2265C21.2012 17.5456 20.6906 18.8107 19.7818 19.7434C18.8729 20.6762 17.6403 21.2002 16.355 21.2002ZM5.04733 7.93704C5.76137 7.93704 6.44617 7.64592 6.95108 7.12773C7.45598 6.60953 7.73963 5.90671 7.73963 5.17388C7.73963 4.44104 7.45598 3.73822 6.95108 3.22003C6.44617 2.70184 5.76137 2.41072 5.04733 2.41072C4.33328 2.41072 3.64848 2.70184 3.14358 3.22003C2.63867 3.73822 2.35502 4.44104 2.35502 5.17388C2.35502 5.90671 2.63867 6.60953 3.14358 7.12773C3.64848 7.64592 4.33328 7.93704 5.04733 7.93704ZM5.58579 18.9897C6.29983 18.9897 6.98463 18.6986 7.48954 18.1804C7.99444 17.6622 8.2781 16.9593 8.2781 16.2265C8.2781 15.4937 7.99444 14.7909 7.48954 14.2727C6.98463 13.7545 6.29983 13.4634 5.58579 13.4634C4.87174 13.4634 4.18694 13.7545 3.68204 14.2727C3.17713 14.7909 2.89348 15.4937 2.89348 16.2265C2.89348 16.9593 3.17713 17.6622 3.68204 18.1804C4.18694 18.6986 4.87174 18.9897 5.58579 18.9897ZM16.355 7.93704C17.0691 7.93704 17.7539 7.64592 18.2588 7.12773C18.7637 6.60953 19.0473 5.90671 19.0473 5.17388C19.0473 4.44104 18.7637 3.73822 18.2588 3.22003C17.7539 2.70184 17.0691 2.41072 16.355 2.41072C15.641 2.41072 14.9562 2.70184 14.4513 3.22003C13.9464 3.73822 13.6627 4.44104 13.6627 5.17388C13.6627 5.90671 13.9464 6.60953 14.4513 7.12773C14.9562 7.64592 15.641 7.93704 16.355 7.93704ZM16.355 18.9897C17.0691 18.9897 17.7539 18.6986 18.2588 18.1804C18.7637 17.6622 19.0473 16.9593 19.0473 16.2265C19.0473 15.4937 18.7637 14.7909 18.2588 14.2727C17.7539 13.7545 17.0691 13.4634 16.355 13.4634C15.641 13.4634 14.9562 13.7545 14.4513 14.2727C13.9464 14.7909 13.6627 15.4937 13.6627 16.2265C13.6627 16.9593 13.9464 17.6622 14.4513 18.1804C14.9562 18.6986 15.641 18.9897 16.355 18.9897Z"
                fill="#7e868c"
              />
            </svg>
          ),
        })}
        <li>
          <DropdownDivider />
        </li>
        {createNewButton({
          id: "createvendor",
          text: "Contributor",
          icon: (
            <svg
              width="19"
              height="18"
              viewBox="0 0 23 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M22.4 14.9778C22.4 14.5075 22.1997 14.0596 21.8483 13.7316C21.4974 13.4041 21.0241 13.2222 20.5333 13.2222H18.0667L18.0667 12.6438C18.0637 11.762 17.687 10.9202 17.0238 10.3012C16.361 9.68259 15.4651 9.33604 14.5333 9.33333H12.2333V7.4H15.2833C15.7741 7.4 16.2474 7.21816 16.5983 6.8906C16.9497 6.5626 17.15 6.11467 17.15 5.64444V1.75556C17.15 1.28533 16.9497 0.837397 16.5983 0.5094C16.2474 0.181839 15.7741 0 15.2833 0H6.11667C5.62588 0 5.15265 0.181839 4.8017 0.5094C4.45027 0.837396 4.25 1.28532 4.25 1.75555V5.64444C4.25 6.11467 4.45027 6.5626 4.8017 6.8906C5.15265 7.21816 5.62588 7.4 6.11667 7.4H10.1667V9.33333L7.86609 9.33333C6.93431 9.33604 6.03899 9.68259 5.37622 10.3012C4.71299 10.9202 4.33627 11.7627 4.33333 12.6444V13.2222H1.86667C1.37588 13.2222 0.902651 13.4041 0.551693 13.7316C0.200268 14.0596 1.99361e-07 14.5075 1.78814e-07 14.9778L0 19.6444C-2.05473e-08 20.1147 0.200268 20.5626 0.551693 20.8906C0.902651 21.2182 1.37588 21.4 1.86667 21.4H8.86667C9.35746 21.4 9.83068 21.2182 10.1816 20.8906C10.5331 20.5626 10.7333 20.1147 10.7333 19.6444V14.9778C10.7333 14.5075 10.5331 14.0596 10.1816 13.7316C9.83068 13.4041 9.35746 13.2222 8.86667 13.2222H6.4V12.6444C6.4 12.2896 6.55093 11.9462 6.82462 11.6907C7.09878 11.4348 7.4734 11.2889 7.86667 11.2889L14.5333 11.2889C14.9266 11.2889 15.3012 11.4348 15.5754 11.6907C15.8491 11.9462 16 12.2896 16 12.6444V13.2222H13.5333C13.0425 13.2222 12.5693 13.4041 12.2184 13.7316C11.8669 14.0596 11.6667 14.5075 11.6667 14.9778V19.6444C11.6667 20.1147 11.8669 20.5626 12.2184 20.8906C12.5693 21.2182 13.0425 21.4 13.5333 21.4H20.5333C21.0241 21.4 21.4974 21.2182 21.8483 20.8906C22.1997 20.5626 22.4 20.1147 22.4 19.6444V14.9778ZM13.7333 15.1778H20.3333V19.4444H13.7333V15.1778ZM6.31667 1.95555L15.0833 1.95556V5.44444H6.31667V1.95555ZM2.06667 15.1778H8.66667L8.66667 19.4444H2.06667L2.06667 15.1778Z"
                fill="#7e868c"
              />
            </svg>
          ),
        })}
        <li>
          <DropdownDivider />
        </li>
        {createNewButton({
          id: "createbacker",
          text: "Backer",
          icon: (
            <svg
              width="18"
              height="19"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 20H19M4 17V8.99998M8 17V8.99998M12 17V8.99998M16 17V8.99998M18 5.99998L10.424 1.26498C10.2702 1.16884 10.1933 1.12077 10.1108 1.10203C10.0379 1.08546 9.96214 1.08546 9.88921 1.10203C9.80673 1.12077 9.72982 1.16884 9.576 1.26498L2 5.99998H18Z"
                stroke="#7e868c"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ),
        })}
        <li>
          <DropdownDivider />
        </li>
        {createNewButton({
          id: "createrequest",
          text: "Request",
          icon: (
            <svg
              width="18"
              height="13.5"
              viewBox="0 0 24 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.80252 0.0979228C9.17114 0.0979228 8.56563 0.36887 8.11918 0.85116C7.67273 1.33345 7.42192 1.98757 7.42192 2.66963V7.41741C7.42192 7.57481 7.36404 7.72576 7.26101 7.83706C7.15798 7.94835 7.01825 8.01088 6.87255 8.01088H2.47759C1.84621 8.01088 1.2407 8.28183 0.79425 8.76412C0.3478 9.24641 0.0969875 9.90053 0.0969875 10.5826V15.3304C0.0969875 15.6681 0.158564 16.0025 0.2782 16.3145C0.397837 16.6265 0.57319 16.91 0.79425 17.1488C1.01531 17.3876 1.27774 17.5771 1.56657 17.7063C1.8554 17.8356 2.16496 17.9021 2.47759 17.9021H14.1975C14.5101 17.9021 14.8197 17.8356 15.1085 17.7063C15.3973 17.5771 15.6598 17.3876 15.8808 17.1488C16.1019 16.91 16.2772 16.6265 16.3969 16.3145C16.5165 16.0025 16.5781 15.6681 16.5781 15.3304V10.5826C16.5781 10.4252 16.636 10.2742 16.739 10.1629C16.842 10.0516 16.9817 9.98912 17.1275 9.98912H21.5224C22.1538 9.98912 22.7593 9.71817 23.2057 9.23588C23.6522 8.75359 23.903 8.09947 23.903 7.41741V2.66963C23.903 1.98757 23.6522 1.33345 23.2057 0.85116C22.7593 0.36887 22.1538 0.0979228 21.5224 0.0979228H9.80252ZM21.5224 8.01088H16.5781V2.07616H21.5224C21.6681 2.07616 21.8078 2.13869 21.9109 2.24999C22.0139 2.36128 22.0718 2.51224 22.0718 2.66963V7.41741C22.0718 7.57481 22.0139 7.72576 21.9109 7.83706C21.8078 7.94835 21.6681 8.01088 21.5224 8.01088ZM14.7468 8.01088H9.25315V2.66963C9.25315 2.51224 9.31103 2.36128 9.41406 2.24999C9.51708 2.13869 9.65682 2.07616 9.80252 2.07616H14.7468V8.01088ZM7.42192 9.98912V15.9238H2.47759C2.33189 15.9238 2.19215 15.8613 2.08913 15.75C1.9861 15.6387 1.92822 15.4878 1.92822 15.3304V10.5826C1.92822 10.4252 1.9861 10.2742 2.08913 10.1629C2.19215 10.0516 2.33189 9.98912 2.47759 9.98912H7.42192ZM9.25315 9.98912H14.7468V15.3304C14.7468 15.4878 14.689 15.6387 14.5859 15.75C14.4829 15.8613 14.3432 15.9238 14.1975 15.9238H9.25315V9.98912Z"
                fill="#7e868c"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.04832 0.784296C8.51238 0.282989 9.14322 0 9.80252 0H21.5224C22.1817 0 22.8126 0.282989 23.2766 0.784296C23.7405 1.28538 24 1.96366 24 2.66963V7.41741C24 8.12338 23.7405 8.80166 23.2766 9.30275C22.8126 9.80405 22.1817 10.087 21.5224 10.087H17.1275C17.0097 10.087 16.8953 10.1375 16.8098 10.2298C16.7242 10.3223 16.6751 10.4491 16.6751 10.5826V15.3304C16.6751 15.6801 16.6113 16.0265 16.4873 16.3499C16.3633 16.6733 16.1814 16.9675 15.9517 17.2157C15.7219 17.4639 15.4488 17.6611 15.1478 17.7958C14.8467 17.9306 14.5238 18 14.1975 18H2.47759C2.15128 18 1.82834 17.9306 1.52728 17.7958C1.22623 17.6611 0.95313 17.4639 0.723392 17.2157C0.493667 16.9675 0.311757 16.6733 0.187754 16.3499C0.0637526 16.0265 0 15.6801 0 15.3304V10.5826C0 9.87662 0.259546 9.19834 0.723392 8.69725C1.18745 8.19595 1.81829 7.91296 2.47759 7.91296H6.87255C6.99033 7.91296 7.10473 7.86247 7.19015 7.77019C7.27578 7.67769 7.32493 7.55089 7.32493 7.41741V2.66963C7.32493 1.96366 7.58448 1.28538 8.04832 0.784296ZM9.80252 0.195846C9.19906 0.195846 8.61888 0.454751 8.19004 0.918023C7.76098 1.38152 7.5189 2.01149 7.5189 2.66963V7.41741C7.5189 7.59872 7.45229 7.77383 7.33187 7.90392C7.21124 8.03423 7.04617 8.1088 6.87255 8.1088H2.47759C1.87413 8.1088 1.29395 8.36771 0.865108 8.83098C0.436055 9.29448 0.193975 9.92444 0.193975 10.5826V15.3304C0.193975 15.6561 0.253375 15.9785 0.368647 16.2792C0.483916 16.5798 0.652714 16.8525 0.865108 17.082C1.07749 17.3114 1.32926 17.493 1.60587 17.6168C1.88246 17.7406 2.17865 17.8042 2.47759 17.8042H14.1975C14.4964 17.8042 14.7926 17.7406 15.0692 17.6168C15.3458 17.493 15.5976 17.3114 15.81 17.082C16.0224 16.8525 16.1912 16.5798 16.3064 16.2792C16.4217 15.9785 16.4811 15.6561 16.4811 15.3304V10.5826C16.4811 10.4013 16.5477 10.2262 16.6681 10.0961C16.7888 9.96576 16.9538 9.8912 17.1275 9.8912H21.5224C22.1259 9.8912 22.706 9.63229 23.1349 9.16902C23.5639 8.70552 23.806 8.07555 23.806 7.41741V2.66963C23.806 2.01149 23.5639 1.38152 23.1349 0.918023C22.706 0.454751 22.1259 0.195846 21.5224 0.195846H9.80252ZM9.80252 2.17408C9.68474 2.17408 9.57034 2.22457 9.48491 2.31685C9.39928 2.40935 9.35014 2.53615 9.35014 2.66963V7.91296H14.6499V2.17408H9.80252ZM9.3432 2.18312C9.46383 2.05281 9.6289 1.97824 9.80252 1.97824H14.8438V8.1088H9.15616V2.66963C9.15616 2.48832 9.22278 2.31321 9.3432 2.18312ZM16.4811 1.97824H21.5224C21.696 1.97824 21.8611 2.05281 21.9817 2.18312C22.1022 2.31321 22.1688 2.48832 22.1688 2.66963V7.41741C22.1688 7.59872 22.1022 7.77383 21.9817 7.90392C21.8611 8.03423 21.696 8.1088 21.5224 8.1088H16.4811V1.97824ZM16.6751 2.17408V7.91296H21.5224C21.6402 7.91296 21.7546 7.86247 21.84 7.77019C21.9256 7.67769 21.9748 7.55089 21.9748 7.41741V2.66963C21.9748 2.53615 21.9256 2.40935 21.84 2.31685C21.7546 2.22457 21.6402 2.17408 21.5224 2.17408H16.6751ZM2.47759 10.087C2.35981 10.087 2.24541 10.1375 2.15998 10.2298C2.07435 10.3223 2.02521 10.4491 2.02521 10.5826V15.3304C2.02521 15.4638 2.07435 15.5906 2.15998 15.6832C2.24541 15.7754 2.35981 15.8259 2.47759 15.8259H7.32493V10.087H2.47759ZM2.01827 10.0961C2.1389 9.96576 2.30397 9.8912 2.47759 9.8912H7.5189V16.0218H2.47759C2.30397 16.0218 2.1389 15.9472 2.01827 15.8169C1.89785 15.6868 1.83123 15.5117 1.83123 15.3304V10.5826C1.83123 10.4013 1.89785 10.2262 2.01827 10.0961ZM9.15616 9.8912H14.8438V15.3304C14.8438 15.5117 14.7772 15.6868 14.6568 15.8169C14.5362 15.9472 14.3711 16.0218 14.1975 16.0218H9.15616V9.8912ZM9.35014 10.087V15.8259H14.1975C14.3153 15.8259 14.4297 15.7754 14.5151 15.6832C14.6007 15.5906 14.6499 15.4638 14.6499 15.3304V10.087H9.35014Z"
                fill="#7e868c"
              />
            </svg>
          ),
        })}
      </DropdownList>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
);
