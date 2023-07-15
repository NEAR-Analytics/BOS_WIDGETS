const { Button } = props;

const StyledButton = styled.button`
  padding: ${(props) => (Button.size === "sm" ? "4px 12px" : "8px 20px")};
  font-size: ${(props) => (Button.size === "sm" ? "12px" : "14px")};
  border-radius: 10px;
  font-weight: 500;
  line-height: 24px;
  border: 0;

  &.primary {
    background: #FFD50D;

    &.dark {
      color: #fff;
      background: linear-gradient(90deg, #9333EA 0%, #4F46E5 100%);
    }
  }

  &.secondary {
    background: transparent;
    border: 1px solid #FFD50D;
  }

  &:hover {
    background: #D9B50B;

    &.dark {
      background: linear-gradient(90deg, #5D2193 0%, #2F2A87 100%);
    }
  }

  &:disabled {
    background: #C3CACE;
    color: #828688;
    border: 0;
  }

  i {
    margin: 0 0 0 5px;
    &:before { vertical-align: -0.2rem; }
  }
`;

const Container = styled.div`
  button {
    margin-bottom:10px;
  }
`;

if (Button)
  return (
    <StyledButton
      size={Button.size}
      className={`align-items-center d-flex ${Button.className ?? "primary"}`}
      onClick={Button.onClick}
      disabled={Button.disabled}
    >
      <div>{Button.text}</div>
      {Button.icon && (
        <div className={`${Button.size === "sm" ? "fs-7" : "fs-5"}`}>
          {Button.icon}
        </div>
      )}
    </StyledButton>
  );

const WidgetButton = ({ size, className, disabled, text, icon }) => (
  <Widget
    src={"rubycop.near/widget/NDC.StyledComponents"}
    props={{
      Button: {
        size,
        className,
        disabled,
        text,
        icon,
      },
    }}
  />
);

return (
  <Container>
    <h4>Buttons</h4>
    <WidgetButton text="Primary" />
    <WidgetButton text="Primary Dark" className="primary dark" />
    <WidgetButton
      text="Primary with Icon"
      icon={<i class="bi bi-check-lg"></i>}
    />
    <WidgetButton disabled text="Primary disabled" />
    <WidgetButton size="sm" text="Primary small" />

    <WidgetButton className="secondary" text="Secondary" />
    <WidgetButton
      className="secondary"
      text="Secondary with Icon"
      icon={<i class="bi bi-check-lg"></i>}
    />
    <WidgetButton className="secondary" disabled text="Secondary disabled" />
    <WidgetButton className="secondary" size="sm" text="Secondary small" />
  </Container>
);
