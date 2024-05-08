/**
 * Based on: mob.near/widget/N.Common.OverlayTrigger
 */

const CustomTooltip = styled("Tooltip")`
  z-index: 9999999; // over the notch

  &[data-popper-reference-hidden="true"] {
    visibility: hidden;
    pointer-events: none;
  }

  .tooltip-arrow::before {
    border: none;
    display: inline-block;
    content: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='19' height='38' viewBox='18 0 20 38' fill='none' ><path d='M34.3818 22.1845L19.5654 36.0575L19.5654 1.8284L34.3715 15.6052C36.2802 17.3812 36.285 20.4025 34.3818 22.1845Z' fill='%23FFFFFE' stroke='%2302193A' /><path d='M16.5693 2.96185L20.0642 2.96185L21.0642 3.96185L21.0642 33.9619L20.0642 34.9619H16.5693L16.5693 2.96185Z' fill='%23FFFFFE' /></svg>");
  }

  &.bs-tooltip-top .tooltip-arrow {
    bottom: -29px;

    &::before {
      transform: rotate(90deg);
    }
  }

  &.bs-tooltip-end .tooltip-arrow {
    left: -18px;

    &::before {
      transform: rotate(180deg);
    }
  }

  &.bs-tooltip-bottom .tooltip-arrow {
    top: -29px;

    &::before {
      transform: rotate(-90deg);
    }
  }

  &.bs-tooltip-start .tooltip-arrow {
    right: -18px;

    &::before {
      transform: rotate(0deg);
    }
  }
`

const Callout = styled.div`
  display: flex;
  width: 320px;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-radius: 10px;
  border: 1px solid #02193a;
  background: #fffffe;
  font-family: sans-serif;
`

const CalloutTitle = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  color: #02193a;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 149%; /* 26.82px */
`

const CalloutDescription = styled.div`
  color: #7a818b;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 149%; /* 17.88px */
`

const Header = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  color: #02193A;
`

const TopLine = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 24px;
  margin: 0;
  padding: 0;
`

const CalloutHeaderCaption = styled.div`
  display: inline-block;
  max-width: 30%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #02193a;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 149%;
`

const Container = styled.div`
  width: auto;
  height: 24px;
  padding: 4px;
  gap: 10px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;
`

// const Navi = styled.button` // ToDo: for navigation
const Navi = styled.div`
  padding: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(props) => (props.$active ? "#384BFF" : "#E3E3E3")};
  border: none;
`

const Close = styled.button`
  background: inherit;
  outline: none;
  border: none;
  cursor: pointer;
`

const Arrow = styled.button`
  position: absolute;
  top: -5px;
  right: -46px;
  background: inherit;
  border: none;
  outline: none;
`

const WrapperAlert = styled.div`
  display: flex;
  padding: 4px 6px;
  gap: 6px;
  border-radius: 5px;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-right: auto;
  background: ${(props) =>
    props.$status === "warning"
      ? "rgba(255, 248, 235, 1)"
      : props.$status === "error"
      ? "rgba(246, 240, 246, 1)"
      : "rgba(234, 241, 255, 1)"};

  color: ${(props) =>
    props.$status === "warning"
      ? "rgba(208, 145, 26, 1)"
      : props.$status === "error"
      ? "rgba(219, 80, 74, 1)"
      : "rgba(36, 110, 253, 1)"};

  outline: none;
`

const TextAlert = styled.span`
  font-size: 12px;
  font-weight: 400;
  line-height: 17.88px;
  text-align: left;
`

const IconAlert = styled.span``

const ContainerCheckbox = styled.div`
  display: flex;
  align-items: center;
`

const CheckboxInput = styled.input`
  width: 16px;
  height: 16px;
  border-radius: 5px;
  border: 1px solid #384bff;
  margin-right: 8px;
`

const Label = styled.label`
  font-weight: 400;
  font-size: 12px;
  line-height: 17.88px;
  color: #7a818b;
  cursor: pointer;
`

const ActionsGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`

const ActionButton = styled.div`
  display: flex;
  height: 42px;
  padding: 0px 20px;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  border-radius: 90px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  border: ${(props) => (props.$primary ? "initial" : "1px solid #E2E2E5")};
  background: ${(props) => (props.$primary ? "#02193A" : "initial")};
  color: ${(props) => (props.$primary ? "#fff" : "initial")};

  &:hover {
    background: ${(props) => (props.$primary ? "#1c3559" : "#eee")};
  }

  &:active {
    background: ${(props) => (props.$primary ? "#020c19" : "#ddd")};
  }
`

const iconClose = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M18 6L6 18"
      stroke="#02193A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 6.5L18 18.5"
      stroke="#02193A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const errorIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <g clipPath="url(#clip0_358_97)">
      <path
        d="M6.54996 1.66666H13.45L18.3333 6.54999V13.45L13.45 18.3333H6.54996L1.66663 13.45V6.54999L6.54996 1.66666Z"
        stroke="#DB504A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 7.5L7.5 12.5"
        stroke="#DB504A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 7.5L12.5 12.5"
        stroke="#DB504A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_358_97">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const infoIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <g clipPath="url(#clip0_358_90)">
      <path
        d="M9.99996 18.3333C14.6023 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6023 1.66667 9.99996 1.66667C5.39759 1.66667 1.66663 5.39763 1.66663 10C1.66663 14.6024 5.39759 18.3333 9.99996 18.3333Z"
        stroke="#246EFD"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 13.3333V10"
        stroke="#246EFD"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 6.66667H10.0088"
        stroke="#246EFD"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_358_90">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const warningIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M8.57502 3.21665L1.51668 15C1.37116 15.252 1.29416 15.5377 1.29334 15.8288C1.29253 16.1198 1.36793 16.4059 1.51204 16.6588C1.65615 16.9116 1.86396 17.1223 2.11477 17.2699C2.36559 17.4174 2.65068 17.4968 2.94168 17.5H17.0583C17.3494 17.4968 17.6344 17.4174 17.8853 17.2699C18.1361 17.1223 18.3439 16.9116 18.488 16.6588C18.6321 16.4059 18.7075 16.1198 18.7067 15.8288C18.7059 15.5377 18.6289 15.252 18.4834 15L11.425 3.21665C11.2765 2.97174 11.0673 2.76925 10.8177 2.62872C10.5681 2.48819 10.2865 2.41437 10 2.41437C9.71357 2.41437 9.43196 2.48819 9.18235 2.62872C8.93275 2.76925 8.72358 2.97174 8.57502 3.21665Z"
      stroke="#D0911A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 7.5V10.8333"
      stroke="#D0911A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 14.1667H10.0088"
      stroke="#D0911A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const {
  children,
  content,
  title,
  navi,
  onClose,
  // status, - conflict with deprecated Window.status property
  buttons,
  showChecked,
  checked,
  onDoNotShowChange,
} = props

const overlay = (
  <CustomTooltip bsPrefix="wg-tooltip">
    <Callout>
      <Header>
        <TopLine>
          <CalloutHeaderCaption>
            Step {navi?.currentChapterIndex + 1} of {navi?.totalChapters}
          </CalloutHeaderCaption>
          <Container>
            {navi.totalPages > 1 && [...Array(navi?.totalPages)].map((_, index) => (
              <Navi
                key={index}
                $active={index == navi?.currentPageIndex ? true : false}
              />
            ))}
          </Container>
          <Close onClick={onClose}>{iconClose}</Close>
        </TopLine>
      </Header>

      {props.status && props.status.text ? (
        <WrapperAlert $status={props.status.type}>
          <IconAlert>
            {props.status.type === "warning"
              ? warningIcon
              : props.status.type === "error"
              ? errorIcon
              : infoIcon}
          </IconAlert>
          <TextAlert>{props.status.text}</TextAlert>
        </WrapperAlert>
      ) : null}

      <CalloutTitle>{title}</CalloutTitle>

      <Markdown text={content} />
      {showChecked ? (
        <ContainerCheckbox>
          <CheckboxInput
            type="checkbox"
            checked={checked}
            onChange={onDoNotShowChange}
          />
          <Label htmlFor="checkbox">Don't show this guide again</Label>
        </ContainerCheckbox>
      ) : null}

      <ActionsGroup>
        {buttons.map((btn, index) => (
          <ActionButton
            key={index}
            $primary={btn.variant == "primary" ? true : false}
            onClick={btn.onClick}
            disabled={btn.disabled}
          >
            {btn.label}
          </ActionButton>
        ))}
      </ActionsGroup>
    </Callout>
  </CustomTooltip>
)

return (
  <OverlayTrigger
    show={true}
    overlay={overlay}
    placement={props.placement ?? "auto"}
    offset={[0, 20]}
    popperConfig={{ strategy: props.strategy ?? 'absolute' }}
  >
    {typeof props.children === "function" ? (
      props.children
    ) : (
      <span>{props.children}</span>
    )}
  </OverlayTrigger>
)
