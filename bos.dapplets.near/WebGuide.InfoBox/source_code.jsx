const InfoBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  animation: falling-animation 0.3s linear forwards;

  @keyframes falling-animation {
    from {
      transform: translate(-50%, -200%);
    }

    to {
      transform: translate(-50%, -50%);
    }
  }
`

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 546px;
  height: 700px;
  background: #FFFFFE;
  border: 1px solid #02193A;
  border-radius: 20px;
  padding: 20px;
  gap: 20px;
  z-index: 1000;
  box-shadow: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  align-items: center;
  justify-content: center;
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

  h1 {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    padding: 0;
    margin: 0;
    font-size: 32px;
    font-weight: 600;
    line-height: 48px;
  }
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

const PagesIndicators = styled.div`
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

const Navi = styled.button`
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

const WrapperAlert = styled.div`
  display: flex;
  width: 100%;
  padding: 4px 6px;
  gap: 6px;
  border-radius: 5px;
  align-items: center;
  justify-content: flex-start;
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

const Card = styled.div`
  position: relative;
  overflow: auto;
  display: flex;
  flex: 1;
  height: 100%;
  flex-direction: column;
  box-sizing: border-box;
  padding: 12px 20px;
  gap: 10px;
  border: none;
  border-radius: 20px;
  background: rgba(248, 249, 255, 1);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  overflow-x: hidden;

  h3 {
    padding: 8px 0 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #121212;
    flex: none;
    align-self: stretch;
    flex-grow: 0;
    text-indent: 16px;
  }

  img {
    position: relative;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    height: auto !important;
    border-radius: 10px;
    flex: none;
    flex-grow: 0;
    border: 1px solid rgb(207, 217, 222);
  }

  p {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 149%;
    color: #777777;
    flex: none;
    align-self: stretch;
    flex-grow: 0;
  }

  a {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 149%;
    text-decoration-line: underline !important;
    color: #384BFF;
    cursor: 'poiner';
  }
`

const Footer = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`

const ContainerCheckbox = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 20px 20px 20px 0;
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
  font-size: 14px;
  line-height: 17.88px;
  color: #7a818b;
  cursor: pointer;
  width: max-content;
`

const ActionsGroup = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  flex-grow: 1;
`

const ActionButton = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 180px;
  height: 42px;
  padding: 0px 20px;
  justify-content: center;
  align-items: center;
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

const {
  children,
  title,
  content,
  navi,
  onClose,
  // status, - conflict with deprecated Window.status property
  buttons,
  showChecked,
  checked,
  onDoNotShowChange,
} = props

return (
  <InfoBox>
    <Container>
      <Header>
        <TopLine>
          <CalloutHeaderCaption>
            Step {navi?.currentChapterIndex + 1} of {navi?.totalChapters}
          </CalloutHeaderCaption>
          <PagesIndicators>
            {navi.totalPages > 1 && [...Array(navi.totalPages)].map(
              (_, index) => (
                <Navi
                  key={index}
                  $active={index == navi.currentPageIndex ? true : false}
                />
              )
            )}
          </PagesIndicators>
          <Close onClick={onClose}>{iconClose}</Close>
        </TopLine>
        <h1>{title}</h1>
      </Header>
      <Card>
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

        <Markdown text={content} />
      </Card>
      <Footer>
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
        {buttons?.length > 1 ? (
          <ActionsGroup>
            <ActionButton
              $primary={buttons[1].variant == "primary" ? true : false}
              onClick={buttons[1].onClick}
              disabled={buttons[1].disabled}
            >
              {buttons[1].label}
            </ActionButton>
            <ActionButton
              $primary={buttons[0].variant == "primary" ? true : false}
              onClick={buttons[0].onClick}
              disabled={buttons[0].disabled}
            >
              {buttons[0].label}
            </ActionButton>
          </ActionsGroup>
        ) : buttons?.length === 1 ? (
          <ActionsGroup>
            <ActionButton
              $primary={buttons[0].variant == "primary" ? true : false}
              onClick={buttons[0].onClick}
              disabled={buttons[0].disabled}
            >
              {buttons[0].label}
            </ActionButton>
          </ActionsGroup>
        ) : <></>}
      </Footer>
    </Container>
  </InfoBox>
)
